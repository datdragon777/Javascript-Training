import { validationForm, clearValidationStyles } from "../helpers/validation";
import { addClass, removeClass } from "../helpers/ui-control";
import { v4 as uuidv4 } from "uuid";
export default class JobView {
  constructor(template) {
    this.template = template;

    // Form
    this.formBg = document.getElementById("form-bg");
    this.formContent = document.getElementById("form-content");
    this.form = document.getElementById("form");
    this.formConfirmDelete = document.getElementById("form-delete-bg");
    this.formError = document.getElementById("form-error-bg");
    this.titleCreateForm = document.getElementById("heading-title-create");
    this.titleUpdateForm = document.getElementById("heading-title-update");

    // Button
    this.btnCreateJob = document.getElementById("create-job-btn");
    this.btnCreateForm = document.getElementById("btn-create");
    this.btnUpdateForm = document.getElementById("btn-update");
    this.btnDeleteForm = document.getElementById("btn-delete");
    this.btnConfirmDelete = document.getElementById("btn-confirm-delete");
    this.btnSearch = document.getElementById("search-btn");
    this.btnFilter = document.getElementById("btn-box");

    // Another
    this.jobUl = document.getElementById("job-list");
    this.statusFormGroup = document.getElementById("form-group-update");
    this.searchField = document.getElementById("search-field");
    this.allCount = document.getElementById("all-count");
    this.activeCount = document.getElementById("active-count");
    this.completedCount = document.getElementById("completed-count");
    this.unfinishedCount = document.getElementById("unfinished-count");
  }

  /**
   * Listing job item to show on screen
   * @param {object} jobData
   */
  listJob = (jobData) => {
    const fragment = document.createDocumentFragment();
    const listItem = document.querySelectorAll(".job__item");

    listItem.forEach((item) => item.remove());

    jobData.forEach((job) => {
      const jobItem = this.template.jobItem(job);
      fragment.appendChild(jobItem);
    });
    this.jobUl.appendChild(fragment);
  };

  // Open add form popup
  openAddFormPopup = () => {
    this.btnCreateJob.addEventListener("click", () => {
      this.form.reset();
      clearValidationStyles();
      removeClass(this.titleCreateForm, "is-hidden");
      removeClass(this.titleUpdateForm, "is-show");
      removeClass(this.btnCreateForm, "is-hidden");
      removeClass(this.btnUpdateForm, "is-show");
      removeClass(this.btnDeleteForm, "is-show");
      removeClass(this.statusFormGroup, "is-show");
      addClass(this.formBg, "is-visible");
    });
  };

  // Close form popup
  closeFormPopup = () => {
    document.addEventListener("mousedown", (event) => {
      const targetElement = event.target;
      if (
        targetElement !== this.formContent &&
        !this.formContent.contains(targetElement) &&
        targetElement !== this.btnCreateJob
      ) {
        removeClass(this.formBg, "is-visible")
        removeClass(this.formConfirmDelete, "is-visible")
        removeClass(this.formError, "is-visible")
      }
    });
  };

  /**
   * Check validation and handle job add event
   * @param {function} handleAddJob
   * @returns if invalid, nothing return
   */
  addJobView = (handleAddJob) => {
    this.btnCreateForm.addEventListener("click", (e) => {
      e.preventDefault();
      if (!validationForm()) {
        return;
      }
      const jobValue = {
        id: uuidv4(),
        logo: document.getElementById("input-logo").value,
        title: document.getElementById("input-title").value,
        date: new Date(),
        category: document.getElementById("select-menu").value,
        location: document.getElementById("input-location").value,
        description: document.getElementById("input-description").value,
        status: "active",
      };
      handleAddJob(jobValue);
      removeClass(this.formBg, "is-visible")
    });
  };

  /**
   * Add job item to list
   * @param {object} job
   */
  displayJobItem = (job) => {
    const jobItem = this.template.jobItem(job);
    this.jobUl.appendChild(jobItem);
  };

