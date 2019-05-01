import React from 'react';
import {
  View,
  Text
} from 'react-native';
import { Icon } from 'react-native-elements';

import { u } from '../utils';
import common from '../styles/common';
import styles from '../styles/message-screen';


export default class MessageScreen extends React.Component {
  render () {
    return (
        <View style={{ ...common.pageWrapper, ...styles.page }}>
            <View style={styles.message}>
                <Icon
                    name={this.props.icon}
                    type='feather'
                    iconStyle={styles.icon}
                />

                <View style={styles.textWrapper}>
                    <Text style={styles.prim}>{ u(this.props.title)}</Text>
                    <Text style={styles.sec}>{ this.props.body }</Text>
                </View>
          </View>
        </View>
    );
  }
}