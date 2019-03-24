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

        <Text style={styles.actionBtn} onPress={this.onLoginPress}>Регистрация</Text>

        <Link to='/' style={styles.bottomLink}><Text>Имаш регистрация?</Text></Link>
      </ImageBackground>
    );
  }
}

export default Register;
