import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';

import { Icon } from 'react-native-elements';
import { Button } from 'native-base';
import Meteor, { Accounts } from 'meteor-react-native';
import { NavigationEvents } from 'react-navigation';

import { Styles } from './Styles';
import Header from '../common/Header';
import PasswordChangeModal from './PasswordChangeModal';
import { getUserAsync, logout, verticalScale } from '../../constants/const_functions';
import SpinView from '../common/Spinner';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      isPasswordModalVisible: false,
      password: undefined,
      password1: undefined,
      currentPassword: undefined
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  async fetchUser() {
    const user = Meteor.user();
    console.log(user);
    this.setState(
      {
        user: user,
        _id: user._id,
        profile: user.profile
      },
      () => this.setState({ isLoaded: true })
    );
  }

  handlePasswordChange() {
    const { currentPassword, password, password1 } = this.state;
    console.log('passwords', currentPassword, password);
    if (password !== password1) {
      alert("Sorry! Passwords don't match. ");
      return;
    } else {
      Accounts.changePassword(currentPassword, password, res => {
        console.log(res);
        if (!res) {
          console.log('successfully changed pasword');
          this.setState({
            isPasswordModalVisible: !this.state.isPasswordModalVisible
          });
          Alert.alert(
            'Success',
            'Congratulations! Your password has been updated successfully! Please login again!'
          );
          logout();
          this.props.navigation.navigate('Login');
        } else if (res) {
          console.log(res.message);
          alert('Sorry! You gave wrong password');
        }
      });
    }
  }

  updateState(obj) {
    this.setState(obj);
  }

  render() {
    const {
      isPasswordModalVisible,
      password,
      password1,
      currentPassword,
      profile,
      _id
    } = this.state;

    if (!this.state.isLoaded) {
      return (
        <View style={Styles.container}>
          <Header headerText='' navigation={this.props.navigation} />

          <SpinView />
        </View>
      );
    }

    return (
      <View style={Styles.container}>
        <NavigationEvents onWillFocus={payload => this.fetchUser()} />

        <Header headerText='' navigation={this.props.navigation} />

        <PasswordChangeModal
          isPasswordModalVisible={isPasswordModalVisible}
          updateState={this.updateState.bind(this)}
          handlePasswordChange={this.handlePasswordChange.bind(this)}
          password={password}
          password1={password1}
          currentPassword={currentPassword}
        />

        <ScrollView>
          <View style={Styles.profileContainer}>
            <Image
              source={require('../../assets/drawer/avatar.png')}
              style={Styles.image}
            />

            <Icon
              raised
              // reverseColor='blue'
              reverse
              name='pencil'
              type='material-community'
              size={15}
              iconStyle={{ fontSize: 22 }}
              color='#4E5C7E'
              containerStyle={{ position: 'absolute', right: -18, top: -20 }}
              onPress={() =>
                this.props.navigation.navigate('ProfileUpdate', {
                  profile: profile,
                  id: _id
                })
              }
            />

            <View style={{ marginTop: 60 }}>
              <Text style={Styles.nameText}>{profile.name}</Text>
              <Button
                block
                style={Styles.button}
                onPress={() => {
                  this.setState({
                    isPasswordModalVisible: true
                  });
                }}
              >
                <Text style={Styles.buttonText}>Change Password</Text>
              </Button>
            </View>

            <View style={Styles.dashedLine} />

            <View style={{ marginTop: verticalScale(25) }}>
              <Text style={Styles.headerText}>Email:</Text>
              <Text style={Styles.infoText}>{profile.email}</Text>
            </View>

            <View style={Styles.dashedLine} />

            <View style={{ marginTop: verticalScale(25) }}>
              <Text style={Styles.headerText}>Phone:</Text>
              <Text style={Styles.infoText}>{profile.phone}</Text>
            </View>

            <View style={Styles.dashedLine} />

            <View style={{ marginTop: verticalScale(25) }}>
              <Text style={Styles.headerText}>Gender:</Text>
              <Text style={[Styles.infoText, { textTransform: 'capitalize' }]}>
                {profile.gender}
              </Text>
            </View>

            <View style={[Styles.dashedLine, {borderWidth: 0}]} />
          </View>
        </ScrollView>
      </View>
    );
  }
}
