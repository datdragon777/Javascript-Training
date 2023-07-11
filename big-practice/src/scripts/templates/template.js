export default class Template {
  constructor() {}

  jobItem(job) {
    const jobDate = moment(job.date).format("DD MMMM");
    const li = document.createElement("li");
    li.classList.add("job__item");
    li.setAttribute("data-id", job.id);

    li.innerHTML = `
      <div class="card__header">
        <div class="card__cover">
          <img class="card__logo" src="${job.logo}"/>
        </div>
        <div class="card__date">${jobDate}</div>
      </div>
      <div class="card__body">
        <div class="card__category">${job.category}</div>
        <div class="card__title">${job.title}</div>
        <div class="card__location">${job.location}</div>
        <div class="card__description">${job.description}</div>
      </div>
      <div class="card__footer">
        <a class="card__link" id="card__link" data-id="${job.id}">See more</a>
      </div>
    `;

    return li;
  }

  jobUpdate() {
    const formBgUpdate = document.createElement("div");
    formBgUpdate.classList.add("form__bg", "form__bg--update");
    formBgUpdate.setAttribute("id", "form__bg--update");

    formBgUpdate.innerHTML = `
    <div class="form__content" id="form__content">
      <h2 class="heading__title">Update job</h2>
      <form class="form" id="form">
        <!-- Logo -->
        <div class="form__group">
          <label class="form__name">Logo</label>
          <div class="input__group">
            <input type="text" class="input__place" id="input__logo" placeholder="Enter link logo" />
            <div class="form__error"></div>
          </div>
        </div>
        <!-- Title -->
        <div class="form__group">
          <label class="form__name">Title</label>
          <div class="input__group">
            <input type="text" class="input__place" id="input__title" placeholder="Enter title of job" />
            <div class="form__error"></div>
          </div>
        </div>
        <!-- Location -->
        <div class="form__group">
          <label class="form__name">Location</label>
          <div class="input__group">
            <input type="text" class="input__place" id="input__location" placeholder="Enter location of job" />
            <div class="form__error"></div>
          </div>
        </div>
        <!-- Category -->
        <div class="form__group">
          <label class="form__name">Category</label>
          <div class="input__group">
            <select class="select__menu" id="select__menu">
              <option class="select__value" id="select__value" value="">
                Select your job
              </option>
              <option class="select__value" id="select__value" value="design">
                Design
              </option>
              <option class="select__value" id="select__value" value="marketing">
                Marketing
              </option>
              <option class="select__value" id="select__value" value="developer">
                Developer
              </option>
            </select>
            <div class="form__error"></div>
          </div>
        </div>
        <!-- Description -->
        <div class="form__group">
          <label class="form__name">Description</label>
          <div class="input__group">
            <textarea class="form__description" id="input__description" placeholder="Enter job description" ></textarea>
            <div class="form__error"></div>
          </div>
        </div>
        <!-- Save Button -->
        <div class="form__btn">
          <button type="submit" class="btn btn__create">Save</button>
        </div>
        </form>
      </div>
    `;
    return formBgUpdate;
  }
}
