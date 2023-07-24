import { getId } from "../helpers/query";
import { validationForm, clearValidationStyles } from "../helpers/validation";

export default class JobView {
  constructor(template) {
    this.template = template;

    // Form
    this.formBg = getId("form-bg");
    this.formContent = getId("form-content");
    this.form = getId("form");
    this.formConfirmDelete = getId("form-delete-bg");
    this.titleCreateForm = getId("heading-title-create");
    this.titleUpdateForm = getId("heading-title-update");

    // Button
    this.btnCreateJob = getId("create-job-btn");
    this.btnCreateForm = getId("btn-create");
    this.btnUpdateForm = getId("btn-update");
    this.btnDeleteForm = getId("btn-delete");
    this.btnConfirmDelete = getId("btn-confirm-delete");
    this.btnSearch = getId("search-btn");
    this.btnFilter = getId("btn-box");

    // Another
    this.jobUl = getId("job-list");
    this.statusFormGroup = getId("form-group-update");
    this.searchField = getId("search-field");
    this.activeCount = getId("active-count");
    this.completedCount = getId("completed-count");
    this.unfinishedCount = getId("unfinished-count");
  }

  /**
   * Listing job item to show on screen
   * @param {object} jobData
   */
  listJob(jobData) {
    const fragment = document.createDocumentFragment();
    const listItem = document.querySelectorAll(".job__item");
    
    listItem.forEach((item) => item.remove());

    jobData.forEach((job) => {
      const jobItem = this.template.jobItem(job);
      fragment.appendChild(jobItem);
    });
    this.jobUl.appendChild(fragment);
  }

  // Open add form popup
  openAddFormPopup() {
    this.btnCreateJob.addEventListener("click", () => {
      this.form.reset();
      clearValidationStyles();
      this.titleCreateForm.classList.remove("is-hidden");
      this.titleUpdateForm.classList.remove("is-show");
      this.btnCreateForm.classList.remove("is-hidden");
      this.btnUpdateForm.classList.remove("is-show");
      this.btnDeleteForm.classList.remove("is-show");
      this.statusFormGroup.classList.remove("is-show");
      this.formBg.classList.add("is-visible");
    });
  }

  // Close form popup
  closeFormPopup() {
    document.addEventListener("mousedown", (event) => {
      const targetElement = event.target;
      if (
        targetElement !== this.formContent &&
        !this.formContent.contains(targetElement) &&
        targetElement !== this.btnCreateJob
      ) {
        this.formBg.classList.remove("is-visible");
        this.formConfirmDelete.classList.remove("is-visible");
      }
    });
  }

  /**
   * Check validation and handle job add event
   * @param {function} handleAddJob
   * @returns if invalid, nothing return
   */
  addJobView(handleAddJob) {
    this.btnCreateForm.addEventListener("click", async (e) => {
      e.preventDefault();
      if (!validationForm()) {
        return;
      }

      const jobValue = {
        logo: getId("input-logo").value,
        title: getId("input-title").value,
        date: new Date(),
        category: getId("select-menu").value,
        location: getId("input-location").value,
        description: getId("input-description").value,
        status: "active",
      };
      this.formBg.classList.remove("is-visible");
      const newJob = await handleAddJob(jobValue);
      this.displayJobItem(newJob);
    });
  }

  /**
   * Add job item to list
   * @param {object} job
   */
  displayJobItem(job) {
    const jobItem = this.template.jobItem(job);
    this.jobUl.appendChild(jobItem);
  }

  /**
   * Open update form popup and fullfill infomations
   * @param {funtion} handleGetJobById
   */
  openUpdateFormPopup(handleGetJobById) {
    this.jobUl.addEventListener("click", async (e) => {
      const jobLink = e.target.closest("#card-link");
      const jobItem = e.target.closest(".job__item");

      if (jobLink) {
        clearValidationStyles();
        const jobId = jobItem.getAttribute("data-id");
        const response = await handleGetJobById(jobId);

        this.form.querySelector('input[name="id"]').value = jobId;
        this.form.querySelector('input[name="logo-path"]').value =
          response.logo;
        this.form.querySelector('input[name="title"]').value = response.title;
        this.form.querySelector('input[name="location"]').value =
          response.location;
        this.form.querySelector('select[name="category"]').value =
          response.category;
        this.form.querySelector('textarea[name="description"]').value =
          response.description;

        const statusList = this.form.querySelectorAll('input[name="status"]');
        for (const statusItem of statusList) {
          if (statusItem.value === response.status) {
            statusItem.checked = true;
          } else {
            statusItem.checked = false;
          }
        }

        this.titleCreateForm.classList.add("is-hidden");
        this.titleUpdateForm.classList.add("is-show");
        this.btnCreateForm.classList.add("is-hidden");
        this.btnUpdateForm.classList.add("is-show");
        this.btnDeleteForm.classList.add("is-show");
        this.statusFormGroup.classList.add("is-show");
        this.formBg.classList.add("is-visible");
      }
    });
  }

