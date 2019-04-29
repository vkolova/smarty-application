import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    page: {
        position: 'absolute',
        backgroundColor: '#fff'
    },
    icon: {
        fontSize: 72
    },
    prim: {
        marginTop: 15,
        marginBottom: 25,
        fontSize: 48,
        fontWeight: 'bold'
    },
    sec: {
        textAlign: 'center'
    },
    message: {
        width: '100%',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textWrapper: {
        width: '100%',
        marginTop: 15,
        marginBottom: 15,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
});