import React, { Component } from 'react';
import {
  Text,
  View,
  BackHandler,
  ToastAndroid,
  ScrollView,
  StatusBar
} from 'react-native';

import Meteor from 'meteor-react-native';
import PropTypes from 'prop-types';

import HomeViewField from './HomeViewField';
import Styles from '../../styles/Home';
import SpinView from '../common/Spinner';
import { moderateScale } from '../../constants/const_functions';
import { statusBarRed } from '../../constants/const_strings';

export default class Home extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      stadiums: [],
      isLoaded: false,
      lastPress: undefined
    };
    this.fetchStadium();

    // this.handleBackButton = this.handleBackButton.bind(this);
  }

  fetchStadium() {
    Meteor.call('fetchStadiums', (err, res) => {
      console.log(err, res);
      if (err) {
        alert(err.message);
      } else {
        this.setState({ stadiums: res, isLoaded: true });
      }
    });
  }

  // componentDidMount() {
  //   BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  // }

  // componentWillUnmount() {
  //   BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  // }

  // handleBackButton() {
  //   const currentTime = moment();
  //   let duration;
  //   const { lastPress } = this.state;
  //   if (lastPress)
  //     duration = moment.duration(currentTime.diff(lastPress)).asSeconds();
  //   if (duration < 2.5) {
  //     BackHandler.exitApp();
  //   } else {
  //     this.setState({ lastPress: currentTime });
  //     ToastAndroid.show('Please tap BACK again to exit!', ToastAndroid.SHORT);
  //     return true;
  //   }
  // }

  render() {
    const { stadiums, isLoaded } = this.state;

    if (!isLoaded) {
      return <SpinView />;
    }

    let temp = [];

    for (let index = 0; index < stadiums.length; index += 2) {
      temp.push(
        <View style={Styles.content} key={index}>
          <HomeViewField
            navigation={this.props.navigation}
            stadium={stadiums[index]}
          />
          <View style={{ width: moderateScale(18) }} />
          {stadiums.length - 1 >= index + 1 && (
            <HomeViewField
              navigation={this.props.navigation}
              stadium={stadiums[index + 1]}
            />
          )}
        </View>
      );
    }

    return (
      <View style={Styles.container}>
        <StatusBar backgroundColor={statusBarRed} barStyle='light-content' />
        {/* <Header headerText="HOME" navigation={this.props.navigation} /> */}
        <Text style={Styles.headerText}>Select Your Option</Text>
        <ScrollView>{temp}</ScrollView>
      </View>
    );
  }
}

Home.propTypes = {
  navigation: PropTypes.object.isRequired
};
