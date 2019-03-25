import React from 'react';
import { StyleSheet, Text, View, AppRegistry  } from 'react-native';

import { NativeRouter, Route, Link } from 'react-router-native';

import { name as appName } from "./app.json";  
AppRegistry.registerComponent(appName, () => App);

import Login from './src/components/Login';
import Register from './src/components/Register';
import Home from './src/components/Home';
import Splash from './src/components/Splash';


export default class App extends React.Component {
  render () {
    return (
        <NativeRouter>
          <View style={styles.container}>
            <Route exact path="/" component={Splash} />
            <Route path="/login" component={Login} />
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
