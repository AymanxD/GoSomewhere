import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Slider, Vibration, StatusBar } from 'react-native';
import { Constants, Camera, FileSystem, Permissions } from 'expo';
import ConfirmProfilePic from './confirm_profile_pic';
import isIPhoneX from 'react-native-is-iphonex';
import { Button, Icon } from 'react-native-material-ui';

// This component is referred from the doumentation of Expo https://github.com/expo/camerja/blob/master/App.js
export default class CameraScreen extends React.Component {
  state = {
    type: 'front',
    ratio: '16:9',
    showConfirmation: false,
    permissionsGranted: false,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ permissionsGranted: status === 'granted' });
  }

  componentDidMount() {
    FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'photos').catch(e => {
      // console.log(e, 'Directory exists');
    });
  }

  toggleView() {
    this.setState({
      showConfirmation: !this.state.showConfirmation,
    });
  }

  toggleFacing() {
    this.setState({
      type: this.state.type === 'back' ? 'front' : 'back',
    });
  }

  setRatio(ratio) {
    this.setState({
      ratio,
    });
  }

  generateRandom(max = 99999999) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  takePicture = async function() {
    if (this.camera) {
      FileSystem.readDirectoryAsync(FileSystem.documentDirectory + 'photos').then(photos => {
        photos.map((photoUri) => {
          FileSystem.deleteAsync(`${FileSystem.documentDirectory}photos/${photoUri}`).done();
        });
      });
      this.camera.takePictureAsync().then(data => {
        FileSystem.moveAsync({
          from: data.uri,
          to: `${FileSystem.documentDirectory}photos/Photo_${this.generateRandom()}.jpg`,
        }).then(() => {
          Vibration.vibrate();
          this.toggleView();
        });
      });
    }
  };

  renderConfirmation() {
    return <ConfirmProfilePic onPress={this.toggleView.bind(this)} navigation={this.props.navigation} />;
  }

  renderNoPermissions() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
        <Text style={{ color: 'white' }}>
          Camera permissions not granted - cannot open camera preview.
        </Text>
      </View>
    );
  }

  renderCamera() {
    return (
      <Camera
        ref={ref => {
          this.camera = ref;
        }}
        style={{
          flex: 1,
        }}
        type={this.state.type}
        ratio={this.state.ratio}
        >
        <View
          style={{
            flex: 0.9,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingTop: Constants.statusBarHeight / 2,
          }}>
          
        </View>
        <View
          style={{
            flex: 0.1,
            paddingBottom: isIPhoneX ? 20 : 0,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignSelf: 'flex-end',
          }}>
          <View style={{ flex: 0.3, alignSelf: 'center' }}>
            <Button text="" icon="photo-album" onPress={() => this.toggleView()} style={{ text: { color: 'white' }}}/>
          </View>
          <View style={{ flex: 0.4, alignSelf: 'center' }}>
            <Button text="" icon="camera" onPress={() => this.takePicture()} style={{ text: { color: 'white' }}}/>
          </View>
          <View style={{ flex: 0.3, alignSelf: 'center' }}>
            <Button text="" icon={ (this.state.type === 'back') ? 'flip-to-front' : 'flip-to-back'} onPress={() => this.toggleFacing()} style={{ text: { color: 'white' }}} />
          </View>
        </View>
      </Camera>
    );
  }

  render() {
    const cameraScreenContent = this.state.permissionsGranted
      ? this.renderCamera()
      : this.renderNoPermissions();
    const content = this.state.showConfirmation ? this.renderConfirmation() : cameraScreenContent;
    return <View style={styles.container}>{content}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  }
});