
/*
This screen allows the user to pick a city. The user will automatically
navigate to the mapview. The navigator sends a payload that consists of
hard-coded lat and long for the selected city. This allows the pick your
city screen to render at those coordinates.
*/
import React from 'react';
import {
    StyleSheet, Text, View, List, ListView, StatusBar, Image, Alert, TouchableOpacity, AsyncStorage
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
              onPress: () => {
                  this.props.navigation.navigate('Map',{lat:44.651070,long:-63.582687});
                  AsyncStorage.setItem('lat', JSON.stringify(this.state.cities[0].lat));
                  AsyncStorage.setItem('lon', JSON.stringify(this.state.cities[0].long));
                  AsyncStorage.setItem('city', this.state.cities[0].name);
                  AsyncStorage.removeItem('events');
                  }
              },
              {
              name: 'Toronto',
              lat: 43.653226,
              long:-79.383184,
              image: require('../assets/city-images/toronto.jpg'),
              onPress: () => {
                  this.props.navigation.navigate('Map',{lat:43.653226,long:-79.383184});
                  AsyncStorage.setItem('lat', this.state.cities[1].lat.toString());
                  AsyncStorage.setItem('lon', this.state.cities[1].long.toString());
                  AsyncStorage.setItem('city', this.state.cities[1].name);
                  AsyncStorage.removeItem('events');
                 }
              }
        ],
          longitude: null,
          error: null,

      }
  }

  componentWillMount(){


  }

  //user's lat and long are fetched but this infor is currently not used.
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
