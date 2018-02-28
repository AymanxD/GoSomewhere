import React from 'react';
import { StyleSheet, Text, View,Navigator,TextInput, KeyboardAvoidingView,TouchableOpacity,
 AsyncStorage,ScrollView,List, ListView, StatusBar
} from 'react-native';
import PropTypes from 'prop-types';
import { Button, Subheader, COLOR } from 'react-native-material-design';
export default class MenuBar extends React.Component {

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
      <View style={styles.menuBar}>
        <Subheader text ="Light Theme"/>
          <View style={styles.menuBar}>
            <Button text="NORMAL" primary={theme} />
            <Button text="NORMAL RAISED" primary={theme} raised/>
            <Button text="DISABLED" primary={theme} disabled/>
            <Button text="DISABLED RAISED" primary={theme} disabled raised/>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menuBar: {
    flex: 1,
    padding: 16
  }
});
