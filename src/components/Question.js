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
        const { a, i, selected } = this.props; 
        const selectedStyles = selected
            ? styles.selectedAnswer
            : {}

        return <TouchableWithoutFeedback onPress={this.submitAnswer}>
            <View style={{ ...styles.answer, ...selectedStyles }}>
                <Text style={styles.letter}>{ `${lettersMap[i]}.` }</Text>
                <Text style={styles.answerText}>{ a.content }</Text>
            </View>
        </TouchableWithoutFeedback>
    }
}

export default class Question extends React.Component {
    state = {
        remaining: 10,
        selected: null
    };

    componentDidMount () {
        this.interval = setInterval(() => {
            const { remaining, selected } = this.state;
            if (remaining === 0) {
                console.log('submit 0')
                !selected && this.submitAnswer(0);
            } else {
                this.setState({ remaining: this.state.remaining - 1 })
            }
        }, 1000)
    }

    submitAnswer = id => {
        if (this.state.selected) return;

        this.setState({ selected: id })
        clearInterval(this.interval)

        const { ws } = this.props;

        const data = JSON.stringify({
            type: 'question_answer',
            data: id
        })    
        ws.send(data)
    }

    render () {
        const { content, answers, ws } = this.props;
        const { selected, remaining } = this.state;

        return <View style={styles.questionWrapper}>
            <View
                style={{
                    ...styles.timer,
                    width: `${remaining * 10}%`
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
                        />
                    )
                }
            </View>
        </View>
    }
}