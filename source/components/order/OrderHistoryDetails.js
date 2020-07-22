import React, { Component } from 'react';
import { View, Text, Image, ScrollView, Alert, Linking } from 'react-native';

import { Button } from 'native-base';
import Meteor from 'meteor-react-native';
import moment from 'moment';
import { Icon } from 'react-native-elements';

import Header from '../common/Header';
import { Styles } from './Styles';
import { textColor, primaryColorRed } from '../../constants/const_strings';
import IssueModal from './IssueModal';
import { moderateScale, verticalScale } from '../../constants/const_functions';
import { Card, CardItem, Right } from 'native-base';

export default class OrderHistoyrDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      value: undefined,
      message: undefined
    };
  }

  updateState(obj) {
    this.setState(obj);
  }

  orderAgain(id) {
    Alert.alert('Order Again', 'Are you sure to order again?', [
      {
        text: 'Cancel',
        onPress: () => {
          return;
        },
        style: 'cancel'
      },
      {
        text: 'Yes',
        onPress: () => {
          Meteor.call('reOrder', id, (err, res) => {
            console.log(err, res);
            if (err) {
              alert('Cannot place the order now!');
            } else {
              alert('Order has been placed successfuly!');
              this.props.navigation.navigate('OrderHistory');
            }
          });
        }
      }
    ]);
  }

  updateOrderStatus(id) {
    Alert.alert('Cancel Order', 'Are you sure to cancel the order?', [
      {
        text: 'No',
        onPress: () => {
          return;
        },
        style: 'cancel'
      },
      {
        text: 'Yes',
        onPress: () => {
          Meteor.call(
            'updateOrderStatus',
            { id, status: 'Cancelled', statusMessage: 'Cancelled By User' },
            (err, res) => {
              console.log(err, res);
              if (err) {
                alert('Cannot cancel the order now!');
              } else {
                alert('Order has been cancelled');
                this.props.navigation.navigate('OrderHistory');
              }
            }
          );
        }
      }
    ]);
  }

  reportIssue() {
    const orderId = this.props.navigation.getParam('history')._id;
    const { value, message } = this.state;
    if (message === undefined) {
      alert('Please write your issue');
      return;
    }

    Meteor.call('rateOrder', { orderId, value, message }, (err, res) => {
      console.log(err, res);
      if (err) {
        alert("Request couldn't be processed now!");
      } else {
        alert('Successfuly submitted the issue!');
        this.setState({ isModalVisible: false });
      }
    });
  }

  render() {
    const { value, message } = this.state;

    const histroy = this.props.navigation.getParam('history');
    const status = this.props.navigation.getParam('status');

    let max = moment(new Date());
    let min = max.diff(moment(histroy.createdAt), 'minutes');

    var total = 0;
    const foods = [];
    const temp = histroy.foodItems;
    console.log(histroy);
    for (var key in temp) {
      if (temp.hasOwnProperty(key)) {
        foods.push({ ...temp[key], id: key });
      }
    }

    return (
      <View style={Styles.container}>
        <Header headerText='' navigation={this.props.navigation} />

        <IssueModal
          isModalVisible={this.state.isModalVisible}
          updateState={this.updateState.bind(this)}
          reportIssue={this.reportIssue.bind(this)}
          value={value}
          message={message}
        />

        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Text
              style={{
                margin: 20,
                marginVertical: verticalScale(10),
                fontSize: moderateScale(16),
                color: textColor
              }}
            >
              Order Details:
            </Text>
            {((histroy.status === 'Pending' && parseInt(min) < 10) ||
              histroy.status === 'Confirmed') && (
              <Button
                block
                // disabled={this.state.orderCancel}
                style={[Styles.cancelButton]}
                onPress={() => this.updateOrderStatus(histroy._id)}
              >
                <Text style={{ color: 'white', textAlign: 'center' }}>
                  Cancel Order
                </Text>
              </Button>
            )}
          </View>

          <View style={{ marginLeft: 35 }}>
            <Text
              style={{
                fontSize: moderateScale(20),
                fontWeight: 'bold',
                color: primaryColorRed
              }}
            >
              Order No: {histroy.orderNo}
            </Text>
            <Text style={{ fontSize: moderateScale(17), color: textColor }}>
              {histroy.stadium.name}
            </Text>
          </View>
          <View style={{marginLeft:15,marginRight:15}}>
            
              {histroy.deliveryOption=="delivery" ?

              <Card>      
                <CardItem>
                  <Text>Delivery Option : {histroy.deliveryOption}</Text>
                </CardItem>
                <CardItem>
                  <Text>Address : {histroy.address}</Text>
                </CardItem>            
                <CardItem>
                  <Text>Home Address : {histroy.homeAddress}</Text>
                </CardItem>
                <CardItem>
                  <Text>Delivery Comment: {histroy.deliveryComment}</Text>
                </CardItem>
                <CardItem>
                  <Text>Note: {histroy.note}</Text>
                </CardItem>
              </Card> 
              :

              <Card>
                <CardItem>
                  <Text>Delivery Option : {histroy.deliveryOption}</Text>
                </CardItem>

              </Card>


            
              }
                      
            
          </View>

          <Text
            style={{
              margin: 20,
              marginVertical: verticalScale(10),
              fontSize: moderateScale(16),
              color: textColor
            }}
          >
            Ordered Items:
          </Text>

          {/* Order histroy Items View */}
          {foods.map((item, index) => {
            total += parseFloat(item.price) * parseInt(item.quantity);
            return (
              <View key={index} style={Styles.detailItemContainer}>
                <View style={{ flex: 2 }}>
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={{
                      width: moderateScale(40),
                      height: moderateScale(40)
                    }}
                  />
                </View>
                <View style={{ flex: 8 }}>
                  <Text
                    style={{
                      fontSize: moderateScale(18),
                      color: textColor,
                      fontWeight: 'bold'
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text style={{ color: textColor }}>
                    {item.quantity + ' x ' + item.price} $
                  </Text>
                </View>
              </View>
            );
          })}

          <View style={Styles.totalView}>
            <Text style={Styles.totalText}>Total = {total} $</Text>
          </View>

          {histroy.agent && (
            <Text
              style={{
                margin: 20,
                marginVertical: verticalScale(10),
                fontSize: moderateScale(16),
                color: textColor
              }}
            >
              Delivery Man:
            </Text>
          )}
          {histroy.agent && (
            <View style={Styles.detailItemContainer}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={require('../../assets/Assets/profile.png')}
                  style={{
                    width: moderateScale(40),
                    height: moderateScale(40)
                  }}
                />
                <Text
                  style={{
                    fontSize: moderateScale(17),
                    color: textColor,
                    paddingLeft: 10
                  }}
                >
                  {histroy.agent.name || 'Name not given'}
                </Text>
              </View>

              {histroy.agent.phone && (
                <Icon
                  name='phone'
                  type='font-awesome'
                  raised
                  size={moderateScale(18)}
                  onPress={() => Linking.openURL(`tel:${histroy.agent.phone}`)}
                />
              )}
            </View>
          )}
          {histroy.status === 'Rejected' && (
            <Text style={{ margin: 20, fontSize: 17, color: textColor }}>
              Rejection Cause:{' '}
              <Text style={{ fontStyle: 'italic' }}>
                {histroy.statusMessage}
              </Text>
            </Text>
          )}
        </ScrollView>
        <View style={{ marginTop: 5 }}>
          <Button
            style={Styles.button}
            block
            info
            onPress={() => this.setState({ isModalVisible: true })}
          >
            <Text style={Styles.buttonText}>Report Issue</Text>
          </Button>

          <Button
            style={Styles.greenButton}
            block
            info
            onPress={() => {
              if (status === 'Pending for Payment' && parseInt(min) < 10) {
                this.props.navigation.navigate('Payment', {
                  id: histroy._id,
                  amount: total
                });
              } else {
                this.props.navigation.navigate('ShippingAddress', {
                  id: histroy._id,
                  amount: total
                });
              }
            }}
          >
            <Text style={Styles.buttonText}>
              {status === 'Pending for Payment' && parseInt(min) < 10
                ? 'Complete Payment'
                : 'Order Again'}
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}
