import React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import { connect } from "react-redux";
import { Input, Button, colors } from "../utils";
import { search as searchQuery } from "../../actions/search";
import { request } from "../../api";
import { SearchBar } from "react-native-elements";

const mapStateToProps = ({ search }) => ({ search });

const mapDispatchToProps = { searchQuery };

@connect(mapStateToProps, mapDispatchToProps)
class SearchScreen extends React.Component {
  state = {
    query: ""
  };
  onQueryChange = query => {
    this.setState({ query });
  };
  submit = () => {
    console.log("i am doing it right now");
    this.props.searchQuery(this.state.query);
  };
  render() {
    return (
      <TouchableWithoutFeedback>
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <SearchBar
            lightTheme
            value={this.state.query}
            onChangeText={this.onQueryChange}
            showLoading
            onSubmitEditing={this.submit}
            cancelButtonTitle="Cancel"
            placeholder="Search for Jobs and Employees"
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default SearchScreen;
