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
}

export default new Jobs();
