import React from 'react';
import { StyleSheet, Text, View, Navigator, Alert, AsyncStorage, Platform, StatusBar } from 'react-native';
import { ThemeProvider, COLOR, ListItem } from 'react-native-material-ui';
import { NavigationActions } from 'react-navigation';
import { Font, Constants } from 'expo';
import axios from 'axios';

import StackNavigator from './src/utils/StackNavigator';


const uiTheme = {
  toolbar: {
    container: {

    },
  },
};

export default class App extends React.Component {
  navigator: StackNavigator;

  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false
    }

    axios.defaults.baseURL = 'https://gosomewhere-backend.herokuapp.com';
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('./src/assets/fonts/Roboto-Regular.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    return (
      this.state.fontLoaded ? (
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          <ThemeProvider uiTheme={uiTheme}>
            <StackNavigator />
          </ThemeProvider>
        </View>
      ) : null
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight, // for statusbar
    backgroundColor: COLOR.blue700 // for statusbar
  }
});
