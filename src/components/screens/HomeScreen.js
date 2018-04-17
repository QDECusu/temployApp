import React, {Component} from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView
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
      <ScrollView style={{ backgroundColor: "skyblue"}}>
        <View style={{ flex: 1, marginBottom: 30, alignItems: "center" }}>
          <Button style={{marginTop: 10, width: 300}} label="Post A Job" onPress={this.postJob} />
          {jobs.map(jp => {
            return(
            <JobPosting key={jp.id} jobPosting={jp} />
          )})}
        </View>
      </ScrollView>
    );
  }
}

export default HomeScreen;
