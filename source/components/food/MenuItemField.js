import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Styles } from './Styles';
import { primaryColorRed } from '../../constants/const_strings';

export default MenuItemField = props => {
  const { detail, food, cart, imageUrl, price, count } = props;
  return (
    <View
      // onPress={() => props.navigation.navigate('FoodMenuDetail')}
      style={Styles.itemContainer}
      key={props.key}
    >
      <View style={{ flex: 2 }}>
        <Image
          resizeMode='contain'
          source={{ uri: cart ? imageUrl : food.imageUrl }}
          style={Styles.imageStyle}
        />
      </View>
      <View style={{ flex: 6 }}>
        {props.cart && (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={Styles.text}>{props.name}</Text>
            <Text style={Styles.smallText}>{price + ' $ X ' + count }</Text>
          </View>
        )}
        {!props.cart && <Text style={Styles.text}>{food.name}</Text>}
      </View>
      <View style={{ flex: 2, alignItems: 'center' }}>
        {props.cart && (
          <View style={{ width: '100%', flex: 1, justifyContent: 'center' }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around'
              }}
            >
              {/*<MinusSquareOutlined 
              color={primaryColorRed}
              disabled={props.count===0 ? true:false}
              disabledStyle={{backgroundColor:'transparent'}}
              onPress={()=>props.updateQuantity(props.id,-1)}
              />*/}
              
              <TouchableOpacity
              disabled={props.count === 0 ? true : false}
              disabledStyle={{ backgroundColor: 'transparent' }}
              onPress={() => props.updateQuantity(props.id, -1)}
              >
                <Text>-</Text>
              </TouchableOpacity>

              <TouchableOpacity
              disabled={props.count === 0 ? true : false}
              disabledStyle={{ backgroundColor: 'transparent' }}
              onPress={() => props.updateQuantity(props.id, 1)}
              >
                <Text>+</Text>
              </TouchableOpacity>
              {/*<Text style={Styles.quantityText}>{props.count}</Text>
              <Icon
                name='plussquareo'
                type='antdesign'
                color={primaryColorRed}
                size={20}
                onPress={() => props.updateQuantity(props.id, 1)}
            />*/}
            </View>
            <View style={{ alignItems: 'center', paddingTop: 5 }}>
              <Text style={Styles.quantityText}>{parseInt(price) * count} $</Text>
            </View>
          </View>
        )}
        {!props.cart && (
          <TouchableOpacity
            onPress={() => {
              detail[props.index] = true;
              props.updateState(detail);
            }}
          >
            <Image
              source={require('../../assets/Assets/drop_down.png')}
              style={{ width: 20, height: 20 }}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
