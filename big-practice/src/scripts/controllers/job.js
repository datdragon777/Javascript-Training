import { proc } from "./base";
export default class JobContoller {
  constructor(jobView, jobModel) {
    this.jobView = jobView;
    this.jobModel = jobModel;

    this.init();
  }

  init() {
    // Form Popup
    this.jobView.openCreateFormPopup();
    this.jobView.closeFormPopup();
    this.jobView.openUpdateFormPopup(this.handleGetJobById.bind(this));
    this.jobView.openDeletePopup();

    // CRUD
    this.handleListJob();
    this.jobView.addJobView(this.handleAddJob.bind(this));
    this.jobView.updateJobView(this.handleUpdateJob.bind(this));
    this.jobView.deleteJobView(this.handleDeleteJob.bind(this));
  }

  /**
   * Handle get list job
   */
  async handleListJob() {
    const jobData = await this.jobModel.getJobsModel();

    // Call list job
    this.jobView.listJob(jobData);

    // Search feature
    this.jobView.searchJobView(jobData);

    // Filter feature
    this.jobView.filterJobView(jobData);

    // Count status feature
    this.jobView.countStatusView(jobData);
  }

  /**
   * Handle add job
   * @param {object} data
   * @returns {object}
   */
  async handleAddJob(data) {
    let $res = await proc(this.jobModel.addJobModel(data));
    this.handleListJob();
    return $res;
  }

  /**
   * Handle get job base on ID
   * @param {string} id
   * @returns {object}
   */
  async handleGetJobById(id) {
    return await proc(this.jobModel.getJobByIdModel(id));
  }

  /**
   * Handle update job base on ID
   * @param {string} id - ID of job
   * @param {object} data - job's information after updating
   * @returns {object}
   */
  async handleUpdateJob(id, data) {
    let $res = await proc(this.jobModel.updateJobModel(id, data));
    this.handleListJob();
    return $res;
  }

  /**
   * Handle delete job base on ID
   * @param {string} id - ID of job
   * @returns {object}
   */
  async handleDeleteJob(id) {
    let $res = await proc(this.jobModel.deleteJobModel(id));
    this.handleListJob();
    return $res;
  }
}
