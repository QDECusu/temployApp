import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import profile from "./profile";

const reducers = combineReducers({ profile });

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
