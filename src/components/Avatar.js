import React from 'react';
import { Image } from 'react-native';

class Avatar extends React.Component {
    render () {
        return <Image
            source={{uri: this.props.url}}
            style={{
                width: this.props.size,
                height: this.props.size,
                borderRadius: this.props.size / 2,
                ...this.props.style,
            }}
        />
    }
}


export default Avatar;