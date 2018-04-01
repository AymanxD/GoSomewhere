import React, {Component} from 'react';
import {Text, View, CheckBox, Slider, AsyncStorage,} from 'react-native';
import Modal from "react-native-modal";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import { Button } from 'react-native-material-ui';


export default class FilterModel extends Component {

    constructor(props){
        super(props);

        this.state = {
            distance: 25,
            tempDistance: 25,
            time: 30,
            tempTime: 30,
            search:''
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

    // async searchFilter() {
    //     let events = await AsyncStorage.getItem('originalEvents');
    //     let search = await AsyncStorage.getItem('search');
    //     events = JSON.parse(events);
    //
    //     let searchArr = [];
    //
    //     for (let i = 0; i < events.length; i++) {
    //         let title = events[i].title;
    //         if (title.contains(search)) {
    //             searchArr.push(events[i]);
    //         }
    //     }
    //     console.log(searchArr);
    //
    //     AsyncStorage.setItem('events', JSON.stringify(searchArr));
    //
    //     this.props.changeEvents();
    // }
    async updateDistanceFilter(){

        let events = await AsyncStorage.getItem('originalEvents');
        let lat = await AsyncStorage.getItem('lat');
        let lon = await AsyncStorage.getItem('lon');

        events = JSON.parse(events);

        let tempArr = [];

        for(let i = 0; i < events.length; i++){
            let overallDistance = this.distanceComparator(events[i].latitude, events[i].longitude, lat, lon);
            if(overallDistance <= this.state.tempDistance){
                tempArr.push(events[i]);
            }
        }

        AsyncStorage.setItem('events', JSON.stringify(tempArr));

        this.props.changeEvents();
    }

    distanceComparator(lat, lon, currentLat, currentLon){
        return Math.sqrt(Math.pow(lat - currentLat, 2) + Math.pow(lon - currentLon, 2));
    }


    render() {

        let radio_props = [
            {label: 'Today', value: 0 },
            {label: 'Two Weeks', value: 14 },
            {label: 'One Month', value: 30 }
        ];

        return (
            <View>
                <Modal
                    isVisible={this.props.filterModalVisible}
                    backdropColor={"black"}
                    style={{}}
                    onBackdropPress={() => this.rejectChange.bind(this)}
                    >
                    <View style={{ backgroundColor: "white", padding: 16, alignSelf: "center"}}>
                        <Text style={{margin: 16}}>Time range:</Text>
                        <View style={{flex: 0.15, flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                        {/*<RadioForm*/}
                            {/*radio_props={radio_props}*/}
                            {/*initial={2}*/}
                            {/*buttonSize={5}*/}
                            {/*formHorizontal={true}*/}
                            {/*labelHorizontal={true}*/}
                            {/*buttonColor={'#2196f3'}*/}
                            {/*animation={true}*/}
                            {/*labelStyle={{marginRight: 8, marginLeft:-4}}*/}
                            {/*onPress={(option) => {this.setState({tempTime: option})}}*/}
                        {/*/>*/}
                        </View>
                        <Text style={{margin: 16}}>
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
                        <View style={{flexDirection: 'row', justifyContent:'space-around'}}>
                            <Button primary text="Accept" onPress={this.acceptChange.bind(this)} style={{container:{justifyContent: "flex-end", flexDirection: 'column'}}}/>
                            <Button primary text="Back" onPress={this.rejectChange.bind(this)} style={{container:{justifyContent: "flex-end", flexDirection: 'column'}}}/>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}