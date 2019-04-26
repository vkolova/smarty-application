import React  from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Link } from 'react-router-native';
import { SecureStore } from 'expo';

import commonStyles from '../styles/common';
import styles from '../styles/navigation';
import common from '../styles/common';


export default class Navigation extends React.Component {
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

          <Link to='/ranklists'>
            <Icon
              name='trending-up'
              type='feather'
              iconStyle={styles.icon}
            />
          </Link>

          <Link to='/profile'>
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
