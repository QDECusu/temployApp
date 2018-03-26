import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, Button } from "./utils";

import { request } from "../api";

export default class Login extends React.Component {
  state = {
    username: '',
		email: '',
		password: '',
		repErr: '',
		repeat: '',
		firstName: '',
    lastName: '',
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
  onSubmit = async () => {
    const { username, password, email, mode } = this.state;
    if (
      mode === "Login" &&
      (await request.login({ body: { username, password } }))
    ) {
      this.props.navigation.navigate("App");
    } else if (await request.singup({ body: { username, password, email } })) {
      this.props.navigation.navigate("App");
    }
  };
  render() {
    const { mode } = this.state;
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 30 }}>Welcome To</Text>
        <Text style={{ fontSize: 40, marginBottom: 30 }}>Temploy</Text>
        { mode === "Signup" &&
        <View style={{ flexDirection: "row" }}>
          <Button
            label= "Back"
            onPress={this.changeMode}
          />
        </View>
        }
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
        { mode === "Login" &&
        <View style={{ flexDirection: "row" }}>
          <Button
            label= "Login"
            onPress={this.onSubmit}
          />
          <Button
            label= "Signup"
            onPress={this.changeMode}
          />
        </View>
        }
        { mode === "Signup" &&
        <View style={{ flexDirection: "row" }}>
          <Button
            label= "Signup"
            onPress={this.onSubmit}
          />
        </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputField: {
    height: 50,
    width: 200,
  }
});
