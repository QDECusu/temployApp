import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Input, Button, colors } from "../utils";
import { request } from "../../api";
import { getMyJobs, getMyAvailabilityListing } from "../../actions/jobs";
import JobPosting from "../JobPosting";
import { Divider, Avatar } from "react-native-elements";

const mapStateToProps = ({ profile, myJobs }) => ({ profile, myJobs });

const mapDispatchToProps = { getMyJobs, getMyAvailabilityListing };

@connect(mapStateToProps, mapDispatchToProps)
class Profile extends Component {
  componentWillMount() {
    this.props.getMyJobs();
    this.props.getMyAvailabilityListing();
  }
  editJobPost = jp => {
    this.props.navigation.navigate("EditJobPost", { jp });
  };
  editProfile = () => {
    this.props.navigation.navigate("EditProfile");
  };
  logout = () => {
    request.logout();
    this.props.navigation.navigate("Authentication");
  };
  availability = () => {
    this.props.navigation.navigate("Availability");
  };

  render() {
    const { profile, myJobs } = this.props;
    const initials = profile.first_name[0] + profile.last_name[0];
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
            source={profile.image != null ? { uri: profile.image } : null}
            title={initials}
            activeOpacity={0.7}
            containerStyle={{ backgroundColor: colors.primary, margin: 20 }}
          />
          <Text style={style}>
            {profile.first_name} {profile.last_name}
          </Text>
          <Text style={style}>{profile.username}</Text>
          <Text style={style}>{profile.email}</Text>
          <Text style={style}>
            {profile.zipcode == 0 ? "" : profile.zipcode}
          </Text>
          <Text style={style}>{profile.short_description}</Text>
          <View style={{ alignItems: "center" }}>
            {profile.availability === null ? (
              <Button label="Availability" onPress={this.availability} />
            ) : (
              <TouchableOpacity onPress={this.availability}>
                <Text style={style}>{profile.availability.description}</Text>
                <Text style={style}>{profile.availability.schedule}</Text>
              </TouchableOpacity>
            )}
            <Button label="Edit Profile" onPress={this.editProfile} />
            <Button label="Logout" onPress={this.logout} />
            <Divider
              style={{
                margin: 20,
                width: 300,
                backgroundColor: colors.primaryDeep
              }}
            />
          </View>
          <Text style={style}>MY JOB POSTS</Text>
          {myJobs.length === 0 ? (
            <Text style={style}>You have not posted any jobs.</Text>
          ) : (
            myJobs.map(jp => {
              return (
                <JobPosting
                  key={jp.company_name}
                  jobPosting={jp}
                  onPress={() => this.editJobPost(jp)}
                />
              );
            })
          )}
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

export default Profile;
