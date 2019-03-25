import axios from 'axios';
// import { Constants } from 'expo';

// const { manifest } = Constants;
// const api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
//   ? manifest.debuggerHost.split(`:`).shift().concat(`:8001`)
//   : `api.example.com`;


const request = axios.create({
    baseURL: `http://192.168.1.101:8001`
});

export default request;

