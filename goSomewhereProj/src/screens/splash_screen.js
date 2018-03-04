import React from 'react';
import { View, Text, Alert, AsyncStorage } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';

export default class Login_Screen extends React.Component {

  constructor(props) {
    super(props);
  }
  
  //check to see if user has logged in already
  componentDidMount() {
    const user = this.getCurrentUser();
  }

  async getCurrentUser() {
    try {
      await AsyncStorage.getItem('user', (err, result) => {
        const user = JSON.parse(result);
        if (user && user.auth_token) {
          this._navigateTo('Map');
        } else {
          this._navigateTo('Login');
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
      <View>
      <Text>Splash Screen (style this screen with some loader)</Text>
      </View>
    );
  }

}