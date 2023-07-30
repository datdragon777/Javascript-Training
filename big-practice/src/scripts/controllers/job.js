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
    const response = await this.jobModel.getJobsModel();
    try {
      if (response.ok) {
        const jobData = await response.json();
        this.jobModel.jobs = jobData
        console.log("log jobs:", this.jobModel.jobs);
        this.jobView.listJob(jobData);
      } else {
        this.jobView.openErrorFormPopup();
      }
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
    const response = await this.jobModel.addJobModel(data);
    try {
      if (response.ok) {
        return response;
      } else {
        this.jobView.openErrorFormPopup();
      }
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
    const response = await this.jobModel.getJobByIdModel(id)
    try {
      if (response.ok) {
        return response.json()
      } else {
        this.jobView.openErrorFormPopup();
      }
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
    const response = await this.jobModel.updateJobModel(id, data);
    try {
      if (response.ok) {
        this.handleCountStatus();
        return response
      } else {
        this.jobView.openErrorFormPopup();
      }
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
    const response = await this.jobModel.deleteJobModel(id);
    try {
      if (response.ok) {
        return response
      } else {
        this.jobView.openErrorFormPopup();
      }
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

  async handleCountStatus() {
    const jobCounts = await this.jobModel.countStatusModel();
    if (jobCounts) {
      // Update the UI to display the new status counts
      this.jobView.updateStatusCounts(jobCounts);
    }
  }
}
