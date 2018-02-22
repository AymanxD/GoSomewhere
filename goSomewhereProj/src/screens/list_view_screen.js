import React from 'react';
import { StyleSheet, Text, View,Navigator,TextInput, KeyboardAvoidingView,TouchableOpacity,
 AsyncStorage,ScrollView,List, ListView, StatusBar, TouchableHighlight
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome, { Icons } from 'react-native-fontawesome';

// import MenuBar from '../components/map_listview_comps/Menubar';

 //import Icon from 'react-native-vector-icons/FontAwesome';

import {
  StackNavigator,
} from 'react-navigation';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class List_View_Screen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            latitude: null,
            longitude: null,
            error: null,
            dataSource: ds.cloneWithRows([
              {
              "id" : 1,
              "title" : 'Hackathon',
              "description" : null,
              "start_at" : '2018-02-10T14:10:52.773Z',
              "end_at" : '2018-02-11T20:12:37.044Z',
              "attendees" : null,
              "created_at" : '2018-02-10T18:12:44.050Z',
              "updated_at" : '2018-02-10T18:12:44.050Z',
              "latitude" : 44.6374247,
              "longitude" : -63.5872094,
              "address" : 'Goldberg Computer Science Building, 6050 University Ave, Halifax, NS B3H 1W5'
              },
              {
              "id" : 2,
              "title" : 'Party after winning Hackathon',
              "description" : 'Please bring your own drink',
              "start_at" : '2018-02-11T22:19:45.595Z',
              "end_at" : null,
              "attendees" : null,
              "created_at" : '2018-02-10T18:21:52.274Z',
              "updated_at" : '2018-02-10T18:21:52.274Z',
              "latitude" : 44.6386448,
              "longitude" : -63.5919118,
              "address" : 'H-1422B, 6230 Coburg Road, Halifax, NS, B3h4R2'
              }
          ]),
        }
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

  componentWillMount() {
  //this.fetchData();

  //location services
  navigator.geolocation.clearWatch(this.watchId);
}

  _renderRow(rowData) {
    return(
      <View>
        <View style={styles.row}>
         <Text style={styles.title}>{rowData.title}</Text>
         <Text style={styles.description}>{rowData.description}</Text>
         <View style={styles.interest}>
          <Text style={styles.description}>Are you interested?</Text>
          <TouchableHighlight onPress={this._interested}>
            <Text>
              <Icon name='star-o' size={25} color="#64b5f6" />
            </Text>
          </TouchableHighlight>
         </View>
        </View>
      </View>
    );
  }

// {this.state.interested}
  // _interested(){
  //   if(this.state.interested === 'star-o'){
  //     this.setState({
  //       interested: 'star-o'
  //     });
  //   }
  //   else {
  //     this.setState({
  //       interested: 'star'
  //     });
  //   }
  // }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
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
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  description:{
    fontSize: 14,
    fontFamily: 'Roboto',
  },
  interest:{
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    width: 300,
  }
});
