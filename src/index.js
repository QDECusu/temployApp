import React from "react";
import { Provider } from "react-redux";
import Root from "./components";
import store from "./reducers";

export default () => (
  <Provider store={store}>
    <Root />
  </Provider>
);
