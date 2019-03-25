import React  from 'react';
import {
  View,
  Text,
  TextInput,
  ImageBackground
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Link } from 'react-router-native';

import Input from './Input';

import { u } from '../utils';
import styles from '../styles/auth';
import common from '../styles/common';


class Register extends React.Component {
  state = {
    username: '',
    password: ''
  }

  onUsernameChange = text => this.setState({ username: text })

  onPasswordChange = text =>  this.setState({ password: text })

  onRegister = () => {};

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
          <Text style={styles.title}>{ u('Регистрация') }</Text>
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
