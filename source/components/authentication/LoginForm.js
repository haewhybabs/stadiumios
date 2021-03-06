import React, { Component } from 'react';
import { Text, View, Image, ScrollView } from 'react-native';

import { Button } from 'native-base';
import { Input, Icon } from 'react-native-elements';
import PropTypes from 'prop-types';

import Styles from '../../styles/Authentication';
import { validation, moderateScale } from '../../constants/const_functions';

export default class LogIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: undefined,
      password: undefined,
      showPassword: false
    };

    this.focusNextField = this.focusNextField.bind(this);

    this.inputs = {};
  }

  focusNextField(id) {
    this.inputs[id].focus();
  }

  render() {
    const { email, password, showPassword } = this.state;
    const { handleCreateAccount, handleLogin } = this.props;

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={Styles.imageView}>
          <Image
            style={Styles.image}
            source={require('../../assets/Assets/logo.png')}
          />
        </View>
        <Input
          label='Email'
          placeholder='Type your email here'
          value={email}
          containerStyle={{ marginTop: 30, paddingLeft: 0, paddingRight: 0 }}
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
          errorMessage={this.state.emailError ? 'Enter a valid email' : ''}
          keyboardType='email-address'
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
          label='Password'
          placeholder='Type your password here'
          secureTextEntry={showPassword ? false : true}
          value={password}
          containerStyle={Styles.textboxContainer}
          inputContainerStyle={Styles.inputContainerStyle}
          inputStyle={Styles.inputStyle}
          labelStyle={Styles.textboxLabelStyle}
          leftIcon={<Icon name='key' type='simple-line-icon' size={moderateScale(20)} />}
          leftIconContainerStyle={{ opacity: 0.5 }}
          rightIcon={
            <Icon
              name={showPassword ? 'eye-off-outline' : 'eye'}
              type={showPassword ? 'material-community' : 'simple-line-icon'}
              onPress={() => this.setState({ showPassword: !showPassword })}
              size={moderateScale(20)}
            />
          }
          rightIconContainerStyle={{ paddingRight: 5, opacity: 0.5 }}
          onChangeText={value => this.setState({ password: value })}
          onSubmitEditing={() => handleLogin(email, password)}
          returnKeyType='done'
          blurOnSubmit
          ref={input => {
            this.inputs['two'] = input;
          }}
        />

        <View style={{ marginTop: 30 }} />

        <Button
          style={Styles.button}
          block
          info
          onPress={()=>this.props.handleLogin(email, password)}
        >
          <Text style={Styles.buttonText}>Log In</Text>
        </Button>

        <Text
          style={Styles.textFP}
          onPress={() => this.props.navigation.navigate('VerificationCode')}
        >
          Forgot Password?
        </Text>

        <View style={{ marginTop: 10 }} />

        <Button
          style={Styles.signupButton}
          block
          info
          onPress={() => this.props.navigation.navigate('Registration')}
        >
          <Text style={{ fontSize: moderateScale(18), color: '#4E5C7E', fontWeight: 'bold' }}>
            Sign Up
          </Text>
        </Button>
      </ScrollView>
    );
  }
}
