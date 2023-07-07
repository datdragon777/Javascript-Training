import JobView from "./views/job";
import JobModel from "./models/job";
import JobController from "./controllers/job"

const jobView = new JobView
const jobModel = new JobModel
const jobController = new JobController(jobView, jobModel)

jobController.handleListJob();
