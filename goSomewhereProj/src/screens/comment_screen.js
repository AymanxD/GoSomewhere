import React from 'react';
import {Text} from 'react-native';
import {View, Alert, Keyboard} from 'react-native';
import { Button } from 'react-native-material-ui';
import { TextField } from 'react-native-material-textfield';
import axios from 'axios';

export default class Comments_Screen extends React.Component {
constructor(props)
  {
    super(props);
  }
state = {
  message: '',
  message_length: 0,
  button_disabled:true,

};

goBack()
  {
    Keyboard.dismiss();
    this.props.navigation.state.params.onGoBack(); //we need to call onGoBack function passed here from the event screen, to update the event screen with the posted comment
    this.props.navigation.goBack();
  }

render()
  {
    id=this.props.navigation.state.params.id;
    return (

        <View>
            <TextField
        label='Leave a comment...'
        multiline = {true}
        maxLength={140}
        onChangeText={ (message) => {this.setState({message:message});this.setState({message_length:message.length});
        if (message.length>0) {this.setState({button_disabled:false});} //https://medium.com/@arpith/disabling-buttons-in-react-native-dfd683c25634
        if (message.length==0) {this.setState({button_disabled:true});} //you cannot post empty comments

       }}/>
        <Button raised primary text="Post" disabled={this.state.button_disabled} onPress=
          {
            (message) =>
              {
                  this.setState({button_disabled:true}); //same when we disable button, so you cannot press it multiple times posting the same comment
                  this.postComment();
              }
          }
        />
        <Text>Remaining length is: {140-this.state.message_length}/140</Text>
        </View>
      );
   };
   postComment = () => {
     //send to server
     axios.post('/events/'+id+'/comments', {
       comment: {
         content: this.state.message
       }
     })
     .then(async (response) => { //https://github.com/axios/axios/issues/1027
      this.goBack(response) //we can call goBack function only when receive reply about posted comment, to update the event view with the newly posted comment
     }).catch((error) => {
       if (error.response && error.response.data.errors) {
         Alert.alert("catching exception", JSON.stringify(error.response.data.errors));
       }
     }).done();
   }
};
