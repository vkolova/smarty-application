import React from 'react';
import {
  View,
  Text
} from 'react-native';
import { Icon } from 'react-native-elements';

import { u } from '../utils';
import common from '../styles/common';
import styles from '../styles/offline';


export default class Offline extends React.Component {
  render () {
    return (
        <View style={{ ...common.pageWrapper, ...styles.page }}>
            <View style={styles.message}>
                <Icon
                    name='wifi-off'
                    type='feather'
                    iconStyle={styles.icon}
                />

                <View style={styles.textWrapper}>
                    <Text style={styles.prim}>{ u('Опа!')}</Text>
                    <Text style={styles.sec}>{ 'Изглежда нямаш връзка с Интернет. Вържи се към Мрежата и пробвай отново!' }</Text>
                </View>
          </View>
        </View>
    );
  }
}