import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback
} from 'react-native';
import { SecureStore } from 'expo';

import Navigation from './Navigation';
import Avatar from './Avatar';
import Header from './Header';

import { u } from '../utils';
import request from '../request';

import common from '../styles/common';
import styles from '../styles/settings';

class ChooseAvatar extends React.Component {
    chooseThisAvatar = () => {
        const { user, url } = this.props

        request
            .patch(
                `/api/player/${user.user.id}/`,
                { avatar: url }
            )
            .then(res => {
                const userData = {
                    ...user
                };
                userData.user.avatar = url;

                SecureStore.setItemAsync('user', JSON.stringify(userData), {
                    keychainAccessible: SecureStore.WHEN_UNLOCKED
                })
                .then(() => {
                    this.props.parent.loadUserData();
                })
            })
    }

    render () {
        const { url, user } = this.props;
        const isSelected = url === user.user.avatar;
        const styles = isSelected
        ? {
            borderWidth: 3,
            borderColor: '#00a651'
        }
        : {}

        return <TouchableWithoutFeedback onPress={this.chooseThisAvatar}>
            <View>
                <Avatar url={url} size={50} style={styles}/>
            </View>
        </TouchableWithoutFeedback>
    }
}

export default class Settings extends React.Component {
    state = {
        user: null
    }
    
    componentDidMount () {
        this.loadUserData()
    }

    loadUserData = () => {
        SecureStore.getItemAsync('user')
            .then(user => {
                if (user) {
                    user = JSON.parse(user)
                    this.setState({ user })
                }
            })
            .catch(err => console.log(err))
    }
    
    logout = () => {
        SecureStore.deleteItemAsync('user')
            .then(() => {
                this.props.history.push('/');
            });

        request
            .get(`/api/accounts/logout/`)
            .then(() => {})
            .catch(error => console.log(error));
    };

    render () {
        const avatars = [
            'http://prikachi.com/images/569/9566569j.png',
            'http://prikachi.com/images/568/9566568v.png'
        ];

        return (
            <React.Fragment>
                <View style={common.pageWrapper}>
                    <Header
                        link='/'
                        title='Настройки'
                    />
    
                    <View>               
                        <View style={styles.setting}>
                            <Text>{ u('аватар') }</Text>
                        </View>

                        <View style={{ width: '100%', display: 'flex',  flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                            {
                                this.state.user &&
                                avatars.map(a => <ChooseAvatar key={a} url={a} user={this.state.user} parent={this}/>)
                            }
                        </View>
                    </View>
                    

                    <View style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableWithoutFeedback onPress={this.logout}>
                            <View style={{...common.btnPrim, maxWidth: '70%'}}>
                                <Text style={common.btnPrimText}>{ u('изход') }</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>

                <Navigation/>
            </React.Fragment>
        );
    }
}