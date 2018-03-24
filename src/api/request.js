import { AsyncStorage } from "react-native";
const BASE_URL = "http://144.39.160.212:8000";

class Request {
  getToken = () => AsyncStorage.getItem("token");
  _request = async (route, options = {}, auth = true) => {
    try {
      const token = await this.getToken();
      const headers = new Headers({
        "Content-Type": "application/json",
        Authorization: auth ? `Token ${token}` : null
      });
      const body = options.body ? JSON.stringify(options.body) : null;
      const optionsWithAuth = { ...options, headers, body };
      const blob = await fetch(`${BASE_URL}/${route}/`, optionsWithAuth);
      const response = await blob.json();
      console.log(response);
      return response;
    } catch (e) {
      console.warn(e);
    }
  };
  login = async options => {
    const { token } = await this._request(
      "login",
      { ...options, method: "post" },
      false
    );
    AsyncStorage.setItem("token", token);
  };
  singup = async options => {
    const { token } = await this._request(
      "signup",
      { ...options, method: "post" },
      false
    );
    AsyncStorage.setItem("token", token);
  };
  logout = () => AsyncStorage.removeItem("token");
  get = (route, options) => this._request(route, { ...options, method: "get" });
  post = (route, options) =>
    this._request(route, { ...options, method: "post" });
  patch = (route, options) =>
    this._request(route, { ...options, method: "patch" });
}

export default new Request();
