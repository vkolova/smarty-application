import React  from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Link } from 'react-router-native';
import { SecureStore } from 'expo';

import styles from '../styles/navigation';


export default class Navigation extends React.Component {
  state = {
    id: null
  }

  componentDidMount () {
    SecureStore.getItemAsync('user')
    .then(user => {
      user = JSON.parse(user)
      if (user.id) {
        this.setState({ id: user.id })
      }
    })
    .catch(err => console.log(err))
  }

  render () {
    return (
        <View style={styles.navigation}>
          <Link to='/home'>
            <Icon
              name='home'
              type='feather'
              iconStyle={styles.icon}
            />
          </Link>

          <Link to='/ranglist'>
            <Icon
              name='award'
              type='feather'
              iconStyle={styles.icon}
            />
          </Link>

          <Link to={`/profile/${this.state.id}/`}>
            <Icon
              name='user'
              type='feather'
              iconStyle={styles.icon}
            />
          </Link>

          <Link to='/settings'>
            <Icon
              name='settings'
              type='feather'
              iconStyle={styles.icon}
            />
          </Link>
        </View>
    );
  }
}
