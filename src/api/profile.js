import request from "./request";

class Profile {
  getProfile = () => request.get("profileDetail");
}

export default new Profile();
