import React from 'react';

import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import { Link } from 'react-router-native';
import { SecureStore } from 'expo';

import MessageScreen from './MessageScreen';
import Question from './Question';
import Loader from './Loading';

import { u } from '../utils';

import { HOST, SOCKET_SCHEME } from '../../config';

import common from '../styles/common';
import styles from '../styles/game';

class Scores extends React.Component {
    render () {
        const { player, players, score } = this.props;

        const you = players.find(p => p.id === player.id)
        const opponent = players.find(p => p.id !== player.id)

        return <View style={styles.scoreView}>
            <View style={{ ...styles.player, ...styles.you }}>
                <Image source={{uri: you.avatar}} style={{ ...styles.avatar, borderColor: '#0aff0a' }} />

                <View style={styles.scoreWrapperYou}>
                    <Text style={styles.username}>{ you.username }</Text>
                    <Text>{ score[you.username] }</Text>
                </View>
            </View>
            
            <View style={{ ...styles.player, ...styles.opponent }}>
                <Image source={{uri: opponent.avatar}} style={{ ...styles.avatar, borderColor: '#ff0a0a'}} />

                <View style={styles.scoreWrapperOpponent}>
                    <Text style={styles.username}>{ opponent.username }</Text>
                    <Text>{ score[opponent.username] }</Text>
                </View>
            </View>
        </View>
    }
}


class GameResults extends React.Component {
    render () {
        const { player, players, score, winner, game } = this.props;

        const you = players.find(p => p.id === player.id);
        const opponent = players.find(p => p.id !== player.id);

        const wonRounds = game.rounds.filter(r => r.winner && r.winner.id === player.id).length
        const wasFasterIn = wonRounds - game.rounds.filter(r => r.player_a.is_correct && r.player_b.is_correct).length

        return <View style={styles.gameResultsView}>
            <Text style={styles.resultsTitle}>{ u('Резултати') }</Text>
            
            <View style={styles.resultsProfilesWrapper}>
                <View style={{ ...styles.player, ...styles.you }}>
                    <Image source={{uri: you.avatar}} style={{ ...styles.avatar, ...styles.resultsAvatar}} />

                    <View style={styles.scoreWrapperYou}>
                        <Text style={styles.username}>{ you.username }</Text>
                        <Text>{ score[you.username] }</Text>
                    </View>
                </View>
                
                <View style={styles.vl}/>

                <View style={{ ...styles.player, ...styles.opponent }}>
                    <Image source={{uri: opponent.avatar}} style={{ ...styles.avatar, ...styles.resultsAvatar}} />

                    <View style={styles.scoreWrapperOpponent}>
                        <Text style={styles.username}>{ opponent.username }</Text>
                        <Text>{ score[opponent.username] }</Text>
                    </View>
                </View>
            </View>

            <Text style={{ fontWeight: 'bold' }}>
                { player.id === winner.id ? u('Честито! Ти печелиш!') : u('Повече късмет следващия път!') }
            </Text>
 
            {
                !!wonRounds &&
                <View style={styles.statsViewWrapper}>
                    <View style={styles.statsWrapper}>
                        <Text style={styles.statsNumber}>{ `${wonRounds}` }</Text>
                        <Text style={styles.statsText}>{ u('спечелени рунда') }</Text>
                    </View>

                    <View style={styles.vl}/>

                    <View style={styles.statsWrapper}>
                        <Text style={styles.statsNumber}>{ `${wasFasterIn}` }</Text>
                        <Text style={styles.statsText}>{ u('по-бързо от противника') }</Text>
                    </View>
                </View>
            }

            <View style={common.btnPrim}>
                <Link component={TouchableOpacity} to='/home' style={common.btnPrimText}>
                    <Text style={{ color: '#fff' }}>{ u('към началото') }</Text>
                </Link>
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
        game_update: game => {
            game.data
                ? this.setState({ game, scores: game.data.score })
                : this.setState({ game })
        },
        scores_update: scores => this.setState({ scores }),
        round_winner: roundWinner => {
            this.setState({ roundWinner })
        },
        question_update: question => {
            setTimeout(() => {
                this.setState({  question: null }, () => {
                    this.setState({ question, roundWinner: null })
                })
            }, 3000)
        }
    }

    componentDidMount () {
        const uuid = this.props.match.params.uuid;

        SecureStore.getItemAsync('user')
            .then(user => {
                if (user) {
                    user = JSON.parse(user)
                    this.setState({ player: user.user.user })
                    const socketURL = `${SOCKET_SCHEME}${HOST}/ws/game/${user.token}/${uuid}/`;
                    this.ws = new WebSocket(socketURL)

                    this.ws.onopen = () => {
                        this.ws.send(JSON.stringify({ type: 'game_connect', data: 'ok' }))
                    }

                    this.ws.onmessage = e => {
                        const { type, data } = JSON.parse(e.data);
                        this.eventHandlers[type] && this.eventHandlers[type](data)
                    }

                    this.ws.onerror = (e) => {
                        console.log(e)
                    }

                    this.ws.onclose = (e) => {
                        console.log('CLOSED')
                    }
                }
            })
            .catch(err => console.log(err))
    }

    componentWillUnmount () {
        this.ws.close();
    }

    render () {
        const { game, question, player, scores, roundWinner } = this.state;

        return <View style={common.pageNoPadding}>
            {
                game && game.state == 'finished' &&
                <GameResults game={game} player={player} players={game.players} score={scores} winner={game.winner}/>
            }
            
            {
                game && ['initial', 'preparing'].includes(game.state) &&
                <MessageScreen
                    icon='loader'
                    title={'Още малко..'}
                    body={'Изчакване другия играч да се включи'}
                />
            }

            {
                game && game.state == 'declined' &&
                <MessageScreen
                    icon='zap-off'
                    title={'О, не!'}
                    body={'Изглежда другият играч отказа двубоя.'}
                >
                    <View style={common.btnPrim}>
                        <Link to='/home' style={common.btnPrimText}>
                            <Text style={{ color: '#fff' }}>{ u('към началото') }</Text>
                        </Link>
                    </View>
                </MessageScreen>
            }

            {
                game && game.state == 'in_progress' && question && scores && game.players &&
                <Question {...question} ws={this.ws} showAnswers={!!roundWinner} roundData={roundWinner} player={player}>
                    <Scores player={player} players={game.players} score={scores}/>
                    <Text>{ roundWinner && roundWinner.winner && u(`рунда печели ${roundWinner.winner}`)}</Text>
                </Question>
            }

            {
                !question && game && game.state == 'in_progress' && <Loader />
            }
        </View>
    }
}

export default Game