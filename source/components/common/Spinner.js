import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Spinner from 'react-native-spinkit';
import { primaryColorRed } from '../../constants/const_strings';

export default SpinView = props => {
  return (
    <View style={styles.spinContainer}>
      <Spinner type='Circle' isVisible={true} size={100} color={primaryColorRed} />
    </View>
  );
};

const styles = StyleSheet.create({
  spinContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  }
});
