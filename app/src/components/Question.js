import React from 'react';
import {
    Text,
    View
  } from 'react-native';

import styles from '../styles/question';

export default class Question extends React.Component {
    state = {
        selected: null
    };

    render () {
        return <View style={styles.questionWrapper}>
            <Text style={styles.question}>Въпрос, внимание, това е въпрос?</Text>

            <View style={styles.answersWrapper}>
                <View style={styles.answer}><Text>Отговор 1</Text></View>
                <View style={styles.answer}><Text>Отговор 2</Text></View>
                <View style={styles.answer}><Text>Отговор 3</Text></View>
                <View style={styles.answer}><Text>Много дълъг отвовор на въпрос. Много дълъг отвовор на въпрос. 4</Text></View>
            </View>
        </View>
    }
}