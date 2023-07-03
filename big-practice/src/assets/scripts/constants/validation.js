const form = document.getElementById("form");
const inputLogo = document.getElementById("input__logo");
const inputTitle = document.getElementById("input__title");
const inputLocation = document.getElementById("input__location");
const selectMenu = document.getElementById("select__menu")
const inputDescription = document.getElementById("input__description");

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".form__error");

  errorDisplay.innerText = message;
  inputControl.classList.add("form__error");
  inputControl.classList.remove("form__success");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".form__error");

  errorDisplay.innerText = "";
  inputControl.classList.add("form__success");
  inputControl.classList.remove("form__error");
};

const validation = () => {
  const logoValue = inputLogo.value.trim();
  const titleValue = inputTitle.value.trim();
  const locationValue = inputLocation.value.trim();
  const categoryValue = selectMenu.value
  const descriptionValue = inputDescription.value.trim();

  if (logoValue === "") {
    setError(inputLogo, "Logo image url is required");
  } else {
    setSuccess(inputLogo);
  }

  if (titleValue === "") {
    setError(inputTitle, "Title is required");
  } else {
    setSuccess(inputTitle);
  }

  if (locationValue === "") {
    setError(inputLocation, "Location is required");
  } else {
    setSuccess(inputLocation);
  }

  if (categoryValue === "") {
    setError(selectMenu, "Category is required")
  } else {
    setSuccess(selectMenu)
  }

  if (descriptionValue === "") {
    setError(inputDescription, "Description is required");
  } else {
    setSuccess(inputDescription);
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validation();
});
