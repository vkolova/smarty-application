import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    header: {
        width: '100%',
        paddingTop: 30,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'column'
    },
    title: {
        fontSize: 36,
        marginTop: 20
    },
    backIcon: {
        marginLeft: -5,
        fontSize: 36,
    },
    form: {
        marginTop: -70,
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputWrapper: {
        flexDirection: 'row'
    },
    icon: {
        color: '#191919',
        marginBottom: -50,
        marginRight: -25
    },
    label: {
        left: 35,
        position: 'absolute'
    },
    input: {
        width: '100%',
        paddingLeft: 35,
        paddingRight: 10,
        paddingTop: 3,
        paddingBottom: 3,
        marginBottom: 10,
        marginTop: 10,
        borderBottomWidth: 1,
        borderColor: '#191919',
        color: '#191919',
        backgroundColor: 'transparent'
    },
    footer: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'column'
    },
    bottomLink: {
        // position: 'absolute',
        // bottom: 15
    }
});