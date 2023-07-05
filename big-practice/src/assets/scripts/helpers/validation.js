export const inputLogo = document.getElementById("input__logo");
export const inputTitle = document.getElementById("input__title");
export const inputLocation = document.getElementById("input__location");
export const selectMenu = document.getElementById("select__menu");
export const inputDescription = document.getElementById("input__description");

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

export const validationForm = () => {
  const logoValue = inputLogo.value.trim();
  const titleValue = inputTitle.value.trim();
  const locationValue = inputLocation.value.trim();
  const categoryValue = selectMenu.value;
  const descriptionValue = inputDescription.value.trim();

  if (logoValue === "") {
    setError(inputLogo, "Logo image url is required");
    isValid = false;
  } else {
    setSuccess(inputLogo);
  }

  if (titleValue === "") {
    setError(inputTitle, "Title is required");
    isValid = false;
  } else {
    setSuccess(inputTitle);
  }

  if (locationValue === "") {
    setError(inputLocation, "Location is required");
    isValid = false;
  } else {
    setSuccess(inputLocation);
  }

  if (categoryValue === "") {
    setError(selectMenu, "Category is required");
    isValid = false;
  } else {
    setSuccess(selectMenu);
  }

  if (descriptionValue === "") {
    setError(inputDescription, "Description is required");
    isValid = false;
  } else {
    setSuccess(inputDescription);
  }
};
