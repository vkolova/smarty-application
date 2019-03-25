import React from 'react';
import {
  View,
  Text
} from 'react-native';
import { Link } from 'react-router-native';

import common from '../styles/common';


export default class Home extends React.Component {
  render () {
    return (
      <View style={common.pageWrapper}>
        <Text>Home screen</Text>
        <Link to='/'><Text>Splash screen</Text></Link>
      </View>
    );
  }
}