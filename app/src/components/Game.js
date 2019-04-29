import React from 'react';

import {
    View,
    Text,
    Image
} from 'react-native';
import { Icon } from 'react-native-elements';
import { SecureStore } from 'expo';

import Question from './Question';

import { u } from '../utils';
import request from '../request';

import { HOST } from '../../config';

import common from '../styles/common';
import styles from '../styles/game';

class Scores extends React.Component {
    render () {
        const { player, players } = this.props;

        const you = players.find(p => p.id === player)
        const opponent = players.find(p => p.id !== player)

        return <View style={styles.scoreView}>
            <View style={{ ...styles.player, ...styles.you }}>
                <Image source={{uri: you.avatar}} style={styles.avatar} />

                <View style={styles.scoreWrapperYou}>
                    <Text style={styles.username}>{ you.username }</Text>
                    <Text>0</Text>
                </View>
            </View>
            
            <View style={{ ...styles.player, ...styles.opponent }}>
                <Image source={{uri: opponent.avatar}} style={styles.avatar} />

                <View style={styles.scoreWrapperOpponent}>
                    <Text style={styles.username}>{ opponent.username }</Text>
                    <Text>0</Text>
                </View>
            </View>
        </View>
    }
}

class Game extends React.Component {
    state = {
        player: null,
        loading: true,
        game: null,
        question: null,
        scores: null
    }

    eventHandlers = {
        notification: () => {},
        game_update: game => {
            this.setState({ game })
        },
        question_update: question => {
            this.setState({ question })
        }
    }

    componentDidMount () {
        console.log(this.props.match.params.uuid)
        const uuid = this.props.match.params.uuid;
        // const uuid = '8dda1e0f-c8d5-4896-b522-3bc36bd60c65'

        SecureStore.getItemAsync('user')
            .then(user => {
                if (user) {
                    user = JSON.parse(user)
                    this.setState({ player: user.id })
                    const socketURL = `ws://${HOST}/ws/game/${user.token}/${uuid}/`;
                    this.ws = new WebSocket(socketURL)

                    this.ws.onopen = () => {
                        // ws.send(JSON.stringify({ message: 'ready' }))
                    }

                    this.ws.onmessage = e => {
                        const { type, data } = JSON.parse(e.data);
                        this.eventHandlers[type](data)
                    }

                    this.ws.onerror = (e) => {
                        console.log(e)
                    }

                    this.ws.onclose = (e) => {
                        console.log(e.code, e.reason)
                    }
                }
            })
            .catch(err => console.log(err))
    }

    componentWillUnmount () {}

    render () {
        const { game, question, player } = this.state;

        return <View style={common.pageNoPadding}>
            
            
            {
                question &&
                <Question {...question} ws={this.ws}>
                    <Scores player={player} players={game.players}/>
                </Question>
            }
        </View>
    }
}

export default Game