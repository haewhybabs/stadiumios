import React, { Component } from "react";
import { View, Text } from "react-native";

import { Icon } from "react-native-elements";

import SpinView from "../common/Spinner";
import Header from "../common/Header";
import { Styles } from "./Styles";
import { updateCart, moderateScale } from "../../constants/const_functions";
import { primaryColorRed } from "../../constants/const_strings";

export default class SearcResult extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data, cart } = this.props;

    return (
      <View
        style={{
          paddingLeft: moderateScale(20),
          backgroundColor: "white",
          elevation: 2,
          marginBottom: 10
        }}
      >
        {data.map((item, i) => {
          // if (!cart[item._id]) {
          //   cart[item._id] = {quantity: 0}
          // }
          return (
            <View
              key={i}
              style={{
                flexDirection: "row",
                height: 30,
                alignItems: "center"
              }}
            >
              <View style={{ flex: 6 }}>
                <Text style={Styles.smallText}>{item.name}</Text>
              </View>
              <View style={{ flex: 2 }}>
                <Text style={Styles.smallText}>{item.price + " $"}</Text>
              </View>
              <View
                style={{
                  flex: 2,
                  justifyContent: "space-around",
                  flexDirection: "row"
                }}
              >
                {!cart[item._id] ||
                  (cart[item._id].quantity > 0 && (
                    <Icon
                      name="minus"
                      type="entypo"
                      size={20}
                      color={primaryColorRed}
                      onPress={() => {
                        cart[item._id] = {
                          name: item.name,
                          price: item.price,
                          // imageUrl: food.imageUrl,
                          quantity: cart[item._id].quantity - 1
                        };
                        if (cart[item._id].quantity === 0) {
                          delete cart[item._id];
                        }
                        this.props.updateCart(cart);
                      }}
                    />
                  ))}
                {!cart[item._id] ||
                  (cart[item._id].quantity > 0 && (
                    <Text style={Styles.quantityText}>
                      {cart[item._id].quantity}
                    </Text>
                  ))}
                <Icon
                  name="plus"
                  type="entypo"
                  size={20}
                  color={primaryColorRed}
                  onPress={() => {
                    cart[item._id] = {
                      name: item.name,
                      price: item.price,
                      // imageUrl: food.imageUrl,
                      quantity: !cart[item._id]
                        ? 1
                        : cart[item._id].quantity + 1
                    };
                    this.props.updateCart(cart);
                  }}
                />
              </View>
            </View>
          );
        })}
      </View>
    );
  }
}
