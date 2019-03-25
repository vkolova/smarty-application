import React  from 'react';
import {
  View,
  Text,
  ImageBackground
  } from 'react-native';
import { Link } from 'react-router-native';
import { SecureStore } from 'expo';

import commonStyles from '../styles/common';
import styles from '../styles/splash';
import common from '../styles/common';


export default class Navigation extends React.Component {
  render () {
    return (
      <ImageBackground source={bg} style={commonStyles.pageWithImage}>
        <View style={styles.bottom}>
          <Link to='/register'>
              <Text style={commonStyles.btnPrim} onPress={this.onLoginPress}>
                  {'Регистрация'.toUpperCase()}
              </Text>
          </Link>
          
          <Link to='/login' style={styles.marginTop50}>
              <Text style={common.link}>Вече имам профил</Text>
          </Link>
        </View>
      </ImageBackground>
    );
  }
}
