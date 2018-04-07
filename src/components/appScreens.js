import React from "react";
import { TabNavigator, StackNavigator } from "react-navigation";
import { MaterialIcons } from "@expo/vector-icons";
import { View, Text } from "react-native";
import { colors } from "./utils";
import {
  SearchScreen,
  ProfileScreen,
  HomeScreen,
  JobPost,
  OthersProfile
} from "./screens";

const Profile = StackNavigator({
  Profile: { screen: ProfileScreen, navigationOptions: { title: "Profile" } }
});

const Search = StackNavigator({
  Search: { screen: SearchScreen, navigationOptions: { title: "Search" } }
});

const Home = StackNavigator({
  Home: { screen: HomeScreen, navigationOptions: { title: "Home" } },
  JobPost: { screen: JobPost, navigationOptions: { title: "Post job" } },
  OthersProfile: {
    screen: OthersProfile,
    navigationOptions: { title: "Profile" }
  }
});

export default TabNavigator(
  {
    Home,
    Search,
    Profile
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case "Home":
            iconName = "home";
            break;
          case "Search":
            iconName = "search";
            break;
          case "Profile":
            iconName = "account-circle";
            break;
        }
        return (
          <MaterialIcons
            name={iconName}
            size={25}
            color={focused ? "white" : colors.disabled}
          />
        );
      }
    }),
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      style: {
        backgroundColor: colors.primaryDeep
      }
    },
    tabBarPosition: "bottom",
    animationEnabled: false,
    swipeEnabled: true
  }
);
