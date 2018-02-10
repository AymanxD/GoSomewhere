import React from 'react';
import { StyleSheet, Text, View,Navigator } from 'react-native';


import {StackNavigator} from 'react-navigation';

import Login from './src/screens/login_screen';
import Map from './src/screens/map_view_screen';
import Event from './src/screens/event_details_screen';
import SignUp from './src/screens/sign_up_screen';




const Application = StackNavigator({

    Home: {screen: Login,
        navigationOptions: {
            title: 'Login'
        }
    },

    SignUp: {screen: SignUp,
        navigationOptions: {
            title: 'Sign up'
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
