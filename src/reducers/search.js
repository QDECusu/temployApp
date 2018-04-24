import { actionNames } from "../actions";

export default (
  state = { AvailabilityListing: [], JobListing: [], User: [] },
  action
) => {
  switch (action.type) {
    case actionNames.SEARCH:
      return action.payload;
    default:
      return state;
  }
};
