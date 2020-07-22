import React from 'react';
import { View, Text } from 'react-native';

import Modal from 'react-native-modal';
import { Input, Rating, AirbnbRating } from 'react-native-elements';
import { Button } from 'native-base';

import { Styles as MainStyle } from './Styles';
import Styles from '../../styles/Authentication';

export default IssueModal = props => {
  const { message } = props;

  return (
    <Modal
      isVisible={props.isModalVisible}
      onBackButtonPress={() =>
        props.updateState({ isModalVisible: !props.isModalVisible })
      }
      onBackdropPress={() =>
        props.updateState({ isModalVisible: !props.isModalVisible })
      }
    >
      <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, paddingTop:0 }}>
        <AirbnbRating defaultRating={0} onFinishRating={value => props.updateState({ value })} />

        <Input
          // label='Feedback'
          value={message}
          multiline={true}
          numberOfLines={4}
          placeholder='Please give feedback about the order'
          containerStyle={Styles.textboxContainer}
          inputContainerStyle={[Styles.inputContainerStyle, { height: 100 }]}
          inputStyle={{ paddingLeft: 15, textAlignVertical: 'top' }}
          labelStyle={Styles.textboxLabelStyle}
          onChangeText={message => {
            props.updateState({ message });
          }}
          blurOnSubmit={false}
          // onSubmitEditing={() => {
          //   this.focusNextField('two');
          // }}
          returnKeyType='next'
          // ref={input => {
          //   this.inputs['one'] = input;
          // }}
        />

        <Button
          style={[Styles.button, { width: '100%', marginTop: 20 }]}
          block
          info
          onPress={() => props.reportIssue()}
        >
          <Text style={Styles.buttonText}>Submit</Text>
        </Button>
      </View>
    </Modal>
  );
};
