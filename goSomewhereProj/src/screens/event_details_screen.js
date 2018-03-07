import React from 'react';
import {Text} from 'react-native';
import {View, Image, ScrollView, StyleSheet, SectionList, Alert, Dimensions, Linking, Share, TouchableOpacity, TouchableHighlight} from 'react-native';
// import {Button} from 'react-native';
import { Button } from 'react-native-material-ui';
import Icon from 'react-native-vector-icons/FontAwesome';

const events = [{"id":1,"title":"Android Hackathon","category":"study","description":null,"start_at":"2018-02-23T14:10:52.773Z","end_at":"2018-02-23T20:12:37.044Z","attendees":null,"created_at":"2018-02-10T18:12:44.050Z","updated_at":"2018-02-10T18:12:44.050Z","latitude":44.6374257,"longitude":-63.5872094,"address":"Goldberg Computer Science Building, 6050 University Ave, Halifax, NS B3H 1W5"},{"id":2,"title":"Party after winning Hackathon","category":"party","description":"Please bring your own drink","start_at":"2018-02-11T22:19:45.595Z","end_at":null,"attendees":null,"created_at":"2018-02-10T18:21:52.274Z","updated_at":"2018-02-10T18:21:52.274Z","latitude":44.6386448,"longitude":-63.5919118,"address":"H-1422B, 6230 Coburg Road, Halifax, NS, B3h4R2"}];
const user = [{"id":1,"name":"Mittens","date":"25 Jan 2018","message":"Nobody petted me!"},{"id":2,"name":"Demon","date":"1 Dec 2017","message":"I said Chicken, not Ham"},{"id":3,"name":"BigCatLover","date":"2 Nov 2017","message":"Lots of heavy petting"}];
const image_categories = [{"party":"party_category_image.jpg","study":"Computer-Cat.jpg"}];

pressedLike='black';
pressedGoing='black';

//https://stackoverflow.com/questions/37841236/render-images-sources-from-parsed-array-of-objects-in-react-native
images = [{"party":require("../components/event_details_comps/party_category_image.jpeg"),"study" : require("../components/event_details_comps/Computer-Cat.jpg")}];




export default class Event_Details_Screen extends React.Component {
constructor(props) {
  super(props);
  this.state = {
    colorLike:'black', 
    colorGoing:'black',
    message:'No one was petting me',
  //  dataSource: ['row 1', 'row 2']
};
  id=this.props.navigation.state.params.id;
  category=events[id]['category'];
 //const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
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

     {/* <ListView
        dataSource={this.state.dataSource}
        renderRow={() => <Text>Hello</Text>}
      /> */}
     <View style={{ padding: 10 }}>
       <Text>Event name: {events[id]['title']}</Text>
       <Text>Date: {events[id]['start_at']}</Text>
       <Text>Category: {category}</Text>
       <Text>Address: {events[id]['address']}</Text>
       <Text></Text>
       <Text>{events[id]['description']}</Text>
       {/* <i class="fas fa-phone"></i> */}
       </View>
       <View style={styles.container}>
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
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})


