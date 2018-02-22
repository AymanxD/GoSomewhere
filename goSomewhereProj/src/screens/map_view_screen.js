import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { MapView } from 'expo';

const events = [{"id":1,"title":"Android Hackathon","description":null,"start_at":"2018-02-10T14:10:52.773Z","end_at":"2018-02-11T20:12:37.044Z","attendees":null,"created_at":"2018-02-10T18:12:44.050Z","updated_at":"2018-02-10T18:12:44.050Z","latitude":44.6374247,"longitude":-63.5872094,"address":"Goldberg Computer Science Building, 6050 University Ave, Halifax, NS B3H 1W5"},{"id":2,"title":"Party after winning Hackathon","description":"Please bring your own drink","start_at":"2018-02-11T22:19:45.595Z","end_at":null,"attendees":null,"created_at":"2018-02-10T18:21:52.274Z","updated_at":"2018-02-10T18:21:52.274Z","latitude":44.6386448,"longitude":-63.5919118,"address":"H-1422B, 6230 Coburg Road, Halifax, NS, B3h4R2"}];


export default class Map_View_Screen extends React.Component {
  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: events[0]['latitude'],
          longitude: events[0]['longitude'],
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
        <MapView.Marker
          coordinate={{latitude: events[1]['latitude'], longitude: events[1]['longitude']}}
          title={events[1]['title']}
          description={events[1]['description']}
        />
      </MapView>
    )
  }
  toEventDetails = () => {
    this.props.navigation.navigate('Event');
  }
}
