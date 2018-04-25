import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { Card, colors } from "react-native-elements";
import { jobs } from "../api";

@withNavigation
class JobPosting extends Component {
  render() {
    const {
      company_name,
      job_position,
      job_phone,
      job_email,
      job_description,
      job_schedule,
      has_applied
    } = this.props.jobPosting;
    const styledNumber =
      "(" +
      job_phone[0] +
      job_phone[1] +
      job_phone[2] +
      ")" +
      job_phone[3] +
      job_phone[4] +
      job_phone[5] +
      "-" +
      job_phone[6] +
      job_phone[7] +
      job_phone[8] +
      job_phone[9];
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Card
          title={company_name}
          containerStyle={{
            width: 325,
            backgroundColor: has_applied ? colors.disabled : "white"
          }}
        >
          <View
            style={{
              flex: 2,
              flexDirection: "row"
            }}
          >
            <View
              style={{
                paddingRight: 5,
                borderStyle: "solid",
                borderRightWidth: 1,
                borderRightColor: colors.disabled
              }}
            >
              <Text>Company</Text>
              <Text>Position</Text>
              <Text>Phone</Text>
              <Text>Email</Text>
            </View>
            <View stlye={{ paddingLeft: 12 }}>
              <Text> {company_name}</Text>
              <Text> {job_position}</Text>
              <Text> {styledNumber}</Text>
              <Text> {job_email}</Text>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
}

export default JobPosting;
