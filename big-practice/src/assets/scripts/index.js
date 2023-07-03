const createJobBtn = document.getElementById("create-job__btn")
const listContent = document.getElementById("list__content")
const formContent = document.getElementById("form__content")

createJobBtn.addEventListener("click", () => {
  listContent.style.display = "none";
  formContent.style.display = "block";
});
