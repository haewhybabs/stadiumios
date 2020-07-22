import { createStackNavigator } from "react-navigation-stack";
import { stackNavigatorConfig } from "../configs/navigationConfig";

import Home from "../components/home/Home";
import Login from "../components/authentication/Login";
import Registration from "../components/authentication/RegistrationForm";
import FoodMenu from "../components/food/FoodMenu";
import FoodMenuDetail from "../components/food/FoodMenuDetail";
import Cart from "../components/cart/Cart";
import VerificationCode from "../components/authentication/VerificationCode";
import ResetPassword from "../components/authentication/ResetPassword";
import ShippingAddress from "../components/billAndShipment/ShippingAddress";
import OrderConfirmation from "../components/billAndShipment/OrderConfirmation";
import OrderHistory from "../components/order/OrderHistory";
import OrderHistoryDetails from "../components/order/OrderHistoryDetails";
import Profile from "../components/profile/Profile";
import ProfileUpdate from "../components/profile/ProfileUpdate";
import Payment from "../components/billAndShipment/Payment";
import SearchResult from "../components/food/SearchResult";

export const AppStack = createStackNavigator(
  {
    Home: {
      screen: Home
    },
    FoodMenu: {
      screen: FoodMenu
    },
    FoodMenuDetail: {
      screen: FoodMenuDetail
    },
    Cart: {
      screen: Cart
    },
    ShippingAddress: {
      screen: ShippingAddress
    },
    OrderConfirmation: {
      screen: OrderConfirmation
    },
    OrderHistory: {
      screen: OrderHistory
    },
    OrderHistoryDetails: {
      screen: OrderHistoryDetails
    },
    Profile: {
      screen: Profile
    },
    ProfileUpdate: {
      screen: ProfileUpdate
    },
    Payment: {
      screen: Payment
    },
    SearchResult: {
      screen: SearchResult
    }
  },
  {
    ...stackNavigatorConfig,
    initialRouteName: "Home"
  }
);

export const AuthStack = createStackNavigator(
  {
    Login: {
      screen: Login
    },
    Registration: {
      screen: Registration
    },
    VerificationCode: {
      screen: VerificationCode
    },
    ResetPassword: {
      screen: ResetPassword
    }
  },
  {
    ...stackNavigatorConfig,
    initialRouteName: "Login"
  }
);
