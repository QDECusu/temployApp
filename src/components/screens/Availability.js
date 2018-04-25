import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet
} from "react-native";
import { Input, Button, colors } from "../utils";
import NamedTextField from "../NamedTextField";
import { jobs as jobRequests } from "../../api";
import { getMyAvailabilityListing } from "../../actions/jobs";

const mapStateToProps = ({ profile }) => ({
  availability: profile.availability
});

const mapDispatchToProps = { getMyAvailabilityListing };

@connect(mapStateToProps, mapDispatchToProps)
class Availability extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Availability listing"
  });
  constructor(props) {
    super(props);
    const { availability } = props;
    this.state = {
      description: availability ? availability.description : "",
      schedule: availability ? availability.schedule : ""
    };
  }
  onChange = (text, name) => {
    this.setState({ [name]: text });
  };
  submit = () => {
    const { description, schedule } = this.state;
    this.props.navigation.goBack();
    if (this.props.availability === null) {
      return jobRequests
        .addAvailabilityPost({ description, schedule })
        .then(() => this.props.getMyAvailabilityListing());
    } else {
      return jobRequests
        .editAvailabilityPost(this.props.availability.id, {
          description,
          schedule
        })
        .then(() => this.props.getMyAvailabilityListing());
    }
  };
  render() {
    const { description, schedule } = this.state;
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
            <Text style={{ color: "white", fontSize: 18 }}> Schedule:</Text>
            <NamedTextField
              name="schedule"
              onChange={this.onChange}
              value={schedule}
              placeholder="Schedule"
              style={styles.inputField}
            />
            <Text style={{ color: "white", fontSize: 18 }}> Description:</Text>
            <NamedTextField
              name="description"
              onChange={this.onChange}
              value={description}
              multiline={true}
              placeholder="Other important details about your availibility."
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
  }
});

export default Availability;
