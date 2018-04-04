import React, { Component } from "react";
import { TextInput } from "react-native";

export default class NamedTextField extends Component {
  onChange = text => {
    this.props.onChange(text, this.props.name);
  };
  render() {
    const { value, onChangeText, name, ...rest } = this.props;
    return (
      <TextInput
        value={this.props.avlue}
        onChangeText={this.onChange}
        {...rest}
      />
    );
  }
}
