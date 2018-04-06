import request from "./request";

class Jobs {
  postJob = ({
    company_name,
    job_position,
    job_phone,
    job_email,
    job_description,
    job_schedule
  }) =>
    request.post("JobPosts", {
      body: {
        company_name,
        job_description,
        job_position,
        job_phone,
        job_email,
        job_schedule
      }
    });
  getPosts = () => request.get("JobPosts");
  getMyPosts = () => request.get("listUserJobPosts");
}

export default new Jobs();
