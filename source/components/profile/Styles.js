import { Dimensions, StyleSheet } from 'react-native';
import {
  primaryColorRed,
  backgroundColor,
  textColor,
  green
} from '../../constants/const_strings';
import { moderateScale, verticalScale } from '../../constants/const_functions';

export const { width, height } = Dimensions.get('window');

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor
  },
  profileContainer: {
    // height: height - verticalScale(170),
    width: width - 40,
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 10,
    borderTopLeftRadius: 20,
    // borderWidth: 1,
    marginLeft: 20,
    marginTop: 60,
    marginBottom: 8
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
    position: 'absolute',
    top: -50,
    right: (width - 40) / 2 - 50
  },
  nameText: {
    fontSize: moderateScale(23),
    textAlign: 'center',
    color: primaryColorRed,
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  button: {
    margin: 10,
    backgroundColor: primaryColorRed,
    width: 180,
    marginLeft: (width - 40) / 2 - 90,
    height: 35,
    borderRadius: 30,
    elevation: 2
  },
  buttonText: {
    fontSize: moderateScale(17),
    color: 'white',
    fontWeight: 'bold'
  },
  modalButton: {
    flex: 1,
    elevation: 2,
    backgroundColor: primaryColorRed,
    borderRadius: 30
  },
  headerText: {
    fontSize: moderateScale(17),
    textAlign: 'center'
  },
  infoText: {
    fontSize: moderateScale(18),
    textAlign: 'center',
    color: textColor
  },
  dashedLine: {
    marginTop: verticalScale(25),
    height: 4,
    borderStyle: 'dotted',
    borderWidth: 0.5,
    borderRadius: 1
  },
  textboxContainer: {
    paddingTop: 20,
    paddingLeft: 0,
    paddingRight: 0
  },
  inputContainerStyle: {
    borderWidth: 1,
    borderRadius: 30,
    padding: 2,
    height: 48,
    backgroundColor: 'white'
  },
  textboxLabelStyle: {
    paddingLeft: 15,
    color: '#2B2B2B',
    fontSize: 20,
    paddingBottom: 8
  }
});
