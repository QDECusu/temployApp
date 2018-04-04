import * as types from "./actionNames";
import profileRequest from "../api/profile";

export const getProfileDetails = () => async dispatch => {
  const profile = await profileRequest.getProfile();
  dispatch({
    type: types.GET_PROFILE_DETAILS,
    payload: { profile }
  });
};
