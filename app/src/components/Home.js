import React from 'react';
import {
  View,
  Text,
  ImageBackground
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Link } from 'react-router-native';

import Navigation from './Navigation';
import { u } from '../utils';
import common from '../styles/common';

import registerForPushNotificationsAsync from '../../registerForPushNotificationsAsync';

export default class Home extends React.Component {
  componentDidMount () {
    registerForPushNotificationsAsync()
  }

  render () {
    return (
      <React.Fragment>
        <ImageBackground source={require('../../assets/bg-2.png')} style={common.pageWithImage}>
          <View style={common.pageWrapper}>
            <View>
              <Text>Home screen</Text>

              <Text style={common.btnPrim}>
                { u('Викторина') }
              </Text>

              <Text style={common.btnPrim}>
                { u('Дуел') }
              </Text>
              
              <Link to='/'><Text>Splash screen</Text></Link>

            </View>
          </View>
        </ImageBackground>
        <Navigation/>
      </React.Fragment>
    );
  }
}