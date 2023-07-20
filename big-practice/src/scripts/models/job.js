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
    this.jobs = response;
    return response;
  }

  /**
   * Create job
   * @param {object} jobData
   * @returns {object}
   */
  async addJobModel(jobData) {
    return await addJobService(jobData);
  }

  /**
   * Get job's information base on ID
   * @param {string} id - ID of job
   * @returns {object}
   */
  async getJobByIdModel(id) {
    return await getJobByIdService(id);
  }

  /**
   * Update job data base on ID
   * @param {string} id - ID of job
   * @param {object} jobData - job's data after updating
   * @returns {object}
   */
  async updateJobModel(id, jobData) {
    return await updateJobService(id, jobData);
  }

  /**
   * Delete job base on ID
   * @param {string} id - ID of job
   * @returns {object}
   */
  async deleteJobModel(id) {
    return await deleteJobService(id);
  }
}
