import request from "./request";

class Profile {
  getProfile = () => {
    const profile = request.get("profileDetail");
    console.log(profile);
  };
}
