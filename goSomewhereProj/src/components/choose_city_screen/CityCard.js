import React from 'react';
import { Text, View, Image } from 'react-native';

const CityCard = (props) => {
    return(
        <View>
            <Image source={props.image} style={{ width: 200, height: 200, borderRadius: 50}} />
            <Text>{props.title}</Text>
        </View>
    );
};

export default CityCard;
