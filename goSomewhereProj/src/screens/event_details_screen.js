import React from 'react';
import {Text} from 'react-native';
import {View, Image, ScrollView, StyleSheet, SectionList, Alert, Dimensions, Linking, Share, TouchableOpacity, TouchableHighlight, FlatList} from 'react-native';
import { Toolbar, Button, Icon } from 'react-native-material-ui';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import getDirections from 'react-native-google-maps-directions';

import axios from 'axios';

const user = [{"id":1,"name":"Mittens","date":"25 Jan 2018","message":"Nobody petted me!"},{"id":2,"name":"Demon","date":"1 Dec 2017","message":"I said Chicken, not Ham"},{"id":3,"name":"BigCatLover","date":"2 Nov 2017","message":"Lots of heavy petting"}];
const image_categories = [{"party":"party_category_image.jpg","study":"Computer-Cat.jpg"}];
const GoogleMapsKey = 'AIzaSyAvE1bTrQkk9zjFSVNNxN32XDt2ltzOpnA';
//const myIcon = (<Icon name="rocket" size={30} color="#900" />)
const customBlue = 'rgb(72, 133, 237)';
pressedLike='black';
pressedGoing='black';
var date;
var message;
var time;
var description;
var eventName;
var address;
//https://stackoverflow.com/questions/37841236/render-images-sources-from-parsed-array-of-objects-in-react-native
images = [{"party":require("../components/event_details_comps/party_category_image.jpeg"),"study" : require("../components/event_details_comps/Computer-Cat.jpg")}];


const extractKey = ({id}) => id //for the flatlist

