import React, { Component } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';

import Meteor, { Mongo, withTracker } from 'meteor-react-native';

import moment from 'moment';
import { NavigationEvents } from 'react-navigation';

import { Styles, width, height } from './Styles';
import Header from '../common/Header';
import HistoryField from './HistoryField';
import { getUserAsync, moderateScale } from '../../constants/const_functions';
import SpinView from '../common/Spinner';

class OrderHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      isLoaded: false
    };

    this.fetchUser();
  }

  async fetchUser() {
    const user = JSON.parse(await getUserAsync());
    console.log(user);
    this.setState(
      {
        user: user,
        uid: user._id
      },
      () => {
        this.fetchHistory();
        this.fecthOrderCount();
        this.t = setInterval(() => {
          this.fetchHistory();
        }, 10000);
      }
    );
  }

  fecthOrderCount() {
    const { uid } = this.state;

    Meteor.call('fetchOrderCountByUser', { uid }, (err, res) => {
      console.log(err, res);
      if (err) {
        alert('Cannot fetch history');
      } else {
        this.setState({ totalOrder: res });
      }
    });
  }

  fetchHistory() {
    const { uid } = this.state;

    Meteor.call('fetchOrdersByUser', { uid, page_no: 1 }, (err, res) => {
      console.log(err, res);
      if (err) {
        alert('Cannot fetch history');
      } else {
        this.setState({ history: res, isLoaded: true });
      }
    });
  }

  render() {
    console.log("History :",this.props.history)
    const isLoaded = this.state.isLoaded;
    const history= this.props.history;

    var recent = [];
    var running = [];
    if (history) {
      history.map((item, index) => {
        let max = moment(new Date());
        let min = max.diff(moment(item.createdAt), 'minutes');
        if (
          (item.status === 'Pending' && parseInt(min) < 10) ||
          (item.status === 'Pending for Payment' && parseInt(min) < 10) ||
          item.status === 'Confirmed' ||
          item.status === 'On The Way' ||
          item.status === 'Processing'
        ) {
          running.push(item);
        } else {
          recent.push(item);
        }
      });
    }

    if (!isLoaded) {
      return <SpinView />;
    }

    return (
      <View style={Styles.container}>
        <NavigationEvents
          onWillFocus={payload => this.fetchHistory()}
          onWillBlur={payload => clearInterval(this.t)}
        />

        <Header headerText='' navigation={this.props.navigation} />

        {/* showing empty page if cart is empty */}
        {history.length <= 0 && (
          <View>
            <Image
              resizeMode='cover'
              source={require('../../assets/Empty_Pages/upper.png')}
              style={{ width: width, height: height * 0.35 }}
            />
            <Image
              resizeMode='contain'
              source={require('../../assets/Empty_Pages/order_history.png')}
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
              No Order!
            </Text>
            <Text
              style={{
                fontSize: moderateScale(20),
                textAlign: 'center',
                paddingHorizontal: 50
              }}
            >
              Looks like you haven't make any order yet...
            </Text>
          </View>
        )}

        {history.length > 0 && (
          <ScrollView>
            <Text style={Styles.textLabel}>Running:</Text>
            {running.length < 1 && (
              <Text style={Styles.placeholderText}>No order is running</Text>
            )}
            {running.map((item, index) => {
              return (
                <HistoryField
                  key={index}
                  item={item}
                  statusText={item.status}
                  navigation={this.props.navigation}
                />
              );
            })}

            <Text style={Styles.textLabel}>Recent:</Text>
            <View
              style={{
                borderBottomWidth: 1,
                marginBottom: 10,
                borderBottomColor: '#DBDBDB'
              }}
            />
            {recent.map((item, index) => {
              return (
                <HistoryField
                  item={item}
                  statusText={item.status}
                  navigation={this.props.navigation}
                />
              );
            })}
          </ScrollView>
        )}
      </View>
    );
  }
}

let AppContainer = withTracker(() => {
  const currentUser=Meteor.user();
  Meteor.subscribe("fetchorders",currentUser._id);
  let data = Orders.find({ createdBy: currentUser._id }, { sort: { createdAt: -1 } }).fetch();
  
  
  return {
      history:data
  };
})(OrderHistory)

export default AppContainer;
