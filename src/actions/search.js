import * as types from "./actionNames";
import searchRequest from "../api/search";

export const search = query => async dispatch => {
  const result = await searchRequest.search(query);
  console.log(result);
  dispatch({ type: types.SEARCH, payload: result });
};
