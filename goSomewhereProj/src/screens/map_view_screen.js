import React from 'react';
import { StyleSheet, Text, View, Alert, AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import { MapView } from 'expo';
import { Toolbar } from 'react-native-material-ui';
import { EventRegister } from 'react-native-event-listeners';
import axios from 'axios';
import searchFilter from "../src/utils/textSearchUtil";
import MenuBar from "../components/map_listview_comps/Menubar";
import { searchFilter, FilterModel } from "../components/map_listview_comps/FilterModel";
import SideBarContainer from '../components/shared_comps/SideBarContainer';

export default class Map_View_Screen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            events: [],
            distance: 25,
            curr_city_lat:44.6374247,
            curr_city_long:-63.5872094,
            search: '',
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

    componentDidMount() {
        //location services
        this.watchId = navigator.geolocation.watchPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                }, () =>{
                    AsyncStorage.setItem('lat', JSON.stringify(this.state.latitude));
                    AsyncStorage.setItem('lon', JSON.stringify(this.state.longitude));
                });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
        );

    }

   async componentWillMount() {

        let events = await AsyncStorage.getItem('events');

        if(events == null) {
            axios.get('/events')
                .then(async (response) => {
                    this.setState({events: response.data}, () => {
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
            let events = await AsyncStorage.getItem('events');

            this.setState({
                events: JSON.parse(events),
            });
        }

        navigator.geolocation.clearWatch(this.watchId);

       if (this.props.navigation.state.params) {
           const {lat, long} = this.props.navigation.state.params;
           this.setState({curr_city_lat: lat});
           this.setState({curr_city_long: long});
       }
    }

    async changeEvents() {
        this.setState({
            events: JSON.parse(await AsyncStorage.getItem('events'))
        });
    }

    toEventDetails = () => {
        this.props.navigation.navigate('Event');
    };

    onSearchPressed(fieldText){
        console.log(fieldText + 'in on search Pressed');
       AsyncStorage.setItem('search', fieldText);
       searchFilter.searchFilter();
    };



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
                            onChangeText: (fieldText) =>
                            {this.onSearchPressed(fieldText)}
                                      }}
                    />
                    <MapView
                        style={{ flex: 1 }}
                        initialRegion={{
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
