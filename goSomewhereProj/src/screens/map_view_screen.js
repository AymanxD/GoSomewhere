import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import PropTypes from 'prop-types';
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
            events: [],
            distance: 25,
            curr_city_lat:44.6374247,
            curr_city_long:-63.5872094,
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
        axios.get('/events')
            .then(async (response) => {
                this.setState({events: response.data});
            })
            .catch((error) => {
                if(error.response && error.response.data) {
                    Alert.alert(JSON.stringify(error.response.data));
                } else {
                    Alert.alert("catching exception", JSON.stringify(error));
                }
            });
    }

    distanceChange(newDistance){
        this.setState({
            distance: newDistance
        });
    componentWillMount(){
        if(this.props.navigation.state.params){
            const {lat,long} = this.props.navigation.state.params;
            this.setState({curr_city_lat: lat});
            this.setState({curr_city_long: long});
        }


    }

    toEventDetails = () => {
        this.props.navigation.navigate('Event');
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
                        distance={this.state.distance}
                        onPress={this.state.buttonRight.onPress}
                        onChange={this.distanceChange.bind(this)}
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
