import React, { Component } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';

import { Input, Icon,CheckBox } from 'react-native-elements';
import { Button } from 'native-base';
import Meteor from 'meteor-react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationActions, StackActions } from 'react-navigation';
import { SQIPCore, SQIPCardEntry } from 'react-native-square-in-app-payments';

import { Styles } from './Styles';
import Header from '../common/Header';
import { width } from '../cart/Style';
import {
  verticalScale,
  fetchCartData,
  fetchSavedStadium,
  getUserAsync,
  moderateScale,
  getStadiumAsync
} from '../../constants/const_functions';
import SpinView from '../common/Spinner';

export default class ShippingAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      section: undefined,
      row: undefined,
      seatNo: undefined,
      note: undefined,
      isLoaded: false,
      deliveryOption:undefined,
      homeAddress:undefined,
      address:undefined,
      deliveryComment:undefined
    };

    this.inputs = {};
    this.fetchUser();
    fetchCartData(this);
    fetchSavedStadium(this);
    this.fetchStadiumDetails();
  }


  async fetchStadiumDetails(){ 
    const details = JSON.parse(await getStadiumAsync());
    // console.log("stadiumDetails",details)
    const id =details._id;
    Meteor.call('fetchStadiumsById',id, (err, res) => {
      console.log(err, res);
      if (err) {
        alert(err.message);
      } else {
        this.setState({ stadiumData: res, isLoaded: true });
      }
    });
  }



  async fetchUser() {
    const user = JSON.parse(await getUserAsync());
    console.log(user);
    this.setState(
      {
        user: user,
        _id: user._id,
        profile: user.profile
      },
      () => this.setState({ isLoaded: true })
    );
  }

  handleSubmit() {
    let {
      cart,
      section,
      row,
      seatNo,
      note,
      savedStadium,
      profile,
      homeAddress,
      deliveryComment,
      address,
      deliveryOption,
      _id
    } = this.state;

    if(deliveryOption==='delivery'){
      if (address === undefined) {
        alert('Please enter your address!');
        return;
      } else if (homeAddress === undefined) {
        alert('Please enter your home address!');
        return;
      } 
    }
    // } else if (note === undefined) {
    //   alert('Please enter note!');
    //   return;
    // }

    const id = this.props.navigation.getParam('id');
    if (id) {
      const amount = this.props.navigation.getParam('amount');
      const changes = { section, row, seatNo, note };
      Meteor.call('reOrder', { id, changes }, (err, res) => {
        console.log(err, res);
        if (err) {
          this.props.navigation.navigate('OrderConfirmation', {
            status: false
          });
        } else {
          this.setState({ id: id });
          this.props.navigation.navigate('Payment', { id: id, amount: amount });
        }
      });
      return;
    }
    let data = {};

    if(deliveryOption=='pickup')
    {
      data = {
        foodItems: cart,
        amount: this.props.navigation.getParam('amount'),
        deliveryOption,
        orderedBy: { name: profile.name, phone: profile.phone,_id },
        stadium:savedStadium
      }
    }

    else if (deliveryOption=='delivery'){

      data = {

        foodItems: cart,
        amount: this.props.navigation.getParam('amount'),       
        address,
        homeAddress,
        deliveryComment,
        note,
        deliveryOption,
        orderedBy: { name: profile.name, phone: profile.phone,_id },
        stadium:savedStadium

      };

    }

    
    

    Meteor.call('addOrder', data, (err, res) => {
      console.log(err, res);
      if (err) {
        this.props.navigation.navigate('OrderConfirmation', { status: false });
      } else {
        this.setState({ id: res });
        AsyncStorage.multiRemove(['cart'], (err, r) => {
          this.props.navigation.navigate('Payment', {
            id: res,
            amount: data.amount
          });
        });
      }
    });
  }

  focusNextField(id) {
    this.inputs[id].focus();
  }

  render() {
    const { section, row, seatNo, note, isLoaded,savedStadium,stadiumData } = this.state;
    let deliveryOptions =[];
    let checkBoxToShow = [];
    
    
    if(stadiumData)
    {
      
      
      deliveryOptions = stadiumData.deliveryOptions
      console.log("stad",deliveryOptions.length)
      
      if(deliveryOptions.length>1){
        checkBoxToShow.push(
          <View>
          <CheckBox
              title='Pick Up'
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              size={moderateScale(20)}
              containerStyle={Styles.checkboxContainer}
              checked={this.state.deliveryOption === 'pickup'}
              textStyle={{ fontSize: moderateScale(16), color: '#2B2B2B' }}
              onPress={() => this.setState({ deliveryOption: 'pickup' })}
            />
            
          <CheckBox
            title='Delivery'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            size={moderateScale(20)}
            containerStyle={Styles.checkboxContainer}
            checked={this.state.deliveryOption === 'delivery'}
            textStyle={{ fontSize: moderateScale(16), color: '#2B2B2B' }}
            onPress={() => this.setState({ deliveryOption: 'delivery' })}
          />
          </View>
        )
      }
      else{
        if(deliveryOptions[0]=="pickup"){
          checkBoxToShow.push(
            <View>

              <CheckBox
                title='Pick Up'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                size={moderateScale(20)}
                containerStyle={Styles.checkboxContainer}
                checked={this.state.deliveryOption === 'pickup'}
                textStyle={{ fontSize: moderateScale(16), color: '#2B2B2B' }}
                onPress={() => this.setState({ deliveryOption: 'pickup' })}
              />
            </View>   
          )
        }
        else{
          checkBoxToShow.push(
            <View>
              <CheckBox
                title='Delivery'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                size={moderateScale(20)}
                containerStyle={Styles.checkboxContainer}
                checked={this.state.deliveryOption === 'delivery'}
                textStyle={{ fontSize: moderateScale(16), color: '#2B2B2B' }}
                onPress={() => this.setState({ deliveryOption: 'delivery' })}
              />
            </View>
          )
        }
      }
    }
    console.log(deliveryOptions)

    if (!isLoaded) {
      return <SpinView />;
    }

    if(deliveryOptions){

      return (
        <View style={Styles.container}>
          <Header headerText='' navigation={this.props.navigation} />

          <ScrollView>
            {checkBoxToShow}

            {this.state.deliveryOption == undefined ?
              null
              :
              this.state.deliveryOption=="delivery" ?
              <View>
                <Text style={Styles.text}>Deliver To:</Text>

                <Text style={Styles.headerText}>Where do you want the delivery?</Text>
      
                <Image
                  resizeMode='contain'
                  source={require('../../assets/Assets/location.png')}
                  style={{ width: width, height: verticalScale(120) }}
                />
    
                <View style={{ marginLeft: 20, marginRight: 20 }}>
                  <Input
                    label='Address'
                    value={section}
                    placeholder='Type your address'
                    containerStyle={Styles.textboxContainer}
                    inputContainerStyle={Styles.inputContainerStyle}
                    inputStyle={Styles.inputStyle}
                    labelStyle={Styles.textboxLabelStyle}
                    // leftIcon={<Icon name='user' type='simple-line-icon' />}
                    leftIconContainerStyle={{ opacity: 0.5 }}
                    onChangeText={address => this.setState({ address })}
                    blurOnSubmit={false}
                    onSubmitEditing={() => {
                      this.focusNextField('two');
                    }}
                    returnKeyType='next'
                    ref={input => {
                      this.inputs['one'] = input;
                    }}
                  />
      
                  <Input
                    label='Home Address'
                    value={row}
                    placeholder='Type your home address'
                    containerStyle={Styles.textboxContainer}
                    inputContainerStyle={Styles.inputContainerStyle}
                    inputStyle={Styles.inputStyle}
                    labelStyle={Styles.textboxLabelStyle}
                    // leftIcon={<Icon name='user' type='simple-line-icon' />}
                    leftIconContainerStyle={{ opacity: 0.5 }}
                    onChangeText={homeAddress => this.setState({ homeAddress })}
                    blurOnSubmit={false}
                    onSubmitEditing={() => {
                      this.focusNextField('three');
                    }}
                    returnKeyType='next'
                    ref={input => {
                      this.inputs['two'] = input;
                    }}
                  />
      
                  <Input
                    label='Delivery Comment'
                    value={seatNo}
                    placeholder='(Optional) Delivery Comment'
                    containerStyle={Styles.textboxContainer}
                    inputContainerStyle={Styles.inputContainerStyle}
                    inputStyle={Styles.inputStyle}
                    labelStyle={Styles.textboxLabelStyle}
                    // leftIcon={<Icon name='user' type='simple-line-icon' />}
                    leftIconContainerStyle={{ opacity: 0.5 }}
                    onChangeText={deliveryComment => this.setState({ deliveryComment })}
                    blurOnSubmit={false}
                    onSubmitEditing={() => {
                      this.focusNextField('four');
                    }}
                    returnKeyType='next'
                    ref={input => {
                      this.inputs['three'] = input;
                    }}
                  />
      
                  <Input
                    value={note}
                    placeholder='(Optional) Add any comment Ex. bring extra sauce'
                    containerStyle={[Styles.textboxContainer, { marginTop: 15 }]}
                    inputContainerStyle={[
                      Styles.inputContainerStyle,
                      { height: 100 }
                    ]}
                    inputStyle={{ paddingLeft: 15, textAlignVertical: 'top' }}
                    multiline={true}
                    numberOfLines={4}
                    labelStyle={Styles.textboxLabelStyle}
                    onChangeText={note => this.setState({ note })}
                    blurOnSubmit={false}
                    // onSubmitEditing={() => {
                    //   this.focusNextField('two');
                    // }}
                    returnKeyType='done'
                    ref={input => {
                      this.inputs['four'] = input;
                    }}
                  />
      
                  <View style={{ marginTop: 20 }} />
      
                  <Button
                    style={Styles.button}
                    block
                    info
                    onPress={() => this.handleSubmit()}
                  >
                    <Text style={Styles.buttonText}>Confirm</Text>
                  </Button>
                </View>    
              </View>:
              this.state.deliveryOption=="pickup" ?

              <View style={{ marginLeft: 20, marginRight: 20 }}>

                <View style={{ marginTop: 60 }} />
                  <Button
                    style={Styles.button}
                    block
                    info
                    onPress={() => this.handleSubmit()}
                  >
                  <Text style={Styles.buttonText}>Confirm</Text>
                </Button>
              </View>
              :null
              
            
            
            }
            
            
          </ScrollView>
        </View>
      );

    }
    else{
      null;
    }
  }
}
