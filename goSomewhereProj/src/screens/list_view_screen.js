import React from 'react';
import { StyleSheet, View, ListView, Image, AsyncStorage} from 'react-native';

import { Toolbar } from 'react-native-material-ui';
import { ListItem } from 'react-native-material-ui';
import { EventRegister } from 'react-native-event-listeners';

import MenuBar from "../components/map_listview_comps/Menubar";
import FilterModel from "../components/map_listview_comps/FilterModel";
import SideBarContainer from '../components/shared_comps/SideBarContainer';
import Event from "./event_details_screen";


export default class List_View_Screen extends React.Component {

    constructor(props) {
        super(props);

        // Used to assess whether a row in the ListView is different from another.
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {

            // Saves all of the current events used in the application
            events: [],
            error: null,
            filterModalVisible: false,
            city: "Halifax",
            // Menu bar button, icons, labels, and functions
            // buttonLeft and buttonCenter are used to navigate to different
            // application screens. buttonRight is used to switch between
            // the filter modal being visible and invisible.
            buttonLeft: {
                key: "Switch City",
                icon: "location-city",
                label: "Switch City",
                onPress: async () => {
                    let latitude = await AsyncStorage.getItem('lat');
                    let longitude = await AsyncStorage.getItem('lon');
                    this.props.navigation.navigate('Map', {lat: parseFloat(latitude), long: parseFloat(longitude)});
                }            },
            buttonCenter: {
                key: "Map",
                icon: "map",
                label: "Map",
                onPress: async () => {
                    let latitude = await AsyncStorage.getItem('lat');
                    let longitude = await AsyncStorage.getItem('lon');
                    this.props.navigation.navigate('Map', {lat: parseFloat(latitude), long: parseFloat(longitude)});
                }
            },
            buttonRight: {
                key: "filter",
                icon: "filter-list",
                label: "Filter",
                onPress: () => {
                    this.setState({filterModalVisible: !this.state.filterModalVisible})
                }
            }

        }
    }

    // If filtered events exist, display them. Else display
    // the unfiltered events.
      async componentWillMount(){

          let events = await AsyncStorage.getItem('events');

          if(events == null) {
              events = await AsyncStorage.getItem('originalEvents');

              this.setState({
                  events: JSON.parse(events),
              });

          }else{
              this.setState({
                  events: JSON.parse(events),
              });
          }

          let city = await AsyncStorage.getItem('city');

          if(city != null){
              this.setState({
                  city: city
              });
          }
      }

    // Sets the displayed events to filtered events if they exist, otherwise
    // the displayed events are set to all of the events.
    async changeEvents() {

        let events = JSON.parse(await AsyncStorage.getItem('events'));

        if(events == null){
            events = JSON.parse(await AsyncStorage.getItem('originalEvents'));
        }

        this.setState({
            events: events
        });
    }

    // Resets all filters, by removing all events from AsyncStorage and
    // calling for new events.
    resetFilter(){
        AsyncStorage.removeItem('originalEvents');
        AsyncStorage.removeItem('events');

        this.state.buttonRight.onPress();
        this.props.navigation.navigate('Map');
    }

    //Creates a filter to search events
    async searchFilter() {
        let events = await AsyncStorage.getItem('events');
        
        if(events == null){
            events = await AsyncStorage.getItem('originalEvents')
        }

        let search = await AsyncStorage.getItem('search');
        if (search != null) {
        search = search.toLowerCase();
        }else {
            this.setEvents();
        }
        
        events = JSON.parse(events);
        let searchArr = [];

        for (let i = 0; i < events.length; i++) {
            let title = events[i].title;
            if (title.toLowerCase().contains(search)) {
                searchArr.push(events[i]);
            }
        }

        AsyncStorage.setItem('events', JSON.stringify(searchArr));

              this.changeEvents();
    };

        //Gets text from search and passes it the searchFilter function
        onSearchPressed(fieldText){
            syncStorage.setItem('search', fieldText);
            this.searchFilter();
        };

    // Renders a row in the ListView for each events in the events state.
  _renderRow(rowData) {
    return(
        <View>
            <ListItem
                divider
                leftElement={<Image source={{uri: rowData.image}} style={{ width: 50, height: 50, borderRadius: 50}} /> }
                centerElement={{
                    primaryText: rowData.title,
                    secondaryText: rowData.description,
                }}
                onPress={() => {this.props.navigation.navigate('Event', {event: rowData})}}
            />
        </View>
    )
  }

     //gets the events prior to search 
     async getEvents() {
        let prevEvents = await AsyncStorage.getItem('events');       
        if(prevEvents == null){
            prevEvents = await AsyncStorage.getItem('originalEvents')
        } 
        AsyncStorage.setItem('prevEvents', prevEvents);
       }
       
     //reverts back to prior filter after search
       async setEvents() {
        let prevEvents = await AsyncStorage.getItem('prevEvents'); 
        AsyncStorage.setItem('events', prevEvents);
        this.changeEvents(); 
       }

  render() {
    return (
        <SideBarContainer navigation={this.props.navigation}>
            <View style={styles.container}>
                <Toolbar
                    leftElement="menu"
                    onLeftElementPress={() => EventRegister.emit('menuToggle') }
                    centerElement="Events List"
                    searchable={{
                        onSearchPressed: () => 
                        {this.getEvents()},
                         onChangeText: (fieldText) =>
                         {this.onSearchPressed(fieldText)},
                        onSearchClosed: () => {this.setEvents()},
                        }}
                />
                <ListView
                    dataSource={this.ds.cloneWithRows(this.state.events.filter(event => event.address.includes(this.state.city)))}
                    enableEmptySections={true}
                    renderRow={this._renderRow.bind(this)}
                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={{height: 2}} />}
                />
                <FilterModel
                    filterModalVisible={this.state.filterModalVisible}
                    reset = {this.resetFilter.bind(this)}
                    onPress={this.state.buttonRight.onPress}
                    changeEvents={this.changeEvents.bind(this)}
                />
                <MenuBar
                    buttonLeft={this.state.buttonLeft}
                    buttonCenter={this.state.buttonCenter}
                    buttonRight={this.state.buttonRight}
                />
            </View>
        </SideBarContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: 'center'
  }
});