export default class Event_Details_Screen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      colorLike:'black',
      colorGoing:'black',
      message:'No one was petting me',
      checkIcon:"star-outlined",
      event: props.navigation.state.params.event,
        result: ' ',
    };

   // this.changeIconName = this.changeIconName.bind(this);
    date = this.state.event['start_at'];
    date = date.substring(0,10);
    time = this.state.event['start_at'];
    time = time.substring(11,16);
    description = this.state.event['description'];
    eventName = this.state.event['title'];
    address = this.state.event['address'];
  }
    _showResult(result){
        this.setState({result})
    }
  //to get comments from the backend
    componentDidMount() {
      axios.get('/events/'+this.state.event['id']+'/comments')
      .then(async (response) => {
        this.setState({comment: response.data});
      })
      .catch((error) => {
        if(error.response && error.response.data) {
          Alert.alert(JSON.stringify(error.response.data));
        } else {
          Alert.alert("catching exception", JSON.stringify(error));
        }
      });
    }
  // changeIconName() {
  //   if (this.state.checkIcon === "star-outlined") {
  //     this.setState({
  //       checkIcon: "star"
  //     })
  //     } else {
  //       this.setState({
  //         checkIcon: "star-outlined"
  //       })
  //     }
  // }


  handleGetDirections = () => {
    const data = {
      source: {},
      destination: {
        latitude: this.state.event['latitude'],
        longitude: this.state.event['longitude'],
      },
      params: [ {
        key: "dirflg",
        value: "w"
       }
      ]
    }
    getDirections(data)
  }

    render() {
      const id=this.props.navigation.state.params.id;

      return (

    <View style={{
       flex:3,
       flexDirection: 'column',
       justifyContent: 'space-around',
     }}>
       <Toolbar
           leftElement="arrow-back"
           onLeftElementPress={() => this.props.navigation.goBack() }
           centerElement="Event Details"
       />
    <ScrollView>
    <Image source={{uri: this.state.event.image}}
      style={{ flex:1, height:200 }} />

        <View style={{ height: 75, backgroundColor:customBlue}}>
        <Text style={[styles.padding, {fontWeight:'bold', color:'white', paddingBottom: 10}]}> {this.state.event['title']} </Text>
        <Text style ={[styles.padding, {color:'white'}]}> Date: {date} </Text>
        </View>

     <View
     style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom: 10,
      }}>

       <TouchableOpacity onPress={this.handleGetDirections} >
           <View style={styles.button}>
               <Entypo name='check' backgroundColor='transparent' color={customBlue} size={40}/>
               <Text style={{textAlign:'center', color:customBlue}}>GOING</Text>
           </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => Share.share({
          message: description,
       title: 'Check out the ' + eventName + ' @ ' + address + '\nDate: ' + date + '\nTime: ' + time + '\n',
    }) .then(this._showResult) .catch(err => console.log(err))} >
          <View style={styles.button}>
        <Entypo name='share' backgroundColor='transparent' color = {customBlue} size = {40} />
        <Text style={{textAlign:'center', color:customBlue}}>SHARE</Text>
          </View>
      </TouchableOpacity>
     </View>

     <View style = {styles.lineStyle}></View>
     <View style={styles.padding}>
     <Text>{this.state.event['description']} </Text>
      </View>
     <View style={{ padding: 10}}>
     <View style = {styles.lineStyle}></View>

      <View style={{flexDirection: 'row'}}>
      <MaterialIcons.Button name='date-range' backgroundColor='transparent' color = {customBlue} color = {customBlue} size = {24} paddingRight={15}/>
      <Text style ={styles.details}>Date: {date}</Text>
      </View>
       <View style = {styles.lineStyle}></View>

      <View style={{flexDirection: 'row'}}>
      <MaterialCommunityIcons.Button name='clock' backgroundColor='transparent' color = {customBlue} size = {24} paddingRight={15}/>
      <Text style ={styles.details}>Time: {time}</Text>
      </View>
       <View style = {styles.lineStyle}></View>

       <TouchableOpacity onPress={this.handleGetDirections}>
      <View style={{flexDirection: 'row'}}>
      <MaterialIcons.Button name='location-on' backgroundColor='transparent' color = {customBlue} size = {24} paddingRight={15}/>
      <Text style ={[styles.details, {flex:1, flexWrap:'wrap'}]}>Address: {this.state.event['address']}</Text>
      </View>
      </TouchableOpacity>

       <View style = {styles.lineStyle}></View>
       </View>
{/*
       <View style={[styles.padding, {flex:1}]}>
       <Text style={{fontSize:13, fontWeight:'bold'}}> Reviews</Text>
     <SectionList
          sections={[
          {title: <Text>{user[0]['name'] + ': ' + user[0]['date']}</Text>, data: [<Text>{user[0]['message']}</Text>]},
          {title: <Text>{user[1]['name'] + ': ' + user[1]['date']}</Text>, data: [<Text>{user[1]['message']}</Text>]},
          {title: <Text>{user[2]['name'] + ': ' + user[2]['date']}</Text>, data: [<Text>{user[2]['message']}</Text>]},]}
          renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item, index) => index}
        />
        </View>
*/}

<View>
<Text style={{fontSize:13, fontWeight:'bold'}}>Reviews</Text>

<FlatList
data={this.state.comment}
renderItem={({item}) => <View><Text style={styles.sectionHeader}>{item['author'] + ': ' + item['time_in_words']}</Text>
<Text style={styles.item}>{item['content']}</Text></View>
}
keyExtractor={extractKey}
/>
</View>

       <Button primary text="Add a Comment" onPress={() => this.props.navigation.navigate('Comments', {id:0})} />
     </ScrollView>
            <View style={{
                flexDirection: 'column',
                alignItems: 'center',
             }}>

             <TouchableOpacity onPress={this.handleGetDirections}>
              <MaterialCommunityIcons name='navigation' style={{alignSelf: 'center'}} backgroundColor='transparent' color = 'black'
                                      size = {40} />
              <Text>DIRECTIONS</Text>
             </TouchableOpacity>
            </View>
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
  lineStyle:{
    borderWidth: 0.5,
    borderColor:'lightgrey',
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
    paddingLeft:15,
  }
});
