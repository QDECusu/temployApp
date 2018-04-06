import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import profile from "./profile";
import jobs from "./jobs";
import myJobs from "./myJobs";
import openProfile from "./openProfile";

const reducers = combineReducers({ profile, jobs, myJobs, openProfile });

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
