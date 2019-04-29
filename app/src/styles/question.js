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
        marginTop: 15,
        marginBottom: 15,
        paddingTop: 15,
        paddingBottom: 15,
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
        backgroundColor: '#e3e6ed'
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
        backgroundColor: '#d01c1f'
    }
});