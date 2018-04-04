import request from "./request";

class Jobs {
  postJob = async ({
    company_name,
    job_position,
    job_phone,
    job_email,
    job_description,
    job_schedule
  }) => {
    await request.post("JobPosts", {
      body: {
        company_name,
        job_description,
        job_position,
        job_phone,
        job_email,
        job_schedule
      }
    });
  };
  getPosts = () => request.get("JobPosts");
}

export default new Jobs();
