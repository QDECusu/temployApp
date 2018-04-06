import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Input, Button, colors } from "../utils";
import { request } from "../../api";
import { getMyJobs } from "../../actions/jobs";
import JobPosting from "../JobPosting";

const mapStateToProps = ({ profile, myJobs }) => ({ profile, myJobs });

const mapDispatchToProps = { getMyJobs };

@connect(mapStateToProps, mapDispatchToProps)
class Profile extends Component {
  componentWillMount() {
    this.props.getMyJobs();
  }
  logout = () => {
    request.logout();
    this.props.navigation.navigate("Authentication");
  };
  render() {
    const { profile, myJobs } = this.props;
    return (
      <View style={{ 
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}>
        <MaterialIcons
            name="account-circle"
            size={150}
            color={colors.disabled}
          />
        <Text style={style}>{profile.username}</Text>
        <Text style={style}>{profile.email}</Text>
        <Text style={style}>{profile.short_description}</Text>
        <Button label="Logout" onPress={this.logout}>
        </Button>
        {myJobs.map(jp => (
          <JobPosting own key={jp.company_name} jobPosting={jp} />
        ))}
      </View>
    );
  }
}

const style = {
  margin: 10,
  fontSize: 20,
  alignItems: "center",
  justifyContent: "center",
};

export default Profile;
