import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import { Button, colors } from "../utils";
import { connect } from "react-redux";
import { getOthersProfileDetails } from "../../actions/profile";
import { Divider, Avatar } from "react-native-elements";
import { profile } from "../../api";

const mapStateToProps = ({ openProfile, profile }) => ({
  openProfile,
  profile
});

const mapDispatchToProps = { getOthersProfileDetails };

@connect(mapStateToProps, mapDispatchToProps)
class OthersProfile extends Component {
  componentDidMount() {
    this.getOtherProfile();
  }
  getOtherProfile = () => {
    this.props.getOthersProfileDetails(
      this.props.navigation.state.params.userId
    );
  };
  addMod = () =>
    profile
      .addMod(this.props.navigation.state.params.userId)
      .then(() => this.getOtherProfile());
  render() {
    const { openProfile } = this.props;
    console.log(openProfile);
    if (openProfile === null) {
      return null;
    }
    const initials =
      openProfile.user.first_name[0] + openProfile.user.last_name[0];
    return (
      <ScrollView style={{ backgroundColor: "skyblue" }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "skyblue",
            marginBottom: 30
          }}
        >
          <Avatar
            xlarge
            rounded
            source={
              openProfile.image != null ? { uri: openProfile.image } : null
            }
            title={initials}
            activeOpacity={0.7}
            containerStyle={{ backgroundColor: colors.primary, margin: 20 }}
          />
          {this.props.profile.is_mod && (
            <Button
              label="Make mod"
              disabled={openProfile.user.is_mod}
              onPress={this.addMod}
            />
          )}
          <Text style={style}>
            {openProfile.user.first_name} {openProfile.user.last_name}
          </Text>
          <Text style={style}>{openProfile.user.username}</Text>
          <Text style={style}>{openProfile.user.email}</Text>
          <Text style={style}>{openProfile.short_description}</Text>
          <Text style={style}>{openProfile.skills}</Text>
          <Text style={style}>{openProfile.zipcode}</Text>
        </View>
      </ScrollView>
    );
  }
}

const style = {
  margin: 10,
  fontSize: 20,
  color: "white",
  alignItems: "center",
  justifyContent: "center"
};

export default OthersProfile;
