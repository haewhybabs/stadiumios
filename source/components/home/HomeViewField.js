import React, { Component } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { moderateScale } from '../../constants/const_functions';

const { width, height } = Dimensions.get('window');

export default HomeViewField = props => {
  return (
    <TouchableOpacity
      onPress={() => props.navigation.navigate('FoodMenu', {stadium: props.stadium})}
      style={{ flexDirection: 'column', width: width / 2.4 }}
    >
      <Image
        resizeMode='cover'
        source={{ uri: props.stadium.imageUrl }}
        style={{ width: '100%', height: moderateScale(140) }}
      />
      <Text
        numberOfLines={1}
        style={{
          textAlign: 'center',
          fontSize: moderateScale(16),
          paddingTop: 5,
          color: '#2B2B2B'
        }}
      >
        {props.stadium.name}
      </Text>
    </TouchableOpacity>
  );
};
