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

const mapStateToProps = ({ jobs, myJobs }) => ({ jobs, myJobs });

const mapDispatchToProps = { getJobs, getMyJobs };

@connect(mapStateToProps, mapDispatchToProps)
class HomeScreen extends React.Component {
  componentWillMount() {
    this.props.getMyJobs();
  }
  postJob = () => {
    this.props.navigation.navigate("JobPost");
  };
  render() {
    const { jobs } = this.props;
    return (
      <View>
        <Button onPress={this.postJob}>
          <Text>Post a job</Text>
        </Button>
        <Text>Home screen</Text>
        {this.props.myJobs.map(jp => (
          <JobPosting
            companyName={jp.company_name}
            jobPosition={jp.job_position}
            jobPhone={jp.job_phone}
            jobEmail={jp.job_email}
            jobDescription={jp.job_description}
            jobSchedule={jp.job_schedule}
          />
        ))}
      </View>
    );
  }
}

export default HomeScreen;
