import React from 'react';
import {Text,View, Image, ScrollView, Alert, Dimensions, Linking, Share, TouchableOpacity, TouchableHighlight} from 'react-native';
import { Button } from 'react-native-material-ui';
import { TextField } from 'react-native-material-textfield';
import MapViewDirections from 'react-native-maps-directions'
import MapView from 'react-native-maps';
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const events = [{"id":1,"title":"Android Hackathon","category":"study","description":null,"start_at":"2018-02-23T14:10:52.773Z","end_at":"2018-02-23T20:12:37.044Z","attendees":null,"created_at":"2018-02-10T18:12:44.050Z","updated_at":"2018-02-10T18:12:44.050Z","latitude":44.6374257,"longitude":-63.5872094,"address":"Goldberg Computer Science Building, 6050 University Ave, Halifax, NS B3H 1W5"},{"id":2,"title":"Party after winning Hackathon","category":"party","description":"Please bring your own drink","start_at":"2018-02-11T22:19:45.595Z","end_at":null,"attendees":null,"created_at":"2018-02-10T18:21:52.274Z","updated_at":"2018-02-10T18:21:52.274Z","latitude":44.6386448,"longitude":-63.5919118,"address":"H-1422B, 6230 Coburg Road, Halifax, NS, B3h4R2"}];
const GoogleMapsKey = 'AIzaSyAvE1bTrQkk9zjFSVNNxN32XDt2ltzOpnA'; 
const coordinates = [{
    latitude: events[0]['latitude'],
    longitude: events[0]['longitude'],
  }, {  
    latitude: this.state.event['latitude'],
    longitude: this.state.event['longitude'],
  }];

export default class Navigation_Screen extends React.Component {
    
constructor(props) {
  super(props);
  this.state = {
  event: props.navigation.state.params.event
  }
}

    render() {
            return (
 <MapView style={{ flex: 1 }} initialRegion={{
                latitude: 44.6374247,
                longitude: -63.5872094,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0922*ASPECT_RATIO,
              }}>
            <MapView.Marker coordinate={coordinates[0]} />
            <MapView.Marker coordinate={coordinates[1]} /> 
             <MapViewDirections 
             origin = {coordinates[0]}
             destination = {coordinates[1]}
             apikey = {GoogleMapsKey}
             strokeWidth={3}
             strokeColor = "hotpink"
             />
             </MapView>
            );
   };
};
