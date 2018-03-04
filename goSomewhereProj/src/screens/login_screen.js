import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Dimensions,
  AsyncStorage,
  ScrollView,
  Image,
  Alert
} from 'react-native';

import { Button } from 'react-native-material-ui';
import globalStyle from '../styles/Global_Container_Style';
import {StackNavigator} from 'react-navigation';

//importing components
import ButtonContainerComp from '../components/login_screen_comps/ButtonContainerComp';
import LogoContainer from '../components/login_screen_comps/LogoContainer';
import LoginSignupContainer from '../components/login_screen_comps/LoginSignupContainer';
import TextFieldContainer from '../components/login_screen_comps/TextFieldContainer';


const dimensions = Dimensions.get('window');
//const imageHeight = Math.round(dimensions.width * 16 / 9);
const getWidth = dimensions.width;

export default class Login_Screen extends React.Component {

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
      <ScrollView >
        <LoginSignupContainer>

          <View>
            <LogoContainer>
              <Image
              style={{ width: 200, height: 42, marginTop: 30, marginBottom: 40, alignSelf: 'center' }}
              source={require('../assets/logo.png')}
              />
            </LogoContainer>
            <TextFieldContainer>
              <TextInput style={{
                height: 50,
                marginLeft: 0
              }} placeholder='email' onChangeText={(email) => this.setState({email})}/>

              <TextInput style={{
                height: 50,
                marginLeft: 0
              }} secureTextEntry={true} placeholder='Password' onChangeText={(password) => this.setState({password})}/>
            </TextFieldContainer>

            <ButtonContainerComp>
              <Button primary raised text="Log in" onPress={this.login} />
              <Button text="List View Shortcut" onPress={this.toListView} />
              <Button text="Forgot password?" onPress={this.toLogin} />
            </ButtonContainerComp>
          </View>
                       
          <View>
            <Button primary raised text="Create Account" onPress={this.toSignUp} />
          </View>

          <ButtonContainerComp>
            <TouchableOpacity style={styles.signupBtn} onPress={this.toSignUp}>
              <Text style={{color: '#fff'}}>Create Account</Text>
            </TouchableOpacity>
          </ButtonContainerComp>

        </LoginSignupContainer>
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
      try {
        await AsyncStorage.setItem('user', JSON.stringify(res));
      } catch (error) {
        Alert.alert("catching exception")
        // Error saving data
      }      
    }).catch((err) => {
      console.log(err);
    }).done();

    //

  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 40,
    paddingRight: 40,
    width: getWidth
  },

  header: {
    fontSize: 24,
    marginTop: 20,
    marginBottom: 60,
    justifyContent: 'center',
    alignSelf: 'center',
    paddingLeft: 40,
    paddingRight: 40
  },

  /*
  textInput: {
  alignSelf: 'stretch',
  paddingLeft: 16,
  marginBottom: 20,
  backgroundColor: '#fff',
  height: 50,

  },
  */
  btn: {
    alignSelf: 'center',
    padding: 20,
    marginBottom: 20,
    backgroundColor: '#e67e22',
    alignItems: 'center',
    justifyContent: 'center',
    width: getWidth / 1.2
  },
  clearBtn: {
    alignSelf: 'center',
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: getWidth / 1.2
  },
  signupBtn: {
    alignSelf: 'center',
    padding: 20,
    marginBottom: 80,
    backgroundColor: '#2BB2D5',
    alignItems: 'center',
    justifyContent: 'center',
    width: getWidth / 1.2
  },
  shortcutBtn: {
    alignSelf: 'center',
    padding: 20,
    marginBottom: 20,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    width: getWidth / 1.2
  }
});
