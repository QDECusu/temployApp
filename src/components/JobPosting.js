import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";

@withNavigation
class JobPosting extends Component {
  openProfile = () => {
    if (!this.props.own)
      this.props.navigation.navigate("OthersProfile", {
        userId: this.props.jobPosting.user
      });
  };
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
      <TouchableOpacity onPress={this.openProfile}>
        <Text>{company_name}</Text>
        <Text>{job_position}</Text>
        <Text>{job_phone}</Text>
        <Text>{job_email}</Text>
      </TouchableOpacity>
    );
  }
}

export default JobPosting;
