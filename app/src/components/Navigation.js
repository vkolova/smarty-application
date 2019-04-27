import React  from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Link } from 'react-router-native';

import styles from '../styles/navigation';


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

          <Link to='/ranglist'>
            <Icon
              name='award'
              type='feather'
              iconStyle={styles.icon}
            />
          </Link>

          <Link to='/profile/7/'>
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
