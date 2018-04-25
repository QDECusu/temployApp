import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import profile from "./profile";
import jobs from "./jobs";
import myJobs from "./myJobs";
import openProfile from "./openProfile";
import search from "./search";

const reducers = combineReducers({
  profile,
  jobs,
  myJobs,
  openProfile,
  search
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
