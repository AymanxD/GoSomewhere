import React from 'react';
import {Text} from 'react-native';
import {View, Image, ScrollView, Alert, Dimensions, Linking, Share, TouchableOpacity, TouchableHighlight} from 'react-native';
import {Button} from 'react-native';
import globalContainerStyle  from '../styles/Global_Container_Style'

const events = [{"id":1,"title":"Android Hackathon","category":"study","description":null,"start_at":"2018-02-23T14:10:52.773Z","end_at":"2018-02-23T20:12:37.044Z","attendees":null,"created_at":"2018-02-10T18:12:44.050Z","updated_at":"2018-02-10T18:12:44.050Z","latitude":44.6374257,"longitude":-63.5872094,"address":"Goldberg Computer Science Building, 6050 University Ave, Halifax, NS B3H 1W5"},{"id":2,"title":"Party after winning Hackathon","category":"party","description":"Please bring your own drink","start_at":"2018-02-11T22:19:45.595Z","end_at":null,"attendees":null,"created_at":"2018-02-10T18:21:52.274Z","updated_at":"2018-02-10T18:21:52.274Z","latitude":44.6386448,"longitude":-63.5919118,"address":"H-1422B, 6230 Coburg Road, Halifax, NS, B3h4R2"}];

const image_categories = [{"party":"party_category_image.jpg","study":"Computer-Cat.jpg"}];

pressedLike='black';
pressedGoing='black';

//https://stackoverflow.com/questions/37841236/render-images-sources-from-parsed-array-of-objects-in-react-native
images = [{"party":require("../components/event_details_comps/party_category_image.jpeg"),"study" : require("../components/event_details_comps/Computer-Cat.jpg")}];




export default class Event_Details_Screen extends React.Component {
constructor(props) {
  super(props);
  this.state = {colorLike:'black', colorGoing:'black'};
  id=this.props.navigation.state.params.id;
  category=events[id]['category'];


}


    render() {

      return (


    <View style={{
       flex:3,
       flexDirection: 'column',
       justifyContent: 'space-around',
     }}>
    <ScrollView>
    <Image source={images[0][category]}
      style={{flex:1, height:200, width: 380, marginBottom: 20}} />

     <View
     style={{
//       height:50,
        flexDirection: 'row',
        justifyContent: 'space-around'
      }}
      >

      <TouchableHighlight onPress={() => {
      this.setState(previousState => {return {colorLike: this.state.colorLike=='black' ? 'red':'black'};});

      }}>
      <Text style={{fontSize:30, color:this.state.colorLike}}>Like</Text>
      </TouchableHighlight>


      <TouchableHighlight onPress={() => {
      this.setState(previousState => {return {colorGoing: this.state.colorGoing=='black' ? 'green':'black'};});
      }}>
      <Text style={{fontSize:30, color:this.state.colorGoing}}>Going</Text>
      </TouchableHighlight>


       <TouchableHighlight onPress={() => {
         Share.share({
            message: 'ShiftKey Labs hackaton',
            url: 'shiftkeylabs.ca/calendar/android-hackathon/',
            title: 'Wow, did you see that?'
          }, {
            dialogTitle: 'Share info',
          })
        }}>
        <Text style={{fontSize:30}}>Share</Text>
       </TouchableHighlight>
     </View>


     <View style={{ padding: 10 }}>
       <Text>Event name: {events[id]['title']}</Text>
       <Text>Date: {events[id]['start_at']}</Text>
       <Text>Category: {category}</Text>
       <Text>Address: {events[id]['address']}</Text>
       <Text></Text>
       <Text>{events[id]['description']}</Text>
       </View>
     </ScrollView>
            <View style={{
              height:50,
               flexDirection: 'row',
               justifyContent: 'space-around'
             }}>
             <TouchableHighlight onPress={() => {
              Linking.openURL('tel:1234567890');
             }}>
               <Text style={{fontSize:30}}>Call</Text>
             </TouchableHighlight>

             <TouchableHighlight onPress={() => {
             Linking.openURL("https://www.google.ca/maps/dir/44.6370632,-63.588217/ShiftKey+Labs,+University+Avenue,+Halifax,+Nova+Scotia/@44.6373505,-63.590179,17z/data=!3m1!4b1!4m10!4m9!1m1!4e1!1m5!1m1!1s0x4b5a223ad04ecb89:0x3e27d1ed7170b86b!2m2!1d-63.5871719!2d44.6374024!3e3?hl=ru");
             }}>
               <Text style={{fontSize:30}}>Route</Text>
             </TouchableHighlight>

             <TouchableHighlight onPress={() => {
              Linking.openURL("https://shiftkeylabs.ca/calendar/android-hackathon/");
             }}>
            <Text style={{fontSize:30}}>WWW</Text>
             </TouchableHighlight>
            </View>
     </View>
      );
  };
};