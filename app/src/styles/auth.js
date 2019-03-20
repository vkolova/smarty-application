import { StyleSheet } from 'react-native';
import { withTheme } from 'react-native-elements';

export default StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        resizeMode: 'cover'
    },
    inputWrapper: {
        flexDirection: 'row'
    },
    icon: {
        color: '#fff',
        marginBottom: -50,
        marginRight: -25
    },
    input: {
        width: '65%',
        paddingLeft: 35,
        paddingRight: 10,
        paddingTop: 3,
        paddingBottom: 3,
        marginBottom: 10,
        marginTop: 10,
        borderBottomWidth: 1,
        borderColor: '#fff',
        color: '#fff',
        backgroundColor: 'transparent'
    },
    actionBtn: {
        paddingBottom: 5,
        paddingTop: 5,
        paddingLeft: 25,
        paddingRight: 25,
        marginTop: 30,
        borderColor: '#ffffff',
        borderWidth: 1,
        color: '#ffffff',
        textTransform: 'uppercase'
    }
});