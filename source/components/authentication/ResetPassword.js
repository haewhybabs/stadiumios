import React, { Component } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';

import { Input, Icon } from 'react-native-elements';
import { Button } from 'native-base';
import Meteor from 'meteor-react-native';

import Styles from '../../styles/Authentication';
import { height } from '../food/Styles';
import { validation, moderateScale } from '../../constants/const_functions';

export default class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.navigation.getParam('email'),
      code: undefined,
      password: undefined,
      password1: undefined
    };

    this.inputs = {};
  }

  focusNextField(id) {
    this.inputs[id].focus();
  }

  handleSubmit() {
    const { email, code, password } = this.state;

    Meteor.call(
      'forgotPasswordSubmit',
      { code, username: email, password },
      (err, res) => {
        console.log(err, res);
        if (err) {
          alert("Email and code dosen't match!");
        } else {
          alert('Password reset sccessfull! Please login.');
          this.props.navigation.navigate('Login');
        }
      }
    );
  }

  render() {
    const {
      email,
      code,
      password,
      password1,
      passError,
      passError1,
      emailError
    } = this.state;

    const error =
      emailError ||
      passError ||
      passError1 ||
      !email ||
      !code ||
      !password ||
      !password1;

    return (
      <ScrollView
        style={{
          backgroundColor: '#F0F5F6',
          paddingLeft: 20,
          paddingRight: 20
        }}
      >
        <View style={{ height: height, justifyContent: 'center' }}>
          <Input
            label='Email'
            value={email}
            placeholder='Type your email here'
            containerStyle={Styles.textboxContainer}
            inputContainerStyle={Styles.inputContainerStyle}
            inputStyle={Styles.inputStyle}
            labelStyle={Styles.textboxLabelStyle}
            leftIcon={<Icon name='envelope' type='simple-line-icon' size={moderateScale(20)} />}
            leftIconContainerStyle={{ opacity: 0.5 }}
            onChangeText={email => this.setState({ email })}
            blurOnSubmit={false}
            onSubmitEditing={() => {
              this.focusNextField('two');
            }}
            keyboardType='email-address'
            returnKeyType='next'
            ref={input => {
              this.inputs['one'] = input;
            }}
          />

          <Input
            label='Enter Code'
            value={code}
            textContentType='oneTimeCode'
            placeholder='Type the verification code here'
            containerStyle={Styles.textboxContainer}
            inputContainerStyle={Styles.inputContainerStyle}
            inputStyle={Styles.inputStyle}
            labelStyle={Styles.textboxLabelStyle}
            leftIcon={
              <Image
                source={require('../../assets/talachabi.png')}
                style={{ height: moderateScale(23), width: moderateScale(23) }}
              />
            }
            onChangeText={code => this.setState({ code })}
            blurOnSubmit={false}
            onSubmitEditing={() => {
              this.focusNextField('three');
            }}
            returnKeyType='next'
            ref={input => {
              this.inputs['two'] = input;
            }}
          />

          <Input
            label='New Password'
            value={password}
            secureTextEntry={true}
            placeholder='Type your new password'
            containerStyle={Styles.textboxContainer}
            inputContainerStyle={Styles.inputContainerStyle}
            inputStyle={Styles.inputStyle}
            labelStyle={Styles.textboxLabelStyle}
            leftIcon={<Icon name='key' type='simple-line-icon' size={moderateScale(20)} />}
            leftIconContainerStyle={{ opacity: 0.5 }}
            onChangeText={password => {
              if (validation(password, 'isPassword') !== true) {
                this.setState({ passError: true });
              } else this.setState({ passError: false });
              this.setState({ password });
            }}
            errorMessage={
              this.state.passError
                ? 'The password length must be 4 or greater'
                : ''
            }
            blurOnSubmit={false}
            onSubmitEditing={() => {
              this.focusNextField('four');
            }}
            returnKeyType='next'
            ref={input => {
              this.inputs['three'] = input;
            }}
          />

          <Input
            label='Retype Password'
            value={password1}
            secureTextEntry={true}
            placeholder='Retype new password'
            containerStyle={Styles.textboxContainer}
            inputContainerStyle={Styles.inputContainerStyle}
            inputStyle={Styles.inputStyle}
            labelStyle={Styles.textboxLabelStyle}
            leftIcon={<Icon name='key' type='simple-line-icon' size={moderateScale(20)} />}
            leftIconContainerStyle={{ opacity: 0.5 }}
            errorMessage={
              this.state.passError1 ? "The password dosen't match!" : ''
            }
            onChangeText={password1 => {
              if (password1 !== password) {
                this.setState({ passError1: true });
              } else this.setState({ passError1: false });
              this.setState({ password1 });
            }}
            onSubmitEditing={() => {
              this.handleSubmit();
            }}
            returnKeyType='done'
            ref={input => {
              this.inputs['four'] = input;
            }}
          />

          <View style={{ marginTop: 30 }} />

          <Button
            style={[Styles.button, { opacity: error ? 0.5 : 1 }]}
            block
            info
            disabled={error}
            onPress={() => this.handleSubmit()}
          >
            <Text style={Styles.buttonText}>Confirm</Text>
          </Button>
        </View>
      </ScrollView>
    );
  }
}
