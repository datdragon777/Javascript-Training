import {
  getJobsService,
  addJobService,
  getJobByIdService,
  updateJobService,
  deleteJobService,
} from "../services/job";

export default class JobModel {
  constructor() {
    this.jobs = [];
  }

  async getJobsModel() {
    const response = await getJobsService();
    this.jobs = response;
    console.log("list model: ",this.jobs);
    return response;
  }

  async addJobModel(jobData) {
    return await addJobService(jobData);
  }

  async getJobByIdModel(id) {
    return await getJobByIdService(id);
  }

  async updateJobModel(id, jobData) {
    return await updateJobService(id, jobData);
  }

  async deleteJobModel(id) {
    return await deleteJobService(id);
  }
}
