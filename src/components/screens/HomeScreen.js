import React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard
} from "react-native";
import { connect } from "react-redux";
import { getJobs, getMyJobs } from "../../actions/jobs";
import { Input, Button, colors } from "../utils";
import { request } from "../../api";
import JobPosting from "../JobPosting";

const mapStateToProps = ({ jobs }) => ({ jobs });

const mapDispatchToProps = { getJobs };

@connect(mapStateToProps, mapDispatchToProps)
class HomeScreen extends React.Component {
  componentWillMount() {
    this.props.getJobs();
  }
  postJob = () => {
    this.props.navigation.navigate("JobPost");
  };
  render() {
    const { jobs } = this.props;
    return (
      <View>
        <Button label="Post A Job" onPress={this.postJob} />
        <Text>Home screen</Text>
        {jobs.map(jp => <JobPosting key={jp.id} jobPosting={jp} />)}
      </View>
    );
  }
}

export default HomeScreen;
