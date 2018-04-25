import React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  Image,
} from "react-native";
import { connect } from "react-redux";
import { Input, Button } from "./utils";
import colors from "./utils/colors";
import { request } from "../api";
import { getProfileDetails } from "../actions/profile";

const remote = "https://image.freepik.com/free-vector/blue-watercolor-texture-background_3785-153.jpg";

@connect(null, { getProfileDetails })
class Login extends React.Component {
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
    this.gotoApp();
  }
  gotoApp = async () => {
    if ((await request.getToken()) !== null) {
      this.props.getProfileDetails();
      this.props.navigation.navigate("App");
    }
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
    const { username, password, email, mode, firstName, lastName } = this.state;
    if (
      mode === "Login" &&
      (await request.login({ body: { username, password } }))
    ) {
      this.gotoApp();
    } else if (
      await request.singup({
        body: {
          username,
          password,
          email,
          first_name: firstName,
          last_name: lastName
        }
      })
    ) {
      this.gotoApp();
    }
  };
  render() {
    const { mode } = this.state;
    return (
      
      <View style={{flex: 1}}>
      <Image
        style={{
          backgroundColor: '#ccc',
          flex: 1,
          resizeMode: "cover",
          position: 'absolute',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
        }}
        source={{ uri: remote }}
      />
      {mode === "Signup" && (
          <View style={{ flexDirection: "row", paddingRight: 250, paddingTop: 25 }}>
            <Button
              style={{ backgroundColor: "rgba(0,0,0,0)", height: 35 }}
              label="<-Back"
              onPress={this.changeMode}
            />
          </View>
        )}
      <KeyboardAvoidingView
        behavior="padding"
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
      <ScrollView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 25, marginRight: 25,
          }}
        >
          {mode === "Login" && (
            <View style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 110
            }}>
              <Text style={{ color: "white", fontSize: 30 }}>Welcome To</Text>
              <Text
                style={{
                  padding: 10,
                  fontSize: 60,
                  fontWeight: "bold",
                  color: colors.primaryDeep,
                  marginBottom: 30
                }}
              >
                Temploy
              </Text>
            </View>
          )}
          {mode === "Signup" && (
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 40, marginBottom: 10 }}>Signup</Text>
          )}
          
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
                keyboardType={"email-address"}
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
                <Button label="Signup" onPress={this.onSubmit} style={{width: 300}}/>
              </View>
            </View>
          )}
          {mode === "Login" && (
            <View style={{ flexDirection: "column" }}>              
              <Button label="Login" onPress={this.onSubmit} style={{width: 300}}/>
              <Button label="Signup" onPress={this.changeMode} style={{width: 300}}/>
            </View>
          )}
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
      </View>
      
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
  }
});

export default Login;
