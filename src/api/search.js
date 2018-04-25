import request from "./request";

class Search {
  search = query => request.get(`search?q=${query}`, { noSlash: true });
}

export default new Search();
