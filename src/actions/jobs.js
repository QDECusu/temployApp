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

export const getMyAvailabilityListing = () => async dispatch => {
  const listings = await jobRequest.getAvailabilityPost();
  dispatch({
    type: types.GET_AVAILABILITY_LISTING,
    payload: listings.length > 0 ? listings[0] : null
  });
};
