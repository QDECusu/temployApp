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
  static navigationOptions = ({ navigation }) => ({ title: navigation.state.params.title })
  componentWillMount() {
    this.props.getMyJobs();
  }

  editJobPost = () => {
      this.props.navigation.navigate("EditJobPost")
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
    return (
      <ScrollView style={{backgroundColor: "skyblue"}}>
        <View style={{ 
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "skyblue",
            marginBottom: 30
          }}>
          <View style={{alignItems:"center"}}>
          <Button label="Edit Job Post" onPress={this.editJobPost} />
          <Button label="Save" onPress={this.logout} />
            <Divider style={{ margin: 20, width: 300, backgroundColor: colors.primaryDeep }} />          
          </View>
          <Text style={style}>MY JOB POSTS</Text>
          {myJobs.map(jp => (
            <JobPosting own key={jp.company_name} jobPosting={jp} onPress={this.editJobPost}/>
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
