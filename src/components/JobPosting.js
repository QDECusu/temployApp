import React, { Component } from "react";
import { View, Text } from "react-native";

export default class JobPosting extends Component {
  render() {
    const {
      companyName,
      jobPosition,
      jobPhone,
      jobEmail,
      jobDescription,
      jobSchedule
    } = this.props;
    return (
      <View>
        <Text>what</Text>
      </View>
    );
  }
}
