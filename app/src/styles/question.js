import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    questionWrapper: {
        width: '100%',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    question: {
        minHeight: 50,
        marginBottom: 50,
        fontSize: 24
    },
    answersWrapper: {
        width: '100%'
    },
    answer: {
        width: '100%',
        paddingBottom: 15,
        paddingTop: 15,
        paddingLeft: 20,
        paddingRight: 30,
        marginTop: 30,
        borderWidth: 3,
        borderColor: '#191919',
        borderRadius: 70,
        color: '#ffffff',
        textAlign: 'center',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
});