import Reactotron from 'reactotron-react-native';

// const ip = '192.168.43.248';
const ip = '192.168.1.103';

if (__DEV__) {
    Reactotron
        .configure({ host: ip }) // controls connection & communication settings
        .useReactNative() // add all built-in react native plugins
        .connect() // let's connect!
}
  

// const SERVER_URL = __DEV__ ? `http://${ip}:8001` : `https://thrones-tu.herokuapp.com`;
// const HOST = __DEV__ ? `${ip}:8001` : `thrones-tu.herokuapp.com`;

const SERVER_URL = `http://${ip}:8001`;
const HOST = `${ip}:8001`

export {
    SERVER_URL,
    HOST
};