import React  from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground
} from 'react-native';
import { Link } from 'react-router-native';
import { SecureStore } from 'expo';
import logo from '../../assets/icon.png';

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
        SecureStore.setItemAsync('user', JSON.stringify(response.data), {
          keychainAccessible: SecureStore.WHEN_UNLOCKED
        })
        this.props.history.push('/home');
      })
      .catch(error => console.log(error));
  };

  render () {
    return (
        <View style={common.pageWrapper}>
          <View style={styles.logoWrapper}>
            <Image source={logo} style={{ width: 50, height: 50 }}/>
          </View>

          <View style={styles.form}>
            <Header
              link='/'
              title='Регистрация'
            />
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

            <Text style={common.btnPrim} onPress={this.onRegister}>{ u('Регистрация') }</Text>
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
