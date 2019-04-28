import React from 'react';
import { StyleSheet, Text, View, AppRegistry, NetInfo  } from 'react-native';
import { NativeRouter, Route, Link } from 'react-router-native';
import Sentry from 'sentry-expo';

import { name as appName } from './app.json';  

import Login from './src/components/Login';
import Register from './src/components/Register';
import Home from './src/components/Home';
import Ranglist from './src/components/Ranglist';
import Splash from './src/components/Splash';
import Settings from './src/components/Settings';
import Question from './src/components/Question';
import Profile from './src/components/Profile';
import Offline from './src/components/Offline';

import { HOST } from './config';

Sentry.enableInExpoDevelopment = false;

Sentry.config('https://9eaadb8c901144cd9d52c9bde90663de@sentry.io/1434373').install();

export default class App extends React.Component {
    constructor () {
        super();
        this.state = {
            isConnected: true
        };

        // var ws = new WebSocket('ws://' + HOST + '/users/')

        // ws.onopen = () => {
        //     ws.send(JSON.stringify({ message: 'something' }))
        // }

        // ws.onmessage = (e) => {
        //     console.log(e.data)
        // }

        // ws.onerror = (e) => {
        //     console.log(JSON.parse(e.message))
        // }

        // ws.onclose = (e) => {
        //     console.log(e.code, e.reason)
        // }
    }    

    componentDidMount () {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    handleConnectivityChange = isConnected => this.setState({ isConnected });

    render () {
        return (
            <NativeRouter>
                <View style={styles.container}>
                    <Route exact path='/' component={Splash} />
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />

                    <Route path='/home' component={Home} />
                    <Route path='/ranglist' component={Ranglist}/>
                    <Route path='/profile/:id/' component={Profile}/>
                    <Route path='/settings' component={Settings}/>

                    {
                        !this.state.isConnected &&
                        <Offline/>
                    }
                </View>
            </NativeRouter>
        );
    }
}

AppRegistry.registerComponent(appName, () => App);

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    }
});
