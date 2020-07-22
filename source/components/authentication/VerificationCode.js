import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';

import { Input, Icon } from 'react-native-elements';
import { Button } from 'native-base';
import Meteor from 'meteor-react-native';

import Styles from '../../styles/Authentication';
import { validation, moderateScale } from '../../constants/const_functions';

export default class VerificationCode extends Component {
  constructor(porps) {
    super(porps);
    this.state = {
      email: undefined
    };
  }

  handleSubmit() {
    const { email } = this.state;
    const username = email;
    console.log(email);

    Meteor.call('forgotPasswordRequest', username, (err, res) => {
      console.log(err, res);
      if (err) {
        alert('The email address you entered is incorrect or doesn\'t exist!')
      } else {
        alert('A verification code has been sent to your email!');
        this.props.navigation.navigate('ResetPassword', {email: email});
      }
    });
  }

  render() {
    const {email, emailError } = this.state
    const error = emailError || !email

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#F5F5F5',
          alignItems: 'center'
        }}
      >
        <View style={{ flex: 4, justifyContent: 'center' }}>
          <View style={Styles.imageView}>
            <Image
              style={Styles.image}
              source={require('../../assets/Assets/stadiyum_1.png')}
            />
          </View>
        </View>

        <View
          style={{ flex: 6, paddingLeft: 20, paddingRight: 20, width: '100%' }}
        >
          <Input
            label='Email'
            placeholder='Type your email here'
            value={undefined}
            containerStyle={{
              marginTop: 30,
              paddingLeft: 0,
              paddingRight: 0
            }}
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
            keyboardType='email-address'
            blurOnSubmit={false}
            onSubmitEditing={() => {
              this.handleSubmit();
            }}
            returnKeyType='done'
          />

          <View style={{ marginTop: 30 }} />

          <Button
            style={[Styles.button,{ opacity: error ? 0.5 : 1 }]}
            block
            info
            disabled={error}
            onPress={() => this.handleSubmit()}
          >
            <Text style={Styles.buttonText}>Send Verification Code</Text>
          </Button>

          <Text
            style={Styles.textFP}
            onPress={() => this.props.navigation.navigate('ResetPassword')}
          >
            Already have a code?
          </Text>
        </View>
      </View>
    );
  }
}
