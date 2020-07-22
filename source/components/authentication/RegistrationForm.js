import React, { Component } from 'react';
import {
  Text,
  View,
  ToastAndroid,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import { Form, Button, Item, Container, Content, Picker } from 'native-base';
import { Input, Icon, CheckBox } from 'react-native-elements';
import PropTypes from 'prop-types';
import Meteor from 'meteor-react-native';

import Styles from '../../styles/Authentication';
import { height } from '../food/Styles';
import { validation, moderateScale } from '../../constants/const_functions';

export default class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: undefined,
      email: undefined,
      phone: undefined,
      password: undefined,
      password1: undefined,
      gender: undefined
    };

    this.onValueChangeGender = this.onValueChangeGender.bind(this);

    this.inputs = {};
  }
  
  pressText = () =>{
    alert("text received");
  }
  
  onValueChangeGender(value) {
    this.setState({
      gender: value
    });
  }

  focusNextField(id) {
    this.inputs[id].focus();
  }

  handleRegister = () => {
    const { name, email, phone, password, gender } = this.state;
    const profile = { name, email, phone, gender };
    Meteor.call(
      'createUserWrapper',
      { username: email, password, profile, type: 'app' },
      (err, res) => {
        console.log(err, res);
        if (err) {
          console.log(err);
        } else {
          ToastAndroid.show(
            `Welcome ${name}! Please login to continue.`,
            ToastAndroid.SHORT
          );
          this.props.navigation.navigate('Login');
        }
      }
    );
  }

  render() {
    const {
      name,
      email,
      phone,
      password,
      password1,
      nameError,
      emailError,
      passError,
      passError1,
      phoneError
    } = this.state;

    const error =
      nameError ||
      emailError ||
      phoneError ||
      passError ||
      passError1 ||
      !name ||
      !email ||
      !phone ||
      !password1 ||
      !password;

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: '#F0F5F6',
          paddingLeft: 20,
          paddingTop: 30,
          paddingRight: 20
          // paddingBottom: 20
        }}
      >
        <Content
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center'
            // height: height
          }}
        >
          <Form>
            <Input
              label='Name'
              value={name}
              textContentType='name'
              placeholder='Type your name here'
              containerStyle={Styles.textboxContainer}
              inputContainerStyle={Styles.inputContainerStyle}
              inputStyle={Styles.inputStyle}
              labelStyle={Styles.textboxLabelStyle}
              leftIcon={
                <Icon
                  name='user'
                  type='simple-line-icon'
                  size={moderateScale(20)}
                />
              }
              leftIconContainerStyle={{ opacity: 0.5 }}
              onChangeText={name => {
                if (validation(name, 'isName') !== true) {
                  this.setState({ nameError: true });
                } else this.setState({ nameError: false });
                this.setState({ name });
              }}
              errorMessage={this.state.nameError ? 'Enter a valid name' : ''}
              blurOnSubmit={false}
              onSubmitEditing={() => {
                this.focusNextField('two');
              }}
              returnKeyType='next'
              ref={input => {
                this.inputs['one'] = input;
              }}
            />
            <Input
              label='Email'
              placeholder='Type your email here'
              textContentType='emailAddress'
              value={email}
              containerStyle={Styles.textboxContainer}
              inputContainerStyle={Styles.inputContainerStyle}
              inputStyle={Styles.inputStyle}
              labelStyle={Styles.textboxLabelStyle}
              leftIcon={
                <Icon
                  name="envelope"
                  type='simple-line-icon'
                  size={moderateScale(20)}
                />
              }
              leftIconContainerStyle={{ opacity: 0.5 }}
              onChangeText={email => {
                if (validation(email, 'isEmail') !== true) {
                  this.setState({ emailError: true });
                } else this.setState({ emailError: false });
                this.setState({ email });
              }}
              blurOnSubmit={false}
              errorMessage={
                this.state.emailError ? 'Enter a valid email address' : ''
              }
              onSubmitEditing={() => {
                this.focusNextField('three');
              }}
              keyboardType='email-address'
              returnKeyType='next'
              ref={input => {
                this.inputs['two'] = input;
              }}
            />

            <Input
              label='Phone'
              placeholder='Type your phone number'
              value={phone}
              containerStyle={Styles.textboxContainer}
              inputContainerStyle={Styles.inputContainerStyle}
              inputStyle={Styles.inputStyle}
              labelStyle={Styles.textboxLabelStyle}
              leftIcon={
                <Icon
                  name='phone'
                  type='simple-line-icon'
                  size={moderateScale(20)}
                />
              }
              leftIconContainerStyle={{ opacity: 0.5 }}
              onChangeText={phone => {
                if (validation(phone, 'isPhone') !== true) {
                  this.setState({ phoneError: true });
                } else this.setState({ phoneError: false });
                this.setState({ phone });
              }}
              blurOnSubmit={false}
              errorMessage={
                this.state.phoneError ? 'Enter a valid phone number' : ''
              }
              onSubmitEditing={() => {
                this.focusNextField('four');
              }}
              keyboardType='phone-pad'
              returnKeyType='next'
              ref={input => {
                this.inputs['three'] = input;
              }}
            />

            <Input
              label='Password'
              placeholder='Type your password here'
              secureTextEntry
              value={password}
              editable={true}
              containerStyle={Styles.textboxContainer}
              inputContainerStyle={Styles.inputContainerStyle}
              inputStyle={Styles.inputStyle}
              labelStyle={Styles.textboxLabelStyle}
              leftIcon={
                <Icon
                  name='key'
                  type='simple-line-icon'
                  size={moderateScale(20)}
                />
              }
              leftIconContainerStyle={{ opacity: 0.5 }}
              onChangeText={password => {
                if (validation(password, 'isPassword') !== true) {
                  this.setState({ passError: true });
                } else this.setState({ passError: false });
                this.setState({ password });
              }}
              blurOnSubmit={false}
              errorMessage={
                this.state.passError
                  ? 'The password length must be 4 or greater'
                  : ''
              }
              onSubmitEditing={() => {
                this.focusNextField('five');
              }}
              returnKeyType='next'
              ref={input => {
                this.inputs['four'] = input;
              }}
            />
            <Input
              label='Confirm Password'
              placeholder='Retype password here'
              secureTextEntry
              textContentType='password'
              containerStyle={Styles.textboxContainer}
              inputContainerStyle={Styles.inputContainerStyle}
              inputStyle={Styles.inputStyle}
              labelStyle={Styles.textboxLabelStyle}
              value={password1}
              leftIcon={
                <Icon
                  name='key'
                  type='simple-line-icon'
                  size={moderateScale(20)}
                />
              }
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
              blurOnSubmit
              // onSubmitEditing={this.handleRegister}
              returnKeyType='done'
              ref={input => {
                this.inputs['five'] = input;
              }}
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginTop: 15,
                width: '100%'
              }}
            >
              <CheckBox
                title='Male'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                size={moderateScale(20)}
                containerStyle={Styles.checkboxContainer}
                checked={this.state.gender === 'male'}
                textStyle={{ fontSize: moderateScale(16), color: '#2B2B2B' }}
                onPress={() => this.setState({ gender: 'male' })}
              />
              <CheckBox
                title='Female'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                size={moderateScale(20)}
                containerStyle={Styles.checkboxContainer}
                textStyle={{ fontSize: moderateScale(16), color: '#2B2B2B' }}
                checked={this.state.gender === 'female'}
                onPress={() => this.setState({ gender: 'female' })}
              />
              <CheckBox
                title='Others'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                size={moderateScale(20)}
                containerStyle={Styles.checkboxContainer}
                textStyle={{ fontSize: moderateScale(16), color: '#2B2B2B' }}
                checked={this.state.gender === 'others'}
                onPress={() => this.setState({ gender: 'others' })}
              />
            </View>

            <View style={{ marginTop: 20 }} />

              <Button
                style={[Styles.button, { opacity: error ? 0.5 : 1 }]}
                block
                info
                disabled={error}
                onPress={()=>this.handleRegister()}
              >
                <Text style={Styles.buttonText}>Sign Up</Text>
              </Button>
            <View style={{ marginTop: 50 }} />
          </Form>
        </Content>
      </ScrollView>
    );
  }
}
