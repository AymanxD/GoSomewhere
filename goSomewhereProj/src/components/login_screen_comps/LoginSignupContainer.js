import React from 'react';
import { Text, View } from 'react-native';

import globalStyle from '../../styles/Global_Container_Style';

const LoginSignupContainer = (props) => {
    return(


        <View  style={globalStyle.globalContainerStyle}>
            {props.children}
        </View>
    );
};

export default LoginSignupContainer;
