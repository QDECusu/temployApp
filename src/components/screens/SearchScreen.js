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
import { SearchBar } from 'react-native-elements';

export default class SearchScreen extends React.Component {
    render() { 
        return (
            <View> 
                <SearchBar
                lightTheme
                onChangeText={() => {}}
                placeholder='Search For Jobs'
                />
                <SearchBar
                lightTheme
                onChangeText={() => {}}
                placeholder='Search For Employees'
                />               
            </View>
        );
    }
}