import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { NavigationActions, StackActions } from 'react-navigation';
import { SQIPCore, SQIPCardEntry } from 'react-native-square-in-app-payments';
import Meteor from 'meteor-react-native';

import { Button } from 'native-base';

import SpinView from '../common/Spinner';
import { squareAppId } from '../../constants/const_strings';

export default class Payment extends Component {
  constructor(props) {
    super(props);

    this.onStartCardEntry = this.onStartCardEntry.bind(this);
    this.onCardNonceRequestSuccess = this.onCardNonceRequestSuccess.bind(this);
  }

  async componentDidMount() {
    await SQIPCore.setSquareApplicationId(squareAppId);
    this.onStartCardEntry();
  }

  onCardEntryComplete() {
    this.props.navigation.navigate('ShippingAddress');
  }

  chargeCard(nonce) {
    const amount = this.props.navigation.getParam('amount');
    const id = this.props.navigation.getParam('id');

    console.log('details',nonce,amount,id);

    

    Meteor.call(
      'createSQPayment',
      { nonce, amount, order_id: id },
      (err, res) => {
        
        if (err) {
          console.log('error',err);
        } else if (res) {
          console.log('api Called',res)
          Meteor.call(
            'addPaymentIdToOrder',
            { paymentId: res.payment.id, order_id: id },
            (er, result) => {
              console.log(er, result);
              if (er) {
                console.log(er);
              } else if (result) {
                this.props.navigation.navigate('OrderConfirmation', {
                  status: true,
                  id: id
                });
              }
            }
          );
        }
      }
    );
  }

  async onCardNonceRequestSuccess(cardDetails) {
    try {
      await this.chargeCard(cardDetails.nonce);


      await SQIPCardEntry.completeCardEntry(this.onCardEntryComplete());
    } catch (ex) {
      await SQIPCardEntry.showCardNonceProcessingError(ex.message);
    }
  }

  /**
   * Callback when card entry is cancelled and UI is closed
   */
  onCardEntryCancel(navigation) {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'OrderHistory' })]
    });
    navigation.dispatch(resetAction);
  }

  async onStartCardEntry() {
    const cardEntryConfig = {
      collectPostalCode: false
    };
    await SQIPCardEntry.startCardEntryFlow(
      cardEntryConfig,
      this.onCardNonceRequestSuccess,
      this.onCardEntryCancel(this.props.navigation)
    );
  }
  render() {
   
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <SpinView />
      </View>
    );
  }
}
