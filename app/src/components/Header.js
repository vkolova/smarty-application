import React from 'react';
import {
  View,
  Text
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Link } from 'react-router-native';

import { u } from '../utils';
import styles from '../styles/header';

const Header = ({ link, title }) => (
    <View style={styles.header}>
        <Link to={link}>
            <Icon
                name='chevron-left'
                type='feather'
                iconStyle={styles.backIcon}
            />
        </Link>
        <Text style={styles.title}>{ u(title) }</Text>
    </View>
);

export default Header;