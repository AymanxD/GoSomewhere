import React from 'react';
import { StyleSheet, Text, View, List, ListView, StatusBar, Image, Alert
} from 'react-native';

import MenuBar from "../components/map_listview_comps/Menubar";
import FilterModel from "../components/map_listview_comps/FilterModel";
import { Toolbar, ListItem } from 'react-native-material-ui';
import axios from "axios/index";

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class List_View_Screen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            latitude: null,
            events: [],
            longitude: null,
            error: null,
            distance: 50,
            filterModalVisible: false,
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
                onPress: () => this.props.navigation.navigate('Map')

            },
            buttonRight: {
                key: "filter",
                icon: "filter-list",
                label: "Filter",
                onPress: () => {
                    this.setState({filterModalVisible: !this.state.filterModalVisible})
                }
            }

        }
    }

  componentWillMount(){
      axios.get('/events')
          .then(async (response) => {
              this.setState({events: response.data});
          })
          .catch((error) => {
              if(error.response && error.response.data) {
                  Alert.alert(JSON.stringify(error.response.data));
              } else {
                  Alert.alert("catching exception", JSON.stringify(error));
              }
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

    distanceChange(newDistance){
        this.setState({
            distance: newDistance
        });
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
        <Toolbar
          leftElement="menu"
          onLeftElementPress={() => {
              this.props.screenProps.toggleMenu();
          }}
          centerElement="Events List"
          searchable={{
              autoFocus: true,
              placeholder: 'Search',
          }}
        />
        <StatusBar hidden={true} />
        <ListView
          dataSource={ds.cloneWithRows(this.state.events)}
          enableEmptySections={true}
          renderRow={this._renderRow.bind(this)}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={{height: 2}} />}
        />
        <FilterModel
            filterModalVisible={this.state.filterModalVisible}
            distance={this.state.distance}
            onPress={this.state.buttonRight.onPress}
            onChange={this.distanceChange.bind(this)}
        />

        <MenuBar
            buttonLeft={this.state.buttonLeft}
            buttonCenter={this.state.buttonCenter}
            buttonRight={this.state.buttonRight}
        />
      </View>
    );
  }
}