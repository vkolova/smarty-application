import React from 'react';
import {
    Text,
    View,
    TouchableWithoutFeedback
} from 'react-native';

import styles from '../styles/question';

const lettersMap = {
    0: 'А',
    1: 'Б',
    2: 'В',
    3: 'Г'
};

class Answer extends React.Component {
    submitAnswer = () => {
        const { parent, a } = this.props;
        parent.submitAnswer(a.id);
    }

    render () {
        const { a, i, selected, showAnswers, roundData, player, isCorrect } = this.props; 
        const selectedStyles = selected
            ? (
                !isCorrect && showAnswers
                ? { backgroundColor: '#ffe3e3' }
                : styles.selectedAnswer)
            : {}
        const correctAnswerStyles = isCorrect && showAnswers
            ? styles.correctAnswer
            : {}

        if (roundData) {
            opponent = Object.keys(roundData.answers).filter(p => p !== player.username).pop()
            playerIsCorrect = roundData.answers[player.username].is_correct;
            opponentIsCorrect = roundData.answers[opponent].is_correct;
            bothCorrect = roundData.answers[player.username].is_correct && roundData.answers[opponent].is_correct
            speed = roundData.winner === player.username
                ? [ player.username, opponent ]
                : [ opponent, player.username ]

            return <TouchableWithoutFeedback onPress={this.submitAnswer}>
                <View style={{ ...styles.answer, ...selectedStyles, ...correctAnswerStyles }}>
                    {
                        bothCorrect
                            ? <View style={styles.submittedAnswers}>
                                {
                                    roundData.answers[player.username].answered === a.id &&
                                    <View style={speed[0] == player.username ? styles.answerYou : styles.answerOpponent} />
                                }

                                {
                                    roundData.answers[opponent].answered === a.id &&
                                    <View style={speed[0] == opponent ? styles.answerYou : styles.answerOpponent} />
                                }
                            </View>
                            : <View style={styles.submittedAnswers}>
                                {
                                    roundData.answers[player.username].answered === a.id &&
                                    <View style={styles.answerYou} />
                                }

                                {
                                    roundData.answers[opponent].answered === a.id &&
                                    <View style={styles.answerOpponent} />
                                }
                            </View>
                    }

                    <Text style={styles.letter}>{ `${lettersMap[i]}.` }</Text>
                    <Text style={styles.answerText}>{ a.content }</Text>
                </View>
            </TouchableWithoutFeedback>
        }

        return <TouchableWithoutFeedback onPress={this.submitAnswer}>
            <View style={{ ...styles.answer, ...selectedStyles }}>
                <Text style={styles.letter}>{ `${lettersMap[i]}.` }</Text>
                <Text style={styles.answerText}>{ a.content }</Text>
            </View>
        </TouchableWithoutFeedback>
    }
}

class Question extends React.Component {
    state = {
        remaining: 1000,
        selected: null
    };

    componentDidMount () {
        this.interval = setInterval(() => {
            const { remaining, selected } = this.state;
            if (remaining === 0) {
                !selected && this.submitAnswer(0);
            } else {
                this.setState({ remaining: this.state.remaining - 1 })
            }
        }, 10)
    }

    submitAnswer = id => {
        if (this.state.selected) return;

        this.setState({ selected: id })
        clearInterval(this.interval)

        const { ws } = this.props;

        const data = JSON.stringify({
            type: 'question_answer',
            data: {
                'answer': id,
                'time': this.state.remaining
            }
        })    
        ws.send(data)
    }

    render () {
        const { content, answers, player, ws, showAnswers, roundData, correct_answer } = this.props;
        const { selected, remaining } = this.state;

        return <View style={styles.questionWrapper}>
            <View
                style={{
                    ...styles.timer,
                    width: `${remaining ? remaining / 10 : 0}%`
              }}
            />

            { this.props.children }

            <View style={styles.questionView}>
                <Text style={styles.question}>{ content }</Text>
            </View>

            <View style={styles.answersWrapper}>
                {
                    answers.map((a, i) =>
                        <Answer
                            key={`a-${a.id.toString()}`}
                            a={a}
                            i={i}
                            ws={ws}
                            selected={selected === a.id}
                            parent={this}
                            player={player}
                            showAnswers={showAnswers}
                            roundData={roundData}
                            isCorrect={a.id==correct_answer}
                        />
                    )
                }
            </View>
        </View>
    }
}

export default Question