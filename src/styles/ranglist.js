import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    player: {
        width: '100%',
        height: 50,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: '100%',
        overflow: 'hidden',
        resizeMode: 'contain'
    }
});