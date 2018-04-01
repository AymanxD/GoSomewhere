import React, {Component} from 'react';
import {Text, View, Slider, AsyncStorage,} from 'react-native';
import Modal from "react-native-modal";
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';

import { Button } from 'react-native-material-ui';


export default class FilterModel extends Component {

    constructor(props){
        super(props);

        this.state = {
            distance: 25,
            tempDistance: 25,
            time: 30,
            tempTime: 30
        }
    }

    acceptChange(){
        this.setState({
            distance: this.state.tempDistance,
            time: this.state.tempTime
        }, () => {
            this.filterChange();
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

    filterChange(){
        this.updateDistanceFilter();
    }

    async updateDistanceFilter(){

        let events = await AsyncStorage.getItem('originalEvents');
        let lat = await AsyncStorage.getItem('lat');
        let lon = await AsyncStorage.getItem('lon');

        events = JSON.parse(events);
        console.log(events);

        let tempArr = [];

        for(let i = 0; i < events.length; i++){
            let overallDistance = this.distanceComparator(events[i].latitude, events[i].longitude, lat, lon);
            if(overallDistance <= this.state.tempDistance){
                tempArr.push(events[i]);
            }
        }

        AsyncStorage.setItem('events', JSON.stringify(tempArr));

        this.props.changeEvents();
        this.updateTimeFilter();
    }

    distanceComparator(lat, lon, currentLat, currentLon){
        return Math.sqrt(Math.pow(lat - currentLat, 2) + Math.pow(lon - currentLon, 2));
    }


    async updateTimeFilter(){
        let today = new Date();
        let dateToday = today.getDate();
        let monthToday = today.getMonth();
        let eventDate, eventDay, eventMonth;
        let tempArr = [];

        let events = await AsyncStorage.getItem('originalEvents');

        events = JSON.parse(events);
        console.log(events);

        let daysBetweenDates;

        for(let i = 0; i < events.length; i++){

            eventDate = new Date(events[i].start_at);
            eventDay = eventDate.getDate();
            eventMonth = eventDate.getMonth();

            daysBetweenDates = this.timeComparator(dateToday, monthToday, eventDay, eventMonth);

            if((daysBetweenDates <= this.state.tempTime) && !(daysBetweenDates < 0)){
                tempArr.push(events[i]);
            }
        }


        AsyncStorage.setItem('events', JSON.stringify(tempArr));

        this.props.changeEvents();
    }

     timeComparator(dateToday, monthToday, eventDay, eventMonth){
        return (monthToday * 30 + dateToday) - (eventMonth * 30 + eventDay);
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
                            <RadioButton value={0} >
                                <Text>Today</Text>
                            </RadioButton>

                            <RadioButton value={14}>
                                <Text>Two Weeks</Text>
                            </RadioButton>

                            <RadioButton value={30}>
                                <Text>One Month</Text>
                            </RadioButton>
                        </RadioGroup>

                        </View>
                        <Text style={{margin: 16, fontWeight: "bold"}}>
                            Distance:
                        </Text>
                        <View style={{flexDirection: "row", justifyContent: "center", margin: 16}}>
                            <Slider
                                value = {this.state.distance}
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
                            <Button primary text="Back" onPress={this.rejectChange.bind(this)}/>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}