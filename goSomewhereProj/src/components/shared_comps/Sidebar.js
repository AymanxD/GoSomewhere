import React from 'react';
import { View, Alert, AsyncStorage, StyleSheet } from 'react-native';
import { COLOR, ListItem } from 'react-native-material-ui';
import { Constants } from 'expo';
import { NavigationActions } from 'react-navigation';

export default class Sidebar extends React.Component {
  render() {
    return(
      <View style={styles.container}>
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
        <ListItem
          divider
          centerElement={{
            primaryText: 'Logout',
          }}
          onPress={async () => {
            await AsyncStorage.removeItem('user');
            this.props.navigation.navigate('Signin');
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  }
});