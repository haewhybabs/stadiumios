import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  Alert,
  NativeModules,
  LayoutAnimation
} from "react-native";

import { SliderBox } from "react-native-image-slider-box";
import { Button } from "native-base";
import { Icon } from "react-native-elements";
import Meteor from 'meteor-react-native';
import AsyncStorage from "@react-native-community/async-storage";
import { NavigationEvents } from "react-navigation";

import Header from "../common/Header";
import { Styles } from "./Styles";
import MenuItemField from "./MenuItemField";
import MenuItemDetailField from "./MenuItemDetailField";
import {
  moderateScale,
  updateCart,
  fetchCartData,
  fetchSavedStadium
} from "../../constants/const_functions";
import SpinView from "../common/Spinner";
import SearchPanel from "./SearchPanel";
import SearchResult from "./SearchResult";

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class FoodMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foods: [],
      stadium: this.props.navigation.getParam("stadium"),
      images: [],
      isLoaded: false,
      detail: [],
      cart: {},
      searchText: undefined,
      showSearch: false
    };
    this.fetchSavedStadium();
    fetchCartData(this);
  }

  fetchFoodItem() {
    const { stadium, images, savedStadium } = this.state;
    const stadiumId = stadium._id;
    let img = stadium.offers.map(item => {
      return item.imageUrl;
    });

    // if (
    //   savedStadium &&
    //   Object.getOwnPropertyNames(savedStadium).length > 0 &&
    //   stadiumId === savedStadium._id
    // ) {
    //   fetchCartData(this);
    // }

    Meteor.call("fetchCategoryWiseFoodItems", stadiumId, (err, res) => {
      console.log(err, res);
      if (err) {
        alert("Couldn't fetch foods now!");
      } else {
        this.setState({ foods: res, isLoaded: true, images: img });
      }
    });
  }

  async fetchSavedStadium() {
    await AsyncStorage.getItem("stadium", (err, res) => {
      const savedStadium = res ? JSON.parse(res) : {};
      this.setState({ savedStadium }, () => this.fetchFoodItem());
      console.log("called", savedStadium);
    });
  }

  updateState(obj) {
    LayoutAnimation.easeInEaseOut();
    this.setState(obj);
  }

  handleSearchText(searchText) {
    this.setState({ searchText: searchText }, () => {
      if (!searchText) {
        this.setState({ data: [] });
      }
    });
  }

  updateCart(obj) {
    console.log(obj, this.state.cart);
    if (
      this.state.savedStadium &&
      Object.getOwnPropertyNames(this.state.savedStadium).length > 0 &&
      this.state.stadium._id !== this.state.savedStadium._id
    ) {
      console.log("condition 1");
      Alert.alert(
        "Are you sure to change the stadium?",
        "You are now in " +
          this.state.savedStadium.name +
          ", if you change the stadium your previous data will be removed",
        [
          {
            text: "No",
            onPress: () => {
              return;
            },
            style: "cancel"
          },
          {
            text: "Yes",
            onPress: () => {
              this.setState(obj);
              AsyncStorage.removeItem("cart", (err, res) => {
                updateCart(this.state.cart, this, this.state.stadium);
                fetchSavedStadium(this);
              });
            }
          }
        ]
        // { cancelable: false }
      );
    } else {
      this.setState(obj);
      updateCart(this.state.cart, this, this.state.stadium);
    }
  }

  handleSubmit() {
    this.props.navigation.navigate("Cart");
  }
  handleGoBack=()=>{
    this.props.navigation.goBack();
  }
  handleSearch() {
    const { searchText, stadium } = this.state;

    Meteor.call(
      "searchFoodItems",
      { name: searchText, stadiumId: stadium._id },
      (err, res) => {
        console.log(err, res);
        if (err) {
          alert("Cannot complete the reuest now!");
        } else {
          this.setState({ data: res, showSearch: true });
        }
      }
    );
  }

  render() {
    const { detail, foods, images, isLoaded, cart, data } = this.state;
    console.log(this.state.stadium);

    if (!isLoaded) {
      return <SpinView />;
    }

    return (
      <View style={Styles.container}>
        <Header headerText="Food" navigation={this.props.navigation} />
        <NavigationEvents
          onWillFocus={payload => {
            fetchCartData(this);
            this.fetchFoodItem();
          }}
        />

        <ScrollView>
          <SliderBox images={images} circleLoop={true} />
          <View style={{alignSelf:'flex-start',marginTop:5,marginLeft:5}}>
            <Icon
             onPress={()=>this.handleGoBack()}
              name="ios-arrow-back"
              type="ionicon"
              color="black"
            />
            </View>
          <View>
            
            
            <SearchPanel
              updateState={this.updateState.bind(this)}
              handleSearch={this.handleSearch.bind(this)}
            handleSearchText={this.handleSearchText.bind(this)} 
            />
          </View>
          {/* <Text style={Styles.headerText}>What would you like to have?</Text> */}
          <View>
            {!this.state.searchText &&
              foods.map(
                (item, index) => (
                  // (!detail[index] && (
                  //   <MenuItemField
                  //     key={index}
                  //     updateState={this.updateState.bind(this)}
                  //     food={item}
                  //     index={index}
                  //     detail={detail}
                  //     path='https://image.flaticon.com/icons/svg/184/184567.svg'
                  //   />
                  // )) || (
                  <MenuItemDetailField
                    key={index}
                    food={item}
                    index={index}
                    detail={detail}
                    cart={cart}
                    updateState={this.updateState.bind(this)}
                    updateCart={this.updateCart.bind(this)}
                  />
                )
                // )
              )}

            {this.state.showSearch && !!this.state.searchText && (
              <View>
                <Text
                  style={{
                    marginHorizontal: 20,
                    marginBottom: 10,
                    fontSize: 17
                  }}
                >
                  Mathes found with {Object.getOwnPropertyNames(data).length - 1}{" "}
                  items:
                </Text>
                <SearchResult
                  data={this.state.data}
                  updateCart={this.updateCart.bind(this)}
                  cart={cart}
                />
              </View>
            )}
          </View>
        </ScrollView>
        {Object.getOwnPropertyNames(cart).length > 0 && (
          <Button
            onPress={() => this.handleSubmit()}
            block
            iconRight
            style={Styles.button}
          >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
              Proceed to Cart
            </Text>
            <Icon
              name="ios-arrow-forward"
              type="ionicon"
              color="white"
              containerStyle={{
                right: moderateScale(30),
                position: "absolute"
              }}
            />
          </Button>
        )}
      </View>
    );
  }
}
