import React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard
} from "react-native";
import { Input, Button, colors } from "../utils";
import { request } from "../../api";

export default class HomeScreen extends React.Component {
  postJob = () => {
    this.props.navigation.navigate("JobPost");
  };
  render() {
    return (
      <View>
        <Button onPress={this.postJob}>
          <Text>Post a job</Text>
        </Button>
        <Text>Home screen</Text>
      </View>
    );
  }
}
