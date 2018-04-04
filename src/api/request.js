import { AsyncStorage } from "react-native";
import BASE_URL from "./url";

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
    if (token) {
      AsyncStorage.setItem("token", token);
      return true;
    } else {
      return false;
    }
  };
  singup = async options => {
    const { token } = await this._request(
      "signup",
      { ...options, method: "post" },
      false
    );
    if (token) {
      AsyncStorage.setItem("token", token);
      return true;
    } else {
      return false;
    }
  };
  logout = () => AsyncStorage.removeItem("token");
  get = (route, options) => this._request(route, { ...options, method: "get" });
  post = (route, options) =>
    this._request(route, { ...options, method: "post" });
  patch = (route, options) =>
    this._request(route, { ...options, method: "patch" });
}

export default new Request();
