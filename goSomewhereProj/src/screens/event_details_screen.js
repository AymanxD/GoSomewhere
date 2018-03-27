import React from 'react';
import {Text} from 'react-native';
import {View, Image, ScrollView, StyleSheet, SectionList, Alert, Dimensions, Linking, Share, TouchableOpacity, TouchableHighlight} from 'react-native';
import { Toolbar, Button, Icon } from 'react-native-material-ui';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import getDirections from 'react-native-google-maps-directions';

const user = [{"id":1,"name":"Mittens","date":"25 Jan 2018","message":"Nobody petted me!"},{"id":2,"name":"Demon","date":"1 Dec 2017","message":"I said Chicken, not Ham"},{"id":3,"name":"BigCatLover","date":"2 Nov 2017","message":"Lots of heavy petting"}];
const image_categories = [{"party":"party_category_image.jpg","study":"Computer-Cat.jpg"}];
const GoogleMapsKey = 'AIzaSyAvE1bTrQkk9zjFSVNNxN32XDt2ltzOpnA'; 
//const myIcon = (<Icon name="rocket" size={30} color="#900" />)
const customBlue = 'rgb(72, 133, 237)';
pressedLike='black';
pressedGoing='black';
var date;
var time;

// handleGetDirections = () => {
//   const data = {
//     source: {
//       latitude: starting,
//       longitude: starting
//     },
//     destination: {
//       latitude: this.state.event['latitude'],
//       longitude: this.state.event['longitude'],
//     },
//     params: [ {
//       key: {GoogleMapsKey},
//       value: "w"
//     }
//     ]
//   }
//   getDirections(data)
// }
//https://stackoverflow.com/questions/37841236/render-images-sources-from-parsed-array-of-objects-in-react-native
images = [{"party":require("../components/event_details_comps/party_category_image.jpeg"),"study" : require("../components/event_details_comps/Computer-Cat.jpg")}];


// fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?', {
// body: JSON.stringify({
//   firstParam: 'location=' + lat + ',' + long,
//   secondParam: '&radius=5&rankby=prominence&',
//   thirdParam: 'keyword=computerscience&key=AIzaSyA1ihdTdZW3M7nOMQz2tdgtuX0HCVc9tBo',
// }), });

export default class Event_Details_Screen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      colorLike:'black', 
      colorGoing:'black',
      message:'No one was petting me',
      checkIcon:"star-outlined",
      event: props.navigation.state.params.event,
    };

   // this.changeIconName = this.changeIconName.bind(this);
    date = this.state.event['start_at'];
    date = date.substring(0,10);
    time = this.state.event['start_at'];
    time = time.substring(11,16);

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
        {/* <TouchableOpacity>
          <Entypo.Button name={this.state.checkIcon} backgroundColor='transparent' color ={customBlue} size = {40} 
          onPress={() => {this.changeIconName()}} />
          <Text style={{textAlign:'center', color:customBlue}}>LIKE</Text>
       </TouchableOpacity> */}

       <TouchableOpacity>
          <Entypo.Button name='check' backgroundColor='transparent' color = {customBlue} size = {40} />
          <Text style={{textAlign:'center', color:customBlue}}>GOING</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => Share.share({
        message: [this.state.event['name'] + this.state.event['date']],
        url: 'shiftkeylabs.ca/calendar/android-hackathon/',
        title: this.state.event['name'],
      }, {
        dialogTitle: 'Share with your friends!',
      }) } >
        <Entypo.Button name='share' backgroundColor='transparent' color = {customBlue} size = {40} />
        <Text style={{textAlign:'center', color:customBlue}}>SHARE</Text>
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
       <Button primary text="Add a Comment" onPress={() => this.props.navigation.navigate('Comments', {id:0})} />
     </ScrollView>
            <View style={{
               flexDirection: 'row',
               justifyContent: 'space-around'
             }}>

             <TouchableOpacity onPress={this.handleGetDirections}>
              <MaterialCommunityIcons.Button name='navigation' paddingLeft={18} backgroundColor='transparent' color = 'black' size = {40} />
              <Text style={{textAlign:'center'}}>DIRECTIONS</Text>
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

    
