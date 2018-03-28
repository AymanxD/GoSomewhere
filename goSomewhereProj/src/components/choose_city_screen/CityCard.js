import React from 'react';
import { Text, View, Image } from 'react-native';

const CityCard = (props) => {
    return(
        <View>
            <Text style={{fontSize: 40}} >{props.title}</Text>
            <Image source={props.image} style={{ width: 200, height: 200, borderRadius: 50}} />            
        </View>
    );
};

export default CityCard;
