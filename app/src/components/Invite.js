import React from 'react';

import {
    View,
    Text,
    Image,
    TouchableWithoutFeedback
} from 'react-native';
import { Icon } from 'react-native-elements';
import { withRouter } from 'react-router-native';
import { SecureStore } from 'expo';

import { u } from '../utils';
import request from '../request';

import common from '../styles/common';
import styles from '../styles/invite';

class Invitation extends React.Component {
    state = {
        user: null
    }

    componentDidMount () {
        SecureStore.getItemAsync('user')
            .then(user => {
                if (user) {
                    user = JSON.parse(user)
                    this.setState({ user })
                }
            })
            .catch(err => console.log(err))
    }

    accept = () => {
        // const { channel } = this.props.notification.data
        this.props.parent.setState({ notification: null })
        const channel = '9393a4f9-c908-4be0-8567-19e55daaa456'
        this.props.history.push(`/game/${channel}/`)
    }

    decline = () => {
        const socketURL = `ws://${HOST}/ws/game/${this.state.user.token}/${uuid}/`;
        this.ws = new WebSocket(socketURL)

        this.ws.onopen = () => {
            this.ws.send(JSON.stringify({ type: 'game_connect', data: 'no', user: 'vkolova' }))
            this.props.parent.setState({ notification: null })
        }
    }

    render () {
        const { avatar, username } = this.props.notification.data.invited_by

        return <View style={{ ...common.pageNoPadding, position: 'absolute', top: 0, left: 0, backgroundColor: '#ffffff'}}>
                <View style={styles.message}>
                    <Image source={{uri: avatar}} style={styles.avatar} />

                    <View style={styles.textWrapper}>
                    <Text style={styles.prim}>{ u(`${username} те кани на игра.`)}</Text>
                        <Text style={styles.sec}>{ `Приемаш ли?` }</Text>
                    </View>

                    <View>
                        <TouchableWithoutFeedback onPress={this.accept}>
                            <View style={{...common.btnPrim, backgroundColor: '#0aff0a'}}>
                                <Text style={common.btnPrimText}>{ u('да') }</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={this.decline}>
                            <View style={{...common.btnPrim, backgroundColor: '#ff000a'}}>
                                <Text style={common.btnPrimText}>{ u('НЕ') }</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
        </View>
    } 
}

export default withRouter(Invitation)