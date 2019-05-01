import React from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';
import { Link } from 'react-router-native';

import Navigation from './Navigation';
import request from '../request';

import { u } from '../utils';

import common from '../styles/common';
import styles from '../styles/profile';

const User = props => {
    const { avatar, id, score } = props.data
    const { username } = props.data.user
    const i = props.index

    return <Link to={`/profile/${id}/`}>
        <View
            style={{
                marginVertical: 10,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
            }}
            key={id}
        >
            <Text style={{ marginRight: 10 }}>{ `${i + 1}.` }</Text>
            <Image
                source={{uri: avatar}}
                style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25
                }}
            />
            <View style={{ marginLeft: 15 }}>
                <Text>{ username }</Text>
                <Text style={{ color: '#707070', fontSize: 11 }}>{ `${score} ${ u('точки') }`}</Text>
            </View>
        </View>
    </Link>
}

class Ranglist extends React.Component {
    state = {
        loading: true,
        data: null
    }

    componentDidMount () {
        request
            .get(`/api/players/`)
            .then(response => {
                this.setState({ data: response.data });
            })
            .catch(error => console.log(error))
            .then(() => this.setState({ loading: false }))
    }

    render () {
        if (this.state.loading || !this.state.data) {
            return <React.Fragment>
                <Text>{'LOADING...'}</Text>
                <Navigation/>
            </React.Fragment>
        }

        return  <React.Fragment>
            
            <View style={{ paddingTop: 15, paddingLeft: 15, paddingRight: 15, display: 'flex' }}>
                <Text style={{ fontSize: 32, marginTop: '3%' }}>{ u('Най-активни играчи') }</Text>
            </View>

            <View style={common.pageList}>
                {
                    this.state.data && this.state.data
                        .map((p, i) =>
                            <User data={p} key={p.id} index={i}/>
                        )
                }
            </View>
            <Navigation/>
        </React.Fragment>
    }
};

export default Ranglist;