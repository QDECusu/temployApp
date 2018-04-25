import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet
} from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { getMyJobs } from "../../actions/jobs";
import { Input, Button, colors } from "../utils";
import NamedTextField from "../NamedTextField";
import { jobs as jobRequests } from "../../api";

const mapDispatchToProps = { getMyJobs };

/*
returns 
descripition,
schedule,
post_date
*/

@connect(null, mapDispatchToProps)
class Availability extends Component {
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
  submit = () => {
    const {
      company_name,
      job_description,
      job_email,
      job_phone,
      job_position,
      job_schedule
    } = this.state;
    jobRequests
      .postJob({
        company_name,
        job_description,
        job_phone,
        job_email,
        job_position,
        job_schedule
      })
      .then(() => this.props.getMyJobs());
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
          <View style={{ marginBottom: 100, marginLeft: 25, marginRight: 25 }}>
            <NamedTextField
              name="job_schedule"
              onChange={this.onChange}
              value={this.state.job_schedule}
              placeholder="Schedule"
              style={styles.inputField}
            />
            <Calendar
              style={styles.calanderStyle}
              minDate={Date()}
              onDayPress={day => {
                console.log("selected day", day);
              }}
              onDayLongPress={day => {
                console.log("selected day", day);
              }}
              onPressArrowLeft={substractMonth => substractMonth()}
              onPressArrowRight={addMonth => addMonth()}
              theme={{
                textMonthFontWeight: "bold",
                textDayFontSize: 16,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 16
              }}
            />
            <NamedTextField
              name="job_description"
              onChange={this.onChange}
              value={this.state.job_description}
              multiline={true}
              placeholder="Notes"
              style={styles.largeInputField}
            />
            <View style={{ alignItems: "center" }}>
              <Button label="Submit" onPress={this.submit} />
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
  },
  calanderStyle: {
    margin: 5,
    padding: 10,
    borderRadius: 5,
    borderColor: colors.primaryDeep,
    borderStyle: "solid",
    borderWidth: 1,
    width: 300
  }
});

export default Availability;