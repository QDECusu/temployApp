import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, KeyboardAvoidingView, Keyboard } from "react-native";
import { Input, Button, colors } from "../utils";
import NamedTextField from "../NamedTextField";
import { jobs as jobRequests } from "../../api";

class JobPost extends Component {
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
      <KeyboardAvoidingView
        behavior="padding"
        style={{
          flex: 1,
          alignItems: "center"
        }}
      >
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
          keyboardType={"email-address"}
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
        <Button label="Submit" onPress={this.submit} />
      </KeyboardAvoidingView>
    );
  }
}

export default JobPost;
