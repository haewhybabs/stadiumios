import React, { Component } from 'react';
import { View, Image, Text, BackHandler } from 'react-native';

import { Button } from 'native-base';
import Meteor from 'meteor-react-native';
import moment from 'moment';
import {
  fetchSavedStadium,
  verticalScale
} from '../../constants/const_functions';
import { Styles, width, height } from './Styles';
import Header from '../common/Header';
import {
  textColor,
  green,
  primaryColorRed
} from '../../constants/const_strings';
import SpinView from '../common/Spinner';
import { NavigationEvents } from 'react-navigation';

export default class OrderConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.navigation.getParam('id'),
      isLoaded: false,
      min: 0
    };
    this.handleBackButton = this.handleBackButton.bind(this);

    fetchSavedStadium(this);
    this.fetchOrderById();
    this.repeatFuction();
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    this.props.navigation.navigate('OrderHistory');
    return true;
  }

  repeatFuction() {
    this.t = setInterval(() => {
      this.fetchOrderById();
    }, 10000);
  }

  fetchOrderById() {
    const { id } = this.state;
    console.log('called', id);
    Meteor.call('fetchOrderById', id, (err, res) => {
      console.log(err, res);
      if (err) {
        console.log(err);
      } else {
        let max = moment(new Date());
        let min = max.diff(moment(res.createdAt), 'minutes');
        this.setState({ order: res, isLoaded: true, min });
      }
    });
  }

  render() {
    const status = this.props.navigation.getParam('status');
    const { order, isLoaded, min } = this.state;

    if (!isLoaded) {
      return <SpinView />;
    }

    console.log(order, min);
    return (
      <View style={Styles.container}>
        <NavigationEvents onWillBlur={payload => clearInterval(this.t)} />
        <Header headerText='' navigation={this.props.navigation} />

        {(status && order.status === 'Pending' && parseInt(min) < 10 && (
          <View style={{ flex: 1, padding: 20, alignItems: 'center' }}>
            <Image
              resizeMode='contain'
              source={require('../../assets/Assets/pending.png')}
              style={{
                width: width,
                height: '45%',
                marginTop: verticalScale(20)
              }}
            />
            <Text style={Styles.statusText1}>
              Your Order has been Placed successfully!
            </Text>
            <Text style={Styles.statusText2}>
              A delivery man will pick your order
            </Text>

            <Button
              style={Styles.greenButton}
              block
              info
              onPress={() =>
                this.props.navigation.navigate('FoodMenu', {
                  stadium: this.state.savedStadium
                })
              }
            >
              <Text style={Styles.buttonText}>Order More</Text>
            </Button>
            <Button
              style={[
                Styles.greenButton,
                {
                  marginBottom: verticalScale(60),
                  backgroundColor: primaryColorRed
                }
              ]}
              block
              info
              onPress={() => this.props.navigation.navigate('OrderHistory')}
            >
              <Text style={Styles.buttonText}>See All Your Orders</Text>
            </Button>
          </View>
        )) ||
          (status && order.status === 'Pending' && (
            <View style={{ flex: 1, padding: 20, alignItems: 'center' }}>
              <Image
                resizeMode='contain'
                source={require('../../assets/Assets/TimedOut.png')}
                style={{
                  width: width,
                  height: '45%',
                  marginTop: verticalScale(20)
                }}
              />
              <Text style={Styles.statusText1}>
                Your Order has been Timed out!
              </Text>
              <Text style={Styles.statusText2}>
                Sorry no delivery man is free to pick up the order
              </Text>

              <Button
                style={Styles.greenButton}
                block
                info
                onPress={() =>
                  this.props.navigation.navigate('FoodMenu', {
                    stadium: this.state.savedStadium
                  })
                }
              >
                <Text style={Styles.buttonText}>Order More</Text>
              </Button>
              <Button
                style={[
                  Styles.greenButton,
                  { marginBottom: 70, backgroundColor: primaryColorRed }
                ]}
                block
                info
                onPress={() => this.props.navigation.navigate('OrderHistory')}
              >
                <Text style={Styles.buttonText}>See All Your Orders</Text>
              </Button>
            </View>
          )) || (
            <View style={{ flex: 1, padding: 20, alignItems: 'center' }}>
              <Image
                resizeMode='contain'
                source={require('../../assets/Assets/busy.png')}
                style={{ width: width, height: '45%', marginTop: height * 0.1 }}
              />
              <Text style={Styles.statusText1}>
                Your Order has been Confirmed!
              </Text>
              <Text style={Styles.statusText2}>
                You will get your delivery within short time
              </Text>

              <Button
                style={Styles.greenButton}
                block
                info
                onPress={() =>
                  this.props.navigation.navigate('FoodMenu', {
                    stadium: this.state.savedStadium
                  })
                }
              >
                <Text style={Styles.buttonText}>Order More</Text>
              </Button>
              <Button
                style={[
                  Styles.greenButton,
                  { marginBottom: 70, backgroundColor: primaryColorRed }
                ]}
                block
                info
                onPress={() => this.props.navigation.navigate('OrderHistory')}
              >
                <Text style={Styles.buttonText}>See All Your Orders</Text>
              </Button>
            </View>
          )}

        {!status && (
          <View style={{ flex: 1, padding: 20, alignItems: 'center' }}>
            <Image
              resizeMode='contain'
              source={require('../../assets/Assets/confirmed.png')}
              style={{ width: width, height: '45%', marginTop: height * 0.1 }}
            />
            <Text style={Styles.statusText1}>
              Sorry! All Delivery Man are Busy!
            </Text>
            <Text style={Styles.statusText2}>
              Please try again after a while...
            </Text>

            <Button
              style={[Styles.greenButton, { backgroundColor: primaryColorRed }]}
              block
              info
              onPress={() =>
                this.props.navigation.navigate('OrderConfirmation')
              }
            >
              <Text style={Styles.buttonText}>Try Again</Text>
            </Button>
          </View>
        )}
      </View>
    );
  }
}
