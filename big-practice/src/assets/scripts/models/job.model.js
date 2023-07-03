export default class Job {
  constructor(logo, title, date, category, location, description) {
    this.logo = logo
    this.title = title
    this.date = date
    this.category = category
    this.location = location
    this.description = description
    this.date = new Date()
  }
}
