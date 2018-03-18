import React from 'react';
import { StyleSheet, Text, View,Navigator,TextInput, KeyboardAvoidingView,TouchableOpacity,
 AsyncStorage,ScrollView,List, ListView, StatusBar
} from 'react-native';
import PropTypes from 'prop-types';
import { BottomNavigation } from 'react-native-material-ui';


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
        <BottomNavigation hidden={false} >
            <BottomNavigation.Action
                key= {this.props.buttonLeft.key}
                icon= {this.props.buttonLeft.icon}
                label= {this.props.buttonLeft.label}
                onPress= {this.props.buttonLeft.onPress}
            />
            <BottomNavigation.Action
                key= {this.props.buttonCenter.key}
                icon= {this.props.buttonCenter.icon}
                label= {this.props.buttonCenter.label}
                onPress= {this.props.buttonCenter.onPress}
            />
            <BottomNavigation.Action
                key= {this.props.buttonRight.key}
                icon= {this.props.buttonRight.icon}
                label= {this.props.buttonRight.label}
                onPress= {this.props.buttonRight.onPress}
            />
        </BottomNavigation>

    );
  }
}


