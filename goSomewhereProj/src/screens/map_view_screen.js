import React from 'react';
import { StyleSheet, Text, View, Alert, AsyncStorage } from 'react-native';
import { MapView } from 'expo';
import { Toolbar } from 'react-native-material-ui';
import { EventRegister } from 'react-native-event-listeners';
import axios from 'axios';
import MenuBar from "../components/map_listview_comps/Menubar";
import FilterModel from "../components/map_listview_comps/FilterModel";
import SideBarContainer from '../components/shared_comps/SideBarContainer';

export default class Map_View_Screen extends React.Component {

    constructor(props){
        super(props);
        this.state = {

            // Saves all of the current events used in the application
            events: [],
            curr_city_lat:44.651070,
            curr_city_long:-63.5826879,
            users_lat:0,
            users_long:0,

            // Menu bar button, icons, labels, and functions
            // buttonLeft and buttonCenter are used to navigate to different
            // application screens. buttonRight is used to switch between
            // the filter modal being visible and invisible.
            buttonLeft: {
                key: "Switch City",
                icon: "location-city",
                label: "Switch City",
                onPress: () => this.props.navigation.navigate('PickCity')
            },
            buttonCenter: {
                key: "List",
                icon: "list",
                label: "List",
                onPress: () => this.props.navigation.navigate('ListView')
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

    async componentWillMount() {

        // Returns AsyncStorage for previously filtered events.
        let events = await AsyncStorage.getItem('events');

        // if there are no filtered events then call the API to provide new events.
        if(events == null) {

            // axios is used for API calls.
            axios.get('/events')
                .then(async (response) => {

                    // Saves events from the API in the events state and AsyncStorage
                    this.setState({events: response.data}, async () => {

                        AsyncStorage.setItem('originalEvents', JSON.stringify(this.state.events));
                    });
                })
                .catch((error) => {
                    if (error.response && error.response.data) {
                        Alert.alert(JSON.stringify(error.response.data));
                    } else {
                        Alert.alert("catching exception", JSON.stringify(error));
                    }
                });
        } else{

            // If there are filtered events  set the state to represent those events
            let events = await AsyncStorage.getItem('events');

            this.setState({
                events: JSON.parse(events),
            });
        }

        // Geolocation to find user locations
        navigator.geolocation.clearWatch(this.watchId);

        // Saves latitude and longitude to state.
        if (this.props.navigation.state.params) {
            const {lat, long} = this.props.navigation.state.params;
            this.setState({curr_city_lat: lat});
            this.setState({curr_city_long: long});
        }
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
        } else {
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
    }

    componentDidMount() {
        //location services
        // Saves latitude and longitude to state and AsyncStorage.
        this.watchId = navigator.geolocation.watchPosition(
            (position) => {
                this.setState({
                    users_lat: position.coords.latitude,
                    users_long: position.coords.longitude,
                    error: null,
                }, () =>{
                    AsyncStorage.setItem('lat', JSON.stringify(this.state.users_lat));
                    AsyncStorage.setItem('lon', JSON.stringify(this.state.users_long));
                });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
        );
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
    //Gets text from search and passes it the searchFilter function
    onSearchPressed(fieldText){
       AsyncStorage.setItem('search', fieldText);
        this.searchFilter();
    };

   //gets the events prior to search
   async getEvents() {
    let prevEvents = await AsyncStorage.getItem('events');       
    if(prevEvents == null){
        prevEvents = await AsyncStorage.getItem('originalEvents')
    }
    AsyncStorage.setItem('prevEvents', prevEvents);
   }

   //posts reverts to prior filter after search
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
                            autoFocus: true,
                            placeholder: 'Search',
                            onSearchPressed: () =>
                            {this.getEvents()},
                             onChangeText: (fieldText) =>
                             {this.onSearchPressed(fieldText)},
                            onSearchClosed: () => {this.setEvents()},
                            }}
                    />
                    <MapView
                        style={{ flex: 1 }}
                        region={{
                            latitude: this.state.curr_city_lat,
                            longitude: this.state.curr_city_long,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421
                        }}
                    >
                        {this.state.events.map((event) => {
                            return (
                                <MapView.Marker
                                    coordinate={{latitude: event['latitude'], longitude: event['longitude']}}
                                    key={event['id']}
                                    onCalloutPress={()=>{
                                        this.props.navigation.navigate('Event', { event: event });
                                    }}>
                                    <MapView.Callout style={{ width: 300 }}>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{event['title']}</Text>
                                        <Text>{event['description'].substring(0,event['description'].indexOf(".",100)+1)}</Text>
                                    </MapView.Callout>
                                </MapView.Marker>
                            )
                        })}
                    </MapView>
                    <MenuBar
                        buttonLeft={this.state.buttonLeft}
                        buttonCenter={this.state.buttonCenter}
                        buttonRight={this.state.buttonRight}
                    />
                    <FilterModel
                        filterModalVisible={this.state.filterModalVisible}
                        reset = {this.resetFilter.bind(this)}
                        onPress={this.state.buttonRight.onPress}
                        changeEvents={this.changeEvents.bind(this)}
                    />
                </View>
           </SideBarContainer>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
});
