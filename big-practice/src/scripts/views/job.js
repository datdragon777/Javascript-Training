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
    this.titleCreateForm = document.getElementById("heading__title--create")
    this.titleUpdateForm = document.getElementById("heading__title--update")
    this.btnCreateForm = document.getElementById("btn__create")
    this.btnUpdateForm = document.getElementById("btn__update")
    this.statusFormGroup = document.getElementById("form__group--update")
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
      this.titleCreateForm.classList.remove("is-hidden")
      this.titleUpdateForm.classList.remove("is-show")
      this.btnCreateForm.classList.remove("is-hidden")
      this.btnUpdateForm.classList.remove("is-show")
      this.statusFormGroup.classList.remove("is-show")
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

  addJobView(handle) {
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
      console.log(jobValue);

      const newJob = await handle(jobValue);
      console.log(newJob);
      this.displayJobItem(newJob);
      this.formBg.classList.remove("is-visible");
    });
  }

  displayJobItem(job) {
    const jobItem = this.template.jobItem(job);
    this.jobUl.appendChild(jobItem);
  }

  openUpdateFormPopup(handle) {
    this.jobUl.addEventListener("click", (e) => {
      const jobLink = e.target.closest("#card__link");
      if (jobLink) {
        clearValidationStyles();
        this.titleCreateForm.classList.add("is-hidden")
        this.titleUpdateForm.classList.add("is-show")
        this.btnCreateForm.classList.add("is-hidden")
        this.btnUpdateForm.classList.add("is-show")
        this.statusFormGroup.classList.add("is-show")
        this.formBg.classList.add("is-visible");
      }
    });
  }



}
