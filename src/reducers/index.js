import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import profile from "./profile";
import jobs from "./jobs";

const reducers = combineReducers({ profile, jobs });

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