  /**
   * Open update form popup and fullfill infomations
   * @param {funtion} handleGetJobById
   */
  openUpdateFormPopup = (handleGetJobById) => {
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

        addClass(this.titleCreateForm, "is-hidden")
        addClass(this.titleUpdateForm, "is-show")
        addClass(this.btnCreateForm, "is-hidden")
        addClass(this.btnUpdateForm, "is-show")
        addClass(this.btnDeleteForm, "is-show")
        addClass(this.statusFormGroup, "is-show")
        addClass(this.formBg, "is-visible")
      }
    });
  };

  /**
   * Handle update infomation of job
   * @param {function} handleUpdateJob
   * @param {string} jobUpdateValue.id
   * @param {object} jobUpdateValue
   */
  updateJobView = (handleUpdateJob) => {
    this.btnUpdateForm.addEventListener("click", (e) => {
      e.preventDefault();
      if (!validationForm()) {
        return;
      }

      // Get update value
      const jobUpdateValue = {
        id: document.getElementById("input-id").value,
        logo: document.getElementById("input-logo").value,
        title: document.getElementById("input-title").value,
        date: new Date(),
        category: document.getElementById("select-menu").value,
        location: document.getElementById("input-location").value,
        description: document.getElementById("input-description").value,
        status: this.form.querySelector('input[name="status"]:checked').value,
      };

      const jobItemElement = document.querySelector(
        `[data-id="${jobUpdateValue.id}"]`
      );
      const jobDate = moment(jobUpdateValue.date).format("DD MMMM");

      // Set new value to update job card
      if (jobItemElement) {
        jobItemElement.querySelector(".card__logo").src = jobUpdateValue.logo;
        jobItemElement.querySelector(".card__title").textContent =
          jobUpdateValue.title;
        jobItemElement.querySelector(".card__date").textContent = jobDate;
        jobItemElement.querySelector(".card__location").textContent =
          jobUpdateValue.location;
        jobItemElement.querySelector(".card__category").textContent =
          jobUpdateValue.category;
        jobItemElement.querySelector(".card__description").textContent =
          jobUpdateValue.description;
      }

      removeClass(this.formBg, "is-visible")
      handleUpdateJob(jobUpdateValue.id, jobUpdateValue);
    });
  };

  // Open delete popup
  openDeleteFormPopup = () => {
    this.btnDeleteForm.addEventListener("click", (e) => {
      e.preventDefault();
      removeClass(this.formBg, "is-visible")
      addClass(this.formConfirmDelete, "is-visible")
    });
  };

  /**
   * Delete job base in ID
   * @param {function} handleDeleteJob
   * @param {string} jobId
   */
  deleteJobView = (handleDeleteJob) => {
    this.btnConfirmDelete.addEventListener("click", () => {
      const jobId = document.getElementById("input-id").value;
      const jobItemElement = document.querySelector(`[data-id="${jobId}"]`);
      if (jobItemElement) {
        this.jobUl.removeChild(jobItemElement);
      }
      handleDeleteJob(jobId);
    });
  };

  // Open error popop
  openErrorFormPopup = () => {
    addClass(this.formError, "is-visible")
  };

  /**
   * Search job based on title
   * @param {function} handleSearchJob
   */
  searchJobView = (handleSearchJob) => {
    this.searchField.addEventListener(
      "input",
      this.debounce((e) => {
        const value = e.target.value.trim();
        const searchResult = handleSearchJob(value);
        this.listJob(searchResult);
      }, 400)
    );
  };

  /**
   * Delay search input when typing
   * @param {function} func
   * @param {number} delay
   * @returns {function}
   */
  debounce = (func, delay) => {
    let timerId;
    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  /**
   * Filter job based on status
   * @param {function} handleFilterJob
   */
  filterJobView = (handleFilterJob) => {
    this.btnFilter.addEventListener("click", async (e) => {
      const filterValue = e.target.dataset.filter;
      const filterResult = await handleFilterJob(filterValue);
      this.listJob(filterResult);
    });
  };

  /**
   * Count each status and show beside status button
   * @param {Object} jobCounts
   */
  updateStatusCounts = (jobCounts) => {
    const { active = 0, completed = 0, unfinished = 0, all = 0 } = jobCounts;
    this.activeCount.innerText = String(active).padStart(2, "0");
    this.completedCount.innerText = String(completed).padStart(2, "0");
    this.unfinishedCount.innerText = String(unfinished).padStart(2, "0");
    this.allCount.innerText = String(all).padStart(2, "0");
  };
}
