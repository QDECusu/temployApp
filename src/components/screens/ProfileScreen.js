import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";
import { Button } from "native-base";
import { request } from "../../api";

const mapStateToProps = ({ profile }) => ({ profile });

@connect(mapStateToProps)
class Profile extends Component {
  logout = () => {
    request.logout();
    this.props.navigation.navigate("Authentication");
  };
  render() {
    const { profile } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Text style={style}>{profile.username}</Text>
        <Text style={style}>{profile.first_name}</Text>
        <Text style={style}>{profile.short_description}</Text>
        <Button style={style} onPress={this.logout}>
          <Text>Logout</Text>
        </Button>
      </View>
    );
  }
}

const style = {
  height: 50,
  width: 50
};

export default Profile;
