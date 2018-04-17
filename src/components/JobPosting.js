import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Card, colors } from 'react-native-elements'

class JobPosting extends Component {
  render() {
    const {
      company_name,
      job_position,
      job_phone,
      job_email,
      job_description,
      job_schedule
    } = this.props.jobPosting;
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Card title="User Name Here"  containerStyle={{width: 325}}>
        <View style={{flex: 2, flexDirection: "row" }}>
          <View style={{paddingRight: 5, borderStyle: "solid", borderRightWidth: 1, borderRightColor: colors.disabled}}>
            <Text>Company</Text>
            <Text>Position</Text>
            <Text>Phone</Text>
            <Text>Email</Text>
          </View>
          <View stlye={{paddingLeft: 12}}>
            <Text>  {company_name}</Text>
            <Text>  {job_position}</Text>
            <Text>  {job_phone}</Text>
            <Text>  {job_email}</Text>
          </View>
        </View>
        </Card>
      </TouchableOpacity>
    );
  }
}

export default JobPosting;
