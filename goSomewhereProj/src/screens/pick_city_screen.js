import React from 'react';
import { StyleSheet, Text, View, List, ListView, StatusBar, Image, Alert, TouchableOpacity
} from 'react-native';

import { ListItem } from 'react-native-material-ui';

import {
  StackNavigator,
} from 'react-navigation';

import CityCard from '../components/choose_city_screen/CityCard';


const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Pick_City_Screen extends React.Component {

  constructor(props) {
     super(props);
      this.state = {
          latitude: null,
          cities: [
              {
              name:'Halifax',
              lat:44.651070,
              long:-63.582687,
              image: require('../assets/city-images/halifax.jpg'),
              onPress: () => this.props.navigation.navigate('Map'),
              },
              {
              name: 'Toronto',
              lat: 43.761539,
              long:-79.411079,
              image: require('../assets/city-images/toronto.jpg'),
              onPress: () => this.props.navigation.navigate('Map'),
              }
        ],
          longitude: null,
          error: null,

      }
  }

  componentWillMount(){

      /*
    fetch('https://gosomewhere-backend.herokuapp.com/events', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({events: responseJson});
      });

      navigator.geolocation.clearWatch(this.watchId);
      */
  }

  componentDidMount() {
    //location services
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
    );
  }

  _renderRow(rowData) {
    return(
      <TouchableOpacity style={{ width: 250, height: 250}} onPress={rowData.onPress}>
          <CityCard image={rowData.image} title={rowData.name} />
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, paddingTop: 50, paddingLeft: 10}}>
        <StatusBar hidden={true} />
        <ListView
          dataSource={ds.cloneWithRows(this.state.cities)}
          renderRow={this._renderRow.bind(this)}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={{height: 70}} />}
        />


      </View>
    );
  }
}
