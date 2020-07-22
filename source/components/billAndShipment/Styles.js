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
    text: {
        color: textColor,
        fontSize: 15,
        paddingLeft: 20,
        paddingTop: 15
    },
    headerText: {
        fontSize: moderateScale(20),
        color: '#FF4757',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 20
    },
    textboxContainer: {
        paddingTop: 10,
        paddingLeft: 0,
        paddingRight: 0
    },
    inputContainerStyle: {
        borderWidth: 1,
        borderRadius: 30,
        padding: 2,
        height: verticalScale(40),
        backgroundColor: 'white'
    },
    inputStyle: {
        paddingLeft: 15,
        fontSize: moderateScale(17),
        textAlignVertical: 'center'
    },
    textboxLabelStyle: {
        paddingLeft: 15,
        fontWeight: 'normal',
        color: '#2B2B2B',
        fontSize: moderateScale(18),
        paddingBottom: 8
    },

    buttonText: {
        color: '#FFFFFF',
        fontSize: moderateScale(18),
        fontWeight: 'bold',
        margin: 10,
        textAlign: 'center'
    },
    button: {
        width: width - 40,
        height: verticalScale(40),
        borderRadius: 30,
        backgroundColor: '#001E42',
        elevation: 2,
        marginBottom: 10
    },
    greenButton: {
        width: width - 40,
        height: verticalScale(40),
        borderRadius: 30,
        backgroundColor: green,
        elevation: 2,
        marginBottom: 10,
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center'
    },
    statusText1: {
        fontSize: moderateScale(22),
        marginTop: 10,
        color: textColor,
        textAlign: 'center'
    },
    statusText2: {
        fontSize: moderateScale(18),
        textAlign: 'center'
    }
});