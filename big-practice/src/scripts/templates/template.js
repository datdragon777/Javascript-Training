export default class Template {
  constructor() {}


  jobItem(job) {
    const jobDate = moment(job.date).format("DD MMMM");
    return `
      <li class="job__item" data-id="${job.id}">
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
          <a class="card__link">See more</a>
        </div>
      </li>
    `;
  }
}
