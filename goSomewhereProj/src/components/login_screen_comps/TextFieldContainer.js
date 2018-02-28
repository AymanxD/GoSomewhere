import React from 'react';
import { Text, View } from 'react-native';

import globalStyle from '../../styles/Global_Container_Style';

const TextFieldContainer = (props) => {
    return(


        <View style={globalStyle.textInputContainer}>
            {props.children}
        </View>
    );
};

export default TextFieldContainer;
