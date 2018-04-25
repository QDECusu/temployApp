import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { Card, colors } from "react-native-elements";
import { jobs } from "../api";
import { Button } from "./utils";

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
      has_applied,
      has_accepted
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
    let color = "white";
    if (has_applied) {
      if (has_accepted === null) {
        color = colors.disabled;
      } else if (has_accepted === true) {
        color = "rgb(0, 170, 0)";
      } else if (has_accepted === false) {
        color = "grey";
      }
    }
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Card
          title={company_name}
          containerStyle={{
            width: 325,
            backgroundColor: color
          }}
        >
          <View
            style={{ flex: 1, flexDirection: "column", alignItems: "center" }}
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
            {this.props.own && (
              <View style={{ flex: 1, flexDirection: "row", marginTop: 10 }}>
                <Button label="Edit" onPress={this.props.onEdit} />
                <Button label="View" onPress={this.props.viewApps} />
              </View>
            )}
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
}

export default JobPosting;
