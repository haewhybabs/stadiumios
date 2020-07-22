import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Meteor from 'meteor-react-native';

const { width, height } = Dimensions.get('window');

export const getUserAsync = async() => {
    const user = await AsyncStorage.getItem('user');
    return user;
};

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 620;

const scale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.25) =>
    size + (scale(size) - size) * factor;

export { scale, verticalScale, moderateScale };

export function validation(value, fieldType) {
    switch (fieldType) {
        case 'isName':
            if (value === undefined || !isNaN(value) || value.length < 3) {
                return; //alert('Please give your name.');
            } else {
                return true;
            }

        case 'isPassword':
            if (value === undefined || value.length < 4) {
                return;
                // return alert(
                //   'The password must be greater than or equal four chartacters'
                // );
            } else return true;

        case 'isPhone':
            var phone = new RegExp(/^\d{10}$/);
            if (isNaN(value)) {
                return; //alert('Please give valid phone number');
            } else if (value.match(phone)) {
                return true;
            } else return; //alert('Please give valid phone number');

        case 'isEmail':
            var mailformat = new RegExp(
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,15})+$/
            );
            if (value === undefined || value.length <= 0) {
                return; //alert('Enter a valid email address');
            } else if (value.match(mailformat)) {
                return true;
            } else {
                return; //alert('Enter a valid email address');
            }

        default:
            break;
    }
}

export const logout = () => {
    Meteor.logout(() => {
        console.log('Logged out successfully!');
        // AsyncStorage.removeItem('user')
        AsyncStorage.multiRemove(['user', 'cart']);
    });
};

export const updateCart = async(cart, context, stadium) => {
    await AsyncStorage.multiSet(
        [
            ['cart', JSON.stringify(cart)],
            ['stadium', JSON.stringify(stadium)]
        ],
        (err, res) => {
            context.setState({ cart });
        }
    );
};

export const updateCartFood = async(cart, conext) => {
    await AsyncStorage.setItem('cart', JSON.stringify(cart), (err, res) => {
        conext.setState({ cart });
    });
};

export const fetchCartData = async context => {
    await AsyncStorage.getItem('cart', (err, res) => {
        console.log(res);
        const cart = res ? JSON.parse(res) : {};
        context.setState({ cart });
    });
};

export const fetchSavedStadium = context => {
    AsyncStorage.getItem('stadium', (err, res) => {
        console.log(res);
        const savedStadium = res ? JSON.parse(res) : {};
        context.setState({ savedStadium });
    });
};

export const getStadiumAsync = async() => {
    const stad = await AsyncStorage.getItem('stadium');
    return stad;
};