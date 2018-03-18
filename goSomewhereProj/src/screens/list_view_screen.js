import React from 'react';
import { StyleSheet, Text, View, List, ListView, StatusBar, Image, Alert
} from 'react-native';

import MenuBar from "../components/map_listview_comps/Menubar";
import { ListItem } from 'react-native-material-ui';
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
            buttonLeft: {
                key: "Switch City",
                icon: "location-city",
                label: "Switch City",
                onPress: () => this.setState({})
            },
            buttonCenter: {
                key: "Map",
                icon: "map",
                label: "Map",
                onPress: () => this.setState({})

            },
            buttonRight: {
                key: "filter",
                icon: "filter-list",
                label: "Filter",
                onPress: () => this.setState({})
            },

        }
    }

    componentWillMount(){
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
      <ListItem
        divider
        leftElement={<Image source={{uri: rowData.image}} style={{ width: 50, height: 50, borderRadius: 50}} /> }
        centerElement={{
          primaryText: rowData.title,
          secondaryText: rowData.description,
        }}
        onPress={() => {}}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1}}>
        <StatusBar hidden={true} />
        <ListView
          dataSource={ds.cloneWithRows(this.state.events)}
          renderRow={this._renderRow.bind(this)}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={{height: 2}} />}
        />
        <MenuBar buttonLeft={this.state.buttonLeft}
                 buttonCenter={this.state.buttonCenter}
                 buttonRight={this.state.buttonRight}/>
      </View>
    );
  }