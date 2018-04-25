import React, { Component } from "react";
import { ScrollView, Text } from "react-native";
import { connect } from "react-redux";
import { getJobs } from "../../actions/jobs";
import { colors, Button } from "../utils";
import { jobs } from "../../api";
import JobPosting from "../JobPosting";

const mapDispatchToProps = { getJobs };

@connect(null, mapDispatchToProps)
class ShowJobPost extends Component {
  static navigationOptions = ({ navigation }) => {
    const { jp, applyForJob } = navigation.state.params;
    return {
      title: jp.company_name,
      headerRight: (
        <Button
          label="Apply"
          disabled={jp.has_applied}
          onPress={() => {
            applyForJob(jp.id);
            navigation.goBack();
          }}
        />
      )
    };
  };
  openOthersProfile = jp => {
    this.props.navigation.navigate("OthersProfile", {
      userId: jp.user
    });
  };
  render() {
    const { jp } = this.props.navigation.state.params;
    return (
      <ScrollView style={{ flex: 1 }}>
        <JobPosting
          jobPosting={jp}
          onPress={() => this.openOthersProfile(jp)}
        />
      </ScrollView>
    );
  }
}

export default ShowJobPost;
