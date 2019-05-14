import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    questionWrapper: {
        width: '100%',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eff3f9'
    },
    questionView: {
        width: '90%',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        display: 'flex',
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    question: {
        fontSize: 18,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    answersWrapper: {
        width: '100%',
        display: 'flex',
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25
    },
    answer: {
        width: '70%',
        // marginTop: 15,
        // marginBottom: 15,
        paddingTop: '3%',
        paddingBottom: '3%',
        paddingLeft: 15,
        paddingRight: 15,
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        borderRadius: 15
    },
    selectedAnswer: {
        backgroundColor: '#e3e3e3'
    },
    correctAnswer: {
        backgroundColor: '#e3ffe3'
    },
    answerText: {
        flex: 1
    },
    letter: {
        marginRight: 15,
        fontWeight: 'bold'
    },
    timer: {
        height: 7,
        left: 0,
        top: 0,
        position: 'absolute',
        backgroundColor: '#b3b3ff'
    },
    submittedAnswers: {
        height: '100%',
        width: 15,
        right: -15,
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    answerYou: {
        height: 7,
        width: 7,
        marginTop: 3,
        marginBottom: 3,
        borderRadius: 7,
        backgroundColor: '#00ff00'
    },
    answerOpponent: {
        height: 7,
        width: 7,
        marginTop: 3,
        marginBottom: 3,
        borderRadius: 7,
        backgroundColor: '#ff0000'
    }
});