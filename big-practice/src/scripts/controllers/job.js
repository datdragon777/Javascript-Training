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
    try {
      const response = await this.jobModel.getJobsModel();
      this.jobView.listJob(response);
    } catch (error) {
      this.jobView.openErrorFormPopup();
    }
  }

  /**
   * Handle add job
   * @param {object} data
   * @returns {object}
   */
  async handleAddJob(data) {
    try {
      const response = await this.jobModel.addJobModel(data);
      this.jobView.displayJobItem(data);
      this.jobModel.jobs.push(data)
      this.handleCountStatus();
      return response;
    } catch (error) {
      this.jobView.openErrorFormPopup();
    }
  }

  /**
   * Handle get job based on ID
   * @param {string} id
   * @returns {object}
   */
  async handleGetJobById(id) {
    try {
      const response = await this.jobModel.getJobByIdModel(id);
      return response;
    } catch (error) {
      this.jobView.openErrorFormPopup();
    }
  }

  /**
   * Handle update job based on ID
   * @param {string} id - ID of job
   * @param {object} data - job's information after updating
   * @returns {object}
   */
  async handleUpdateJob(id, data) {
    try {
      const response = await this.jobModel.updateJobModel(id, data);
      this.handleCountStatus();
      return response;
    } catch (error) {
      this.jobView.openErrorFormPopup();
    }
  }

  /**
   * Handle delete job based on ID
   * @param {string} id - ID of job
   * @returns {object}
   */
  async handleDeleteJob(id) {
    try {
      const response = await this.jobModel.deleteJobModel(id);
      this.handleCountStatus();
      return response
    } catch (error) {
      this.jobView.openErrorFormPopup();
    }
  }

  /**
   * Handle search job based on title
   * @param {string} data
   * @returns {object}
   */
  async handleSearchJob(data) {
    return await this.jobModel.searchJobModel(data);
  }

  /**
   * Handle filter job based on status
   * @param {string} data
   * @returns {object}
   */
  async handleFilterJob(data) {
    return await this.jobModel.filterJobModel(data);
  }

  /**
   * Count each job's status
   */
  async handleCountStatus() {
    const jobCounts = await this.jobModel.countStatusModel();
    if (jobCounts) {
      // Update the UI to display the new status counts
      this.jobView.updateStatusCounts(jobCounts);
    }
  }
}
