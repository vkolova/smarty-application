import React  from 'react';
import {
  View,
  Text,
  TextInput,
  ImageBackground
  } from 'react-native';
import { Icon } from 'react-native-elements';
import { Link } from 'react-router-native';
import { SecureStore } from 'expo';

import Input from './Input';
import request from '../request';
import { u } from '../utils';

import styles from '../styles/auth.js';
import common from '../styles/common';

class Login extends React.Component {
  state = {
    username: '',
    password: ''
  }

  onUsernameChange = text => this.setState({ username: text })

  onPasswordChange = text =>  this.setState({ password: text })

  onLoginPress = () => {
    request
      .post(
        `/accounts/login/`,
        {
          username: this.state.username,
          password: this.state.password
        }
      )
      .then(response => {
        const { token } = response.data;
        request.defaults.headers.common.Authorization = `Token ${token}`;
        SecureStore.setItemAsync('userToken', token, {
          keychainAccessible: SecureStore.WHEN_UNLOCKED
        })
        this.props.history.push('/home');
      })
      .catch(error => console.log(error));
  }

  render () {
    return (
      <View style={common.pageWrapper}>
       <View style={styles.header}>
          <Link to='/'>
            <Icon
              name='arrow-left'
              type='feather'
              iconStyle={styles.backIcon}
            />
          </Link>
          <Text style={styles.title}>
            { u('Вход') }
          </Text>
        </View>

        <View style={styles.form}>
          <Input
            icon='user'
            label='Потребител'
            onChangeText={this.onUsernameChange}
            value={this.state.username}
          />
          <Input
            icon='lock'
            label='Парола'
            onChangeText={this.onPasswordChange}
            value={this.state.password}
            additional={{
              'secureTextEntry': true
            }}
          />

          <Text
            style={common.btnPrim}
            onPress={this.onLoginPress}
          >{ u('Вход') }</Text>
        </View>
        
        <View style={styles.footer}>
          <Link to='/register' style={styles.bottomLink}>
            <Text>{ 'Нямаш профил?' }</Text>
          </Link>
        </View>
      </View>
    );
  }
}

export default Login;
