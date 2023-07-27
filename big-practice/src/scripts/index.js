import JobView from "./views/job";
import JobModel from "./models/job";
import JobController from "./controllers/job";
import Template from "./templates/template";

const template = new Template();
const jobView = new JobView(template);
const jobModel = new JobModel();
const jobController = new JobController(jobView, jobModel);
jobController.init();
