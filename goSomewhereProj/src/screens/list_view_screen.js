import React from 'react';
import { StyleSheet, Text, View,Navigator,TextInput, KeyboardAvoidingView,TouchableOpacity,
 AsyncStorage,ScrollView,List, ListView, StatusBar, TouchableHighlight, Alert
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import {
  StackNavigator,
} from 'react-navigation';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class List_View_Screen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            latitude: null,
            events: [],
            longitude: null,
            error: null,
          interested: 'star-o'
        }
    }

    componentWillMount(){
       Alert.alert("events");

      fetch('https://gosomewhere-backend.herokuapp.com/events', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      })
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({events: responseJson});
        });

        navigator.geolocation.clearWatch(this.watchId);
    }

  componentDidMount() {
      //location services
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
    );
  }


  _renderRow(rowData) {
    return(
      <View>
        <View style={styles.row}>
         <Text style={styles.title}>{rowData.title}</Text>
         <View style={styles.interest}>
          <Text style={styles.description}>Are you interested?</Text>
          <TouchableHighlight onPress={this._interested.bind(this)}>
            <Text>
              <Icon name={this.state.interested} size={25} color="#64b5f6" />
            </Text>
          </TouchableHighlight>
         </View>
        </View>
      </View>
    );
  }

  _interested(){
    if(this.state.interested === 'star'){
      this.setState({
        interested: 'star-o'
      });
    }
    else {
      this.setState({
        interested: 'star'
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <ListView
          dataSource={ds.cloneWithRows(this.state.events)}
          renderRow={this._renderRow.bind(this)}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bdbdbd',
    paddingTop: 8,
    paddingBottom: 8,
  },
  row:{
    borderWidth: 0,
    backgroundColor: '#fafafa',
    alignItems: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 5,
    paddingLeft: 16,
    paddingTop: 16,
    paddingBottom: 20,
    height: 88,
  },
  title:{
    fontSize: 16,
    fontWeight: 'bold'
  },
  description:{
    fontSize: 14
  },
  interest:{
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    width: 300,
  }
});
