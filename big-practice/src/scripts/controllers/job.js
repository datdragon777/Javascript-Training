export default class JobContoller {
  constructor(jobView, jobModel) {
    this.jobView = jobView;
    this.jobModel = jobModel;

    this.init();
  }

  init() {
    // Form Popup
    this.jobView.openFormPopup();
    this.jobView.closeFormPopup();
    this.jobView.openUpdatePopup();

    // CRUD
    this.handleListJob();
    this.jobView.addJobView(this.handleAddJob.bind(this));
  }

  async handleListJob() {
    const jobData = await this.jobModel.getJobsModel();
    this.jobView.listJob(jobData);
  }

  async handleAddJob(data) {
    return await this.jobModel.addJobModel(data);
  }
}
