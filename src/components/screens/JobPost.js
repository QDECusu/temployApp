import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, KeyboardAvoidingView, ScrollView, StyleSheet } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
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
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "skyblue"
        }}
      >
        <ScrollView>
          <View style={{marginBottom: 300, marginLeft: 25, marginRight: 25}}>
            <NamedTextField
              name="company_name"
              onChange={this.onChange}
              value={this.state.company_name}
              placeholder="company name"
              style={styles.inputField}
            />
            <NamedTextField
              name="job_position"
              onChange={this.onChange}
              value={this.state.job_position}
              placeholder="job position"
              style={styles.inputField}
            />
            <NamedTextField
              name="job_phone"
              onChange={this.onChange}
              keyboardType={"numeric"}
              value={this.state.job_phone}
              placeholder="phone"
              style={styles.inputField}
            />
            <NamedTextField
              name="job_email"
              onChange={this.onChange}
              keyboardType={"email-address"}
              value={this.state.job_email}
              placeholder="email"
              style={styles.inputField}
            />
            <NamedTextField
              name="job_description"
              onChange={this.onChange}
              value={this.state.job_description}
              placeholder="job description"
              style={styles.largeInputField}
            />
            <NamedTextField
              name="job_schedule"
              onChange={this.onChange}
              value={this.state.job_schedule}
              placeholder="job schedule"
              style={styles.inputField}
            />
            <Calendar
              style={styles.calanderStyle}
              minDate={Date()}
              onDayPress={(day) => {console.log('selected day', day)}}
              onDayLongPress={(day) => {console.log('selected day', day)}}
              onPressArrowLeft={substractMonth => substractMonth()}
              onPressArrowRight={addMonth => addMonth()}
              theme={{
                textMonthFontWeight: 'bold',
                textDayFontSize: 16,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 16
              }}
            />
            <View style={{alignItems:"center"}}>
              <Button label="Submit" onPress={this.submit}/>
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
    fontSize: 18,
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
  },
  calanderStyle: {
    margin: 5,
    padding: 10,
    borderRadius: 5,
    borderColor: colors.primaryDeep,
    borderStyle: "solid",
    borderWidth: 1,
    width: 300,
  }
});

export default JobPost;
