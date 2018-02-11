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
  Image
} from 'react-native';

import globalStyle from '../styles/Global_Container_Style'

import {StackNavigator} from 'react-navigation';

const dimensions = Dimensions.get('window');
//const imageHeight = Math.round(dimensions.width * 16 / 9);
const getWidth = dimensions.width;

export default class Login_Screen extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         username: '',
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

   componentWillMount() {}

   render() {

     return (

         <ScrollView >
            <View style={globalStyle.globalContainerStyle}>

              <View>
                 <Image
                   style={{ width: 200, height: 42, marginTop: 30, marginBottom: 40, alignSelf: 'center' }}
                   source={require('../assets/logo.png')}
                 />
                 <View style={globalStyle.textInputContainer}>
                    <TextInput style={{
                      height: 50,
                      marginLeft: -20
                       }} placeholder='Username' onChangeText={(username) => this.setState({username})}/>

                    <TextInput style={{
                      height: 50,
                      marginLeft: -20
                       }} secureTextEntry={true} placeholder='Password' onChangeText={(password) => this.setState({password})}/>
                 </View>

                 <TouchableOpacity style={styles.btn} onPress={this.toMapView}>
                    <Text style={{color: '#fff'}}>Log in</Text>
                 </TouchableOpacity>

                 <TouchableOpacity style={styles.clearBtn} onPress={this.login}>
                    <Text>forgot password?</Text>
                 </TouchableOpacity>

              </View>

            

              <View>
                <TouchableOpacity style={styles.signupBtn} onPress={this.toSignUp}>
                  <Text style={{color: '#fff'}}>Create Account</Text>
                </TouchableOpacity>
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
      fetch('http://127.0.0.1:3000/v1/users.json', {
         method: 'POST',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({username: this.state.username, password: this.state.password})
      })

      //handle response
         .then((response) => response.json()).then((res) => {
         //alert('hello');
         console.log('response happened1');
         console.log(res);

         //if user and pass exists, then log them in
         if (res.success === true) {
            console.log('user exists in DB');
            //AysncStorage.setItem('user',res.user);   may need this later
            this.props.navigation.navigate('Profile') //else, tell the user they dont exist in the database; navigate user to profile page
         } else {
            console.log('user was not in the database' + res.message);
         }
      }).catch((err) => {
         console.log(err);
      }).done();

      //

   }

   componentWillMount() {}

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
