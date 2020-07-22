import React from "react";
import { View, TouchableOpacity, Text, TextInput } from "react-native";
import { Icon } from "react-native-elements";

const SearchPanel = props => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
        justifyContent: "center",
        // borderBottomWidth: 1,
        padding: 0,
      }}
    >
      <TextInput
        placeholder="What would you like to have?"
        placeholderTextColor="#FF4757"
        onChangeText={searchText => props.handleSearchText(searchText)}
        style={{
          fontSize: 18,
          fontFamily: "Helvetica",
          padding: 2,
          textAlign: "center",
          borderBottomWidth: 1,
          borderColor: "#DBD9D9"
        }}
        onSubmitEditing={() => props.handleSearch()}
      />
      <TouchableOpacity onPress={() => props.handleSearch()}>
        <Icon
          name="search1"
          size={15}
          iconStyle={{fontSize: 18}}
          raised
          // containerStyle={{ elevation: 2, padding: 1 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchPanel;