  /**
   * Handle update infomation of job
   * @param {function} handleUpdateJob
   * @param {string} jobUpdateValue.id
   * @param {object} jobUpdateValue
   */
  updateJobView(handleUpdateJob) {
    this.btnUpdateForm.addEventListener("click", async (e) => {
      e.preventDefault();
      if (!validationForm()) {
        return;
      }

      const jobUpdateValue = {
        id: getId("input-id").value,
        logo: getId("input-logo").value,
        title: getId("input-title").value,
        date: new Date(),
        category: getId("select-menu").value,
        location: getId("input-location").value,
        description: getId("input-description").value,
        status: this.form.querySelector('input[name="status"]:checked').value,
      };

      this.formBg.classList.remove("is-visible");
      const updateJob = await handleUpdateJob(
        jobUpdateValue.id,
        jobUpdateValue
      );
      this.listJob(updateJob);
    });
  }

  // Open delete popup
  openDeleteFormPopup() {
    this.btnDeleteForm.addEventListener("click", (e) => {
      e.preventDefault();
      this.formBg.classList.remove("is-visible");
      this.formConfirmDelete.classList.add("is-visible");
    });
  }

  /**
   * Delete job base in ID
   * @param {function} handleDeleteJob
   * @param {string} jobId
   */
  deleteJobView(handleDeleteJob) {
    this.btnConfirmDelete.addEventListener("click", async () => {
      const jobId = getId("input-id").value;
      const deleteJob = await handleDeleteJob(jobId);
      this.listJob(deleteJob);
    });
  }

  /**
   * Search job by title
   * @param {Array} jobList
   */
  searchJobView(jobList) {
    this.searchField.addEventListener("input", (e) => {
      const value = e.target.value.trim();
      var newJobList = [];
      // If no search, return all
      if (!value) {
        return this.listJob(jobList);
      }

      for (const job of jobList) {
        const isVisible = this.compareSearch(job.title, value);
        if (isVisible) {
          newJobList.push(job);
        }
      }

      this.listJob(newJobList);
    });
  }

  /**
   *The filterJobView function is used to filter and display the job list based on a status of job.
   * @param {object} jobList - job list to filter
   */
  filterJobView(jobList) {
    this.btnFilter.addEventListener("click", async (e) => {
      const filterValue = e.target.dataset.filter;
      var newListFilter = [];

      if (!filterValue) {
        return this.listJob(jobList);
      }

      for (const job of jobList) {
        if (filterValue === job.status) {
          newListFilter.push(job);
        }
      }
      this.listJob(newListFilter);
    });
  }

  /**
   * Compare search input value and job title
   * @param {string} inputValue
   * @param {string} jobTitle
   * @returns true/false
   */
  compareSearch(inputValue, jobTitle) {
    return inputValue.toLowerCase().includes(jobTitle.toLowerCase());
  }

  /**
   * Count each status and show beside status button
   * @param {Object} jobList
   */
  countStatusView(jobList) {
    let jobCounts = {
      active: 0,
      completed: 0,
      unfinished: 0,
    };

    jobList.forEach((job) => {
      if (job.status === "active") jobCounts.active++;
      else if (job.status === "completed") jobCounts.completed++;
      else if (job.status === "unfinished") jobCounts.unfinished++;
    });

    this.activeCount.innerText = jobCounts.active.toString().padStart(2, "0");
    this.completedCount.innerText = jobCounts.completed
      .toString()
      .padStart(2, "0");
    this.unfinishedCount.innerText = jobCounts.unfinished
      .toString()
      .padStart(2, "0");
  }
}
