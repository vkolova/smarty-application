import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableWithoutFeedback
} from 'react-native';
import { SecureStore } from 'expo';

import Navigation from './Navigation';

import { u } from '../utils';
import request from '../request';

import common from '../styles/common';
import styles from '../styles/profile';

class Profile extends React.Component {
    state = {
        loading: true,
        data: null,
        showPlayBtn: false
    }

    componentDidMount () {
        request
            .get(`/api/player/${this.props.match.params.id}/`)
            .then(response => {
                this.setState({ data: response.data });
            })
            .catch(error => console.log(error))
            .then(() => {
                this.setState({ loading: false });
            })

        SecureStore.getItemAsync('user')
            .then(user => {
                if (user) {
                    user = JSON.parse(user)
                    if (user.id != this.props.match.params.id) {
                        this.setState({ showPlayBtn: true })
                    } 
                }
            })
            .catch(err => console.log(err))
    }

    invite = () => {
        request
        .post('/api/games/', {
            opponent: this.props.match.params.id
        })
        .then(result => {
            this.props.history.push(`/game/${result.data.channel}/`)
        })
        .catch(error => console.log(error))
    }

    render () {
        const { loading, data, showPlayBtn } = this.state;

        if (loading || !data) {
            return <React.Fragment>
                <Text>{'LOADING...'}</Text>
                <Navigation/>
            </React.Fragment>
        }

        const { avatar, level, score, games, streak, wins } = data;
        const { username } = data.user;
        
        return <React.Fragment>
            <View style={common.pageNoPadding}>
                <Image source={{uri: avatar}} style={styles.avatar} />
                
                <View style={styles.whitePanel}>
                    <Text style={styles.username}>{ username }</Text>
                    <View style={styles.mainInfo}>
                        <View style={styles.mainInfoCard}>
                            <Text>{ level }</Text>
                            <Text>{ u('Ниво') }</Text>
                        </View>
                        <View style={styles.vl}/>
                        <View style={styles.mainInfoCard}>
                            <Text>{ games }</Text>
                            <Text>{ u('игри') }</Text>
                        </View>
                        <View style={styles.vl}/>
                        <View style={styles.mainInfoCard}>
                            <Text>{ streak }</Text>
                            <Text>{ u('поред') }</Text>
                        </View>
                    </View>

                    <View>
                        {
                            showPlayBtn &&
                            <TouchableWithoutFeedback onPress={this.invite}>
                                <View style={common.btnPrim}>
                                    <Text style={common.btnPrimText}>{ u('играй') }</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        }
                    </View>
                </View>
            </View>
            <Navigation/>
        </React.Fragment>
    }
};

export default Profile;