import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    page: {
        backgroundColor: '#000'
    },
    avatar: {
        width: '100%',
        height: '50%',
        top: '-10%',
        resizeMode: 'cover'
    },
    whitePanel: {
        width: '100%',
        height: '100%',
        top: '25%',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#ffffff',
        position: 'absolute',
        borderRadius: 35
    },
    username: {
        width: '100%',
        fontSize: 28,
        color: '#000000',
        paddingTop: 20,
        paddingBottom: 15,
        textAlign: 'center'
    },
    vl: {
        width: 1,
        height: '100%',
        backgroundColor: '#000000'
    },
    mainInfo: {
        width: '100%',
        paddingTop: 15,
        paddingBottom: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    mainInfoCard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
});