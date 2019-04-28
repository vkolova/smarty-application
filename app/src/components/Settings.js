import React from 'react';
import {
  View,
  Text
} from 'react-native';
import { Link } from 'react-router-native';
import { Icon } from 'react-native-elements';
import { SecureStore } from 'expo';

import Navigation from './Navigation';
import Header from './Header';

import { u } from '../utils';
import request from '../request';

import common from '../styles/common';
import styles from '../styles/settings';


export default class Settings extends React.Component {
    logout = () => {
        SecureStore.deleteItemAsync('user');
        request
            .get(`/api/accounts/logout/`)
            .then(() => {
                this.props.history.push('/');
            })
            .catch(error => console.log(error));
    };

    render () {
        return (
            <React.Fragment>
                <View style={common.pageWrapper}>
                    <Header
                        link='/'
                        title='Настройки'
                    />

                    <View style={styles.settingsWrapper}>
                        <View style={styles.setting}><Text>Изход</Text></View>
                        <View style={styles.setting}><Text>Изход</Text></View>
                        <View style={styles.setting}><Text>Изход</Text></View>
                        <View style={styles.setting}><Text>Изход</Text></View>

                        <View style={styles.setting} onPress={this.logout}>
                            <Icon
                                name='log-out'
                                type='feather'
                                iconStyle={styles.icon}
                            />
                            <Text onPress={this.logout}>{ u('Изход') }</Text>
                        </View>
                    </View>
                </View>
                <Navigation/>
            </React.Fragment>
        );
    }
}