import * as types from "../actions/actionNames";

export default (state = [], action) => {
  switch (action.type) {
    case types.GET_MY_JOBS:
      return action.payload.jobs;
    default:
      return state;
  }
};
