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

import { Button } from 'react-native-material-ui';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { TextField } from 'react-native-material-textfield';

export default class Login_Screen extends React.Component {
  static navigationOptions = {
    header: null
  }
  
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      list: [], //starting with empty array so its allocated before the fetch method works
    }
  }

  //check to see if user has logged in already
  componentDidMount() {
    this._loadInitialState().done();
  }

  //get info from async storage
  _loadInitialState = async () => {
    var value = await AsyncStorage.getItem('user');

    if (value != null) { //if the user is already logged in
      this.props.navigation.navigate('Profile'); //**profile page that we will create later
    }
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

          <Button primary raised text="Log in" onPress={this.login} />

          <View style={styles.forgotBtnContainer}>
            <Button text="Forgot password?" containerStyle={{backgroundColor: 'red', marginTop: 20}} upperCase={false} onPress={this.toLogin} />
          </View>

          <View style={styles.signupBtnContainer}>
            <Text>Dont have an account?</Text>
            <Button text="Sign up" upperCase={false} primary onPress={this.toSignUp} />
          </View>
          
          
        </View>
      </ScrollView>
    );
  }

  toMapView = () => {
    this.props.navigation.navigate('Map');
  }

  toListView = () => {
    this.props.navigation.navigate('ListView');
  }

  toEventDetails = () => {
    this.props.navigation.navigate('Event');
  }

  toSignUp = () => {
    this.props.navigation.navigate('SignUp');
  }

  login = () => {

    //send to server
    fetch('https://gosomewhere-backend.herokuapp.com/signin', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })

    //handle response
    .then((response) => response.json())
    .then(async (res) => {
      // if email and pass combination is valid, then log the user in
      if(res.auth_token) {
        try {
          await AsyncStorage.setItem('user', JSON.stringify(res), () => {
            const actionToDispatch = NavigationActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: 'Map' })]
            })
            this.props.navigation.dispatch(actionToDispatch)        
          });
        } catch (error) {
          Alert.alert("catching exception");
        }
      } else if (res.errors) {
        Alert.alert(res.errors);
      }
            
    }).catch((err) => {
      Alert.alert("catching exception12")
    }).done();

    //

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
