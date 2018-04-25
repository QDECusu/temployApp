import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import { Button, colors } from "../utils";
import { connect } from "react-redux";
import { getOthersProfileDetails } from "../../actions/profile";
import { Divider, Avatar } from 'react-native-elements';

const mapStateToProps = ({ openProfile }) => ({ openProfile });

const mapDispatchToProps = { getOthersProfileDetails };

@connect(mapStateToProps, mapDispatchToProps)
class OthersProfile extends Component {
  componentDidMount() {
    this.props.getOthersProfileDetails(
      this.props.navigation.state.params.userId
    );
  }
  render() {
    const { openProfile } = this.props;
    if (openProfile === null) {
      return null;
    }
    const initials = openProfile.user.first_name[0] + openProfile.user.last_name[0];
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
            source={openProfile.image != null ? { uri: openProfile.image } : null}
            title={initials}
            activeOpacity={0.7}
            containerStyle={{backgroundColor:colors.primary, margin: 20}}
          />
          <Text style={style}>{openProfile.user.first_name} {openProfile.user.last_name}</Text>
          <Text style={style}>{openProfile.user.username}</Text>
          <Text style={style}>{openProfile.user.email}</Text>
          <Text style={style}>{openProfile.user.short_description}</Text>
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


export default OthersProfile;
