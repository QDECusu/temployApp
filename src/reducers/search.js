import { actionNames } from "../actions";

export default (
  state = { AvailabilityListing: [], JobListing: [], Profile: [] },
  action
) => {
  switch (action.type) {
    case actionNames.SEARCH:
      return action.payload;
    default:
      return state;
  }
};
