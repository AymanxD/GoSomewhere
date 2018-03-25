import React from 'react';
import { StyleSheet, Text, View, Navigator, Alert } from 'react-native';
import { ThemeProvider, COLOR, ListItem } from 'react-native-material-ui';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { Constants } from 'expo';
import Sidebar from 'react-native-sidebar';
import SideMenu from 'react-native-side-menu';
import axios from 'axios';

import Signin from './src/screens/login_screen';
import Splash from './src/screens/splash_screen';
import Map from './src/screens/map_view_screen';
import Event from './src/screens/event_details_screen';
import SignUp from './src/screens/sign_up_screen';
import ListView from './src/screens/list_view_screen';
import Comments from './src/screens/comment_screen';

const uiTheme = {
  toolbar: {
    container: {
      height: 50 + Constants.statusBarHeight,
      paddingTop: Constants.statusBarHeight
    },
  },
};

const navigateAction = (routeName) => {
  const nav = NavigationActions.navigate({
    routeName: routeName,
  });
  return nav;
};

const Application = StackNavigator({
  Splash: {
    screen: Splash
  },
  Signin: {
    screen: Signin
  },
  SignUp: {
    screen: SignUp
  },
  Map: {
    screen: Map
  },
  ListView: {
    screen: ListView
  },
  Event: {
    screen: Event
  },
  Comments: {
    screen: Comments,
  },
}, {
  headerMode: 'none'
});

export default class App extends React.Component {
  navigator: Application;

  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false
    }
    this.toggleMenu = this.toggleMenu.bind(this);
    axios.defaults.baseURL = 'https://gosomewhere-backend.herokuapp.com';
  }

  toggleMenu() {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen
    })
  }
  
  renderLeftSidebar = () => (
    <View style={{ flex: 1 }}>
      <View style={{ height: Constants.statusBarHeight, backgroundColor: COLOR.blue500}}></View>
      <ListItem
        divider
        centerElement={{
          primaryText: 'Account Settings',
        }}
        onPress={ () => Alert.alert("Clicked Account Settings") }
      />
      <ListItem
        divider
        centerElement={{
          primaryText: 'Random Link',
        }}
        onPress={ () => Alert.alert("Clicked Random Link") }
      />
    </View>
  )

  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <SideMenu
          isOpen={this.state.isMenuOpen}
          onChange={ (isOpen) => this.setState({ isMenuOpen: isOpen }) }
          menu={this.renderLeftSidebar()}>
          <Application
            screenProps={{
              toggleMenu: this.toggleMenu
            }}
            //some people have renderScene function
          />
        </SideMenu>
      </ThemeProvider>
    );
  }
}
