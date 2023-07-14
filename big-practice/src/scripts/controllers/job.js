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
    this.jobView.openDeletePopup()

    // CRUD
    this.handleListJob();
    this.jobView.addJobView(this.handleAddJob.bind(this));
    this.jobView.updateJobView(this.handleUpdateJob.bind(this));
    this.jobView.deleteJobView(this.handleDeleteJob.bind(this))

    // Another feature
    // this.jobView.searchJobView()
    this.handleSearchJob()
  }

  async handleListJob() {
    const jobData = await this.jobModel.getJobsModel();
    this.jobView.listJob(jobData);
  }

  async handleAddJob(data) {
    return await this.jobModel.addJobModel(data);
  }

  async handleGetJobById(id) {
    return await this.jobModel.getJobByIdModel(id);
  }

  async handleUpdateJob(id, data) {
    return await this.jobModel.updateJobModel(id, data);
  }
;
  async handleDeleteJob(id) {
    return await this.jobModel.deleteJobModel(id);
  }

  async handleSearchJob() {
    const jobData = await this.jobModel.getJobsModel();
    return this.jobView.searchJobView(jobData)
  }
}
