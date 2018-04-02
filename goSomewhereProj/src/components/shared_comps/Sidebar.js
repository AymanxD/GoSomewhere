import React from 'react';
import { View, Alert, AsyncStorage, StyleSheet, Image, TouchableOpacity, DeviceEventEmitter } from 'react-native';
import { COLOR, ListItem, Button, Icon } from 'react-native-material-ui';
import { Constants } from 'expo';
import { NavigationActions } from 'react-navigation';
import { FileSystem } from 'expo';

export default class Sidebar extends React.Component {
  state={
    profileImg: ""
  }
  
  componentDidMount() {
    this._mounted = true;
    FileSystem.readDirectoryAsync(FileSystem.documentDirectory + 'photos').then(photos => {
      if (this._mounted) {
        this.setState({ profileImg: photos[photos.length - 1] });
      }
    });
  }
  
  componentWillMount() {
    DeviceEventEmitter.addListener('profilePicChanged', (pic)=>{
      this.setState({ profileImg: pic })
    });
  }

  componentWillUnmount() {
    this._mounted = false;
  }
  
  render() {
    return(
      <View style={styles.container}>
        <View style={styles.pictureWrapper} >
          {
            this.state.profileImg
            ? (
                <Image
                  key={this.state.profileImg}
                  style={styles.picture}
                  source={{
                    uri: `${FileSystem.documentDirectory}photos/${this.state.profileImg}`,
                  }}
                />
              )
            : (
                <View style={styles.picture}>
                  <Icon
                    name="add-a-photo"
                    color="#444444"
                  />
                </View>
              )
          }
          <Button icon="edit" text="Edit Picture" onPress={() => this.props.navigation.navigate('Camera')}/>
        </View>
        
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
  },
  picture: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  pictureWrapper: {
    flex: 0.3,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
});