import * as types from "../actions/actionNames";

export default (state = null, action) => {
  switch (action.type) {
    case types.GET_OTHERS_PROFILE:
      console.log(action.payload.profile);
      return action.payload.profile;
    default:
      return state;
  }
};
