import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";

const mapStateToProps = ({ profile }) => ({ profile });

@connect(mapStateToProps)
class EditProfile extends Component {
    state = {
      user: {
        email: props.profile.email,
        first_name: props.profile.first_name,
        last_name: props.profile.last_name
      },
      zipcode: "",
      short_description: "",
      skills: ""
    };
  render() {
    return <View />;
  }
}

export default EditProfile