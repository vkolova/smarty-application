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
        scores: null,
        roundWinner: null
    }

    eventHandlers = {
        notification: () => {},
        game_update: game => this.setState({ game }),
        scores_update: scores => this.setState({ scores }),
        round_winner: roundWinner => this.setState({ roundWinner }),
        question_update: question => this.setState({  question: null }, () => {
            this.setState({ question, roundWinner: null })
        })
    }

    componentDidMount () {
        const uuid = this.props.match.params.uuid;

        SecureStore.getItemAsync('user')
            .then(user => {
                if (user) {
                    user = JSON.parse(user)
                    this.setState({ player: user.id })
                    const socketURL = `ws://${HOST}/ws/game/${user.token}/${uuid}/`;
                    this.ws = new WebSocket(socketURL)

                    this.ws.onopen = () => {
                        this.ws.send(JSON.stringify({ type: 'game_connect', data: 'ok', user: 'vkolova' }))
                    }

                    this.ws.onmessage = e => {
                        const { type, data } = JSON.parse(e.data);
                        console.log(type)
                        this.eventHandlers[type](data)
                    }

                    this.ws.onerror = (e) => {
                        console.log(e)
                    }

                    this.ws.onclose = (e) => {
                        console.log('CLOSED')
                        // console.log(e.code, e.reason)
                    }
                }
            })
            .catch(err => console.log(err))
    }

    render () {
        const { game, question, player, scores, roundWinner } = this.state;

        return <View style={common.pageNoPadding}>
            {
                game && ['initial', 'preparing'].includes(game.state) &&
                <Text>{ u('изчакване на играч') }</Text>
            }

            {
                game && game.state == 'rejected' &&
                <Text>{ u('отрязаха те :/') }</Text>
            }

            {
                game && game.state == 'finished' &&
                <Text>{ u(`${game.winner.usename} печели играта`) }</Text>
            }


            {
                game && game.state == 'in_progress' && question && scores &&
                <Question {...question} ws={this.ws}>
                    <Scores player={player} players={game.players} scores={scores}/>
                </Question>
            }

            {
                roundWinner &&
                <Text>{ u(`рунда печели ${roundWinner}`)}</Text>
            }
        </View>
    }
}

export default Game