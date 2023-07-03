const createJobBtn = document.getElementById("create-job__btn");
const listContent = document.getElementById("list__content");
const formContent = document.getElementById("form__content");
const optionMenu = document.querySelector(".select-menu"),
  selectBtn = optionMenu.querySelector(".select-btn"),
  options = optionMenu.querySelectorAll(".option"),
  sBtn_text = optionMenu.querySelector(".sBtn-text");
createJobBtn.addEventListener("click", () => {
  listContent.style.display = "none";
  formContent.style.display = "block";
});

selectBtn.addEventListener("click", () =>
  optionMenu.classList.toggle("active")
);
options.forEach((option) => {
  option.addEventListener("click", () => {
    let selectedOption = option.querySelector(".option-text").innerText;
    sBtn_text.innerText = selectedOption;
    optionMenu.classList.remove("active");
  });
});
