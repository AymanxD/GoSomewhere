import React from 'react';
import { View, Text, Alert, AsyncStorage, StyleSheet, Image } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { COLOR } from 'react-native-material-ui';
import ListView from "./list_view_screen";
import axios from 'axios';

export default class Splash_Screen extends React.Component {

  constructor(props) {
    super(props);
  }
  
  // check to see if user has logged in already
  componentDidMount() {
    const user = this.getCurrentUser();
  }

  async getCurrentUser() {
    try {
      // await AsyncStorage.removeItem('user'); // for logout
      await AsyncStorage.getItem('user', (err, result) => {
        const user = JSON.parse(result);
        if (user && user.auth_token) {
          axios.defaults.headers.common['X-Go-Auth'] = user.auth_token;
          this._navigateTo('Map');
        } else {
          this._navigateTo('Signin');
        }
      });
    } catch (error) {
      Alert.alert("caught exception", JSON.stringify(error));
    }
  }
  
  // Code referred from https://github.com/react-navigation/react-navigation/issues/156
  _navigateTo(routeName) {
    const actionToDispatch = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })]
    })
    this.props.navigation.dispatch(actionToDispatch)
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../assets/logo_bg.png')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.blue700, // for statusbar
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 320,
    height: 142
  }
});
