import { actionNames } from "../actions";

export default (profile = null, action) => {
  switch (action.type) {
    case actionNames.GET_PROFILE_DETAILS:
      return action.payload;
  }
};
