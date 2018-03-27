import React, {Component} from 'react';
import { Text, TouchableHighlight, TouchableOpacity, View, CheckBox, Slider} from 'react-native';
import Modal from "react-native-modal";

import { Toolbar, ListItem } from 'react-native-material-ui';


export default class FilterModel extends Component {

    constructor(props){
        super(props);

        this.sliderChange.bind(this);

        this.state = {
            value: 25
        }
    }

    sliderChange(value){
        this.setState({
            value: value
        });

        this.props.onChange(this.state.value);
    }

    render() {

        let value = this.state.value;

        return (
            <View style={{ flex: 1 }}>

                <Modal
                    isVisible={this.props.filterModalVisible}
                    backdropColor={"black"}
                    style={{marginTop: 64, marginBottom: 64, marginLeft: 32, marginRight: 32}}
                    onBackdropPress={() => this.props.onPress}
                    onSwipe={() => this.props.onPress}>
                    <View style={{ flex: 1, backgroundColor: 'white', padding: 16}}>
                        <Text>Time range:</Text>
                        <View style={{flexDirection: "row", justifyContent: "center", margin: 16}}>
                            <CheckBox/>
                            <Text>
                                Today
                            </Text>
                            <CheckBox/>
                            <Text>
                                Two weeks
                            </Text>
                            <CheckBox/>
                            <Text>
                                One month
                            </Text>
                        </View>
                        <Text>
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
                                        value: val
                                    });

                                    this.props.onChange(val);
                                }}
                                style={{flex: 1}}
                                minimumTrackTintColor='#1073ff'
                                maximumTrackTintColor='#b7b7b7'
                            />
                            <Text>
                                {this.state.value}
                            </Text>
                        </View>
                        <TouchableHighlight onPress={this.props.onPress} style={{justifyContent: "flex-end", flexDirection: 'column'}}>
                            <Text style={{fontsize: 16, fontcolor: 'blue'}}>Accept</Text>
                        </TouchableHighlight>
                    </View>
                </Modal>
            </View>
        );
    }
}