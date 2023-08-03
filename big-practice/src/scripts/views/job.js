import { getId } from "../helpers/get-id";
import { validationForm, clearValidationStyles } from "../helpers/validation";
import { v4 as uuidv4 } from "uuid";
export default class JobView {
  constructor(template) {
    this.template = template;

    // Form
    this.formBg = getId("form-bg");
    this.formContent = getId("form-content");
    this.form = getId("form");
    this.formConfirmDelete = getId("form-delete-bg");
    this.formError = getId("form-error-bg");
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
    this.allCount = getId("all-count");
    this.activeCount = getId("active-count");
    this.completedCount = getId("completed-count");
    this.unfinishedCount = getId("unfinished-count");
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
      this.titleCreateForm.classList.remove("is-hidden");
      this.titleUpdateForm.classList.remove("is-show");
      this.btnCreateForm.classList.remove("is-hidden");
      this.btnUpdateForm.classList.remove("is-show");
      this.btnDeleteForm.classList.remove("is-show");
      this.statusFormGroup.classList.remove("is-show");
      this.formBg.classList.add("is-visible");
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
        this.formBg.classList.remove("is-visible");
        this.formConfirmDelete.classList.remove("is-visible");
        this.formError.classList.remove("is-visible");
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
        logo: getId("input-logo").value,
        title: getId("input-title").value,
        date: new Date(),
        category: getId("select-menu").value,
        location: getId("input-location").value,
        description: getId("input-description").value,
        status: "active",
      };
      handleAddJob(jobValue);
      this.formBg.classList.remove("is-visible");
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

        this.titleCreateForm.classList.add("is-hidden");
        this.titleUpdateForm.classList.add("is-show");
        this.btnCreateForm.classList.add("is-hidden");
        this.btnUpdateForm.classList.add("is-show");
        this.btnDeleteForm.classList.add("is-show");
        this.statusFormGroup.classList.add("is-show");
        this.formBg.classList.add("is-visible");
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
        id: getId("input-id").value,
        logo: getId("input-logo").value,
        title: getId("input-title").value,
        date: new Date(),
        category: getId("select-menu").value,
        location: getId("input-location").value,
        description: getId("input-description").value,
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

      this.formBg.classList.remove("is-visible");
      handleUpdateJob(jobUpdateValue.id, jobUpdateValue);
    });
  };

  // Open delete popup
  openDeleteFormPopup = () => {
    this.btnDeleteForm.addEventListener("click", (e) => {
      e.preventDefault();
      this.formBg.classList.remove("is-visible");
      this.formConfirmDelete.classList.add("is-visible");
    });
  };

  /**
   * Delete job base in ID
   * @param {function} handleDeleteJob
   * @param {string} jobId
   */
  deleteJobView = (handleDeleteJob) => {
    this.btnConfirmDelete.addEventListener("click", () => {
      const jobId = getId("input-id").value;
      const jobItemElement = document.querySelector(`[data-id="${jobId}"]`);
      if (jobItemElement) {
        this.jobUl.removeChild(jobItemElement);
      }
      handleDeleteJob(jobId);
    });
  };

  // Open error popop
  openErrorFormPopup = () => {
    this.formError.classList.add("is-visible");
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
    const { active = 0, completed = 0, unfinished = 0, all = 0} = jobCounts;
    this.activeCount.innerText = String(active).padStart(2, "0");
    this.completedCount.innerText = String(completed).padStart(2, "0");
    this.unfinishedCount.innerText = String(unfinished).padStart(2, "0");
    this.allCount.innerText = String(all).padStart(2, "0");
  };
}
