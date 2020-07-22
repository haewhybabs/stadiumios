/**
 * React Native Boilerplate
 * Developed By: Dubin Labs Ltd.
 * Author: Nayeem Reza || Mostafiz Rahman
 * https://github.com/mostafiz93/RNBoilerplate
 */

import { StyleSheet, Dimensions } from 'react-native';
import { verticalScale, moderateScale } from '../constants/const_functions';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
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
        color: '#2B2B2B',
        fontSize: moderateScale(18),
        paddingBottom: 8
    },
    checkboxContainer: {
        backgroundColor: 'transparent',
        borderWidth: 0
    },
    imgBackground: {
        width,
        height,
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: 0,
        opacity: 1
    },
    image: {
        width: moderateScale(180),
        height: verticalScale(120),
        resizeMode: 'contain'
    },
    imageView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: verticalScale(50)
    },
    textView: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    textFP: {
        fontSize: moderateScale(15),
        textAlign: 'center',
        margin: 10,
        color: '#2B2B2B',
        textDecorationLine: 'underline',
        // fontFamily: 'monospace',
        marginTop: 8
    },
    textOr: {
        fontSize: 14,
        textAlign: 'center',
        margin: 10,
        color: '#0fc9ff',
        fontStyle: 'italic'
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
        elevation: 2
    },
    signupButton: {
        width: width - 40,
        height: verticalScale(40),
        borderRadius: 30,
        backgroundColor: 'white',
        elevation: 2,
        marginBottom: 5
    },
    item: {
        width: width - 50,
        marginLeft: 0,
        borderRadius: 6,
        borderColor: '#0fc9ff',
        shadowOffset: { width: 2, height: 0 },
        shadowColor: '#0fc9ff',
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 1,
        alignItems: 'center'
    },
    leftLine: {
        borderWidth: 0.5,
        width: width / 2 - 45,
        borderColor: '#0fc9ff'
    },
    rightLine: {
        borderWidth: 0.5,
        width: width / 2 - 45,
        borderColor: '#0fc9ff'
    },
    orView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    alertCard: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.9,
        borderWidth: 0.5,
        borderColor: '#0fc9ff',
        borderRadius: 6,
        shadowOffset: { width: 2, height: 0 },
        shadowColor: '#0fc9ff',
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 1,
        backgroundColor: '#FFF'
    },
    alertCardText: {
        color: 'rgba(70,70,70,0.6)',
        fontSize: 20,
        margin: 2,
        textAlign: 'center',
        marginLeft: 15,
        marginRight: 15,
        marginTop: 15,
        marginBottom: 15
    },
    spinnerContainer: {
        position: 'absolute',
        bottom: 30,
        marginLeft: width * 0.5 - 20
    },
    itemShort: {
        width: width * 0.4,
        borderWidth: 0.7,
        borderRadius: 6,
        borderColor: '#0fc9ff',
        shadowOffset: { width: 2, height: 0 },
        shadowColor: '#0fc9ff',
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 1,
        backgroundColor: '#FFF'
    },
    itemShortDoB: {
        width: 45,
        height: 48,
        borderWidth: 0,
        borderRadius: 2,
        backgroundColor: '#FFF',
        alignItems: 'center'
    },
    calendarButton: {
        height: 50,
        width: width * 0.31,
        paddingRight: 5,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    picker: {
        width: width * 0.4,
        borderWidth: 0.7,
        borderRadius: 6,
        borderColor: '#0fc9ff',
        shadowOffset: { width: 2, height: 0 },
        shadowColor: '#0fc9ff',
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 1,
        backgroundColor: '#FFF'
    },
    appointmentCalendarText: {
        color: '#464646',
        fontSize: 17,
        margin: 10
    },
    appointmentTime: {
        height: 50,
        width: width * 0.31,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderWidth: 0.7,
        borderRadius: 6,
        borderColor: '#0fc9ff',
        shadowOffset: { width: 2, height: 0 },
        shadowColor: '#0fc9ff',
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 1,
        backgroundColor: '#FFF'
    },
    DoBView: {
        height: 'auto',
        paddingTop: 30,
        borderBottomWidth: 0.8,
        borderColor: '#BBB',
        paddingBottom: 8
    },
    DoBText: {
        fontSize: 16,
        opacity: 0.7
    },
    halfItem: {
        width: (width - 60) / 2
    },
    halfPicker: {
        width: (width - 60) / 2,
        borderBottomWidth: 0.8,
        borderColor: '#BBB',
        marginBottom: -5
    }
});