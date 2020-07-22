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
    textLabel: {
        fontSize: moderateScale(16),
        color: textColor,
        marginTop: verticalScale(10),
        marginLeft: 20,
        marginBottom: 10
    },
    fieldContainer: {
        flexDirection: 'row',
        elevation: 5,
        height: moderateScale(90),
        backgroundColor: 'white',
        marginLeft: moderateScale(15),
        marginRight: moderateScale(15),
        marginBottom: moderateScale(10),
        // borderRadius: 10
    },
    fieldText1: {
        fontSize: moderateScale(18),
        color: primaryColorRed,
        fontWeight: 'bold',
        paddingBottom: 10
    },
    fieldText2: {
        fontSize: moderateScale(13),
        color: textColor
    },
    fieldStatusContainer: {
        flex: 3,
        backgroundColor: green,
        // borderTopRightRadius: 10,
        // borderBottomRightRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    detailItemContainer: {
        flexDirection: 'row',
        // borderWidth: 1,
        justifyContent: 'space-between',
        height: 60,
        marginLeft: 30,
        marginRight: 20,
        alignItems: 'center',
        padding: 10
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
        alignSelf: 'center',
        // position: 'absolute',
        // bottom: 20,
        marginBottom: 10,
        height: verticalScale(40),
        borderRadius: 30,
        backgroundColor: '#FF4757',
        elevation: 5
    },
    greenButton: {
        width: width - 40,
        alignSelf: 'center',
        // position: 'absolute',
        // bottom: 90,
        marginBottom: 5,
        height: verticalScale(40),
        borderRadius: 30,
        backgroundColor: green,
        elevation: 2
    },
    cancelButton: {
        alignSelf: 'center',
        marginRight: 20,
        backgroundColor: primaryColorRed,
        height: 22,
        width: moderateScale(90),
        // padding: 5,
        borderRadius: 30
    },
    totalView: {
        borderTopWidth: 0.5,
        marginHorizontal: 20,
        marginTop: 10,
        alignItems: 'flex-end'
    },
    totalText: {
        fontSize: moderateScale(18),
        color: textColor,
        fontStyle: 'italic',
        fontWeight: 'bold'
    },
    positionDetailView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 20
    },
    positionText: { fontSize: moderateScale(15) },
    placeholderText: {
        fontSize: moderateScale(15),
        textAlign: 'center',
        color: textColor,
    }
});