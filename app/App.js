import React from 'react';
import { StyleSheet, Text, View, AppRegistry, NetInfo  } from 'react-native';
import { NativeRouter, Route, Link } from 'react-router-native';
import { Font } from 'expo';

import { name as appName } from './app.json';  

import Login from './src/components/Login';
import Register from './src/components/Register';
import Home from './src/components/Home';
import Splash from './src/components/Splash';
import Settings from './src/components/Settings';
import Question from './src/components/Question';
import Offline from './src/components/Offline';


import { HOST } from './config';

export default class App extends React.Component {
    constructor () {
        super();
        this.state = {
            isConnected: true
        };

        // var chatSocket = new WebSocket('ws://' + HOST + '/test/');
    
        // chatSocket.onmessage = function(e) {
        //     var data = JSON.parse(e.data);
        //     var message = data['message'];
        //     console.log(message)
        // };
    
        // chatSocket.onclose = function(e) {
        //     chatSocket = new WebSocket('ws://' + HOST + '/test/');
        //     console.log('Chat socket closed unexpectedly');
        // };
    }    

    componentDidMount() {
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
                    <Route exact path="/" component={Splash} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />

                    <Route path="/home" component={Home} />
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
