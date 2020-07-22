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
    fontSize: moderateScale(20),
    color: '#FF4757',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: moderateScale(18)
  },
  itemContainer: {
    flexDirection: 'row',
    paddingLeft: moderateScale(20),
    height: moderateScale(90),
    backgroundColor: 'white',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 2
  },
  detailItemContainer: {
    // flexDirection: 'row',
    paddingLeft: moderateScale(20),
    // height: moderateScale(90),
    backgroundColor: 'white',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 2
  },

  imageStyle: {
    width: moderateScale(50),
    height: moderateScale(50)
  },
  text: {
    fontSize: moderateScale(20),
    color: textColor,
    fontWeight: 'bold'
  },
  smallText: {
    color: textColor
  },
  quantityText: {
    color: primaryColorRed
  },
  button: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: moderateScale(50),
    backgroundColor: primaryColorRed,
    flexDirection: 'row'
  }
});
