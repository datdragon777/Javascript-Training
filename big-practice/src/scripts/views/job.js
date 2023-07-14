import { validationForm, clearValidationStyles } from "../helpers/validation";

export default class JobView {
  constructor(template) {
    this.template = template;

    // Form
    this.formBg = document.getElementById("form__bg");
    this.formContent = document.getElementById("form__content");
    this.form = document.getElementById("form");
    this.formConfirmDelete = document.getElementById("form-delete__bg");
    this.titleCreateForm = document.getElementById("heading__title--create");
    this.titleUpdateForm = document.getElementById("heading__title--update");

    // Button
    this.btnCreateJob = document.getElementById("create-job__btn");
    this.btnCreateForm = document.getElementById("btn__create");
    this.btnUpdateForm = document.getElementById("btn__update");
    this.btnDeleteForm = document.getElementById("btn__delete");
    this.btnConfirmDelete = document.getElementById("btn__confirm__delete");
    this.btnSearch = document.getElementById("search__btn")

    // Another
    this.jobUl = document.getElementById("job__list");
    this.statusFormGroup = document.getElementById("form__group--update");
    this.searchField = document.getElementById("search__field");
    this.jobId;
  }

  listJob(jobData) {
    const fragment = document.createDocumentFragment();

    jobData.forEach((job) => {
      const jobItem = this.template.jobItem(job);
      fragment.appendChild(jobItem);
    });
    this.jobUl.appendChild(fragment);
  }

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

  addJobView(handleAddJob) {
    this.btnCreateForm.addEventListener("click", async (e) => {
      e.preventDefault();
      if (!validationForm()) {
        return;
      }

      const jobValue = {
        logo: document.getElementById("input__logo").value,
        title: document.getElementById("input__title").value,
        date: new Date(),
        category: document.getElementById("select__menu").value,
        location: document.getElementById("input__location").value,
        description: document.getElementById("input__description").value,
        status: "active",
      };

      const newJob = await handleAddJob(jobValue);
      this.displayJobItem(newJob);
      this.formBg.classList.remove("is-visible");
    });
  }

  displayJobItem(job) {
    const jobItem = this.template.jobItem(job);
    this.jobUl.appendChild(jobItem);
  }

  openUpdateFormPopup(handleGetJobById) {
    this.jobUl.addEventListener("click", async (e) => {
      const jobLink = e.target.closest("#card__link");
      const jobItem = e.target.closest(".job__item");

      if (jobLink) {
        clearValidationStyles();
        this.jobId = jobItem.getAttribute("data-id");
        const response = await handleGetJobById(this.jobId);

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

  updateJobView(handleUpdateJob) {
    this.btnUpdateForm.addEventListener("click", async (e) => {
      e.preventDefault();
      if (!validationForm()) {
        return;
      }

      const jobUpdateValue = {
        logo: document.getElementById("input__logo").value,
        title: document.getElementById("input__title").value,
        date: new Date(),
        category: document.getElementById("select__menu").value,
        location: document.getElementById("input__location").value,
        description: document.getElementById("input__description").value,
        status: this.form.querySelector('input[name="status"]:checked').value,
      };
      const updateJob = await handleUpdateJob(this.jobId, jobUpdateValue);
      console.log(updateJob);
      this.formBg.classList.remove("is-visible");
      location.reload();
    });
  }

  openDeletePopup() {
    this.btnDeleteForm.addEventListener("click", (e) => {
      e.preventDefault();
      this.formBg.classList.remove("is-visible");
      this.formConfirmDelete.classList.add("is-visible");
    });
  }

  deleteJobView(handleDeleteJob) {
    this.btnConfirmDelete.addEventListener("click", () => {
      handleDeleteJob(this.jobId);
      location.reload();
    });
  }

  searchJobView(jobData) {
    console.log(jobData);
    this.searchField.addEventListener("keyup", () => {
      const cards = document.querySelectorAll("#job__item");
      const titles = document.querySelectorAll("#card__title");
      const searchValue = this.searchField.value.toLowerCase()

      titles.forEach((title, index) => {
        if (title.innerText.includes(searchValue)) {
          cards[index].style.display = "block"
        } else {
          cards[index].style.display = "none"
        }
      })
    })
  }
}
