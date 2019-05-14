import { StyleSheet } from 'react-native';
import common from './common';

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
        width: 40,
        height: 40,
        marginRight: 10,
        marginLeft: 10,
        borderRadius: 35,
        borderWidth: 2,
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
    },
    vl: {
        width: 1,
        height: '60%',
        backgroundColor: '#e3e3e3'
    },
    resultsProfilesWrapper: {
        width: '100%',
        // height: 200,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    gameResultsView: {
        ...common.pageNoPadding,
        width: '100%',
        top: 0,
        left: 0,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    awardIcon: {
        fontSize: 72
    },
    resultsAvatar: {
        width: 70,
        height: 70
    },
    resultsTitle: {
        fontSize: 36,
    },
    statsViewWrapper: {
        width: '100%',
        height: '15%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    statsWrapper: {
        width: '30%',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    statsNumber: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    statsText: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    }
});