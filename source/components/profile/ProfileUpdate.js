import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Modal,
  AsyncStorage,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import { Form, Button, Content } from 'native-base';
import { Input, Icon, CheckBox } from 'react-native-elements';
import Meteor from 'meteor-react-native';

import { validation, moderateScale, verticalScale } from '../../constants/const_functions';
import Styles from '../../styles/Authentication';
import { height } from '../food/Styles';

export default class ProfileUpdate extends Component {
  constructor(props) {
    super(props);
    const proifle = this.props.navigation.getParam('profile');
    this.state = {
      name: proifle.name,
      email: proifle.email,
      phone: proifle.phone,
      gender: proifle.gender,
      reload: false
    };

    this.inputs = {};
  }

  handleSubmit() {
    const { name, email, phone, gender } = this.state;
    const uId = this.props.navigation.getParam('id');
    const data = { uId, name, email, phone, gender };
    console.log(Meteor.userId());

    Meteor.call('updateProfile', data, (err, res) => {
      console.log(err, res);
      if (err) {
        alert('Something went wrong!');
      } else {
        AsyncStorage.setItem('user', JSON.stringify(Meteor.user()), () => {
          alert('Profile updated successfuly!');
          this.props.navigation.goBack();
        });
      }
    });
  }

  focusNextField(id) {
    this.inputs[id].focus();
  }

  render() {
    const {
      name,
      phone,
      email,
      gender,
      nameError,
      emailError,
      phoneError
    } = this.state;

    const error =
      nameError ||
      emailError ||
      phoneError ||
      !name ||
      !phone ||
      !email ||
      !gender;

    return (
      <ScrollView
        style={{
          backgroundColor: '#F0F5F6',
          paddingLeft: 20,
          paddingTop: 30,
          paddingRight: 20,
          paddingBottom: 20
        }}
      >
        <Content
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            height: height
          }}
        >
          <Form>
            <Input
              label='Name'
              value={name}
              placeholder='Type your name here'
              containerStyle={Styles.textboxContainer}
              inputContainerStyle={Styles.inputContainerStyle}
              inputStyle={Styles.inputStyle}
              labelStyle={Styles.textboxLabelStyle}
              leftIcon={<Icon name='user' type='simple-line-icon' size={moderateScale(20)} />}
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
              value={email}
              containerStyle={Styles.textboxContainer}
              inputContainerStyle={Styles.inputContainerStyle}
              inputStyle={Styles.inputStyle}
              labelStyle={Styles.textboxLabelStyle}
              leftIcon={<Icon name='envelope' type='simple-line-icon' size={moderateScale(20)} />}
              leftIconContainerStyle={{ opacity: 0.5 }}
              onChangeText={email => {
                if (validation(email, 'isEmail') !== true) {
                  this.setState({ emailError: true });
                } else this.setState({ emailError: false });
                this.setState({ email });
              }}
              errorMessage={
                this.state.emailError ? 'Enter a valid email address' : ''
              }
              blurOnSubmit={false}
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
              placeholder='Type your phone number here'
              value={phone}
              containerStyle={Styles.textboxContainer}
              inputContainerStyle={Styles.inputContainerStyle}
              inputStyle={Styles.inputStyle}
              labelStyle={Styles.textboxLabelStyle}
              leftIcon={<Icon name='phone' type='simple-line-icon' size={moderateScale(20)} />}
              leftIconContainerStyle={{ opacity: 0.5 }}
              onChangeText={phone => {
                if (validation(phone, 'isPhone') !== true) {
                  this.setState({ phoneError: true });
                } else this.setState({ phoneError: false });
                this.setState({ phone });
              }}
              errorMessage={
                this.state.phoneError ? 'Enter a valid phone number' : ''
              }
              blurOnSubmit={false}
              keyboardType='phone-pad'
              returnKeyType='done'
              ref={input => {
                this.inputs['three'] = input;
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginTop: verticalScale(10)
              }}
            >
              <CheckBox
                title='Male'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                size={moderateScale(20)}
                containerStyle={Styles.checkboxContainer}
                checked={this.state.gender === 'male'}
                textStyle={{ fontSize: 17, color: '#2B2B2B' }}
                onPress={() => this.setState({ gender: 'male' })}
              />
              <CheckBox
                title='Female'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                size={moderateScale(20)}
                containerStyle={Styles.checkboxContainer}
                textStyle={{ fontSize: 17, color: '#2B2B2B' }}
                checked={this.state.gender === 'female'}
                onPress={() => this.setState({ gender: 'female' })}
              />
              <CheckBox
                title='Others'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                size={moderateScale(20)}
                containerStyle={Styles.checkboxContainer}
                textStyle={{ fontSize: 17, color: '#2B2B2B' }}
                checked={this.state.gender === 'others'}
                onPress={() => this.setState({ gender: 'others' })}
              />
            </View>

            <View style={{ marginTop: verticalScale(15) }} />
            <Button
              style={[Styles.button, { opacity: error ? 0.5 : 1 }]}
              block
              info
              disabled={error}
              onPress={() => this.handleSubmit()}
            >
              <Text style={Styles.buttonText}>Save</Text>
            </Button>
            <View style={{ marginTop: 50 }} />
          </Form>
        </Content>
      </ScrollView>
    );
  }
}
