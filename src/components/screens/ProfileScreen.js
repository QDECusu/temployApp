import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button } from "native-base";
import { request } from "../../api";

export default class Profile extends Component {
  logout = () => {
    request.logout();
    this.props.navigation.navigate("Authentication");
  };
  render() {
    return (
      <View>
        <Button onPress={this.logout}>
          <Text>Logout</Text>
        </Button>
      </View>
    );
  }
}
