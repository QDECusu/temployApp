import request from "./request";

class Profile {
  getProfile = () => request.get("profileDetail");
  editProfile = (id, options) =>
    request.patch(`Profile/${id}`, { body: options });
  getOthersProfile = id => request.get(`Profile/${id}`);
  addMod = user_id => request.post("addMod", { body: { user_id } });
}

export default new Profile();
