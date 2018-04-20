import React, { Component } from "react";
import { connect } from "react-redux";
import { Permissions, ImagePicker } from "expo";
import { View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import { getProfileDetails } from '../../actions/profile'
import { colors, Button } from "../utils";
import { request } from "../../api";
import BASE_URL from "../../api/url";

const mapStateToProps = ({ profile }) => ({ profile });

const mapDispatchToProps = { getProfileDetails }

@connect(mapStateToProps, mapDispatchToProps)
class EditProfile extends Component {
  state = {
    email: this.props.profile.email,
    first_name: this.props.profile.first_name,
    last_name: this.props.profile.last_name,
    zipcode: "",
    short_description: "",
    skills: "",
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
  submitImage = () => {
    request.upload("file", {
      uri: this.state.imageURI,
      type: "image/jpeg",
      name: "Picture"
    })
      .then(() => this.props.getProfileDetails());
    this.props.navigation.goBack();
  };
  render() {
    const { profile } = this.props;
    const { imageURI } = this.state;
    const initials = profile.first_name[0] + profile.last_name[0];
    return (
      <View style={{justifyContent: "center", alignItems: "center"}}>
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
          containerStyle={{ backgroundColor: colors.primary, margin: 20 }}
        />
        <Button label="Save" onPress={this.submitImage} />
      </View>
    );
  }
}

export default EditProfile;
