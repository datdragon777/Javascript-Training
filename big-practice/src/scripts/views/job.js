import { qs } from "../helpers/query";
import { validationForm, clearValidationStyles } from "../helpers/validation";

export default class JobView {
  constructor(template) {
    this.template = template;

    // Form
    this.formBg = qs("#form__bg");
    this.formContent = qs("#form__content");
    this.form = qs("#form");
    this.formConfirmDelete = qs("#form-delete__bg");
    this.titleCreateForm = qs("#heading__title--create");
    this.titleUpdateForm = qs("#heading__title--update");

    // Button
    this.btnCreateJob = qs("#create-job__btn");
    this.btnCreateForm = qs("#btn__create");
    this.btnUpdateForm = qs("#btn__update");
    this.btnDeleteForm = qs("#btn__delete");
    this.btnConfirmDelete = qs("#btn__confirm__delete");
    this.btnSearch = qs("#search__btn");
    this.btnFilter = qs("#btn__box");

    // Another
    this.jobUl = qs("#job__list");
    this.statusFormGroup = qs("#form__group--update");
    this.searchField = qs("#search__field");
  }

  /**
   * Listing job item to show on screen
   * @param {object} jobData
   */
  listJob(jobData) {
    const fragment = document.createDocumentFragment();

    const listItem = document.querySelectorAll("#job__list .job__item");
    listItem.forEach((item) => item.remove());

    jobData.forEach((job) => {
      const jobItem = this.template.jobItem(job);
      fragment.appendChild(jobItem);
    });
    this.jobUl.appendChild(fragment);
    console.log(jobData);
  }

  // Open create form popup
  openCreateFormPopup() {
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
        logo: qs("#input__logo").value,
        title: qs("#input__title").value,
        date: new Date(),
        category: qs("#select__menu").value,
        location: qs("#input__location").value,
        description: qs("#input__description").value,
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
      const jobLink = e.target.closest("#card__link");
      const jobItem = e.target.closest(".job__item");

      // console.log(jobItem.getAttribute("data-id"));

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
        for await (const statusItem of statusList) {
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
        id: qs("#input__id").value,
        logo: qs("#input__logo").value,
        title: qs("#input__title").value,
        date: new Date(),
        category: qs("#select__menu").value,
        location: qs("#input__location").value,
        description: qs("#input__description").value,
        status: this.form.querySelector('input[name="status"]:checked').value,
      };

      this.formBg.classList.remove("is-visible");
      const updateJob = await handleUpdateJob(
        jobUpdateValue.id,
        jobUpdateValue
      );
      // Update failure
      if (updateJob == null) {
        // TODO: show message failure
      } else {
        // Load list
        this.listJob(updateJob);
      }
    });
  }

  // Open delete popup
  openDeletePopup() {
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
      const jobId = qs("#input__id").value;
      const deleteJob = await handleDeleteJob(jobId);
      if (deleteJob == null) {
        // TODO: show message failure
      } else {
        this.listJob(deleteJob);
      }
    });
  }

  /**
   * Search job by title
   * @param {Array} jobList
   */
  searchJobView(jobList) {
    this.searchField.addEventListener("input", async (e) => {
      const value = e.target.value.trim();
      var newJobList = [];

      // If no search, return all
      if (value === "" || value == null || value == undefined) {
        return this.listJob(jobList);
      }

      for await (const job of jobList) {
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

      if (
        filterValue === "" ||
        filterValue == null ||
        filterValue == undefined
      ) {
        return this.listJob(jobList);
      }

      for await (const job of jobList) {
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
}
