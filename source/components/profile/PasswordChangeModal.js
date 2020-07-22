import React from 'react';
import { View, Text } from 'react-native';

import Modal from 'react-native-modal';
import { Input } from 'react-native-elements';
import { Button } from 'native-base';

import { Styles } from './Styles';
import {
  backgroundColor,
  primaryColorRed
} from '../../constants/const_strings';

export default PasswordChangeModal = props => {
  const {password, password1, currentPassword} = props

  return (
    <Modal
      isVisible={props.isPasswordModalVisible}
      onBackButtonPress={() =>
        props.updateState({ isPasswordModalVisible: false })
      }
      onBackdropPress={() =>
        props.updateState({ isPasswordModalVisible: false })
      }
    >
      <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
        <Input
          label='Current Password'
          value={currentPassword}
          secureTextEntry
          placeholder='Type your name here'
          containerStyle={Styles.textboxContainer}
          inputContainerStyle={Styles.inputContainerStyle}
          inputStyle={{ paddingLeft: 15 }}
          labelStyle={Styles.textboxLabelStyle}
          // leftIcon={<Icon name='user' type='simple-line-icon' />}
          // leftIconContainerStyle={{ opacity: 0.5 }}
          onChangeText={currentPassword => props.updateState({ currentPassword })}
          blurOnSubmit={false}
          // onSubmitEditing={() => {
          //   this.focusNextField('two');
          // }}
          returnKeyType='next'
          // ref={input => {
          //   this.inputs['one'] = input;
          // }}
        />

        <Input
          label='New Password'
          value={password}
          secureTextEntry
          placeholder='Type your name here'
          containerStyle={Styles.textboxContainer}
          inputContainerStyle={Styles.inputContainerStyle}
          inputStyle={{ paddingLeft: 15 }}
          labelStyle={Styles.textboxLabelStyle}
          // leftIcon={<Icon name='user' type='simple-line-icon' />}
          // leftIconContainerStyle={{ opacity: 0.5 }}
          onChangeText={password => props.updateState({ password })}
          blurOnSubmit={false}
          // onSubmitEditing={() => {
          //   this.focusNextField('two');
          // }}
          returnKeyType='next'
          // ref={input => {
          //   this.inputs['one'] = input;
          // }}
        />

        <Input
          label='Retype Password'
          value={password1}
          secureTextEntry
          placeholder='Type your name here'
          containerStyle={Styles.textboxContainer}
          inputContainerStyle={Styles.inputContainerStyle}
          inputStyle={{ paddingLeft: 15 }}
          labelStyle={Styles.textboxLabelStyle}
          // leftIcon={<Icon name='user' type='simple-line-icon' />}
          // leftIconContainerStyle={{ opacity: 0.5 }}
          onChangeText={password1 => props.updateState({ password1 })}
          blurOnSubmit={false}
          // onSubmitEditing={() => {
          //   this.focusNextField('two');
          // }}
          returnKeyType='next'
          // ref={input => {
          //   this.inputs['one'] = input;
          // }}
        />

        <View style={{ flexDirection: 'row', marginTop: 30, marginBottom: 15 }}>
          <Button
            style={[Styles.modalButton, { marginRight: 5, opacity: 0.5 }]}
            block
            onPress={() => props.updateState({ isPasswordModalVisible: false })}
          >
            <Text style={Styles.buttonText}>Cancel</Text>
          </Button>

          <Button
            style={[Styles.modalButton, { marginLeft: 5 }]}
            block
            info
            onPress={() => props.handlePasswordChange()}
          >
            <Text style={Styles.buttonText}>Confirm</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
};
