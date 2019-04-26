import React from 'react';
import {
  View,
  Text
} from 'react-native';
import { Link } from 'react-router-native';

import Navigation from './Navigation';
import { u } from '../utils';
import common from '../styles/common';


export default class Home extends React.Component {
  render () {
    return (
      <React.Fragment>
        <View style={common.pageWrapper}>
          <View>
            <Text>Home screen</Text>
            <Link to='/'><Text>Splash screen</Text></Link>

          </View>
        </View>
        <Navigation/>
      </React.Fragment>
    );
  }
}