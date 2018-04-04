import * as types from "./actionNames";
import { jobs as jobReqest } from "../api";

export const getJobs = () => async dispatch => {
  const jobs = await jobReqest.getPosts();
  return { type: types.GET_JOBS, payload: { jobs } };
};
