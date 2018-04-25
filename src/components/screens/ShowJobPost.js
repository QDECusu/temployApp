import React, { Component } from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { getJobs } from "../../actions/jobs";
import { colors, Button } from "../utils";
import { jobs } from "../../api";
import JobPosting from "../JobPosting";
import { Divider } from "react-native-elements";

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
    const styledNumber =
      "(" +
      jp.job_phone[0] +
      jp.job_phone[1] +
      jp.job_phone[2] +
      ")" +
      jp.job_phone[3] +
      jp.job_phone[4] +
      jp.job_phone[5] +
      "-" +
      jp.job_phone[6] +
      jp.job_phone[7] +
      jp.job_phone[8] +
      jp.job_phone[9];
    return (
      <ScrollView style={{ flex: 1, backgroundColor: "skyblue" }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Button
            label="View this user's profile"
            onPress={() => this.openOthersProfile(jp)}
            style={{ marginTop: 20, width: 300 }}
          />
          <View style={{ alignItems: "center" }}>
            <Divider
              style={{
                margin: 20,
                width: 300,
                backgroundColor: colors.primaryDeep
              }}
            />
          </View>
          <Text style={styles.textField}>
            <Text style={{ fontWeight: "bold" }}>Position:</Text>{" "}
            {jp.job_position}
          </Text>
          <View style={{ alignItems: "center" }}>
            <Divider
              style={{
                margin: 20,
                width: 300,
                backgroundColor: colors.primaryDeep
              }}
            />
          </View>
          <Text style={styles.largeTextField}>
            <Text style={{ fontWeight: "bold" }}>Job Description:</Text>{" "}
            {jp.job_description}
          </Text>
          <View style={{ alignItems: "center" }}>
            <Divider
              style={{
                margin: 20,
                width: 300,
                backgroundColor: colors.primaryDeep
              }}
            />
          </View>
          <Text style={styles.textField}>
            <Text style={{ fontWeight: "bold" }}>Schedule:</Text>{" "}
            {jp.job_schedule}
          </Text>
          <View style={{ alignItems: "center" }}>
            <Divider
              style={{
                margin: 20,
                width: 300,
                backgroundColor: colors.primaryDeep
              }}
            />
          </View>
          <Text style={styles.largeTextField}>
            <Text style={{ fontWeight: "bold" }}>Contact Info:</Text> {"\n"}
            {styledNumber} {"\n"}
            {jp.job_email}
          </Text>
          <View style={{ alignItems: "center" }}>
            <Divider
              style={{
                margin: 20,
                width: 300,
                backgroundColor: colors.primaryDeep
              }}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  textField: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    borderColor: colors.primaryDeep,
    borderStyle: "solid",
    borderWidth: 1,
    height: 50,
    width: 300,
    margin: 5,
    fontSize: 18
  },
  largeTextField: {
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

export default ShowJobPost;
