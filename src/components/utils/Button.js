import React, { Component } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import colors from "./colors";

export default props => (
  <TouchableOpacity
    onPress={props.onPress}
    style={[styles.button, props.style]}
  >
    <Text style={styles.text}>{props.label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    height: 40,
    width: 100,
    margin: 3,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  text: {
    color: "white"
  }
});
