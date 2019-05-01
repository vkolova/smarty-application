import React  from 'react';
import {
  Animated,
  TextInput,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';

import { u } from '../utils';
import styles from '../styles/auth.js';

export default class Input extends React.Component {
    constructor () {
        super();
        this.state = {
            isFocused: false,
            animation: new Animated.Value(0)
        };
    }

    componentDidUpdate () {
        Animated.timing(this.state.animation,
            {
                toValue: this.state.isFocused || this.props.value ? 1 : 0,
                duration: 200,
            }
        ).start(); 
      }

    handleFocus = () => this.setState({ isFocused: true });
    handleBlur = () => this.setState({ isFocused: false });

    render () {
        const { isFocused } = this.state;
    
        const labelStyle = {
            ...styles.label,
            bottom: this.state.animation.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 40],
            }),
            fontSize: this.state.animation.interpolate({
                inputRange: [0, 1],
                outputRange: [15, 11],
            }),
            color: this.state.animation.interpolate({
                inputRange: [0, 1],
                outputRange: ['#707070', '#aaa'],
            })
        };

        return (
            <View style={styles.inputWrapper}>
                <Icon
                    name={this.props.icon}
                    type='feather'
                    iconStyle={styles.icon}
                />
                <Animated.Text style={labelStyle}>{ u(this.props.label) }</Animated.Text>
                <TextInput
                    {...this.props.additional}
                    autoCorrect={false}
                    onChangeText={this.props.onChangeText}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    value={this.props.value}
                    style={styles.input}
                    blurOnSubmit      
                />
            </View>
        );
    }
}