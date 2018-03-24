import React from "react";
import { TextInput } from "react-native";

export default class Input extends React.PureComponent {
  onChangeText = text => {
    this.props.onChangeText(text, this.props.name);
  };
  render() {
    const { onChangeText, ...rest } = this.props;
    return <TextInput onChangeText={this.onChangeText} {...rest} />;
  }
}
