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

export default class Login_Screen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
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
          axios.defaults.headers.common['X-Go-Auth'] = user.auth_token;
          this.checkAuthTokenValidity(user.auth_token);
        }
      });
    } catch (error) {
      Alert.alert("caught exception", JSON.stringify(error));
    }
  }

  // Check if the saved auth_token is still valid and stored in backend
  checkAuthTokenValidity(authToken) {
    axios.get('/users/current')
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
    this.props.navigation.dispatch(actionToDispatch);
  }

  toMapView = () => {
    this.props.navigation.navigate('Map');
  }

  toSignUp = () => {
    this.props.navigation.navigate('SignUp');
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

  signin = () => {
    //send to server
    axios.post('/signin', {
      email: this.state.email,
      password: this.state.password
    })
    .then(async (response) => {
      // if email and pass combination is valid, then log the user in
      if(response.data.auth_token) {
        this.setUserLocally(response.data);
      }
    })
    .catch((error) => {
      if(error.response && error.response.data) {
        Alert.alert(JSON.stringify(error.response.data.errors));
      } else {
        Alert.alert("catching exception 2", JSON.stringify(error));
      }
    });
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
            label='Email'
            value={this.state.email}
            onChangeText={(email) => this.setState({email})}
          />

          <TextField
            label='Password'
            secureTextEntry={true}
            containerStyle={{ marginBottom: 30 }}
            onChangeText={(password) => this.setState({password})}
          />

          <Button primary raised text="Sign in" onPress={this.signin} style={{container: { marginBottom: 20 }}}/>
          <Button primary raised text="Sign in with Facebook" onPress={this.fbLogIn.bind(this)} />

          <View style={styles.forgotBtnContainer}>
            <Button text="Forgot password?" containerStyle={{ marginTop: 20 }} upperCase={false} onPress={this.toSignin} />
          </View>

          <View style={styles.signupBtnContainer}>
            <Text>Dont have an account?</Text>
            <Button text="Sign up" upperCase={false} primary onPress={this.toSignUp} />
          </View>
        </View>
      </ScrollView>
    );
  }

  async fbLogIn() {

    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('234734697091929', {
      permissions: ['public_profile', 'email'],
    });
    
    

    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}&fields=email,name`);
      axios.post('/users/oauth', {
        user: await response.json()
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
  signupBtnContainer: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
