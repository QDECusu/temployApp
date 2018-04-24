import React, { Component } from "react";
import { connect } from "react-redux";
import { Permissions, ImagePicker } from "expo";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Avatar } from "react-native-elements";
import { getProfileDetails } from "../../actions/profile";
import { colors, Button, Input } from "../utils";
import { request, profile } from "../../api";
import NamedTextField from "../NamedTextField";

const mapStateToProps = ({ profile }) => ({ profile });

const mapDispatchToProps = { getProfileDetails };

@connect(mapStateToProps, mapDispatchToProps)
class EditProfile extends Component {
  state = {
    email: this.props.profile.email,
    firstName: this.props.profile.first_name,
    lastName: this.props.profile.last_name,
    zipcode:
      this.props.profile.zipcode == null
        ? ""
        : this.props.profile.zipcode.toString(),
    shortDescription:
      this.props.profile.shortDescription == null
        ? ""
        : this.props.profile.shortDescription,
    skills: this.props.profile.skills == null ? "" : this.props.profile.skills,
    imageURI: null
  };
  pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 4],
      base64: true
    });
    if (!result.cancelled) {
      this.setState({ imageURI: result.uri });
      this.base64 = result.base64;
    }
  };
  submitChanges = () => {
    Promise.all([this.submitPhoto(), this.submitProfileInfo()])
      .then(() => this.props.getProfileDetails())
      .catch(e => console.warn(e));
    this.props.navigation.goBack();
  };
  submitPhoto = () => {
    if (this.state.imageURI === null) {
      return Promise.resolve();
    }
    return request.upload("file", {
      uri: this.state.imageURI,
      type: "image/jpeg",
      name: "Picture"
    });
  };
  submitProfileInfo = () => {
    const {
      firstName,
      lastName,
      shortDescription,
      skills,
      zipcode,
      email
    } = this.state;
    return profile.editProfile(this.props.profile.id, {
      user: {
        email,
        first_name: firstName,
        last_name: lastName
      },
      short_descriptions: shortDescription,
      // skills,
      zipcode
    });
  };
  cancelChanges = () => {
    this.props.navigation.goBack();
  };
  onChange = (val, name) => {
    this.setState({ [name]: val });
  };

  render() {
    const { profile } = this.props;
    const { imageURI } = this.state;
    const initials = profile.first_name[0] + profile.last_name[0];
    return (
      <ScrollView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            margin: 20,
            marginBottom: 200
          }}
        >
          <Avatar
            xlarge
            rounded
            source={
              imageURI != null
                ? { uri: imageURI }
                : profile.image != null
                  ? { uri: profile.image }
                  : null
            }
            title={initials}
            onPress={this.pickImage}
            activeOpacity={0.7}
            containerStyle={{
              backgroundColor: colors.primary,
              margin: 20,
              marginBottom: 30
            }}
          />
          <Text style={{ fontSize: 25, marginBottom: 20 }}>
            {profile.username}
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text style={styles.nameTextStyle}>First Name:</Text>
            <Text style={styles.nameTextStyle}>Last Name:</Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <NamedTextField
              name="firstName"
              value={this.state.firstName}
              onChange={this.onChange}
              style={styles.nameInputField}
            />
            <NamedTextField
              name="lastName"
              value={this.state.lastName}
              onChange={this.onChange}
              style={styles.nameInputField}
            />
          </View>
          <Text style={{ fontSize: 20, marginRight: 200 }}>Password:</Text>
          <NamedTextField
            name="oldPassword"
            placeholder="old password"
            onChange={this.onChange}
            secureTextEntry
            style={styles.inputField}
          />
          <NamedTextField
            name="newPassword"
            placeholder="new password"
            onChange={this.onChange}
            secureTextEntry
            style={styles.inputField}
          />
          <Text style={{ fontSize: 20, marginRight: 230 }}>Email: </Text>
          <NamedTextField
            name="email"
            value={this.state.email}
            keyboardType={"email-address"}
            onChange={this.onChange}
            style={styles.inputField}
          />
          <Text style={{ fontSize: 20, marginRight: 210 }}>Zipcode: </Text>
          <NamedTextField
            name="zipcode"
            placeholder="zipcode"
            value={this.state.zipcode}
            keyboardType={"numeric"}
            onChange={this.onChange}
            style={styles.inputField}
          />
          <Text style={{ fontSize: 20, marginRight: 200 }}>About Me:</Text>
          <NamedTextField
            name="shortDescription"
            placeholder="Write a brief description about yourself."
            value={this.state.shortDescription}
            multiline={true}
            onChange={this.onChange}
            style={styles.largeInputField}
          />
          <Text style={{ fontSize: 20, marginRight: 235 }}>Skills: </Text>
          <NamedTextField
            name="skills"
            placeholder="List your skills."
            value={this.state.skills}
            multiline={true}
            onChange={this.onChange}
            style={styles.largeInputField}
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
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  inputField: {
    backgroundColor: "white",
    margin: 10,
    padding: 10,
    borderRadius: 5,
    borderColor: colors.primaryDeep,
    borderStyle: "solid",
    borderWidth: 1,
    height: 50,
    width: 300,
    fontSize: 18
  },
  nameInputField: {
    backgroundColor: "white",
    margin: 10,
    padding: 10,
    borderRadius: 5,
    borderColor: colors.primaryDeep,
    borderStyle: "solid",
    borderWidth: 1,
    height: 50,
    width: 140,
    fontSize: 18
  },
  largeInputField: {
    textAlignVertical: "top",
    backgroundColor: "white",
    margin: 10,
    padding: 10,
    borderRadius: 5,
    borderColor: colors.primaryDeep,
    borderStyle: "solid",
    borderWidth: 1,
    height: 150,
    width: 300,
    fontSize: 18
  },
  nameTextStyle: {
    fontSize: 20,
    marginLeft: 15,
    marginRight: 45
  }
});

export default EditProfile;
