import React from 'react';
import {Text} from 'react-native';
import {View, Image, ScrollView, Button, Alert, Dimensions, Linking} from 'react-native';
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
     <Text></Text>
     <Text>Date: 2018-02-10</Text>
     <Text></Text>
     <Text>Address: Goldberg Computer Science Building, 6050 University Ave, Halifax, NS B3H 1W5</Text>
     <Text></Text>
     <Text>ShiftKey Labs and the Dalhousie Computer Science Society (CSS) are teaming up to run a 2-day hackathon focused on Android mobile application development.</Text>
     <Text>The format is pretty simple: Show up, join or form a team, brainstorm an idea guided by the disclosed prize categories, spend the remainder of the weekend coding out that solution, and present/demo your idea to the group. Everyone will get a chance to vote on the presentations/demos and the group who receives the most votes in the prize category will win!</Text>
     <Text>Snacks and drinks will be provided throughout the event to keep you fuelled up!</Text>
     <Text> Goals : To generate some interesting ideas and start creating a functional mobile application prototype for the Google Android platform. Hackathons are also a great way to meet new people, earn bragging rights about your coding abilities, win prizes, and have some fun!</Text>
     </ScrollView>
            <View style={{
              height:50,
               flexDirection: 'row',
               justifyContent: 'space-around'
             }}>

             <Button style={{width:100}}
              onPress={() => {
              Alert.alert('You tapped the button!');
              }}
              title="Call"
              />
             <Button style={{width:100}}
              onPress={() => {
              Alert.alert('You tapped the button!');
              }}
              title="Direction"
              />
             <Button style={{width:100}}
              onPress={() => {
               Linking.openURL("https://shiftkeylabs.ca/calendar/android-hackathon/");
              }}
              title="WWW"
              />

            </View>
     </View>
      );
  };
};
