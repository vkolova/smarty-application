import React  from 'react';
import {
  View,
  Text
} from 'react-native';
import { Link } from 'react-router-native';

import Header from './Header';
import Input from './Input';

import { u } from '../utils';
import request from '../request';

import styles from '../styles/auth';
import common from '../styles/common';


class Register extends React.Component {
  state = {
    username: '',
    password: ''
  }

  onUsernameChange = text => this.setState({ username: text })

  onPasswordChange = text =>  this.setState({ password: text })

  onRegister = () => {
    request.defaults.headers.common.Authorization = null;
    request
      .post(
        `/api/accounts/register/`,
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
  };

  render () {
    return (
      <View style={common.pageWrapper}>
        <Header
          link='/'
          title='Регистрация'
        />

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
              secureTextEntry: true
            }}
          />

          <Text style={common.btnPrim} onPress={this.onLoginPress}>{ u('Регистрация') }</Text>
        </View>
      
        <View style={styles.footer}>
          <Link to='/login' style={styles.bottomLink}>
            <Text>Имаш профил?</Text>
          </Link>
        </View>
      </View>
    );
  }
}

export default Register;
