import { validationForm, clearValidationStyles} from "../helpers/validation";


export default class JobView {
  constructor() {
    // Form
    this.createJobBtn = document.getElementById("create-job__btn");
    this.formBg = document.getElementById("form__bg");
    this.formContent = document.getElementById("form__content");
    this.form = document.getElementById("form");
  }

  openFormPopup() {
    this.createJobBtn.addEventListener("click", () => {
      this.form.reset()
      clearValidationStyles()
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
    this.form.addEventListener("submit", (e) => {
      if(!validationForm()) {
        e.preventDefault();
      } else {
        console.log('mlem');
        
      }

    });
  }
}
