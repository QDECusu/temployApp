import React, { Component } from "react";
import { SwitchNavigator } from "react-navigation";
import Login from "./Login";
import { View, Text } from "react-native";

function Hello() {
  return (
    <View>
      <Text>Hello world</Text>
    </View>
  );
}

export default SwitchNavigator({
  Authentication: Login,
  App: Hello
});
