/**
 * Stadiyum App
 * Developed By: Dubin Labs Ltd.
 * Author: Imaran Hossain || Mostafiz Rahman
 * https://github.com/mostafiz93/StadiumRN
 */

import React, { Component } from 'react';
import { View, Image, ImageBackground, StatusBar } from 'react-native';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-spinkit';
import PropTypes from 'prop-types';
import Meteor from 'meteor-react-native';
import Styles from '../styles/SplashScreen';
import { statusBarRed } from '../constants/const_strings';

// const server_url = 'ws://stadium.durbintest.pro/websocket';
//const server_url = 'ws://192.168.0.4:3000/websocket'
//const server_url = 'wss://stadiumweb.herokuapp.com/websocket';
const server_url = 'wss://test.stadiyumvip.com/websocket';

Meteor.connect(server_url);

export default class SplashScreen extends Component {
  static navigationOptions = {
    header: null,
    drawerLockMode: 'locked-closed'
  };

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this._bootstrapAsync();
  }
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('user');
    // const introShown = await AsyncStorage.getItem('intro');
    if (userToken) {
      const user = JSON.parse(userToken);
      
      
      PushNotification.configure({
      
        onRegister: function (data) {
          console.log("TOKEN:", data.token);
          updateData = {
            deviceToken:data.token,
            _id:user._id
          }
          Meteor.call('updateDeviceToken', updateData, (err, res) => {  
            console.log('meteor call')          
            if (err) {
              console.log('error:',err)
            }
            console.log("success:",res);
          });
        },
      
        
        onNotification: function (notification) {
          console.log("NOTIFICATION:", notification);

          notification.finish(PushNotificationIOS.FetchResult.NoData);
        },
      
        
        permissions: {
          alert: true,
          badge: true,
          sound: true,
        },
      
        
        popInitialNotification: true,
      
        
        requestPermissions: true,
      });
      // TODO: show welcome toast message
    }
    setTimeout(() => {
      this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    }, 1500);
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#001E42' }}>
        <StatusBar backgroundColor={statusBarRed} barStyle="light-content" />

    
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Image
              resizeMode="contain"
              source={require('../assets/Assets/logo.png')}
              style={Styles.frontImage}
            />
          </View>

        <View style={Styles.splashScreenContainer}>
          <Spinner isVisible size={50} type="ThreeBounce" color="white" />
        </View>
      </View>
    );
  }
}

SplashScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};
