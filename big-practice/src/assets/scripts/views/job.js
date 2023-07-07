import { validationForm, clearValidationStyles} from "../helpers/validation";


export default class JobView {
  constructor() {
    // Form
    this.createJobBtn = document.getElementById("create-job__btn");
    this.formBg = document.getElementById("form__bg");
    this.formContent = document.getElementById("form__content");
    this.form = document.getElementById("form");
    this.jobUl = document.getElementById("job__list")
  }

  // async listJob(jobData) {
  //   this.jobUl.innerHTML = await jobData
  //     .map((job) => `
  //       <li class="job__item" data-id="${job.id}">
  //         <div class="card__header">
  //           <div class="card__cover">
  //             <img class="card__logo" src="${job.logo}"/>
  //           </div>
  //           <div class="card__date">${job.date}</div>
  //         </div>
  //         <div class="card__body">
  //           <div class="card__category">${job.category}</div>
  //           <div class="card__title">${job.title}</div>
  //           <div class="card__location">${job.location}</div>
  //           <div class="card__description">${job.description}</div>
  //         </div>
  //         <div class="card__footer">
  //           <a class="card__link">See more</a>
  //         </div>
  //       </li>`)
  //     .join("");
  // }

  async listJob(jobData) {
    const fragment = document.createDocumentFragment();

    jobData.forEach((job) => {
      const li = document.createElement("li");
      li.classList.add("job__item");
      li.setAttribute("data-id", job.id);

      const cardHeader = document.createElement("div");
      cardHeader.classList.add("card__header");

      const cardCover = document.createElement("div");
      cardCover.classList.add("card__cover");

      const logoImg = document.createElement("img");
      logoImg.classList.add("card__logo");
      logoImg.setAttribute("src", job.logo);

      const cardDate = document.createElement("div");
      cardDate.classList.add("card__date");
      cardDate.textContent = job.date;

      cardCover.appendChild(logoImg);
      cardHeader.appendChild(cardCover);
      cardHeader.appendChild(cardDate);
      li.appendChild(cardHeader);

      const cardBody = document.createElement("div");
      cardBody.classList.add("card__body");

      const cardCategory = document.createElement("div");
      cardCategory.classList.add("card__category");
      cardCategory.textContent = job.category;

      const cardTitle = document.createElement("div");
      cardTitle.classList.add("card__title");
      cardTitle.textContent = job.title;

      const cardLocation = document.createElement("div");
      cardLocation.classList.add("card__location");
      cardLocation.textContent = job.location;

      const cardDescription = document.createElement("div");
      cardDescription.classList.add("card__description");
      cardDescription.textContent = job.description;

      cardBody.appendChild(cardCategory);
      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardLocation);
      cardBody.appendChild(cardDescription);
      li.appendChild(cardBody);

      const cardFooter = document.createElement("div");
      cardFooter.classList.add("card__footer");

      const cardLink = document.createElement("a");
      cardLink.classList.add("card__link");
      cardLink.textContent = "See more";

      cardFooter.appendChild(cardLink);
      li.appendChild(cardFooter);

      fragment.appendChild(li);
    });

    this.jobUl.appendChild(fragment);
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
