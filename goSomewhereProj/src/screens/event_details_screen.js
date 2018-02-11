import React from 'react';
import {Text} from 'react-native';
import {View, Image, ScrollView, Button, Alert, Dimensions, Linking, Share, TouchableOpacity, TouchableHighlight} from 'react-native';
import globalContainerStyle  from '../styles/Global_Container_Style'


export default class Event_Details_Screen extends React.Component {



    render() {

      return (
    <View style={{
       flex:3,
       flexDirection: 'column',
       justifyContent: 'space-around',
     }}>
    <ScrollView>
    <Image source = {{ uri: 'https://cdn.vox-cdn.com/thumbor/ILvfy0AKBPxTIXJSvqOM51RvoKA=/0x0:1280x720/1600x900/cdn.vox-cdn.com/uploads/chorus_image/image/55120573/13517551_1104527672919812_9041055288373038368_o.0.jpg'}}
      style={{flex:1, height:100}} />

     <Text>Event name: Hackathon</Text>
     <View
     style={{
//       height:50,
        flexDirection: 'row',
        justifyContent: 'space-around'
      }}
      >

      <TouchableHighlight onPress={() => {
      Alert.alert(
      'ShiftKeyLabs',
      'Goldberg Computer Science Building 6050 University Avenue, Room 426 Halifax, NS',);
      }}>
        <Image
          style={{width: 50, height: 50}}
          source={require('../components/event_details_comps/ic_favorite_border_black_24dp.png')}
        />
      </TouchableHighlight>


       <Button style={{width:100}}
       onPress={() => {}}
        title="Going"
        />

       <TouchableHighlight onPress={() => {
         Share.share({
            message: 'ShiftKey Labs hackaton',
            url: 'shiftkeylabs.ca/calendar/android-hackathon/',
            title: 'Wow, did you see that?'
          }, {

            dialogTitle: 'Share info',
          })
        }}>
         <Image
           style={{width: 50, height: 50}}
           source={require('../components/event_details_comps/ic_share_black_24dp.png')}
         />
       </TouchableHighlight>
     </View>


     <Text>Date: 2018-02-10</Text>
     <Text></Text>
     <Text>Address: Goldberg Computer Science Building, 6050 University Ave, Halifax, NS B3H 1W5</Text>
     <Text></Text>
     <Text>ShiftKey Labs and the Dalhousie Computer Science Society (CSS) are teaming up to run a 2-day hackathon focused on Android mobile application development.</Text>
     <Text>The format is pretty simple: Show up, join or form a team, brainstorm an idea guided by the disclosed prize categories, spend the remainder of the weekend coding out that solution, and present/demo your idea to the group. Everyone will get a chance to vote on the presentations/demos and the group who receives the most votes in the prize category will win!</Text>
     <Text>Snacks and drinks will be provided throughout the event to keep you fuelled up!</Text>
     <Text>Goals : To generate some interesting ideas and start creating a functional mobile application prototype for the Google Android platform. Hackathons are also a great way to meet new people, earn bragging rights about your coding abilities, win prizes, and have some fun!</Text>
     </ScrollView>
            <View style={{
              height:50,
               flexDirection: 'row',
               justifyContent: 'space-around'
             }}>
             <TouchableHighlight onPress={() => {
             Alert.alert(
             'ShiftKeyLabs',
             'Goldberg Computer Science Building 6050 University Avenue, Room 426 Halifax, NS',);
             }}>
               <Image
                 style={{width: 50, height: 50}}
                 source={require('../components/event_details_comps/ic_call_black_24dp.png')}
               />
             </TouchableHighlight>

             <TouchableHighlight onPress={() => {
             Linking.openURL("https://www.google.ca/maps/dir/44.6370632,-63.588217/ShiftKey+Labs,+University+Avenue,+Halifax,+Nova+Scotia/@44.6373505,-63.590179,17z/data=!3m1!4b1!4m10!4m9!1m1!4e1!1m5!1m1!1s0x4b5a223ad04ecb89:0x3e27d1ed7170b86b!2m2!1d-63.5871719!2d44.6374024!3e3?hl=ru");
             }}>
               <Image
                 style={{width: 50, height: 50}}
                 source={require('../components/event_details_comps/ic_directions_black_24dp.png')}
               />
             </TouchableHighlight>

             <TouchableHighlight onPress={() => {
              Linking.openURL("https://shiftkeylabs.ca/calendar/android-hackathon/");
             }}>
               <Image
                 style={{width: 50, height: 50}}
                 source={require('../components/event_details_comps/ic_http_black_24dp.png')}
               />
             </TouchableHighlight>

            </View>
     </View>
      );
  };
};
