import { getAllJobs, createJob } from "../services/job";

export default class JobModel {
  constructor() {
    this.jobs = [];
  }

  async getListJobs() {
    const response = await getAllJobs
    this.jobs = response

    return response
  }

  async addJob() {
    const job = {
      id: "",
      logo: "",
      title: "",
      date: new Date(),
      category: "",
      location: "",
      description: "",
      status: "active",
    };

    return await createJob(job);
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
