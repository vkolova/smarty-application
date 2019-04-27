import React from 'react';
import {
    View,
    Text
} from 'react-native';

import Navigation from './Navigation';
import Header from './Header';

import { u } from '../utils';
import request from '../request';

import common from '../styles/common';

class Profile extends React.Component {
    state = {
        loading: true,
        data: {}
    }

    componentDidMount () {
        console.log(this.props)
        // request.get(`/api/player/${}/`)
    }

    render () {
        if (this.state.loading) {
            return <Text>{'Loading...'}</Text>
        }
    }
};

export default Profile;