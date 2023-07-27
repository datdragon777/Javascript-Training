import { checking } from "../helpers/check-controller";
export default class JobController {
  constructor(jobView, jobModel) {
    this.jobView = jobView;
    this.jobModel = jobModel;
  }

  async init() {
    // Form Popup
    this.jobView.openAddFormPopup();
    this.jobView.closeFormPopup();
    this.jobView.openUpdateFormPopup(this.handleGetJobById.bind(this));
    this.jobView.openDeleteFormPopup();

    // CRUD
    await this.handleListJob();
    this.jobView.addJobView(this.handleAddJob.bind(this));
    this.jobView.updateJobView(this.handleUpdateJob.bind(this));
    this.jobView.deleteJobView(this.handleDeleteJob.bind(this));

    // Other features
    this.jobView.searchJobView(this.handleSearchJob.bind(this));
    this.jobView.filterJobView(this.handleFilterJob.bind(this));
    this.handleCountStatus();
  }

  /**
   * Handle get list job
   */
  async handleListJob() {
    const jobData = await this.jobModel.getJobsModel();
    this.jobView.listJob(jobData);
  }

  /**
   * Handle add job
   * @param {object} data
   * @returns {object}
   */
  async handleAddJob(data) {
    return await checking(this.jobModel.addJobModel(data));
  }

  /**
   * Handle get job based on ID
   * @param {string} id
   * @returns {object}
   */
  async handleGetJobById(id) {
    return await checking(this.jobModel.getJobByIdModel(id));
  }

  /**
   * Handle update job based on ID
   * @param {string} id - ID of job
   * @param {object} data - job's information after updating
   * @returns {object}
   */
  async handleUpdateJob(id, data) {
    // return await checking(this.jobModel.updateJobModel(id, data));
    const updatedJob = await checking(this.jobModel.updateJobModel(id, data));
    if (updatedJob) {
      // Recalculate the status counts after successful update
      this.handleCountStatus();
    }
    return updatedJob;
  }

  /**
   * Handle delete job based on ID
   * @param {string} id - ID of job
   * @returns {object}
   */
  async handleDeleteJob(id) {
    return await checking(this.jobModel.deleteJobModel(id));
  }

  /**
   * Handle search job based on title
   * @param {string} data
   * @returns {object}
   */
  async handleSearchJob(data) {
    return await checking(this.jobModel.searchJobModel(data));
  }

  /**
   * Handle filter job based on status
   * @param {string} data
   * @returns {object}
   */
  async handleFilterJob(data) {
    return await checking(this.jobModel.filterJobModel(data));
  }

  async handleCountStatus() {
    const jobCounts = await checking(this.jobModel.countStatusModel());
    if (jobCounts) {
      // Update the UI to display the new status counts
      this.jobView.updateStatusCounts(jobCounts);
    }
  }
}
