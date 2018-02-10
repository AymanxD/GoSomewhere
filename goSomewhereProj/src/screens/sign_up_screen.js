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
 } from 'react-native';

 import globalContainerStyle  from '../styles/Global_Container_Style'



import {
  StackNavigator,
} from 'react-navigation';

const dimensions = Dimensions.get('window');
//const imageHeight = Math.round(dimensions.width * 16 / 9);
const getWidth = dimensions.width;

export default class Sign_Up_Screen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            list: [],  //starting with empty array so its allocated before the fetch method works
        }
    }


    //check to see if user has logged in already
    componentDidMount(){
        this._loadInitialState().done();
    }

    //get info from async storage
    _loadInitialState = async () => {
        var value = await  AsyncStorage.getItem('user');

        if(value != null){   //if the user is already logged in
            this.props.navigation.navigate('Profile');      //**profile page that we will create later
        }
    }

    componentWillMount(){

    }

    render() {

      return (
        //<View>

          <KeyboardAvoidingView behavior = 'padding' style = {globalContainerStyle.globalContainerStyle}>
              <View style = {globalContainerStyle.globalContainerStyle}>
                  <Text style={styles.header}> --- Create Account --- </Text>

                  <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}}>
                  <TextInput

                      style={styles.textInput} placeholder='Username'
                      onChangeText={(username) => this.setState({username})}
                  />
                  </View>


                  <TextInput
                      secureTextEntry={true}
                      style={styles.textInput} placeholder='Password'
                      onChangeText={(password) => this.setState({password})}
                  />

                  <TouchableOpacity
                      style={styles.btn}
                      onPress = {this.login}>
                      <Text>Log in</Text>
                  </TouchableOpacity>


              </View>




          </KeyboardAvoidingView>

        //</View>
      );
    }

    toMapView = () => {
        this.props.navigation.navigate('Map');
    }

    toEventDetails = () => {
        this.props.navigation.navigate('Event');
    }


    login = () => {


        //send to server
        fetch('http://127.0.0.1:3000/v1/users.json', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,

            })
        })

        //handle response
        .then((response) => response.json())
        .then((res) => {
            //alert('hello');
            console.log('response happened1');
            console.log(res);

              //if user and pass exists, then log them in
              if(res.success === true){
                  console.log('user exists in DB');
                  //AysncStorage.setItem('user',res.user);   may need this later
                  this.props.navigation.navigate('Profile'); //navigate user to profile page
              }
              //else, tell the user they dont exist in the database
              else{
                  console.log('user was not in the database' + res.message);
              }
        })
        .catch((err) => {
            console.log(err);
        })
        .done();


        //

    }

    componentWillMount(){

}










}


const styles = StyleSheet.create({

    wrapper: {
      flex: 1,
      backgroundColor: 'green',
    },

  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 40,
    paddingRight: 40,
  },

  header: {
    fontSize: 24,
    marginBottom: 60,
    color: '#fff',
    justifyContent: 'center',
    paddingLeft: 40,
    paddingRight: 40,
  },

  textInput: {
    alignSelf: 'stretch',
    paddingLeft: 16,
    marginBottom: 20,
    backgroundColor: '#fff',


  },

  btn: {
      alignSelf: 'center',
      padding: 20,
      marginBottom: 20,
      backgroundColor: '#01c853',
      alignItems: 'center',
      justifyContent: 'center',
      width: getWidth/2.5,

  },
});
