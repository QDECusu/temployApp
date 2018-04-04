import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button } from "native-base";
import NamedTextField from "../NamedTextField";
import { jobs as jobRequests } from "../../api";

export default class JobPost extends Component {
  state = {
    company_name: "",
    job_position: "",
    job_phone: "",
    job_email: "",
    job_description: "",
    job_schedule: ""
  };
  onChange = (text, name) => {
    this.setState({ [name]: text });
  };
  submit = async () => {
    const {
      company_name,
      job_description,
      job_email,
      job_phone,
      job_position,
      job_schedule
    } = this.state;
    await jobRequests.postJob({
      company_name,
      job_description,
      job_phone,
      job_email,
      job_position,
      job_schedule
    });
    this.props.navigation.goBack();
  };
  render() {
    return (
      <View>
        <NamedTextField
          name="company_name"
          onChange={this.onChange}
          value={this.state.company_name}
          placeholder="company name"
        />
        <NamedTextField
          name="job_position"
          onChange={this.onChange}
          value={this.state.job_position}
          placeholder="job position"
        />
        <NamedTextField
          name="job_phone"
          onChange={this.onChange}
          value={this.state.job_phone}
          placeholder="phone"
        />
        <NamedTextField
          name="job_email"
          onChange={this.onChange}
          value={this.state.job_email}
          placeholder="email"
        />
        <NamedTextField
          name="job_description"
          onChange={this.onChange}
          value={this.state.job_description}
          placeholder="job description"
        />
        <NamedTextField
          name="job_schedule"
          onChange={this.onChange}
          value={this.state.job_schedule}
          placeholder="job schedule"
        />
        <Button onPress={this.submit}>
          <Text>Submit</Text>
        </Button>
      </View>
    );
  }
}
