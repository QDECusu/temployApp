import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Card } from "react-native-elements";
import { profile as profileRequest, jobs as jobsRequest } from "../../api";
import { Button } from "../utils";

class Applications extends Component {
  state = {
    apps: []
  };
  componentWillMount() {
    this.getApps();
  }
  getApps = async () => {
    const apps = await profileRequest.getApplications(
      this.props.navigation.state.params.jobId
    );
    this.setState({ apps });
  };
  openOthersProfile = user => {
    this.props.navigation.navigate("OthersProfile", {
      userId: user.id
    });
  };
  respondToApplication = (app, accepted) => {
    jobsRequest
      .respondToApplication(app.id, accepted)
      .then(() => this.getApps())
      .catch(e => console.warn(e));
  };
  render() {
    return (
      <View>
        {this.state.apps.map(app => {
          let color = "white";
          let textColor = "black";
          if (app.accepted === true) {
            color = "rgb(0,200,0)";
            textColor = "white";
          } else if (app.accepted === false) {
            color = "rgb(200,0,0)";
            textColor = "white";
          }
          return (
            <TouchableOpacity
              key={app.user.username}
              onPress={() => this.openOthersProfile(app.user)}
            >
              <Card
                title={app.user.username}
                titleStyle={{ color: textColor }}
                containerStyle={{
                  width: 325,
                  height: 200,
                  alignItems: "center",
                  backgroundColor: color
                }}
              >
                <View stlye={{ alignItems: "center" }}>
                  <Text style={{ color: textColor }}>
                    {app.user.first_name} {app.user.last_name}
                  </Text>
                  <Text style={{ color: textColor }}>{app.user.email}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: "row", margin: 10 }}>
                  <Button
                    label="Reject"
                    onPress={() => this.respondToApplication(app, false)}
                    style={{ backgroundColor: "rgb(139, 0, 0)" }}
                  />
                  <Button
                    label="Accept"
                    onPress={() => this.respondToApplication(app, true)}
                    style={{ backgroundColor: "rgb(0, 170, 0)" }}
                  />
                </View>
              </Card>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

export default Applications;
