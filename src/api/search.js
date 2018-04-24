import request from "./request";

class Search {
  search = query => request.get(`search?q=${query}`);
}

export default new Search();
