import Reactotron from 'reactotron-react-native';

if (__DEV__) {
    Reactotron
        .configure({ host: '192.168.1.101' }) // controls connection & communication settings
        .useReactNative() // add all built-in react native plugins
        .connect() // let's connect!
}
  

const SERVER_URL = __DEV__ ? `http://192.168.1.101:8001` : `https://thrones-tu.herokuapp.com`;
const HOST = __DEV__ ? `192.168.1.101:8001` : `thrones-tu.herokuapp.com`;

export {
    SERVER_URL,
    HOST
};