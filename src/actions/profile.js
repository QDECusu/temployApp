import * as types from "./actionNames";
import profileRequest from "../api/profile";

export const getProfileDetails = () => async dispatch => {
  const profile = await profileRequest.getProfile();
  dispatch({
    type: types.GET_PROFILE_DETAILS,
    payload: { profile }
  });
};

export const getOthersProfileDetails = id => async dispatch => {
  const profile = await profileRequest.getOthersProfile(id);
  dispatch({
    type: types.GET_OTHERS_PROFILE,
    payload: { profile }
  });
};
