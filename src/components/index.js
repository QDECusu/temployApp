import React, { Component } from "react";
import { SwitchNavigator } from "react-navigation";
import Login from "./Login";
import App from "./appScreens";

export default SwitchNavigator({
  Authentication: Login,
  App: App
});
