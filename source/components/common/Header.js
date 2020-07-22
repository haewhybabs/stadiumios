/**
 * React Native Boilerplate
 * Developed By: Dubin Labs Ltd.
 * Author: Imran Hossain
 * https://github.com/mostafiz93/RNBoilerplate
 */

import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StatusBar } from 'react-native';

import { DrawerActions } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import { Badge } from 'react-native-elements';

import Styles from '../../styles/Header';
import { statusBarRed } from '../../constants/const_strings';
import { moderateScale } from '../../helpers/Scale';

const Header = props => {
  const [cartLength, setCartLength] = useState(undefined)

  AsyncStorage.getItem('cart', (err, res) => {
    const cart = res !== null ? JSON.parse(res) : {};
    const cartLength = Object.getOwnPropertyNames(cart).length;
    setCartLength(cartLength)
  });
  console.log(cartLength)

  return (
    <View style={Styles.viewStyle}>
      <TouchableOpacity
        onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
        style={Styles.menuButton}
      >
        <Icon
          name='md-menu'
          size={moderateScale(22)}
          color={'white'}
          align='right'
        />
      </TouchableOpacity>

      <Text style={Styles.textStyle}>{props.headerText}</Text>

      <TouchableOpacity
        onPress={() => props.navigation.navigate('Cart')}
        style={Styles.notificationButton}
      >
        <Icon
          name='md-cart'
          size={moderateScale(22)}
          color={'white'}
          align='right'
        />
        {cartLength >= 1 && <Badge
          value={cartLength}
          badgeStyle={{backgroundColor: '#4E5C7E'}}
          containerStyle={{
            position: 'absolute',
            top: -4,
            right: -2,
          }}
        />}
      </TouchableOpacity>
    </View>
  );
};

Header.propTypes = {
  navigation: PropTypes.object.isRequired,
  headerText: PropTypes.string
};

Header.defaultProps = {
  headerText: ''
};

export default Header;
