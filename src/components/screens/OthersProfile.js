import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { getOthersProfileDetails } from "../../actions/profile";

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
    return (
      <View>
        <Text>{openProfile.username}</Text>
      </View>
    );
  }
}

export default OthersProfile;
