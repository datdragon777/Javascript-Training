import { validationForm, clearValidationStyles } from "../helpers/validation";

export default class JobView {
  constructor(template) {
    this.template = template

    // Form
    this.createJobBtn = document.getElementById("create-job__btn");
    this.formBg = document.getElementById("form__bg");
    this.formContent = document.getElementById("form__content");
    this.form = document.getElementById("form");
    this.jobUl = document.getElementById("job__list");
  }

  async listJob(jobData) {
    const fragment = document.createDocumentFragment();

    jobData.forEach((job) => {
      const li = document.createElement("li");

      li.innerHTML = this.template.jobItem(job)

      fragment.appendChild(li);
    });

    this.jobUl.appendChild(fragment);
  }

  openFormPopup() {
    this.createJobBtn.addEventListener("click", () => {
      this.form.reset();
      clearValidationStyles();
      this.formBg.classList.add("is-visible");
    });
  }

  closeFormPopup() {
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
    this.form.addEventListener("submit", async (e) => {
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

      try {
        const newJob = await handle(jobValue);
        console.log(newJob);
        this.displayJob(newJob);
        this.formBg.classList.remove("is-visible");
      } catch (err) {
        return err;
      }
    });
  }

  displayJob(job) {
    const jobItem = document.createElement("li");
    jobItem.innerHTML = this.template.jobItem(job)

    this.jobUl.appendChild(jobItem);
  }
}
