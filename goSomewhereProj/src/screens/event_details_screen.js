import React from 'react';
import {Text} from 'react-native';
import {View, Image, ScrollView, StyleSheet, SectionList, Alert, Dimensions, Linking, Share, TouchableOpacity, TouchableHighlight} from 'react-native';
import { Button, Icon } from 'react-native-material-ui';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// var lat = events[id]['latitude'];
// var long = events[id]['longitude'];
// var addr = events[id]['address'];
import getDirections from 'react-native-google-maps-directions';

const events = [{"id":1,"title":"Android Hackathon","category":"study","description":"Mittens was dancing on the tables","start_at":"2018-02-23T14:10:52.773Z","end_at":"2018-02-23T20:12:37.044Z","attendees":null,"created_at":"2018-02-10T18:12:44.050Z","updated_at":"2018-02-10T18:12:44.050Z","latitude":44.6374257,"longitude":-63.5872094,"address":"Goldberg Computer Science Building, 6050 University Ave, Halifax, NS B3H 1W5"},{"id":2,"title":"Party after winning Hackathon","category":"party","description":"Please bring your own drink","start_at":"2018-02-11T22:19:45.595Z","end_at":null,"attendees":null,"created_at":"2018-02-10T18:21:52.274Z","updated_at":"2018-02-10T18:21:52.274Z","latitude":44.6386448,"longitude":-63.5919118,"address":"H-1422B, 6230 Coburg Road, Halifax, NS, B3h4R2"}];
const user = [{"id":1,"name":"Mittens","date":"25 Jan 2018","message":"Nobody petted me!"},{"id":2,"name":"Demon","date":"1 Dec 2017","message":"I said Chicken, not Ham"},{"id":3,"name":"BigCatLover","date":"2 Nov 2017","message":"Lots of heavy petting"}];
const image_categories = [{"party":"party_category_image.jpg","study":"Computer-Cat.jpg"}];
const GoogleMapsKey = 'AIzaSyAvE1bTrQkk9zjFSVNNxN32XDt2ltzOpnA'; 
//const myIcon = (<Icon name="rocket" size={30} color="#900" />)
const customBlue = 'rgb(72, 133, 237)';
pressedLike='black';
pressedGoing='black';

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
      event: props.navigation.state.params.event
    };

    this.changeIconName = this.changeIconName.bind(this);

  }
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
  }
  handleGetDirections = () => {
    const data = {
      source: {
        latitude: events[0]['latitude'],
        longitude: events[0]['longitude']
      },
      destination: {
        latitude: events[1]['longitude'],
        longitude: events[1]['longitude'],
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
    <ScrollView>
    <Image source={{uri: this.state.event.image}}
      style={{ flex:1, height:200 }} />

        <View style={{ height: 75, backgroundColor:customBlue}}>
        <Text style={[styles.padding, {fontWeight:'bold', color:'white', paddingBottom: 10}]}> {this.state.event['title']} </Text>
        <Text style ={[styles.padding, {color:'white'}]}> Date: {this.state.event['start_at']} </Text>
        </View> 

     <View
     style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom: 10,
      }}>  
        <TouchableOpacity>
          <Entypo.Button name={this.state.checkIcon} backgroundColor='transparent' color ={customBlue} size = {40} 
          onPress={() => {this.changeIconName()}} />
          <Text style={{textAlign:'center', color:customBlue}}>LIKE</Text>
       </TouchableOpacity>

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
      <Text style ={styles.details}>Date: {this.state.event['start_at']}</Text>  
      </View>
       <View style = {styles.lineStyle}></View>

      <View style={{flexDirection: 'row'}}> 
      <MaterialCommunityIcons.Button name='tag-text-outline' backgroundColor='transparent' color = {customBlue} size = {24} paddingRight={15}/>
      <Text style ={styles.details}>Category: Dummy</Text>  
      </View>
       <View style = {styles.lineStyle}></View>

       <TouchableOpacity onPress={() => {Linking.openURL("https://www.google.ca/maps/dir/44.6370632,-63.588217/ShiftKey+Labs,+University+Avenue,+Halifax,+Nova+Scotia/@44.6373505,-63.590179,17z/data=!3m1!4b1!4m10!4m9!1m1!4e1!1m5!1m1!1s0x4b5a223ad04ecb89:0x3e27d1ed7170b86b!2m2!1d-63.5871719!2d44.6374024!3e3?hl=ru")}}>
      <View style={{flexDirection: 'row'}}> 
      <MaterialIcons.Button name='location-on' backgroundColor='transparent' color = {customBlue} size = {24} paddingRight={15}/>
      <Text style ={[styles.details, {flex:1, flexWrap:'wrap'}]}>Address: {this.state.event['address']}</Text>  
      </View>
      </TouchableOpacity>
      
       <View style = {styles.lineStyle}></View>
       
       <TouchableOpacity onPress={() => {Linking.openURL('tel:1234567890')}}>
       <View style={{flexDirection: 'row'}}> 
      <MaterialIcons.Button name='phone' backgroundColor='transparent' color = {customBlue} size = {24} paddingRight={15}/>
      <Text style ={styles.details}>Phone no: (902) CAT-CATS</Text> 
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
             {/* <TouchableOpacity onPress={() => {Linking.openURL('tel:1234567890')}}>
              <MaterialCommunityIcons.Button name='phone' backgroundColor='transparent' color = 'black' size = {40} />
              <Text style={{textAlign:'center'}}>CALL</Text>
             </TouchableOpacity> */}

             {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('Directions', this.state.event[])}>
              <MaterialCommunityIcons.Button name='navigation' paddingLeft={18} backgroundColor='transparent' color = 'black' size = {40} />
              <Text style={{textAlign:'center'}}>DIRECTIONS</Text>
             </TouchableOpacity> */}

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
  //  backgroundColor: 'rgba(247,247,247,1.0)',
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

    
