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
    // this.jobView.openUpdateFormPopup(this.handleUpdateJob.bind(this));

    // CRUD
    this.handldeListJob();
    this.jobView.adJobView(this.handleAddJob.bind(this));
  }

  async handleListJob() {
    const jobData = await this.jobModel.getJobsModel();
    this.jobView.listJob(jobData);
  }

  async handleAddJob(data) {
    return await this.jobModel.addJobModel(data);
  }

  // async handleUpdateJob(id) {
  //   return this.jobModel.getJobByIdModel(id)
  // }


}
