import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { MapView } from 'expo';
import { Toolbar } from 'react-native-material-ui';
import { EventRegister } from 'react-native-event-listeners';
import axios from 'axios';

import MenuBar from "../components/map_listview_comps/Menubar";
import SideBarContainer from '../components/shared_comps/SideBarContainer';

export default class Map_View_Screen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            events: [],
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
                onPress: () => {if(this.state.filterModalVisible === false){
                    this.setState({filterModalVisible: true})
                } else this.setState({filterModalVisible: false})
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
                            latitude: 44.6374247,
                            longitude: -63.5872094,
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
                    <MenuBar buttonLeft={this.state.buttonLeft}
                             buttonCenter={this.state.buttonCenter}
                             buttonRight={this.state.buttonRight}
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
