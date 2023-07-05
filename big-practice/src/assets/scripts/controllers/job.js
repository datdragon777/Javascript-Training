export default class JobContoller {
  constructor(jobView, jobModel) {
    this.jobView = jobView
    this.jobModel = jobModel

    // Form Popup
    this.jobView.openFormPopup()
    this.jobView.closeFormPopup()

    // CRUD 
    this.jobView.addJobView()
  }


}
