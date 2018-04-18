import React, { Component } from "react";
import { connect } from "react-redux";
import { Permissions, ImagePicker } from "expo";
import { View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import { colors, Button } from "../utils";
import { request } from "../../api";
import BASE_URL from "../../api/url";

const mapStateToProps = ({ profile }) => ({ profile });

@connect(mapStateToProps)
class EditProfile extends Component {
  state = {
    user: {
      email: this.props.profile.email,
      first_name: this.props.profile.first_name,
      last_name: this.props.profile.last_name
    },
    zipcode: "",
    short_description: "",
    skills: "",
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
    });
  };
  render() {
    const { profile } = this.props;
    const { imageURI } = this.state;
    const initials = profile.first_name[0] + profile.last_name[0];
    return (
      <View>
        <Avatar
          xlarge
          rounded
          source={imageURI != null ? { uri: imageURI } : null}
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
