export default class JobContoller {
  constructor(jobView, jobModel) {
    this.jobView = jobView;
    this.jobModel = jobModel;

    this.init();
  }

  init() {
    // Form Popup
    this.jobView.openCreateFormPopup();
    this.jobView.closeCreateFormPopup();
    this.jobView.openUpdateFormPopup(this.handleGetJobById.bind(this));

    // CRUD
    this.handleListJob();
    this.jobView.addJobView(this.handleAddJob.bind(this));
    this.jobView.updateJobView(this.handleUpdateJob.bind(this))
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
    return await this.jobModel.updateJobModel(id, data)
  }
}
