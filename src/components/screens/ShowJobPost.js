import React, { Component } from "react";
import { View, Text } from "react-native";

export default class ShowJobPost extends Component {
  render() {
    console.log(this.props.navigation.state.params);
    return (
      <View>
        <Text>THis is a job post</Text>
      </View>
    );
  }
}
