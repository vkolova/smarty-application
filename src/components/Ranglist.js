import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity 
} from 'react-native';
import { Link } from 'react-router-native';
import { SecureStore } from 'expo';

import Loading from './Loading';
import Navigation from './Navigation';
import Avatar from './Avatar';
import request from '../request';

import { u } from '../utils';

import common from '../styles/common';

const User = props => {
    const { avatar, id, level } = props.data
    const { username } = props.data.user
    const i = props.index

    return <Link component={TouchableOpacity} to={`/profile/${id}/`}>
        <View
            style={{
                marginVertical: 10,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
            }}
            key={id}
        >
            <Text style={{ marginRight: 10 }}>{ `${i + 1}.` }</Text>
            <Avatar
                url={avatar}
                size={50}
            />
            <View style={{ marginLeft: 15 }}>
                <Text>{ username }</Text>
                <Text style={{ color: '#707070', fontSize: 11 }}>{ `${level} ${ u('ниво') }`}</Text>
            </View>
        </View>
    </Link>
}

class Ranglist extends React.Component {
    state = {
        loading: true,
        data: null,
        user: null
    }

    componentDidMount () {
        this.loadUserData();
        request
            .get(`/api/players/`)
            .then(response => {
                this.setState({ data: response.data });
            })
            .catch(error => console.log(error))
            .then(() => this.setState({ loading: false }))
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

    render () {
        if (this.state.loading || !this.state.data) {
            return <React.Fragment>
                <Loading/>
                <Navigation/>
            </React.Fragment>
        }

        return  <React.Fragment>
            <View style={common.pageList}>
                <View style={{ paddingTop: 15, paddingLeft: 15, paddingRight: 15, paddingBottom: 15, display: 'flex' }}>
                    <Text style={{ fontSize: 32, marginTop: '3%' }}>{ u('Класация') }</Text>
                </View>

                {
                    this.state.data && this.state.data.players
                        .map((p, i) =>
                            <User data={p} key={p.id} index={i}/>
                        )
                }

                {
                    console.log(this.state.user)
                }
                {
                    this.state.data && this.state.user &&
                    <View style={{ paddingTop: '15%' }}>
                        <View style={{ paddingTop: 15, paddingLeft: 15, paddingRight: 15, paddingBottom: 15, display: 'flex' }}>
                            <Text style={{ fontSize: 22, marginTop: '3%' }}>{ u('твоята позиция') }</Text>
                        </View>
                        <User data={this.state.user.user} key={this.state.user.user.id} index={this.state.data.you}/>
                    </View>
                }

            </View>
            <Navigation/>
        </React.Fragment>
    }
};

export default Ranglist;