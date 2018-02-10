import React from 'react';
 import { StyleSheet, Text, View,Navigator,TextInput, KeyboardAvoidingView,TouchableOpacity,
 AsyncStorage,ScrollView,List, ListView
  } from 'react-native';

 //import Icon from 'react-native-vector-icons/FontAwesome';


import {
  StackNavigator,
} from 'react-navigation';



export default class Map_View_Screen extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            //location props
            latitude: null,
            longitude: null,
            error: null,
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
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
    );
  }

  componentWillMount() {
  //this.fetchData();

  //location services
  navigator.geolocation.clearWatch(this.watchId);
}



  render() {
    return (
        <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Map view screen</Text>
                <Text>Latitude: {this.state.latitude}</Text>
                <Text>Longitude: {this.state.longitude}</Text>
                {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
        </View>

    );
  }



}
