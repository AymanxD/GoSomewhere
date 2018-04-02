import React from 'react';

import { BottomNavigation } from 'react-native-material-ui';


export default class MenuBar extends React.Component {

  render() {
    return (
        <BottomNavigation hidden={false} >
            <BottomNavigation.Action
                key= {this.props.buttonLeft.key}
                icon= {this.props.buttonLeft.icon}
                label= {this.props.buttonLeft.label}
                onPress= {this.props.buttonLeft.onPress}
            />
            <BottomNavigation.Action
                key= {this.props.buttonCenter.key}
                icon= {this.props.buttonCenter.icon}
                label= {this.props.buttonCenter.label}
                onPress= {this.props.buttonCenter.onPress}
            />
            <BottomNavigation.Action
                key= {this.props.buttonRight.key}
                icon= {this.props.buttonRight.icon}
                label= {this.props.buttonRight.label}
                onPress= {this.props.buttonRight.onPress}
            />
        </BottomNavigation>

    );
  }
}


