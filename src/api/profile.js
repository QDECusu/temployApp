import request from "./request";

class Profile {
  getProfile = () => request.get("profileDetail");
  editProfile = (id, options) => {
    return request.patch(`Profile/${id}`, { body: options });
  };
  getOthersProfile = id => request.get(`Profile/${id}`);
}

export default new Profile();
