import React, {Component} from 'react';
import { Text, View, CheckBox, Slider, } from 'react-native';
import Modal from "react-native-modal";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import { Button } from 'react-native-material-ui';


export default class FilterModel extends Component {

    constructor(props){
        super(props);

        this.state = {
            value: this.props.distance,
            tempValue: 25,
            time: this.props.time,
            tempTime: 30
        }
    }

    acceptChange(){
        this.setState({
            value: this.state.tempValue,
            time: this.state.tempTime
        }, () => {
            this.props.onChange(this.state.tempValue, this.state.time);
            this.props.onPress();
        });
    }

    rejectChange() {
        this.setState({
            tempValue: this.state.value,
            tempTime: this.state.time
        });

        this.props.onPress();
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
                        <RadioForm
                            radio_props={radio_props}
                            initial={2}
                            buttonSize={5}
                            formHorizontal={true}
                            labelHorizontal={true}
                            buttonColor={'#2196f3'}
                            animation={true}
                            labelStyle={{marginRight: 8, marginLeft:-4}}
                            onPress={(option) => {this.setState({tempTime: option})}}
                        />
                        </View>
                        <Text style={{margin: 16}}>
                            Distance:
                        </Text>
                        <View style={{flexDirection: "row", justifyContent: "center", margin: 16}}>
                            <Slider
                                value = {this.state.value}
                                step = {1}
                                minimunValue={1}
                                maximumValue={50}
                                onValueChange={(val) => {
                                    this.setState({
                                        tempValue: val
                                    });
                                }}
                                style={{flex: 1}}
                                minimumTrackTintColor='#1073ff'
                                maximumTrackTintColor='#b7b7b7'
                            />
                            <Text>
                                {this.state.tempValue} km
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