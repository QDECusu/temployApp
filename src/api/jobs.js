import request from "./request";

class Jobs {
  postJob = options =>
    request.post("JobPosts", {
      body: options
    });
  editJob = (id, options) => request.patch(`JobPosts/${id}`, { body: options });
  getPosts = () => request.get("JobPosts");
  getMyPosts = () => request.get("listUserJobPosts");
  applyForJob = id => request.post("applications", { body: { job_post: id } });
  deletePost = id => request.delete(`JobPosts/${id}`);
  addAvailabilityPost = options => {
    return request.post("AvailabilityPosts", { body: options });
  };
  getAvailabilityPost = () => request.get("listUserAvailabilityPosts");
  editAvailabilityPost = (id, options) =>
    request.patch(`AvailabilityPosts/${id}`, { body: options });
  respondToApplication = (id, accepted) =>
    request.patch(`applications/${id}`, { body: { accepted } });
}

export default new Jobs();
