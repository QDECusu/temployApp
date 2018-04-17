import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";

const mapStateToProps = ({ profile }) => ({ profile });

@connect(mapStateToProps)
class EditProfile extends Component {
  state = {
    user: {
      email: this.props.profile.email,
      first_name: this.props.profile.first_name,
      last_name: this.props.profile.last_name
    },
    zipcode: "",
    short_description: "",
    skills: ""
  };
  render() {
    return <View />;
  }
}

export default EditProfile;
