import { Dimensions, StyleSheet } from 'react-native';

import {
  primaryColorRed,
  backgroundColor,
  textColor
} from '../../constants/const_strings';
import { moderateScale, verticalScale } from '../../constants/const_functions';

export const { width, height } = Dimensions.get('window');

export const Styles = StyleSheet.create({
  container: {
    backgroundColor: backgroundColor,
    flex: 1
  },

  headerText: {
    color: textColor,
    fontSize: 15,
    paddingLeft: 20,
    paddingTop: 15,
    paddingBottom: 15
  },

  button: {
    width: width - 40,
    height: 48,
    borderRadius: 30,
    backgroundColor: primaryColorRed,
    elevation: 2,
    alignSelf: 'center',
    marginBottom: 20
  }
});
