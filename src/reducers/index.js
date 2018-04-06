import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import profile from "./profile";
import jobs from "./jobs";
import myJobs from "./myJobs";

const reducers = combineReducers({ profile, jobs, myJobs });

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
