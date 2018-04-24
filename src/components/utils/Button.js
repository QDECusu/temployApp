import React, { Component } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import colors from "./colors";

export default props => (
  <TouchableOpacity
    onPress={props.disabled ? () => {} : props.onPress}
    style={[
      styles.button,
      { backgroundColor: props.disabled ? colors.disabled : colors.primary },
      props.style
    ]}
  >
    <Text style={styles.text}>{props.label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    height: 40,
    width: 100,
    margin: 3,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  text: {
    color: "white",
    fontSize: 17
  }
});
