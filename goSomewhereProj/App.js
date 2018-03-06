import React from 'react';
import { StyleSheet, Text, View,Navigator } from 'react-native';
import { ThemeProvider } from 'react-native-material-ui';
import {StackNavigator} from 'react-navigation';

import Login from './src/screens/login_screen';
import Splash from './src/screens/splash_screen';
import Map from './src/screens/map_view_screen';
import Event from './src/screens/event_details_screen';
import SignUp from './src/screens/sign_up_screen';
import ListView from './src/screens/list_view_screen';

const uiTheme = {
  toolbar: {
    container: {
      height: 50,
    },
  },
};

const Application = StackNavigator({
  Splash: {
    screen: Splash
  },

  Login: {
    screen: Login
  },


  SignUp: {
    screen: SignUp,
    navigationOptions: {
        title: 'Sign up'
    }
  },

  Map: {
    screen: Map,
    navigationOptions: {
      title: 'Events List'
    }
  },

  ListView: {
    screen: ListView,
    navigationOptions: {
      title: 'Event List'
    }
  },

  Event: {
    screen: Event,
    navigationOptions: {
      title: 'Android Hackathon'
    }
  }
});

export default class App extends React.Component {
  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <Application
            ref= "appNavigator"
            //some people have renderScene function
        />
      </ThemeProvider>
    );
  }
}
