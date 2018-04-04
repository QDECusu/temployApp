import { actionNames } from "../actions";

export default (state = [], action) => {
  switch (action.type) {
    case actionNames:
      return [...state, action.payload];
    default:
      return state;
  }
};
