import React, { Component } from 'react';
import { Text, View, Image, Modal, ToastAndroid, StatusBar } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { Content } from 'native-base';
import Spinner from 'react-native-spinkit';
import PropTypes from 'prop-types';
import SnackBar from 'react-native-snackbar-component';
import Meteor from 'meteor-react-native';

import LoginForm from './LoginForm';
import Styles from '../../styles/Home';
import { statusBarRed } from '../../constants/const_strings';

export default class LogIn extends Component {
  static navigationOptions = {
    header: null,
    drawerLockMode: 'locked-closed'
  };

  constructor(props) {
    super(props);

    this.state = {
      NetConnected: true,
      signInPressed: false,
      visibleSnackBar1: false,
      registerModalVisible: false
    };

    this.focusNextField = this.focusNextField.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    this.inputs = {};
  }

  UNSAFE_componentWillMount() {
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) this.setState({ NetConnected: true });
      else this.setState({ NetConnected: false });
    });
    function handleFirstConnectivityChange(isConnected) {
      if (isConnected) this.setState({ NetConnected: true });
      else this.setState({ NetConnected: false });
    }
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      handleFirstConnectivityChange.bind(this)
    );
  }

  async saveUser(user) {
    await AsyncStorage.setItem('user', JSON.stringify(user));
  }

  focusNextField(id) {
    this.inputs[id].wrappedInstance.focus();
  }

  handleLogin(username, password) {
    console.log(username, password);
    
    Meteor.loginWithPassword({username}, password, err => {
      console.log(err);
      if (err) {
        // alert('Sorry! Wrong email address or password');
        alert(err.reason)
        return
      } else {
        AsyncStorage.setItem('user', JSON.stringify(Meteor.user()), () =>
          this.props.navigation.navigate('App')
        );
        ToastAndroid.show(`Welcome ${username}`, ToastAndroid.LONG);
      }
    });
    
  }

  render() {
    const { visibleSnackBar1, NetConnected, signInPressed } = this.state;

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#F5F5F5',
          alignItems: 'center'
        }}
      >
        <StatusBar backgroundColor={statusBarRed} barStyle="light-content" />

        <SnackBar
          visible={visibleSnackBar1}
          textMessage="Sorry, Contact Number and Password Did'nt Match!"
          actionHandler={() => {
            this.setState({ visibleSnackBar1: false });
          }}
          actionText='Ok'
        />
        {NetConnected && !signInPressed && (
          <View style={{ flex: 1 }}>
            <LoginForm
              handleLogin={this.handleLogin}
              handleCreateAccount={this.handleCreateAccount}
              navigation={this.props.navigation}
            />
          </View>
        )}
        {signInPressed && (
          <View style={Styles.container}>
            <Spinner isVisible size={100} type='Bounce' color='#0fc9ff' />
          </View>
        )}
        {!NetConnected && (
          <Content
            contentContainerStyle={{ flex: 1, justifyContent: 'center' }}
          >
            <View style={Styles.imageView}>
              <Image
                style={Styles.image}
                source={require('../../assets/images/logo.png')}
              />
            </View>
            <View style={Styles.alertCard}>
              <Text style={Styles.alertCardText}>
                You have no data connection available on your phone. Please
                connect to WiFi or Mobile Data.
              </Text>
            </View>
            <View style={{ marginTop: 30 }} />
          </Content>
        )}
      </View>
    );
  }
}

LogIn.propTypes = {
  navigation: PropTypes.object.isRequired
};
