import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import { Icon } from 'react-native-elements';

import { Styles } from './Styles';
import { moderateScale } from '../../constants/const_functions';
import { primaryColorRed } from '../../constants/const_strings';

export default MenuItemDetailField = props => {
  const { detail, index, food, cart } = props;

  return (
    <View
      key={props.key}
      style={{
        paddingLeft: moderateScale(20),
        backgroundColor: 'white',
        elevation: 2,
        marginBottom: 10,
        paddingBottom: detail[props.index] ? moderateScale(20) : 0
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          height: moderateScale(90),
          alignItems: 'center'
        }}
      >
        <View style={{ flex: 2 }}>
          <Image
            resizeMode='contain'
            source={{ uri: food.imageUrl }}
            style={Styles.imageStyle}
          />
        </View>
        <View style={{ flex: 6 }}>
          <Text style={Styles.text}>{food.name}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            detail[props.index] = !detail[props.index];
            props.updateState(detail);
          }}
          style={{ flex: 2, alignItems: 'center' }}
        >
          <Icon
            name={detail[props.index] ? 'chevron-thin-up' : 'chevron-thin-down'}
            type='entypo'
          />
        </TouchableOpacity>
      </View>
      {detail[props.index] && (
        <View>
          {food.foodItems.map((item, i) => {
            // if (!cart[item._id]) {
            //   cart[item._id] = {quantity: 0}
            // }
            return (
              <View
                key={i}
                style={{
                  flexDirection: 'row',
                  height: 30,
                  alignItems: 'center'
                }}
              >
                <View style={{ flex: 6 }}>
                  <Text style={Styles.smallText}>{item.name}</Text>
                </View>
                <View style={{ flex: 2 }}>
                  <Text style={Styles.smallText}>{item.price + ' $'}</Text>
                </View>
                <View
                  style={{
                    flex: 2,
                    justifyContent: 'space-around',
                    flexDirection: 'row'
                  }}
                >
                  {!cart[item._id] ||
                    (cart[item._id].quantity > 0 && (
                      <Icon
                        name='minus'
                        type='entypo'
                        size={20}
                        color={primaryColorRed}
                        onPress={() => {
                          cart[item._id] = {
                            name: item.name,
                            price: item.price,
                            imageUrl: food.imageUrl,
                            quantity: cart[item._id].quantity - 1
                          };
                          if (cart[item._id].quantity === 0) {
                            delete cart[item._id];
                          }
                          props.updateCart(cart);
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
                    name='plus'
                    type='entypo'
                    size={20}
                    color={primaryColorRed}
                    onPress={() => {
                      cart[item._id] = {
                        name: item.name,
                        price: item.price,
                        imageUrl: food.imageUrl,
                        quantity: !cart[item._id]
                          ? 1
                          : cart[item._id].quantity + 1
                      };
                      props.updateCart(cart);
                    }}
                  />
                </View>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};
