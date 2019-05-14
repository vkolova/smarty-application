import React from 'react';
import {
    View,
    Text
} from 'react-native';
import * as Progress from 'react-native-progress';

export default class Loading extends React.Component {
    render () {
        return <View
            style={{
                width: '100%',
                top: '45%',
                height: '50%',
                display: 'flex', 
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'center',
                textAlign: 'center',
                alignContent: 'center'
            }}
        >
            <Progress.Circle size={100} indeterminate={true} color={'#00a651'} borderWidth={3}/>
        </View>
    }
}