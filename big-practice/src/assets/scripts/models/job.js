export default class JobModel {
  constructor(logo, title, date, category, location, description) {
    this.logo = logo
    this.title = title
    this.date = date
    this.category = category
    this.location = location
    this.description = description
    this.date = new Date()

    this.jobs = [];
  }

  getAllJobs() {
    return this.jobs;
  }

  getJobById(id) {
    return this.jobs.find(job => job.id === id);
  }

  addJob(job) {
    this.jobs.push(job);
  }

  updateJob(id, updatedJob) {
    const index = this.jobs.findIndex(job => job.id === id);
    if (index !== -1) {
      this.jobs[index] = updatedJob;
    }
  }

  deleteJob(id) {
    this.jobs = this.jobs.filter(job => job.id !== id);
  }
}
