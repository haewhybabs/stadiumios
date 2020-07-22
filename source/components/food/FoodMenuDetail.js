import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';

import { Button, Icon } from 'native-base';

import Header from '../common/Header';
import { Styles } from './Styles';
import MenuItemDetailField from './MenuItemDetailField';
import MenuItemField from './MenuItemField';
import { primaryColorRed } from '../../constants/const_strings';
import { moderateScale } from '../../constants/const_functions';

export default class FoodMenuDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={Styles.container}>
        <Header headerText='Food' navigation={this.props.navigation} />

        <ScrollView>
          <Text style={Styles.headerText}>What would you like to have?</Text>

          <View>
            <MenuItemDetailField name='Burger' />
            <MenuItemDetailField name='Burger' />
            <MenuItemDetailField name='Burger' />
            <MenuItemField name='Burger' />
          </View>
        </ScrollView>
        <Button
          onPress={() => this.props.navigation.navigate('Cart')}
          block
          iconRight
          style={{
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: moderateScale(50),
            backgroundColor: primaryColorRed,
            flexDirection: 'row'
          }}
        >
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Proceed to Cart</Text>
          <Icon name='arrow-forward' style={{right: 10, position: 'absolute'}}/>
        </Button>
      </View>
    );
  }
}
