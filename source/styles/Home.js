/**
 * React Native Boilerplate
 * Developed By: Dubin Labs Ltd.
 * Author: Nayeem Reza || Mostafiz Rahman
 * https://github.com/mostafiz93/RNBoilerplate
 */

import { StyleSheet } from 'react-native';
import { primaryColorRed } from '../constants/const_strings';
import { verticalScale, moderateScale } from '../constants/const_functions';

export default StyleSheet.create({
  container: {
    // position: 'relative',
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    margin: moderateScale(18),
    marginBottom: 0,
    justifyContent: 'space-between'
  },
  welcome: {
    fontSize: moderateScale(20),
    textAlign: 'center',
    margin: moderateScale(10)
  },
  instructions: {
    textAlign: 'center',
    color: primaryColorRed,
    fontSize: moderateScale(13),
    marginBottom: moderateScale(5)
  },
  headerText: {
    fontSize: moderateScale(18),
    color: '#FF4757',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: verticalScale(15)
  }
});
