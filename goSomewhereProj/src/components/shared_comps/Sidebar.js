import React from 'react';
import { View, Alert, AsyncStorage, StyleSheet, Image, TouchableOpacity, DeviceEventEmitter } from 'react-native';
import { COLOR, ListItem, Button, Icon } from 'react-native-material-ui';
import { Constants } from 'expo';
import { NavigationActions } from 'react-navigation';
import { FileSystem } from 'expo';

export default class Sidebar extends React.Component {
  state={
    user: {},
    profileImg: ""
  };
  _mounted = false;
  
  async componentDidMount() {
    this._mounted = true;
    
    DeviceEventEmitter.addListener('profilePicChanged', (pic)=>{
      if (this._mounted) {
        this.setState({ profileImg: pic })
      }
    });
    
    this._mounted = true;
    await AsyncStorage.getItem('user', (err, result) => {
      const user = JSON.parse(result);
      this.setState({user: user});
      FileSystem.readDirectoryAsync(FileSystem.documentDirectory + 'photos' + user.id).then(photos => {
        if (this._mounted) {
          this.setState({ profileImg: photos[photos.length - 1] });
        }
      }).catch(e => {
        // console.log(e, 'Directory not found');
        FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'photos' + user.id);
      });
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
                    uri: `${FileSystem.documentDirectory}photos${this.state.user.id}/${this.state.profileImg}`,
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
          <Button raised primary style={{ container: { marginTop: 10 } }} icon="edit" text="Edit Picture" onPress={() => this.props.navigation.navigate('Camera')}/>
        </View>
        
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
    width: 150,
    height: 150,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  pictureWrapper: {
    flex: 0.4,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
});