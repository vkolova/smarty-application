import React from 'react';
import {
    Text,
    View
  } from 'react-native';

import styles from '../styles/question';

const lettersMap = {
    0: 'А',
    1: 'Б',
    2: 'В',
    3: 'Г'
};

export default class Question extends React.Component {
    state = {
        selected: null
    };

    render () {
        const answers = [
            'битката при с. Ключ през 1014 г.',
            'въстанието срещу византийската власт на Георги Войтех през 1072 г.',
            'преминаването на Третия кръстоносен поход (1189 – 1192) през българските земи',
            'възкачването на Константин Тих Асен на българския престол през 1257 г.'
        ];
        const question = 'Кое събитие се е случило през първата половина на XI век?';
        return <View style={styles.questionWrapper}>
            <View style={styles.questionView}>
                <Text style={styles.question}>{ question }</Text>
            </View>

            <View style={styles.answersWrapper}>
                {
                    answers.map((a, i) =>
                        <View key={i.toString()} style={styles.answer}>
                            <Text style={styles.letter}>{ `${lettersMap[i]}.` }</Text>
                            <Text style={styles.answerText}>{a}</Text>
                        </View>
                    )
                }
            </View>
        </View>
    }
}