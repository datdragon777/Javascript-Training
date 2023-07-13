import { validationForm, clearValidationStyles } from "../helpers/validation";

export default class JobView {
  constructor(template) {
    this.template = template;

    // Form
    this.createJobBtn = document.getElementById("create-job__btn");
    this.formBg = document.getElementById("form__bg");
    this.formContent = document.getElementById("form__content");
    this.form = document.getElementById("form");
    this.jobUl = document.getElementById("job__list");
    this.titleCreateForm = document.getElementById("heading__title--create");
    this.titleUpdateForm = document.getElementById("heading__title--update");
    this.btnCreateForm = document.getElementById("btn__create");
    this.btnUpdateForm = document.getElementById("btn__update");
    this.statusFormGroup = document.getElementById("form__group--update");
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
    this.createJobBtn.addEventListener("click", () => {
      this.form.reset();
      clearValidationStyles();
      this.titleCreateForm.classList.remove("is-hidden");
      this.titleUpdateForm.classList.remove("is-show");
      this.btnCreateForm.classList.remove("is-hidden");
      this.btnUpdateForm.classList.remove("is-show");
      this.statusFormGroup.classList.remove("is-show");
      this.formBg.classList.add("is-visible");
    });
  }

  closeCreateFormPopup() {
    document.addEventListener("mousedown", (event) => {
      const targetElement = event.target;
      if (
        targetElement !== this.formContent &&
        !this.formContent.contains(targetElement) &&
        targetElement !== this.createJobBtn
      ) {
        this.formBg.classList.remove("is-visible");
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
}
