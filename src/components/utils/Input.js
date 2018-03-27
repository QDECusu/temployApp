import React from "react";
import { TextInput, StyleSheet } from "react-native";
import colors from "./colors"

export default class Input extends React.PureComponent {
  onChangeText = text => {
    this.props.onChangeText(text, this.props.name);
  };
  render() {
    const { onChangeText, ...rest } = this.props;
    return <TextInput 
            underlineColorAndroid={colors.primary}
            selectionColor={"rgba(63,81,181,.65)"}
            onChangeText={this.onChangeText}
            {...rest}
          />;
  }
}