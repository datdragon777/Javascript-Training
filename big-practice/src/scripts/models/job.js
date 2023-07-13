import {
  getJobsService,
  addJobService,
  getJobByIdService,
  updateJobService,
} from "../services/job";

export default class JobModel {
  constructor() {
    this.jobs = [];
    this.job = {
      id: "",
      logo: "",
      title: "",
      date: new Date(),
      category: "",
      location: "",
      description: "",
      status: "active",
    };
  }

  async getJobsModel() {
    const response = await getJobsService();
    this.jobs = response;
    return response;
  }

  async addJobModel(jobData) {
    return await addJobService(jobData);
  }

  async getJobByIdModel(id) {
    return await getJobByIdService(id);
  }

  async updateJobModel(id, jobData) {
    return await updateJobService(id, jobData)
  }

  // deleteJob(id) {
  //   this.jobs = this.jobs.filter(job => job.id !== id);
  // }
}
