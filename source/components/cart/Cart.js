import React, { Component } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';

import { Button } from 'native-base';
import { Icon } from 'react-native-elements';

import Header from '../common/Header';
import { Styles, width, height } from './Style';
import { primaryColorRed } from '../../constants/const_strings';
import {
  moderateScale,
  fetchCartData,
  updateCart,
  updateCartFood
} from '../../constants/const_functions';
import MenuItemField from '../food/MenuItemField';
import SpinView from '../common/Spinner';

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: {},
      cart: {},
      isLoaded: false,
      total: 0
    };

    this.fetchCartData();
  }

  async fetchCartData() {
    await fetchCartData(this);
    console.log(this.state.cart);
    const quantity = {};
    for (key in this.state.cart) quantity[key] = this.state.cart[key].quantity;
    console.log(this.state.cart);
    this.setState({ quantity, isLoaded: true });
  }

  updateState(obj) {
    this.setState(obj);
  }

  updateQuantity(id, value) {
    const { quantity, cart } = this.state;
    if (quantity[id] === 0) {
      // TODO :: Show toast message
      return;
    }
    quantity[id] = quantity[id] + value;
    console.log(quantity);

    this.setState({ quantity }, () => {
      for (key in quantity) {
        cart[key].quantity = quantity[key];
        if (quantity[key] === 0) {
          delete cart[key];
          this.setState({ quantity }, () => this.fetchCartData());
          console.log(cart);
        }
      }
      updateCartFood(cart, this);
    });
  }

  render() {
    const { cart, quantity, isLoaded } = this.state;
    const arrCart = [];
    for (var key in cart) {
      if (cart.hasOwnProperty(key)) {
        arrCart.push({ ...cart[key], id: key });
      }
    }

    console.log(cart, arrCart);
    var total = 0;

    if (!isLoaded) {
      return <SpinView />;
    }

    return (
      <View style={Styles.container}>
        <Header headerText='Cart' navigation={this.props.navigation} />

        {/* showing empty page if cart is empty */}
        {arrCart.length <= 0 && (
          <View>
            <Image
              resizeMode='cover'
              source={require('../../assets/Empty_Pages/upper.png')}
              style={{ width: width, height: height * 0.35 }}
            />
            <Image
              resizeMode='contain'
              source={require('../../assets/Empty_Pages/cart.png')}
              style={{
                width: 140,
                height: 130,
                position: 'absolute',
                top: height * 0.27,
                left: width / 2 - 72
              }}
            />
            <Text
              style={{
                fontSize: moderateScale(25),
                marginTop: 90,
                color: 'black',
                textAlign: 'center'
              }}
            >
              Empty Cart
            </Text>
            <Text
              style={{
                fontSize: moderateScale(20),
                textAlign: 'center',
                paddingHorizontal: 50
              }}
            >
              Looks like you haven't make your choice yet...
            </Text>
          </View>
        )}

        {arrCart.length > 0 && (
          <ScrollView>
            <Text style={Styles.headerText}>Added Items:</Text>

            {arrCart.map((item, index) => {
              total += parseInt(item.price) * quantity[item.id];
              return (
                <MenuItemField
                  key={index}
                  id={item.id}
                  name={item.name}
                  cart={true}
                  price={item.price}
                  imageUrl={item.imageUrl}
                  count={quantity[item.id]}
                  updateState={this.updateState.bind(this)}
                  updateQuantity={this.updateQuantity.bind(this)}
                />
              );
            })}
          </ScrollView>
        )}

        {arrCart.length > 0 && (
          <Button
            onPress={() => {
              this.props.navigation.navigate('ShippingAddress', {
                amount: total
              });
            }}
            block
            iconRight
            style={Styles.button}
          >
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
              Total {total} $
            </Text>
            {/*<Icon
              name='ios-arrow-forward'
              type='ionicon'
              color='white'
              containerStyle={{
                right: moderateScale(30),
                position: 'absolute'
              }}
            />*/}
          </Button>
        )}
      </View>
    );
  }
}
