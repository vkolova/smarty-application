import React from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';

import Navigation from './Navigation';

import { u } from '../utils';
import request from '../request';

import common from '../styles/common';
import styles from '../styles/profile';

class Profile extends React.Component {
    state = {
        loading: true,
        data: {}
    }

    componentDidMount () {
        request.get(`/api/player/${this.props.match.params.id}/`)
        .then(response => {
            console.log(response.data);
            this.setState({ data: response.data });
        })
        .catch(error => console.log(error))
        .then(() => {
            this.setState({ loading: false });
        })
    }

    render () {
        if (this.state.loading || !this.state.data) {
            return <React.Fragment>
                <Text>{'LOADING...'}</Text>
                <Navigation/>
            </React.Fragment>
        }

        const { avatar, level, score, games, streak, wins } = this.state.data;
        const { username } = this.state.data.user;
        
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
                </View>
            </View>
            <Navigation/>
        </React.Fragment>
    }
};

export default Profile;