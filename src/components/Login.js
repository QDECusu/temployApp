import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, Button } from "./utils";

import { request } from "../api";

export default class Login extends React.Component {
  state = {
    username: "",
    password: "",
    email: "",
    mode: "Login"
  };
  onChange = (val, name) => {
    this.setState({ [name]: val });
  };
  changeMode = () => {
    this.setState(state => ({
      mode: state.mode === "Login" ? "Signup" : "Login"
    }));
  };
  onSubmit = () => {
    const { username, password, email, mode } = this.state;
    if (mode === "Login") {
      request.login({ body: { username, password } });
    } else {
      request.singup({ body: { username, password, email } });
    }
  };
  render() {
    const { mode } = this.state;
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Input
          name="username"
          placeholder="username"
          onChangeText={this.onChange}
          style={styles.inputField}
        />
        <Input
          name="email"
          placeholder="email"
          onChangeText={this.onChange}
          style={styles.inputField}
        />
        <Input
          name="password"
          placeholder="password"
          onChangeText={this.onChange}
          secureTextEntry
          style={styles.inputField}
        />
        <View style={{ flexDirection: "row" }}>
          <Button
            label={mode === "Login" ? "Login" : "Signup"}
            onPress={this.onSubmit}
          />
          <Button
            label={mode === "Login" ? "Signup" : "Login"}
            onPress={this.changeMode}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputField: {
    height: 50,
    width: 100
  }
});
