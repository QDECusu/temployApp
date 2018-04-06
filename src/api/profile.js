import request from "./request";

class Profile {
  getProfile = () => request.get("profileDetail");
  editProfile = (id, options) =>
    request.post(`Profile/${id}`, { body: options });
  getOthersProfile = id => request.get(`Profile/${id}`);
}

export default new Profile();
