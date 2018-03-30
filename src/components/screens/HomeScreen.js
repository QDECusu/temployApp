import React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard
} from "react-native";
import { Input, Button, colors } from "../utils";
import { request } from "../../api";

export default class HomeScreen extends React.Component {
    render() { 
        return (
            <View>
                <Text>Home screen</Text>
            </View>
        );
    }
}