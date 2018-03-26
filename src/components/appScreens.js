import React from "react";
import { TabNavigator } from "react-navigation";
import { MaterialIcons } from "@expo/vector-icons";
import { View, Text } from "react-native";
import { colors } from "./utils";

const Home = () => (
  <View>
    <Text>basic screen</Text>
  </View>
);

export default TabNavigator(
  {
    Home: { screen: Home, navigationOptions: { title: "Home" } },
    Search: { screen: Home, navigationOptions: { title: "Search" } },
    Profile: { screen: Home, navigationOptions: { title: "Profile" } }
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
            color={focused ? colors.primary : colors.primaryLight}
          />
        );
      }
    }),
    tabBarOptions: {
      inactiveTintColor: "gray"
    },
    tabBarPosition: "bottom",
    animationEnabled: false,
    swipeEnabled: false
  }
);
