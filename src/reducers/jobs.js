import { actionNames } from "../actions";

export default (state = [], action) => {
  switch (action.type) {
    case actionNames.GET_JOBS:
      return action.payload.jobs;
    default:
      return state;
  }
};
