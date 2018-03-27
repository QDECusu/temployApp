import React from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, Keyboard } from "react-native";
import { Input, Button } from "./utils";
import colors from "./utils/colors";
import { request } from "../api";

export default class Login extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    repErr: "",
    repeat: "",
    firstName: "",
    lastName: "",
    mode: "Login"
  };
  async componentWillMount() {
    if ((await request.getToken()) !== null) {
      this.props.navigation.navigate("App");
    }
  }
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
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.primaryDeep }}>
        { mode === "Signup" &&
        <View style={{ flexDirection: "row", paddingRight: 200 }}>
          <Button style={{backgroundColor: colors.primaryDeep, height: 25 }}
            label= "<-Back"
            onPress={this.changeMode}
          />
        </View>
        }
        <View style={{
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
          borderRadius: 10,
          borderColor: "black",
          borderStyle: "solid",
          borderWidth: 3,
        }}>
        {mode === "Login" && <Text style={{ fontSize: 30 }}>Welcome To</Text>}
        {mode === "Signup" && <Text style={{ fontSize: 30 }}>Signup For</Text>}
        <Text style={{ fontSize: 40, fontWeight: 'bold', color: colors.primaryDeep, marginBottom: 30 }}>Temploy</Text>
        <Input
          name="username"
          placeholder="username"
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
        {mode === "Signup" && (
          <View style={{ flexDirection: "column" }}>
            <Input
              name="repeat"
              placeholder="repeat password"
              onChangeText={this.onChange}
              secureTextEntry
              style={styles.inputField}
            />
            <Input
              name="email"
              placeholder="email"
              keyboardType={'email-address'}
              onChangeText={this.onChange}
              style={styles.inputField}
            />
            <Input
              name="firstName"
              placeholder="first name"
              onChangeText={this.onChange}
              style={styles.inputField}
            />
            <Input
              name="lastName"
              placeholder="last name"
              onChangeText={this.onChange}
              style={styles.inputField}
            />
            <View style={{ alignItems: "center" }}>
              <Button label="Signup" onPress={this.onSubmit} />
            </View>
          </View>
        )}
        {mode === "Login" && (
          <View style={{ flexDirection: "row" }}>
            <Button label="Login" onPress={this.onSubmit} />
            <Button label="Signup" onPress={this.changeMode} />
          </View>
        )}
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  inputField: {
    height: 50,
    width: 200,
    fontSize: 18,
  }
});
