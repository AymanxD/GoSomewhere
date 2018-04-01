import React from 'react';
<<<<<<< HEAD
import { StyleSheet, View, ListView, Image, Alert, AsyncStorage
=======
import { StyleSheet, Text, View, ListView, Image, Alert
>>>>>>> 518c6db8ec75fd28b235d047e7848cbadd1ab701
} from 'react-native';

import MenuBar from "../components/map_listview_comps/Menubar";
import FilterModel from "../components/map_listview_comps/FilterModel";

import axios from "axios/index";
import { Toolbar } from 'react-native-material-ui';
import { ListItem } from 'react-native-material-ui';
import { EventRegister } from 'react-native-event-listeners';
import SideBarContainer from '../components/shared_comps/SideBarContainer';
import Event from "./event_details_screen";


export default class List_View_Screen extends React.Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            latitude: null,
            longitude: null,
            events: [],
            error: null,
            filterModalVisible: false,
            buttonLeft: {
                key: "Switch City",
                icon: "location-city",
                label: "Switch City",
                onPress: () => this.props.navigation.navigate('PickCity')
            },
            buttonCenter: {
                key: "Map",
                icon: "map",
                label: "Map",
                onPress: () => this.props.navigation.navigate('Map')

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

  async componentWillMount(){

      let events = await AsyncStorage.getItem('events');

      if(events == null) {
          let events = await AsyncStorage.getItem('originalEvents');

          this.setState({
              events: JSON.parse(events),
          });

      }else{
          let events = await AsyncStorage.getItem('events');

          this.setState({
              events: JSON.parse(events),
          });
      }
  }

    async changeEvents(){
        this.setState({
            events: JSON.parse(await AsyncStorage.getItem('events'))
        });
    }


    // updateTimeFilter(){
    //     let today = new Date();
    //     let dateToday = today.getDate();
    //     let monthToday = today.getMonth();
    //     let eventDate, eventDay, eventMonth;
    //     let tempArr = [];
    //
    //     let daysBetweenDates;
    //
    //     for(let i = 0; i < this.state.events.length; i++){
    //
    //         eventDate = new Date(this.state.events[i].start_at);
    //         eventDay = eventDate.getDate();
    //         eventMonth = eventDate.getMonth();
    //
    //         daysBetweenDates = this.timeComparator(dateToday, monthToday, eventDay, eventMonth);
    //
    //         if((daysBetweenDates <= this.state.timeRange)){
    //             tempArr.push(this.state.events[i]);
    //         }
    //     }
    //
    //     this.setState({
    //         events: tempArr
    //     });
    // }
    //
    // static timeComparator(dateToday, monthToday, eventDay, eventMonth){
    //     return (monthToday * 30 + dateToday) - (eventMonth * 30 + eventDay);
    // }


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

  render() {
    return (
        <SideBarContainer navigation={this.props.navigation}>
            <View style={styles.container}>
                <Toolbar
                    leftElement="menu"
                    onLeftElementPress={() => EventRegister.emit('menuToggle') }
                    centerElement="Events List"
                    searchable={{
                        autoFocus: true,
                        placeholder: 'Search',
                    }}
                />
                <ListView
                    dataSource={this.ds.cloneWithRows(this.state.events)}
                    enableEmptySections={true}
                    renderRow={this._renderRow.bind(this)}
                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={{height: 2}} />}
                />
                <FilterModel
                    filterModalVisible={this.state.filterModalVisible}
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
