import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    scoreView: {
        width: '100%',
        paddingTop: 25,
        paddingLeft: 15,
        paddingRight: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    avatar: {
        width: 35,
        height: 35,
        marginRight: 10,
        marginLeft: 10,
        borderRadius: 35,
        overflow: 'hidden',
        resizeMode: 'cover'
    },
    player: {
        display: 'flex',
        alignItems: 'center'
    },
    username: {
        fontWeight: 'bold'
    },
    you: {
        flexDirection: 'row'
    },
    opponent: {
        flexDirection: 'row-reverse'
    },
    scoreWrapper: {
        marginRight: 10,
        marginLeft: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    scoreWrapperYou: {
        ...this.scoreWrapper,
        alignItems: 'flex-start'
    },
    scoreWrapperOpponent: {
        ...this.scoreWrapper,
        alignItems: 'flex-end'
    },
    centerView: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    centerText: {
        color: '#707070',
        fontSize: 11
    }
});