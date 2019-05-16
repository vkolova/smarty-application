import Reactotron from 'reactotron-react-native';

const ip = '192.168.43.248';

if (__DEV__) {
    Reactotron
        .configure({ host: ip }) // controls connection & communication settings
        .useReactNative() // add all built-in react native plugins
        .connect() // let's connect!
}

const SERVER_URL = `http://${ip}:8001`;
const HOST = `${ip}:8001`
const SOCKET_SCHEME = 'ws://'

export {
    SERVER_URL,
    HOST,
    SOCKET_SCHEME
};