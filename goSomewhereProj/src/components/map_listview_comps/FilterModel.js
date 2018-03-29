import React, {Component} from 'react';
import { Text, TouchableHighlight, TouchableOpacity, View, CheckBox, Slider} from 'react-native';
import Modal from "react-native-modal";

import { Button } from 'react-native-material-ui';


export default class FilterModel extends Component {

    constructor(props){
        super(props);

        this.state = {
            value: 25
        }
    }

    acceptChange(value){
        this.onChange(this.state.value);
        this.props.onPress();
    }

    rejectChange() {
        this.setState({
            value: 25
        });

        this.props.onPress();
    }

    render() {

        let value = this.state.value;

        return (
            <View>
                <Modal
                    isVisible={this.props.filterModalVisible}
                    backdropColor={"black"}
                    style={{}}
                    onBackdropPress={() => this.rejectChange.bind(this)}
                    >
                    <View style={{ backgroundColor: "white", padding: 16, alignSelf: "center"}}>
                        <Text>Time range:</Text>
                        <View style={{flex: 0.25, flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
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
                                }}
                                style={{flex: 1}}
                                minimumTrackTintColor='#1073ff'
                                maximumTrackTintColor='#b7b7b7'
                            />
                            <Text>
                                {this.state.value}
                            </Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent:'space-around'}}>
                            <Button primary text="Accept" onPress={this.acceptChange} style={{container:{justifyContent: "flex-end", flexDirection: 'column'}}}/>
                            <Button primary text="Back" onPress={this.rejectChange.bind(this)} style={{container:{justifyContent: "flex-end", flexDirection: 'column'}}}/>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}