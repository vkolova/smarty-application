import React  from 'react';
import {
  View,
  Text,
  TextInput,
  ImageBackground
  } from 'react-native';
import { Icon } from 'react-native-elements';
import { Link } from 'react-router-native';
import axios from 'axios';

import bg from '../../assets/teodor-kuduschiev-1163518-unsplash.jpg';

import styles from '../styles/auth.js';

const instance = axios.create({
  baseURL: 'http://192.168.1.103:8000',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json'
  }
});

class Login extends React.Component {
  state = {
    username: '',
    password: ''
  }

  onUsernameChange = text => this.setState({ username: text })

  onPasswordChange = text =>  this.setState({ password: text })

  onLoginPress = () => {
    instance
      .post(
        `/accounts/login/`,
        {
          username: this.state.username,
          password: this.state.password
        }
      )
      .then(response => {
        const { token, user } = response.data;
        axios.defaults.headers.common.Authorization = `Token ${token}`;
        console.log(response.data);
        this.props.history.push('/home');
      })
      .catch(error => console.log(error));
  }

  render () {
    return (
      <ImageBackground source={bg} style={styles.image}>
        <View style={styles.inputWrapper}>
          <Icon
            name='user'
            type='feather'
            iconStyle={styles.icon}
          />
          <TextInput
            placeholder='Потребителско име'
            autoCorrect={false}
            onChangeText={this.onUsernameChange}
            style={styles.input}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Icon
            name='lock'
            type='feather'
            iconStyle={styles.icon}
          />
          <TextInput
            secureTextEntry
            autoCapitalize='none'
            autoCorrect={false}
            placeholder='Парола'
            onChangeText={this.onPasswordChange}
            style={styles.input}
          />
        </View>

        <Text style={styles.actionBtn} onPress={this.onLoginPress}>Вход</Text>

        <Link to='/register' style={styles.bottomLink}><Text>Нямаш регистрация?</Text></Link>
      </ImageBackground>
    );
  }
}

export default Login;
