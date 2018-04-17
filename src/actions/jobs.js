import * as types from "./actionNames";
import { jobs as jobRequest } from "../api";

export const getJobs = () => async dispatch => {
  const jobs = await jobRequest.getPosts();
  dispatch({ type: types.GET_JOBS, payload: { jobs } });
};

export const getMyJobs = () => async dispatch => {
  const jobs = await jobRequest.getMyPosts();
  dispatch({ type: types.GET_MY_JOBS, payload: { jobs } });
};

