import React, { Component } from "react";
import { TextInput, StyleSheet } from "react-native";
import colors from "./utils/colors"

export default class NamedTextField extends Component {
  onChange = text => {
    this.props.onChange(text, this.props.name);
  };
  render() {
    const { value, onChangeText, name, ...rest } = this.props;
    return (
      <TextInput
        value={this.props.value}
        style={[styles.TextInput]}
        underlineColorAndroid={colors.primary}
        selectionColor={"rgba(63,81,181,.65)"}
        onChangeText={this.onChange}
        {...rest}
      />
    );
  }
}

const styles = StyleSheet.create({
    TextInput: {
      margin: 10,
      padding: 10,
      width: 250,
      fontSize: 17,
    }
});
