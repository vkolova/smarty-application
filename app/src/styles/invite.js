import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    icon: {
        fontSize: 72
    },
    prim: {
        marginTop: 15,
        marginBottom: 25,
        fontSize: 24,
        fontWeight: 'bold'
    },
    sec: {
        textAlign: 'center'
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: 'hidden',
        resizeMode: 'cover'
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