import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  StyleSheet
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Input, Button, colors } from "../utils";
import { request, jobs } from "../../api";
import { getMyJobs } from "../../actions/jobs";
import JobPosting from "../JobPosting";
import { Divider, Avatar } from "react-native-elements";
import NamedTextField from "../NamedTextField";

const mapStateToProps = ({ profile, myJobs }) => ({ profile, myJobs });

const mapDispatchToProps = { getMyJobs };

@connect(mapStateToProps, mapDispatchToProps)
class EditJobPost extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.jp.company_name
  });
  constructor(props) {
    super(props);
    const {
      company_name,
      job_description,
      job_phone,
      job_email,
      job_schedule,
      job_position
    } = props.navigation.state.params.jp;
    this.state = {
      company_name,
      job_description,
      job_phone,
      job_email,
      job_schedule,
      job_position
    };
  }
  componentWillMount() {
    this.props.getMyJobs();
  }
  submitChanges = () => {
    const {
      company_name,
      job_position,
      job_phone,
      job_email,
      job_description,
      job_schedule
    } = this.state;
    this.props.navigation.goBack();
    return jobs
      .editJob(this.props.navigation.state.params.jp.id, {
        company_name,
        job_description,
        job_position,
        job_phone,
        job_email,
        job_schedule
      })
      .then(() => this.props.getMyJobs());
  };

  cancelChanges = () => {
    this.props.navigation.goBack();
  };

  deletePost = () => {
    this.props.navigation.goBack();
    return jobs
      .deletePost(this.props.navigation.state.params.jp.id)
      .then(() => this.props.getMyJobs());
  };
  onChange = (val, name) => {
    this.setState({ [name]: val });
  };

  render() {
    const jp = this.state;
    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "skyblue"
        }}
      >
        <ScrollView>
          <View style={{ marginBottom: 10, marginLeft: 25, marginRight: 25 }}>
            <NamedTextField
              name="company_name"
              onChange={this.onChange}
              value={jp.company_name}
              placeholder="company name"
              style={styles.inputField}
            />
            <NamedTextField
              name="job_position"
              onChange={this.onChange}
              value={jp.job_position}
              placeholder="job position"
              style={styles.inputField}
            />
            <NamedTextField
              name="job_phone"
              onChange={this.onChange}
              keyboardType={"numeric"}
              value={jp.job_phone}
              placeholder="phone"
              style={styles.inputField}
            />
            <NamedTextField
              name="job_email"
              onChange={this.onChange}
              keyboardType={"email-address"}
              value={jp.job_email}
              placeholder="email"
              style={styles.inputField}
            />
            <NamedTextField
              name="job_description"
              onChange={this.onChange}
              value={jp.job_description}
              multiline={true}
              placeholder="job description"
              style={styles.largeInputField}
            />
            <NamedTextField
              name="job_schedule"
              onChange={this.onChange}
              value={jp.job_schedule}
              placeholder="job schedule"
              style={styles.inputField}
            />
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Button label="Cancel" onPress={this.cancelChanges} />
              <Button label="Save" onPress={this.submitChanges} />
            </View>
            <View style={{ alignItems: "center" }}>
              <Divider
                style={{
                  marginLeft: 5,
                  margin: 20,
                  width: 300,
                  backgroundColor: colors.primaryDeep
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 75
              }}
            >
              <Button
                style={{ backgroundColor: "rgb(139, 0, 0)" }}
                label="Delete Post"
                onPress={this.deletePost}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  inputField: {
    backgroundColor: "white",
    margin: 5,
    padding: 10,
    borderRadius: 5,
    borderColor: colors.primaryDeep,
    borderStyle: "solid",
    borderWidth: 1,
    height: 50,
    width: 300,
    fontSize: 18
  },
  largeInputField: {
    textAlignVertical: "top",
    backgroundColor: "white",
    margin: 5,
    padding: 10,
    borderRadius: 5,
    borderColor: colors.primaryDeep,
    borderStyle: "solid",
    borderWidth: 1,
    height: 150,
    width: 300,
    fontSize: 18
  }
});

export default EditJobPost;
