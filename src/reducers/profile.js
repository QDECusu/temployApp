import { actionNames } from "../actions";

export default (profile = null, action) => {
  switch (action.type) {
    case actionNames.GET_PROFILE_DETAILS:
      return { ...action.payload.profile, availability: null };
    case actionNames.GET_AVAILABILITY_LISTING:
      return { ...profile, availability: action.payload };
    default:
      return profile;
  }
};
