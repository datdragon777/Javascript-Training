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

  /**
   * Get list job
   * @returns {object}
   */
  async getJobsModel() {
    const response = await getJobsService();
    this.jobs = response
    return response;
  }

  /**
   * Add job
   * @param {object} jobData
   * @returns {object}
   */
  addJobModel(jobData) {
    const response = addJobService(jobData);
    // this.jobs.push(jobData);
    return response;
  }

  /**
   * Get job's information base on ID
   * @param {string} id - ID of job
   * @returns {object}
   */
  getJobByIdModel(id) {
    const response = getJobByIdService(id);
    return response;
  }

  /**
   * Update job data base on ID
   * @param {string} id - ID of job
   * @param {object} jobData - job's data after updating
   * @returns {object}
   */
  updateJobModel(id, jobData) {
    this.jobs = this.jobs.map((item) => {
      if (item.id === id) {
        return jobData;
      }
      return item;
    });

    return updateJobService(id, jobData);
  }

  /**
   * Delete job base on ID
   * @param {string} id - ID of job
   * @returns {object}
   */
  deleteJobModel(id) {
    this.jobs = this.jobs.filter((item) => item.id !== id);
    return deleteJobService(id);
  }

  /**
   * Search job based on title
   * @param {string} value - value when user typing
   * @returns {object}
   */
  searchJobModel(value) {
    if (!value) {
      return this.jobs; // Return the original list if the search value is empty
    }

    const data = this.jobs.filter((job) => {
      if (job.title) {
        return job.title.toLowerCase().includes(value.toLowerCase());
      }
      return false;
    });

    return data;
  }

  /**
   * Filter job based on status
   * @param {string} status
   * @returns {object}
   */
  filterJobModel(status) {
    const filteredJobs = this.jobs.filter((job) => job.status === status);
    if (!status) {
      return this.jobs; // Return the original list if no status is provided
    }

    return filteredJobs;
  }

  /**
   * Count status of each job
   * @returns {object}
   */
  countStatusModel() {
    let jobCounts = {
      active: 0,
      completed: 0,
      unfinished: 0,
    };

    this.jobs.forEach((job) => {
      if (job.status === "active") jobCounts.active++;
      else if (job.status === "completed") jobCounts.completed++;
      else if (job.status === "unfinished") jobCounts.unfinished++;
    });

    return jobCounts;
  }
}
