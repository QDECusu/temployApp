import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { Card, colors } from 'react-native-elements'


@withNavigation
class JobPosting extends Component {
  openProfile = () => {
    if (!this.props.own)
      this.props.navigation.navigate("OthersProfile", {
        userId: this.props.jobPosting.user
      });
  };
  render() {
    console.log(this.props.jobPosting)
    const {
      company_name,
      job_position,
      job_phone,
      job_email,
      job_description,
      job_schedule
    } = this.props.jobPosting;
    console.log(company_name, job_description)
    return (
      <TouchableOpacity onPress={this.openProfile}>
        <Card title={company_name}  containerStyle={{width: 325}}>
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
