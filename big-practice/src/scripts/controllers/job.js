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

  async handleListJob() {
    const jobData = await this.jobModel.getJobsModel();
    this.jobView.listJob(jobData);
    this.jobView.searchJobView(jobData);
    this.jobView.filterJobView(jobData);
    this.jobView.countStatusView(jobData);
    console.log("list controller", jobData);
  }

  async handleAddJob(data) {
    let $res = await proc(this.jobModel.addJobModel(data));
    this.handleListJob();
    return $res;
  }

  async handleGetJobById(id) {
    return await proc(this.jobModel.getJobByIdModel(id));
  }

  async handleUpdateJob(id, data) {
    let $res = await proc(this.jobModel.updateJobModel(id, data));
    this.handleListJob();
    return $res;
  }

  async handleDeleteJob(id) {
    let $res = await proc(this.jobModel.deleteJobModel(id));
    this.handleListJob();
    return $res;
  }

  // async handleSearchJob() {
  //   const jobData = await this.jobModel.getJobsModel();
  //   return proc(this.jobView.searchJobView(jobData));
  // }

  // async handleFilterJob() {
  //   const jobData = await this.jobModel.getJobsModel();
  //   return proc(this.jobView.filterJobView(jobData));
  // }
}
