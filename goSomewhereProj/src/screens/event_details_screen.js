import React from 'react';
import {Text} from 'react-native';
import {View} from 'react-native';



export default class Event_Details_Screen extends React.Component {



    render() {

      return (
    <View style={{
       flex: 1,
       flexDirection: 'row',
       justifyContent: 'space-around',
     }}>
       <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
       <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
       <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
     </View>
      );
  };
};
