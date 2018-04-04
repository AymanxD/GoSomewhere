import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity, Text, ScrollView, StatusBar, DeviceEventEmitter, AsyncStorage } from 'react-native';
import { Button } from 'react-native-material-ui';
import { FileSystem } from 'expo';

export default class ConfirmProfilePic extends React.Component {
  state = {
    user: {},
    photo: null,
  };
  _mounted = false;
  
  async componentDidMount() {
    this._mounted = true;
    await AsyncStorage.getItem('user', (err, result) => {
      const user = JSON.parse(result);
      this.setState({user: user});
      FileSystem.readDirectoryAsync(FileSystem.documentDirectory + 'photos' + user.id).then(photos => {
        if (this._mounted) {
          this.setState({ photo: photos[photos.length - 1] });
        }
      });
    });
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.pictureWrapper} key={this.state.photo}>
          <Image
            key={this.state.photo}
            style={styles.picture}
            source={{
              uri: `${FileSystem.documentDirectory}photos${this.state.user.id}/${this.state.photo}`,
            }}
          />
        </View>

        <View style={styles.buttonWrapper}>
          <Button text="Back" style={{ container: { flex: 0.5 }, text: { color: 'white' }}} onPress={this.props.onPress} />
          <Button raised primary text="Choose" style={{ container: {flex: 0.5}}} onPress={() => {
            DeviceEventEmitter.emit('profilePicChanged', this.state.photo);
            this.props.navigation.goBack();
          }} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  picture: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
    resizeMode: 'contain',
  },
  pictureWrapper: {
    flex: 0.8,
    margin: 15
  },
  buttonWrapper: {
    flex: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15
  }
});