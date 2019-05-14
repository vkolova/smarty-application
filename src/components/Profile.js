import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableWithoutFeedback
} from 'react-native';
import { SecureStore } from 'expo';

import Navigation from './Navigation';
import Loading from './Loading';

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
                    if (user.user.id != this.props.match.params.id) {
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
                <Loading/>
                <Navigation/>
            </React.Fragment>
        }

        const { avatar, level, score, games, streak, wins } = data;
        const { username } = data.user;

        const percentageWins = (wins / games) * 100
        const percentageLoses = 100 - percentageWins
        
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

                    <View
                        style={{
                            width: '100%',
                            height: '30%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        {
                            showPlayBtn &&
                            <TouchableWithoutFeedback onPress={this.invite}>
                                <View style={{ ...common.btnPrim, backgroundColor: '#00a651', maxWidth: '50%', height: 40, marginBottom: 30 }}>
                                    <Text style={common.btnPrimText}>{ u('играй') }</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        }

                        <View style={{ width: '100%', height: 30, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'center', paddingLeft: 15}}>
                                <Text>{ 'победи' }</Text>
                            </View>
                            <View style={{ width: '96%', height: 10, display: 'flex', flexDirection: 'row', borderRadius: 15, overflow: 'hidden' }}>
                                <View style={{ height: '100%', width: `${percentageWins}%`,  backgroundColor: '#0aff0a' }}></View>
                                <View style={{ height: '100%', width: `${percentageLoses}%`, backgroundColor: '#ff000a' }}></View>
                            </View>
                            <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignContent: 'center', paddingRight: 15}}>
                                <Text >{ 'загуби' }</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <Navigation/>
        </React.Fragment>
    }
};

export default Profile;