import React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import { Input, Button, colors } from "../utils";
import { request } from "../../api";
import { SearchBar } from 'react-native-elements';

export default class SearchScreen extends React.Component {
    render() { 
        return (
            <TouchableWithoutFeedback>
                <View style={{flex: 1, backgroundColor: "white"}}> 
                    <SearchBar
                        lightTheme
                        onChangeText={() => {}}
                        showLoading
                        platform="android"
                        cancelButtonTitle="Cancel"
                        placeholder='Search for Jobs and Employees'
                    />
                </View>
            </TouchableWithoutFeedback>
        );
    }
}