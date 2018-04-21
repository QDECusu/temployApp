import React, { Component } from "react";
import { connect } from "react-redux";
import { Permissions, ImagePicker } from "expo";
import { View, Text, StyleSheet, ScrollView, } from "react-native";
import { Avatar } from "react-native-elements";
import { getProfileDetails } from '../../actions/profile'
import { colors, Button, Input } from "../utils";
import { request } from "../../api";
import BASE_URL from "../../api/url";

const mapStateToProps = ({ profile }) => ({ profile });

const mapDispatchToProps = { getProfileDetails }

@connect(mapStateToProps, mapDispatchToProps)
class EditProfile extends Component {
  state = {
    email: this.props.profile.email,
    firstName: this.props.profile.first_name,
    lastName: this.props.profile.last_name,
    zipcode: this.props.profile.zipcode != null ? "" : this.props.profile.zipcode,
    shortDescription: this.props.profile.shortDescription != null ? "" : this.props.profile.shortDescription,
    skills: this.props.profile.skills != null ? "" : this.props.profile.skills,
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
    request.upload("file", {
      uri: this.state.imageURI,
      type: "image/jpeg",
      name: "Picture"
    })
      .then(() => this.props.getProfileDetails());
    request.upload  
    
    this.props.navigation.goBack();
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
    console.log(profile);
    return (
      <ScrollView>
        <View style={{justifyContent: "center", alignItems: "center", margin: 20, marginBottom: 200}}>
        <Avatar
          xlarge
          rounded
          source={imageURI != null
            ? { uri: imageURI }
            : profile.image != null
            ? { uri: profile.image }
            : null}
          title={initials}
          onPress={this.pickImage}
          activeOpacity={0.7}
          containerStyle={{ backgroundColor: colors.primary, margin: 20, marginBottom: 30 }}
        />
        <View style={{flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
          <Text style={styles.nameTextStyle}>First Name:</Text>
          <Text style={styles.nameTextStyle}>Last Name:</Text>  
        </View>
        <View style={{flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
          <Input
            name="firstName"
            defaultValue={profile.first_name}
            onChangeText={this.onChange}
            style={styles.nameInputField}
          />
          <Input
            name="lastName"
            defaultValue={profile.last_name}
            onChangeText={this.onChange}
            style={styles.nameInputField}
          />
        </View>
        <Text style={styles.textStyle}>Username:</Text>
        <Input
          name="username"
          defaultValue={profile.username}
          onChangeText={this.onChange}
          style={styles.inputField}
        />
        <Text style={styles.textStyle}>Password:</Text>
        <Input
          name="oldPassword"
          placeholder="old password"
          onChangeText={this.onChange}
          secureTextEntry
          style={styles.inputField}
        />
        <Input
            name="newPassword"
            placeholder="new password"
            onChangeText={this.onChange}
            secureTextEntry
            style={styles.inputField}
          />
        <Text style={styles.textStyle}>Email:       </Text>
        <Input
          name="email"
          defaultValue={profile.email}
          keyboardType={"email-address"}
          onChangeText={this.onChange}
          style={styles.inputField}
        />
        <Text style={styles.textStyle}>Zipcode:   </Text>
        <Input
          name="zipcode"
          defaultValue={this.props.profile.zipcode != null ? "" : this.props.profile.zipcode}
          keyboardType={"numeric"}
          onChangeText={this.onChange}
          style={styles.inputField}
        />
        <Text style={styles.textStyle}>About Me:</Text>
        <Input
          name="shortDescription"
          placeholder="Write a brief description about you."
          defaultValue={this.props.profile.shortDescription != null ? "" : this.props.profile.shortDescription}
          multiline={true}
          onChangeText={this.onChange}
          style={styles.largeInputField}
        />
        <Text style={styles.textStyle}>Skills:        </Text>
        <Input
          name="skills"
          placeholder="List your skills."
          defaultValue={this.props.profile.skills != null ? "" : this.props.profile.skills}
          multiline={true}
          onChangeText={this.onChange}
          style={styles.largeInputField}
        />
        <View style={{flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
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
  textStyle: {
    fontSize: 20,
    marginRight: 200
  },
  nameTextStyle: {
    fontSize: 20,
    marginLeft: 15,
    marginRight: 45,
  },
});


export default EditProfile;
