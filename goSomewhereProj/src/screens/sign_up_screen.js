import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  KeyboardAvoidingView,
  TouchableOpacity,
  Dimensions,
  AsyncStorage,
  ScrollView,
  Image,
  Alert
} from 'react-native';
import axios from 'axios';

import { Button } from 'react-native-material-ui';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { TextField } from 'react-native-material-textfield';

export default class Signup_Screen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: ''
    }
  }

  //check to see if user has logged in already
  componentDidMount() {
    const user = this.getCurrentUser();
  }
  
  async getCurrentUser() {
    try {
      // for logout : await AsyncStorage.removeItem('user'); 
      await AsyncStorage.getItem('user', (err, result) => {
        const user = JSON.parse(result);
        if (user && user.auth_token) {
          this.checkAuthTokenValidity(user.auth_token);
        }
      });
    } catch (error) {
      Alert.alert("caught exception", JSON.stringify(error));
    }
  }

  // Check if the saved auth_token is still valid and stored in backend
  checkAuthTokenValidity(authToken) {
    fetch('https://gosomewhere-backend.herokuapp.com/users/current', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Go-Auth': authToken
      }
    })
    .then((response) => response.json())
    .then(async (res) => {
      if (res.errors === 'Unauthorized') {
        await AsyncStorage.removeItem('user');
      } else if (res.email) {
        // User already logged in
        this._navigateTo('Map');
      }
    }).done();
  }
  
  _navigateTo(routeName) {
    const actionToDispatch = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })]
    })
    this.props.navigation.dispatch(actionToDispatch)
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{flex:1}}>
        <View style={styles.container}>
          <Image
            style={styles.logo}
            source={require('../assets/logo.png')}
          />
          
          <TextField
            label='Name'
            value={this.state.name}
            onChangeText={(name) => this.setState({ name })}
          />
            
          <TextField
            label='Email'
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
          />

          <TextField
            label='Password'
            secureTextEntry={true}
            value={this.state.password}
            containerStyle={{ marginBottom: 30 }}
            onChangeText={(password) => this.setState({ password })}
          />

          <Button primary raised text="Sign up" onPress={this.signup} />

          <View style={styles.signinBtnContainer}>
            <Text>Already have an account?</Text>
            <Button text="Sign in" upperCase={false} primary onPress={this.toSignIn} />
          </View>
          
        </View>
      </ScrollView>
    );
  }

  toMapView = () => {
    this.props.navigation.navigate('Map');
  }

  toSignIn = () => {
    this.props.navigation.navigate('Signin');
  }

  async setUserLocally(user) {
    axios.defaults.headers.common['X-Go-Auth'] = user.auth_token;
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user), () => {
        const actionToDispatch = NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Map' })]
        })
        this.props.navigation.dispatch(actionToDispatch)
      });
    } catch (error) {
      Alert.alert("catching exception 1", JSON.stringify(error));
    }
  }

  signup = () => {
    //send to server
    axios.post('/users', {
      user: {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      }
    })
    .then(async (response) => {
      // if email and pass combination is valid, then log the user in
      if(response.data.auth_token) {
        this.setUserLocally(response.data);
      }
    }).catch((error) => {
      if (error.response && error.response.data.errors) {
        Alert.alert("catching exception", JSON.stringify(error.response.data.errors));
      }
    }).done();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 40,
    paddingRight: 40,
  },
  logo: {
    width: 200,
    height: 42,
    marginTop: 30,
    marginBottom: 40,
    alignSelf: 'center'
  },
  forgotBtnContainer: {
    marginTop: 30
  },
  signinBtnContainer: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
