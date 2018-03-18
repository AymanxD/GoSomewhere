import React from 'react';
import { Dialog,
} from 'react-native';



export default class FilterModel extends React.Component {


    render() {
        return (
            <Modal isVisible={true} style={styles.modal}>
                <View style={{ flex: 1 }}>
                    <Text>Hello!</Text>
                </View>
            </Modal>
        );
    }
}


