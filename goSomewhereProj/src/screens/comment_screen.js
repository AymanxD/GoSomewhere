import React from 'react';
import {Text} from 'react-native';
import {View, Image, ScrollView, Alert, Dimensions, Linking, Share, TouchableOpacity, TouchableHighlight} from 'react-native';
//import globalContainerStyle  from '../styles/Global_Container_Style';
import { Button } from 'react-native-material-ui';
import { TextField } from 'react-native-material-textfield';

//import { TextField } from 'react-native-material-textfield';

//onst events = [{"id":1,"title":"Android Hackathon","category":"study","description":null,"start_at":"2018-02-23T14:10:52.773Z","end_at":"2018-02-23T20:12:37.044Z","attendees":null,"created_at":"2018-02-10T18:12:44.050Z","updated_at":"2018-02-10T18:12:44.050Z","latitude":44.6374257,"longitude":-63.5872094,"address":"Goldberg Computer Science Building, 6050 University Ave, Halifax, NS B3H 1W5"},{"id":2,"title":"Party after winning Hackathon","category":"party","description":"Please bring your own drink","start_at":"2018-02-11T22:19:45.595Z","end_at":null,"attendees":null,"created_at":"2018-02-10T18:21:52.274Z","updated_at":"2018-02-10T18:21:52.274Z","latitude":44.6386448,"longitude":-63.5919118,"address":"H-1422B, 6230 Coburg Road, Halifax, NS, B3h4R2"}];

//const image_categories = [{"party":"party_category_image.jpg","study":"Computer-Cat.jpg"}];

//pressedLike='black';
//pressedGoing='black';

//https://stackoverflow.com/questions/37841236/render-images-sources-from-parsed-array-of-objects-in-react-native
//images = [{"party":require("../components/event_details_comps/party_category_image.jpeg"),"study" : require("../components/event_details_comps/Computer-Cat.jpg")}];
const events = [{"id":1,"title":"Android Hackathon","category":"study","description":null,"start_at":"2018-02-23T14:10:52.773Z","end_at":"2018-02-23T20:12:37.044Z","attendees":null,"created_at":"2018-02-10T18:12:44.050Z","updated_at":"2018-02-10T18:12:44.050Z","latitude":44.6374257,"longitude":-63.5872094,"address":"Goldberg Computer Science Building, 6050 University Ave, Halifax, NS B3H 1W5"},{"id":2,"title":"Party after winning Hackathon","category":"party","description":"Please bring your own drink","start_at":"2018-02-11T22:19:45.595Z","end_at":null,"attendees":null,"created_at":"2018-02-10T18:21:52.274Z","updated_at":"2018-02-10T18:21:52.274Z","latitude":44.6386448,"longitude":-63.5919118,"address":"H-1422B, 6230 Coburg Road, Halifax, NS, B3h4R2"}];




export default class Comments_Screen extends React.Component {
constructor(props) {
  super(props);
 // this.state = {colorLike:'black', colorGoing:'black'};
  id=this.props.navigation.state.params.id;
 // category=events[id]['category'];

}
state = {
  message: '',
};

    render() {
      let {phone} = this.state;
      return (

        <View>        
            <TextField
        label='Leave a comment...'
        multiline = {true}
        onChangeText={ (message) => this.setState({message}) }/>
        <Button raised primary text="Post" onPress={() => this.props.navigation.navigate('Event', {id:0})} />    
        </View>
      );
   };
};
