import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import Mapbox from '@mapbox/react-native-mapbox-gl';

const events = [{"id":1,"title":"Android Hackathon","description":null,"start_at":"2018-02-10T14:10:52.773Z","end_at":"2018-02-11T20:12:37.044Z","attendees":null,"created_at":"2018-02-10T18:12:44.050Z","updated_at":"2018-02-10T18:12:44.050Z","latitude":44.6374247,"longitude":-63.5872094,"address":"Goldberg Computer Science Building, 6050 University Ave, Halifax, NS B3H 1W5"},{"id":2,"title":"Party after winning Hackathon","description":"Please bring your own drink","start_at":"2018-02-11T22:19:45.595Z","end_at":null,"attendees":null,"created_at":"2018-02-10T18:21:52.274Z","updated_at":"2018-02-10T18:21:52.274Z","latitude":44.6386448,"longitude":-63.5919118,"address":"H-1422B, 6230 Coburg Road, Halifax, NS, B3h4R2"}];

// Code referred from mapbox documentation https://www.mapbox.com/help/first-steps-react-native-sdk/
Mapbox.setAccessToken('pk.eyJ1IjoiYXltYW54ZCIsImEiOiJjamRobDYwdnkwYWF4MnFwcjM5ZmZxbGJrIn0.xa6xkZ0yUe3An3stHXd4rg');

export default class Map_View_Screen extends React.Component {
  renderAnnotations(evts) {
    let renderedEvents = [];
    for(let i = 0; i < evts.length; i++){
      renderedEvents.push(this.renderAnnotation(evts[i]))
    }
    return renderedEvents;
  }
  
  renderAnnotation(event) {
    return (
      <Mapbox.PointAnnotation
        key={`pi${event.id}`}
        id={`pi${event.id}`}
        coordinate={[event.longitude, event.latitude]}
        onSelected={this.toEventDetails}>
        <View style={styles.annotationContainer}>
          <View style={styles.annotationFill} />
        </View>
        <Mapbox.Callout title={event.title} />
      </Mapbox.PointAnnotation>
    )
  }
  
  render() {
    return (
      <Mapbox.MapView
        styleURL={Mapbox.StyleURL.Street}
        zoomLevel={15}
        centerCoordinate={[events[0]['longitude'], events[0]['latitude']]}
        style={styles.container}
        showUserLocation={true}>
        {this.renderAnnotations(events)}
      </Mapbox.MapView>
    )
  }
  toEventDetails = () => {
    this.props.navigation.navigate('Event');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  annotationContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  annotationFill: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'orange',
    transform: [{ scale: 0.6 }],
  },
});
