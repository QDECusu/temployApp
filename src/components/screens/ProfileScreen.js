import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Input, Button, colors } from "../utils";
import { request } from "../../api";
import { getMyJobs } from "../../actions/jobs";
import JobPosting from "../JobPosting";
import { Divider, Avatar } from 'react-native-elements';

const mapStateToProps = ({ profile, myJobs }) => ({ profile, myJobs });

const mapDispatchToProps = { getMyJobs };

@connect(mapStateToProps, mapDispatchToProps)
class Profile extends Component {
  componentWillMount() {
    this.props.getMyJobs();
  }

  editProfile = () => {
    this.props.navigation.navigate("EditProfile");
  };

  logout = () => {
    request.logout();
    this.props.navigation.navigate("Authentication");
  };

  render() {
    const { profile, myJobs } = this.props;
    const initials = profile.first_name[0] + profile.last_name[0];
    return (
      <ScrollView style={{backgroundColor: "skyblue"}}>
        <View style={{ 
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "skyblue",
            marginBottom: 30
          }}>
          <Avatar
            xlarge
            rounded
            title={initials}
            onPress={() => console.log(profile)}
            activeOpacity={0.7}
            containerStyle={{backgroundColor:colors.primary, margin: 20}}
          />
          <Text style={style}>{profile.first_name} {profile.last_name}</Text>
          <Text style={style}>{profile.username}</Text>
          <Text style={style}>{profile.email}</Text>
          <Text style={style}>{profile.short_description}</Text>
          <View style={{alignItems:"center"}}>
          <Button label="Edit Profile" onPress={this.editProfile} />
          <Button label="Logout" onPress={this.logout} />
            <Divider style={{ margin: 20, width: 300, backgroundColor: colors.primaryDeep }} />          
          </View>
          <Text style={style}>MY JOB POSTS</Text>
          {myJobs.map(jp => (
            <JobPosting own key={jp.company_name} jobPosting={jp}/>
          ))}
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
  justifyContent: "center",
};

export default Profile;
