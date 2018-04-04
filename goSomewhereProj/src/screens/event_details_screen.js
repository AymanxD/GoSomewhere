import React from 'react';
import {Text} from 'react-native';
import {Alert, View, Image, ScrollView, StyleSheet, SectionList, Dimensions, Linking, Share, TouchableOpacity,
    TouchableHighlight, FlatList} from 'react-native';
import {Toolbar, Button, Icon} from 'react-native-material-ui';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import getDirections from 'react-native-google-maps-directions';
import axios from 'axios';

const image_categories = [{"party": "party_category_image.jpg", "study": "Computer-Cat.jpg"}];
const GoogleMapsKey = 'AIzaSyAvE1bTrQkk9zjFSVNNxN32XDt2ltzOpnA';
const customBlue = 'rgb(72, 133, 237)';
const customGreen = 'rgb(25,220,40)';
const extractKey = ({id}) => id

var date;
var message;
var time;
var description;
var eventName;
var address;

export default class Event_Details_Screen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            checkIcon: "star-outlined",
            event: props.navigation.state.params.event,
            result: ' ',
            details: [],
            comment_array: [],
        };

        // Separate time and date from event[start_at]
        date = this.state.event['start_at'];
        date = date.substring(0, 10);
        time = this.state.event['start_at'];
        time = time.substring(11, 16);

        // Make variables for descriptions, title and address for the share button
        description = this.state.event['description'];
        eventName = this.state.event['title'];
        address = this.state.event['address'];
    }

    //Display the result of the share button
    _showResult(result) {
        this.setState({result})
    }

    //Get comments from the backend
    getComments = () => {
        axios.get('/events/' + this.state.event['id'] + '/comments')
            .then(async (response) => {
                this.setState({comment: response.data});
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    Alert.alert(JSON.stringify(error.response.data));
                } else {
                    Alert.alert("catching exception", JSON.stringify(error));
                }
            });
    }

    // Update 'Going' status on backend
    updateGoing = () => {
        //send to server
        axios.post('/events/' + this.state.event['id'] + '/change_attending', {})
            .then(async (response) => {
                this.setState({details: response.data});
            }).catch((error) => {
            if (error.response && error.response.data.errors) {
                Alert.alert("catching exception", JSON.stringify(error.response.data.errors));
            }
        }).done();
    }

    //Get comments from backend
    componentDidMount() {
        this.getComments();
        axios.get('/events/' + this.state.event['id'] + '/')
            .then(async (response) => {
                this.setState({details: response.data});
                if (this.state.details['is_attending'] == true) {
                    this.setState({
                        checkIcon: "star"
                    })
                }
                ;
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    Alert.alert(JSON.stringify(error.response.data));
                } else {
                    Alert.alert("catching exception", JSON.stringify(error));
                }
            });
    }

    // Toggles the star button to change from onPress
    changeIconName() {
        if (this.state.checkIcon === "star-outlined") {
            this.setState({
                checkIcon: "star"
            })
        } else {
            this.setState({
                checkIcon: "star-outlined"
            })
        }
        this.updateGoing();
    }

    // Gets navigation information for Google Navigation
    handleGetDirections = () => {
        const data = {
            source: {},
            destination: {
                latitude: this.state.event['latitude'],
                longitude: this.state.event['longitude'],
            },
            params: [{
                key: "dirflg",
                value: "w"
            }
            ]
        }
        getDirections(data)
    }

    render() {

        const id = this.props.navigation.state.params.id;

        return (

            <View style={{
                flex: 3,
                flexDirection: 'column',
                justifyContent: 'space-around',
            }}>
                <Toolbar
                    leftElement="arrow-back"
                    onLeftElementPress={() => this.props.navigation.goBack()}
                    centerElement="Event Details"
                    rightElement="directions"
                    onRightElementPress={this.handleGetDirections}/>

                <ScrollView>
                    <Image source={{uri: this.state.event.image}}
                           style={{flex: 1, height: 200}}/>

                    <View style={{backgroundColor: customBlue}}>
                        <Text style={[styles.padding, {
                            fontWeight: 'bold',
                            color: 'white',
                            paddingBottom: 10
                        }]}> {this.state.event['title']} </Text>
                        <Text style={[styles.padding, {color: 'white'}]}> Date: {date} </Text>
                    </View>

                    <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            paddingBottom: 10,
                        }}>

                        <TouchableOpacity onPress={this.changeIconName.bind(this)}>
                            <View style={styles.button}>
                                <Entypo name={this.state.checkIcon} backgroundColor='transparent' color={customBlue}
                                        size={40}/>
                                <Text style={{textAlign: 'center', color: customBlue}}>GOING</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => Share.share({
                            title: 'Check out the ' + eventName + ' @ ' + address + '\nDate: ' + date + '\nTime: ' + time + '\n',
                            message: description,
                        }).then(this._showResult).catch(err => console.log(err))}>
                            <View style={styles.button}>
                                <Entypo name='share' backgroundColor='transparent' color={customBlue} size={40}/>
                                <Text style={{textAlign: 'center', color: customBlue}}>SHARE</Text>
                            </View>
                        </TouchableOpacity>

                    </View>

                        <View style={styles.lineStyle}></View>
                        <View style={styles.padding}>
                        <Text>{this.state.event['description']} </Text>
                        </View>

                        <View style={{padding: 10}}>
                        <View style={styles.lineStyle}></View>

                        <View style={{flexDirection: 'row'}}>
                            <MaterialIcons.Button name='date-range' backgroundColor='transparent' color={customBlue}
                                                  color={customBlue} size={24} paddingRight={15}/>
                            <Text style={styles.details}>Date: {date}</Text>
                        </View>
                        <View style={styles.lineStyle}></View>

                        <View style={{flexDirection: 'row'}}>
                            <MaterialIcons.Button name='group' backgroundColor='transparent' color={customBlue}
                                                  color={customBlue} size={24} paddingRight={15}/>
                            <Text style={styles.details}>Attendees: {this.state.details['attendees'] + 0}</Text>
                        </View>
                        <View style={styles.lineStyle}></View>

                        <View style={{flexDirection: 'row'}}>
                            <MaterialCommunityIcons.Button name='clock' backgroundColor='transparent' color={customBlue}
                                                           size={24} paddingRight={15}/>
                            <Text style={styles.details}>Time: {time}</Text>
                        </View>
                        <View style={styles.lineStyle}></View>

                        <TouchableOpacity onPress={this.handleGetDirections}>
                            <View style={{flexDirection: 'row'}}>
                                <MaterialIcons.Button name='location-on' backgroundColor='transparent'
                                                      color={customBlue} size={24} paddingRight={15}/>
                                <Text style={[styles.details, {
                                    flex: 1,
                                    flexWrap: 'wrap'
                                }]}>Address: {this.state.event['address']}</Text>
                            </View>
                        </TouchableOpacity>
                            <View style={styles.lineStyle}></View>
                    </View>

                    <View>
                        <Text style={{fontSize: 13, fontWeight: 'bold'}}>Reviews</Text>
                        <FlatList
                            data={this.state.comment}
                            renderItem={({item}) => <View><Text
                                style={styles.sectionHeader}>{item['author'] + ': ' + item['time_in_words']}</Text>
                                <Text style={styles.item}>{item['content']}</Text></View>
                            }
                            keyExtractor={extractKey}
                        />
                    </View>

                    {/* https://stackoverflow.com/questions/44223727/react-navigation-goback-and-update-parent-state/44227835
                     When you want navigate using goBack function you can't pass parameters to the parent screen.
                     Therefore you need to pass function to the child screen,
                     and call that function in child screen before calling go back function*/}
                    <Button primary text="Add a Comment" onPress={() => this.props.navigation.navigate('Comments', {
                        id: this.state.event['id'],
                        event: this.state.event,
                        onGoBack: this.getComments,
                    })}/>
                </ScrollView>
            </View>
        );
    };
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    button: {
        width: 50,
        height: 60,
        alignItems: 'center',
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 11,
        fontWeight: 'bold',
    },
    lineStyle: {
        borderWidth: 0.5,
        borderColor: 'lightgrey',
    },
    item: {
        padding: 10,
        fontSize: 13,
        height: 44,
    },
    details: {
        paddingBottom: 10,
        paddingTop: 10,
        paddingRight: 10,
        fontSize: 13,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    padding: {
        paddingBottom: 10,
        paddingTop: 10,
        paddingRight: 10,
        paddingLeft: 15,
    }
});