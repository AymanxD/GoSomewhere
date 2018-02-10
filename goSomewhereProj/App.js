import React from 'react';
import { StyleSheet, Text, View,Navigator } from 'react-native';


import {StackNavigator} from 'react-navigation';

import Login from './src/screens/Login_Screen';
import Map from './src/screens/Map_View_Screen';
import Event from './src/screens/Event_Details_Screen';




const Application = StackNavigator({

    Home: {screen: Login,
        navigationOptions: {
            title: 'Login'
        }
    },

    Map: {screen: Map,
        navigationOptions: {
            title: 'Map'
        }
    },

    Event: {screen: Event,
        navigationOptions: {
            title: 'something like this...{this.props.eventName}'
        }
    },


});

export default class App extends React.Component {

  render() {
    return (

                <Application
                    ref= "appNavigator"
                    //some people have renderScene function
                />
    );
  }




}
