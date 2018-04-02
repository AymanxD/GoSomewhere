import React, {Component} from 'react';

import {Text, View, Slider, AsyncStorage,} from 'react-native';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
import { Button } from 'react-native-material-ui';

import Modal from "react-native-modal";

export default class FilterModel extends Component {

    constructor(props){
        super(props);

        this.state = {
            distance: 25,
            tempDistance: 25,
            time: "all",
            tempTime: "all"
        }
    }

    acceptChange(){
        this.setState({
            distance: this.state.tempDistance,
            time: this.state.tempTime
        }, () => {
            this.updateTimeFilter();
            this.props.onPress();
        });
    }

    rejectChange() {
        this.setState({
            tempDistance: this.state.distance,
            tempTime: this.state.time
        });

        this.props.onPress();
    }

    async updateTimeFilter(){
        let tempArr;

        if(this.state.tempTime === "all"){
            let events = await AsyncStorage.getItem('originalEvents');
            events = JSON.parse(events);

            AsyncStorage.removeItem('events');

            tempArr = events;

        } else {
            let today = new Date();
            let dateToday = today.getDate();
            let monthToday = today.getMonth();
            let eventDate, eventDay, eventMonth;

            tempArr = [];

            let events = await AsyncStorage.getItem('originalEvents');

            events = JSON.parse(events);

            let daysBetweenDates;

            for (let i = 0; i < events.length; i++) {

                eventDate = new Date(events[i].start_at);
                eventDay = eventDate.getDate();
                eventMonth = eventDate.getMonth();

                daysBetweenDates = this.timeComparator(dateToday, monthToday, eventDay, eventMonth);

                if ((daysBetweenDates <= this.state.tempTime) && !(daysBetweenDates < 0)) {

                    tempArr.push(events[i]);
                }
            }

        }

        AsyncStorage.setItem('events', JSON.stringify(tempArr));

        this.props.changeEvents();

        this.updateDistanceFilter();
    }

    timeComparator(dateToday, monthToday, eventDay, eventMonth){
        return  (eventMonth * 30 + eventDay) - (monthToday * 30 + dateToday);
    }

    async updateDistanceFilter(){

        let events = await AsyncStorage.getItem('events');

        if(events == null){
            events = await AsyncStorage.getItem('originalEvents')
        }
        let lat = await AsyncStorage.getItem('lat');
        let lon = await AsyncStorage.getItem('lon');

        events = JSON.parse(events);

        let tempArr = [];

        for (let i = 0; i < events.length; i++) {
            let overallDistance = this.distanceComparator(events[i].latitude, events[i].longitude, lat, lon);
            if (overallDistance <= this.state.tempDistance) {
                tempArr.push(events[i]);
            }
        }

        AsyncStorage.setItem('events', JSON.stringify(tempArr));

        this.props.changeEvents();
    }

    distanceComparator(lat1, lon1, lat2, lon2){

        //cite : https://www.geodatasource.com/developers/javascript

        let radlat1 = Math.PI * lat1/180;
        let radlat2 = Math.PI * lat2/180;
        let theta = lon1-lon2;
        let radtheta = Math.PI * theta/180;
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        dist = dist * 1.609344;

        return dist;
    }

    render() {

        return (
            <View>
                <Modal
                    isVisible={this.props.filterModalVisible}
                    backdropColor={"black"}
                    style={{}}
                    onBackdropPress={() => this.rejectChange.bind(this)}
                    >
                    <View style={{ backgroundColor: "white", padding: 16, alignSelf: "center"}}>
                        <Text style={{margin: 16, fontWeight: "bold"}}>
                            Time range:
                        </Text>
                        <View style={{flex: 0.25, flexDirection: "row", justifyContent: "center", alignItems: "center"}}>

                        <RadioGroup
                            onSelect = {(index, value) => this.setState({
                                tempTime: value
                            })}

                            style={{flexDirection: "row", marginTop: 8, marginBottom: 8}}
                        >
                            <RadioButton value={14} >
                                <Text>Two Weeks</Text>
                            </RadioButton>

                            <RadioButton value={30}>
                                <Text>One Month</Text>
                            </RadioButton>

                            <RadioButton value={"all"}>
                                <Text>All</Text>
                            </RadioButton>
                        </RadioGroup>

                        </View>
                        <Text style={{margin: 16, fontWeight: "bold"}}>
                            Distance:
                        </Text>
                        <View style={{flexDirection: "row", justifyContent: "center", margin: 16}}>
                            <Slider
                                value = {this.state.tempDistance}
                                step = {1}
                                minimumValue={1}
                                maximumValue={50}
                                onValueChange={(val) => {
                                    this.setState({
                                        tempDistance: val
                                    });
                                }}
                                style={{flex: 1}}
                                minimumTrackTintColor='#1073ff'
                                maximumTrackTintColor='#b7b7b7'
                            />
                            <Text>
                                {this.state.tempDistance} km
                            </Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent:'space-around', alignItems: "flex-end"}}>
                            <Button primary text="Accept" raised onPress={this.acceptChange.bind(this)}/>
                            <Button primary text="Reset Filter" onPress={this.props.reset}/>
                            <Button primary text="Back" onPress={this.rejectChange.bind(this)}/>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}