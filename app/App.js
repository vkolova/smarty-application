import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NativeRouter, Route, Link } from "react-router-native";

import Login from './src/components/Login';
import Register from './src/components/Register';
import Home from './src/components/Home';

export default class App extends React.Component {
  render() {
    return (
        <NativeRouter>
          <View style={styles.container}>
            {/* <View style={styles.nav}>
              <Link to="/" style={styles.navItem}>
                <Text>Регистрация</Text>
              </Link>
              <Link to="/login" style={styles.navItem}>
                <Text>Вход</Text>
              </Link>
            </View> */}

            <Route exact path="/" component={Login} />
            <Route path="/register" component={Register} />

            <Route exact path="/home" component={Home} />
          </View>
        </NativeRouter>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  }
});
