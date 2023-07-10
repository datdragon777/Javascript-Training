import { getJobsService, addJobService } from "../services/job";

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
    const response = await getJobsService()
    this.jobs = response

    return response
  }

  async addJobModel(jobData) {
    return await addJobService(jobData);
  }

  // getJobById(id) {
  //   return this.jobs.find(job => job.id === id);
  // }

  // updateJob(id, updatedJob) {
  //   const index = this.jobs.findIndex(job => job.id === id);
  //   if (index !== -1) {
  //     this.jobs[index] = updatedJob;
  //   }
  // }

  // deleteJob(id) {
  //   this.jobs = this.jobs.filter(job => job.id !== id);
  // }
}
