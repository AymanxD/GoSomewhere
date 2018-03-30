import React from 'react';
import { StyleSheet, Text, View, ListView, StatusBar, Image, Alert
} from 'react-native';

import MenuBar from "../components/map_listview_comps/Menubar";
import FilterModel from "../components/map_listview_comps/FilterModel";

import axios from "axios/index";
import { Toolbar } from 'react-native-material-ui';
import { ListItem } from 'react-native-material-ui';
import { EventRegister } from 'react-native-event-listeners';
import SideBarContainer from '../components/shared_comps/SideBarContainer';
import Event from "./event_details_screen";


export default class List_View_Screen extends React.Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            latitude: null,
            longitude: null,
            events: [],
            error: null,
            distanceRange: 25,
            timeRange: 30,
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
              this.setState({
                  events: response.data,
              });
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

    filterChange(newDistance, newTime){
        this.setState({
            distanceRange: newDistance,
            timeRange: newTime
        }, () => {
            this.updateDistanceFilter();
            this.updateTimeFilter();
        });
    }

    updateDistanceFilter(){

        let tempArr = [];

        for(let i = 0; i < this.state.events.length; i++){
            let overallDistance = this.distanceComparator(this.state.events[i].latitude, this.state.events[i].longitude);

            if(overallDistance <= this.state.distanceRange){
                tempArr.push(this.state.events[i]);
                console.log(this.state.events[i]);
            }
        }

        this.setState({
            events: tempArr
        });
    }

    distanceComparator(lat, lon){
        return Math.sqrt(Math.pow(lat - this.state.latitude, 2) + Math.pow(lon - this.state.longitude, 2));
    }


    updateTimeFilter(){
        let today = new Date();
        let dateToday = today.getDate();
        let monthToday = today.getMonth();
        let eventDate, eventDay, eventMonth;
        let tempArr = [];

        let daysBetweenDates;

        for(let i = 0; i < this.state.events.length; i++){

            eventDate = new Date(this.state.events[i].start_at);
            eventDay = eventDate.getDate();
            eventMonth = eventDate.getMonth();

            daysBetweenDates = this.timeComparator(dateToday, monthToday, eventDay, eventMonth);

            if((daysBetweenDates <= this.state.timeRange)){
                tempArr.push(this.state.events[i]);
            }
        }

        this.setState({
            events: tempArr
        })
    }

    timeComparator(dateToday, monthToday, eventDay, eventMonth){
        return (monthToday * 30 + dateToday) - (eventMonth * 30 + eventDay);
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
                onPress={() => {this.props.navigation.navigate('Event', {event: rowData})}}
            />
        </View>
    )
  }

  render() {
    return (
        <SideBarContainer navigation={this.props.navigation}>
            <View style={styles.container}>
                <Toolbar
                    leftElement="menu"
                    onLeftElementPress={() => EventRegister.emit('menuToggle') }
                    centerElement="Events List"
                    searchable={{
                        autoFocus: true,
                        placeholder: 'Search',
                    }}
                />
                <StatusBar hidden={true} />
                <ListView
                    dataSource={this.ds.cloneWithRows(this.state.events)}
                    enableEmptySections={true}
                    renderRow={this._renderRow.bind(this)}
                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={{height: 2}} />}
                />
                <FilterModel
                    filterModalVisible={this.state.filterModalVisible}
                    distance={this.state.distanceRange}
                    time={this.state.time}
                    onPress={this.state.buttonRight.onPress}
                    onChange={this.filterChange.bind(this)}
                />
                <MenuBar
                    buttonLeft={this.state.buttonLeft}
                    buttonCenter={this.state.buttonCenter}
                    buttonRight={this.state.buttonRight}
                />
            </View>
        </SideBarContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: 'center'
  }
});