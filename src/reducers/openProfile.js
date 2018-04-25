import * as types from "../actions/actionNames";

export default (state = null, action) => {
  switch (action.type) {
    case types.GET_OTHERS_PROFILE:
      return action.payload.profile;
    default:
      return state;
  }
};
