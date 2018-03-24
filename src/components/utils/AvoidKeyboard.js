import React from "react";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity
} from "react-native";

export default ({ children, style }) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={style}>
    {children}
  </TouchableWithoutFeedback>
);
