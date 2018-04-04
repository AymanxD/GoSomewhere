import React from 'react';
import { Text, View, Alert, Keyboard, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-material-ui';
import { TextField } from 'react-native-material-textfield';
import { COLOR } from 'react-native-material-ui';
import axios from 'axios';

export default class Comments_Screen extends React.Component {
  state = {
    message: '',
    message_length: 0,
    button_disabled:true
  };

  constructor(props) {
    super(props);
  }

  goBack() {
    Keyboard.dismiss();
    //we need to call onGoBack function passed here from the event screen, to update the event screen with the posted comment
    this.props.navigation.state.params.onGoBack(); 
    this.props.navigation.goBack();
  }

  render() {
    id=this.props.navigation.state.params.id;
    return (
      <View style={{ padding: 20 }}>
        <TouchableOpacity onPress={() => this.goBack()}>
          <Text style={{color: COLOR.blue500}}>{"< Back"}</Text>
        </TouchableOpacity>
        <TextField
          label='Leave a comment...'
          multiline = {true}
          maxLength={140}
          onChangeText={ (message) => {
            this.setState({ message: message, message_length: message.length});
            if (message.length > 0) {
              this.setState({button_disabled:false});
            }
            //https://medium.com/@arpith/disabling-buttons-in-react-native-dfd683c25634
            if (message.length==0) {
              this.setState({button_disabled:true});
            } //you cannot post empty comments
          }}
        />
        <Text>Remaining length is: {140-this.state.message_length}/140</Text>
          
        <Button raised primary
          text="Post"
          disabled={this.state.button_disabled}
          style={{ container: { marginTop: 20 }}}
          onPress={(message) => {
            //same when we disable button, so you cannot press it multiple times posting the same comment
            this.setState({ button_disabled: true }); 
            this.postComment();
          }}
        />
        
      </View>
    );
  };
 
  postComment() {
    //send to server
    axios.post('/events/'+id+'/comments', {
      comment: {
        content: this.state.message
      }
    })
    .then(async (response) => { //https://github.com/axios/axios/issues/1027
      //we can call goBack function only when receive reply about posted comment, to update the event view with the newly posted comment
      this.goBack(response)
    }).catch((error) => {
      if (error.response && error.response.data.errors) {
        Alert.alert("catching exception", JSON.stringify(error.response.data.errors));
      }
    }).done();
  }
};
