import React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import { connect } from "react-redux";
import { Input, Button, colors } from "../utils";
import { search as searchQuery } from "../../actions/search";
import { getJobs } from "../../actions/jobs";
import { request, jobs } from "../../api";
import { SearchBar, Card } from "react-native-elements";
import JobPosting from "../JobPosting";

const mapStateToProps = ({ search }) => ({ search });

const mapDispatchToProps = { searchQuery, getJobs };

@connect(mapStateToProps, mapDispatchToProps)
class SearchScreen extends React.Component {
  state = {
    query: ""
  };
  onQueryChange = query => {
    this.setState({ query });
  };
  submit = () => {
    this.props.searchQuery(this.state.query);
  };
  openJobPost = jp => {
    this.props.navigation.navigate("ShowJobPost", {
      jp,
      applyForJob: this.applyForJob
    });
  };
  applyForJob = id =>
    jobs.applyForJob(id).then(() => {
      this.props.getJobs();
      this.submit();
    });
  openOthersProfile = id => {
    this.props.navigation.navigate("OthersProfile", {
      userId: id
    });
  };
  render() {
    const { Profile, JobListing } = this.props.search;
    let textColor = "black";
    return (
      <TouchableWithoutFeedback>
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            marginBottom: 20
          }}
        >
          <SearchBar
            lightTheme
            value={this.state.query}
            onChangeText={this.onQueryChange}
            showLoading
            onSubmitEditing={this.submit}
            cancelButtonTitle="Cancel"
            placeholder="Search for Profiles and Job Listings"
          />
          <ScrollView style={{ backgroundColor: "white" }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                marginLeft: 10,
                color: textColor
              }}
            >
              {" "}
              Profiles:
            </Text>
            {Profile.map(profile => {
              const { user } = profile;
              return (
                <TouchableOpacity
                  key={profile.id}
                  onPress={() => this.openOthersProfile(profile.id)}
                >
                  <Card
                    title={user.username}
                    containerStyle={{ width: 325, alignItems: "center" }}
                  >
                    <View stlye={{ alignItems: "center" }}>
                      <Text>
                        {user.first_name} {user.last_name}
                      </Text>
                      <Text>{user.email}</Text>
                    </View>
                  </Card>
                </TouchableOpacity>
              );
            })}
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                marginLeft: 10,
                color: textColor
              }}
            >
              {" "}
              Job Listings:
            </Text>
            {JobListing.map(jl => {
              return (
                <JobPosting
                  key={jl.id}
                  jobPosting={jl}
                  onPress={() => this.openJobPost(jl)}
                />
              );
            })}
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default SearchScreen;
