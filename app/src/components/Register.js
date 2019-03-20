import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import axios from 'axios';

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
      <View style={{
        display: 'flex',
        justifyContent: 'center'
      }}>
        <Text>Регистрация</Text>
        <TextInput
          placeholder='Потребителско име'
          autoCorrect={false}
          onChangeText={this.onUsernameChange}
          style={styles.input}
        />
        <TextInput
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          placeholder='Парола'
          onChangeText={this.onPasswordChange}
          style={styles.input}
        />
        {/* <Text style={{ color: 'blue' }} onPress={() => {}}>
          {'Започни да играеш!'}
        </Text>
        <Text>
          или
          <Text style={{ color: 'blue' }} onPress={() => {}}>
            {'Влез'}
          </Text>
        </Text>   */}

          <Link to='/login' style={styles.navItem}>
            <Text>Имаш регистрация?</Text>
          </Link>
      </View>
    );
  }
}

export default Register;

const styles = StyleSheet.create({
  input: {
    minWidth: 80,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 3,
    paddingBottom: 3,
    marginBottom: 5,
    borderRightWidth: 3,
    borderLeftWidth: 3,
    borderColor: '#49403B',
    backgroundColor: '#DCDCDA'
  }
});