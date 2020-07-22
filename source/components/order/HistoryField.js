import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { Icon } from 'react-native-elements';

import { Styles } from './Styles';
import { green, primaryColorRed, yellow } from '../../constants/const_strings';
import { moderateScale } from '../../constants/const_functions';

export default HistoryField = props => {
  const { statusText, status, key, item } = props;
  let max = moment(new Date());
  let min = max.diff(moment(item.createdAt), 'minutes');
  // console.log(min);
  return (
    <TouchableOpacity
      key={item._id}
      onPress={() =>
        props.navigation.navigate('OrderHistoryDetails', {
          history: item,
          status: item.status
        })
      }
      style={Styles.fieldContainer}
    >
      <View style={{ flex: status === 'running' ? 6 : 7, padding: 10 }}>
        <Text style={Styles.fieldText1}>Order No: {item.orderNo}</Text>
        <Text style={Styles.fieldText2}>{item.stadium.name}</Text>     
      </View>
      <View
        style={[
          Styles.fieldStatusContainer,
          {
            flex: item.status === 'running' ? 5 : 3,
            backgroundColor:
              item.status === 'Cancelled' ||
              item.status === 'Rejected' ||
              item.status === 'Reject'
                ? primaryColorRed
                : item.status === 'Delivered'
                ? green
                : item.status === 'Pending'
                ? 'grey'
                : item.status === 'Processing'
                ? 'blue'
                : item.status === 'On The Way'
                ? 'olive'
                : yellow
          }
        ]}
      >
        {item.status === 'Processing' && (
          <Image
            source={require('../../assets/Assets/Refresh.png')}
            style={{ width: 25, height: 25 }}
          />
        )}
        {item.status === 'Delivered' && (
          <Image
            source={require('../../assets/Assets/Delivered.png')}
            style={{ width: 25, height: 25 }}
          />
        )}
        {item.status === 'Cancelled' && (
          <Image
            source={require('../../assets/Assets/Canceled.png')}
            style={{ width: 25, height: 25 }}
          />
        )}
        {(item.status === 'Reject' || item.status === 'Rejected') && (
          <Image
            source={require('../../assets/status_icon/close-cross.png')}
            style={{ width: 20, height: 20 }}
          />
        )}
        {(item.status === 'Pending' || item.status === 'Pening for Payment') &&
          ((min < 10 && (
            <Image
              source={require('../../assets/status_icon/time-left.png')}
              style={{ width: 22, height: 22 }}
            />
          )) || <Icon name='timer-off' type='material' color='white' />)}
        {item.status === 'Confirmed' && (
          <Image
            source={require('../../assets/status_icon/clicker.png')}
            style={{ width: 22, height: 22 }}
          />
        )}
        {item.status === 'On The Way' && (
          <Image
            source={require('../../assets/status_icon/double-directional-arrow.png')}
            style={{ width: 22, height: 22 }}
          />
        )}
        <Text
          style={{
            fontSize: moderateScale(16),
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center'
          }}
        >
          {(item.status === 'Pending' ||
            item.status === 'Pending for Payment') &&
          parseInt(min) >= 10
            ? item.status === 'Pending'
              ? 'Timed Out'
              : 'Payment Timed Out'
            : item.statusText || item.status}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
