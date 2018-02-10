import React from 'react';
import {Text} from 'react-native';
import {View, Image, ScrollView, Button, Alert} from 'react-native';
import globalContainerStyle  from '../styles/Global_Container_Style'


export default class Event_Details_Screen extends React.Component {



    render() {

      return (
    <View style={{
       flex:1,
       flexDirection: 'column',
       justifyContent: 'space-around',
     }}>
    <ScrollView>
    <View>


    </View>
     <Text>ONE</Text>
     <Text>TWO</Text>
     <Text>ONE</Text>
     <Text>ONE</Text>
     <Text>TWO</Text>
     <Text>ONE</Text>
     <Text>ONE</Text>
     <Text>TWO</Text>
     <Text>ONE</Text>
     <Text>ONE</Text>
     <Text>TWO</Text>
     <Text>ONE</Text>
     <Text>ONE</Text>
     <Text>TWO</Text>
     <Text>ONE</Text>
     <Text>ONE</Text>
     <Text>TWO</Text>
     <Text>ONE</Text>
     <Text>ONE</Text>
     <Text>TWO</Text>
     <Text>ONE</Text>
     <Text>ONE</Text>
     <Text>TWO</Text>
     <Text>ONE</Text>
     <Text>ONE</Text>
     <Text>TWO</Text>
     <Text>ONE</Text>
     <Text>ONE</Text>
     <Text>TWO</Text>
     <Text>ONE</Text>
     <Text>ONE</Text>
     <Text>TWO</Text>
     <Text>ONE</Text>
     <Text>ONE</Text>
     <Text>TWO</Text>
     </ScrollView>
            <View style={{
              height:50,
               flexDirection: 'row',
               //justifyContent: 'space-around'
             }}>

             <Button style={{flex:1, alignSelf: 'stretch'}}
              onPress={() => {
              Alert.alert('You tapped the button!');
              }}
              title="Call"
              />
             <Button style={{flex:1, alignSelf: 'stretch'}}
              onPress={() => {
              Alert.alert('You tapped the button!');
              }}
              title="Direction"
              />
             <Button style={{flex:1, alignSelf: 'stretch'}}
              onPress={() => {
              Alert.alert('You tapped the button!');
              }}
              title="WWW"
              />
            </View>
     </View>
      );
  };
};
