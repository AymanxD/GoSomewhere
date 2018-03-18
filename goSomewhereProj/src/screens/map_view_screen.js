import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { MapView } from 'expo';
import { Toolbar } from 'react-native-material-ui';
import axios from 'axios';

export default class Map_View_Screen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      events: []
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
      <View style={styles.container}>
        <Toolbar
          leftElement="menu"
          onLeftElementPress={() => {
            this.props.screenProps.toggleMenu();
          }}
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
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
});
