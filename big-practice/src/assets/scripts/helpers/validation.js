const formElements = [
  { element: document.getElementById("input__logo"), message: "Logo image URL is required" },
  { element: document.getElementById("input__title"), message: "Title is required" },
  { element: document.getElementById("input__location"), message: "Location is required" },
  { element: document.getElementById("select__menu"), message: "Category is required" },
  { element: document.getElementById("input__description"), message: "Description is required" }
];

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
  let isValid = true;

  formElements.forEach(({ element, message }) => {
    const value = element.value.trim();

    if (value === "") {
      setError(element, message);
      isValid = false;
    } else {
      setSuccess(element);
    }
  });

  return isValid;
};

export const clearValidationStyles = () => {
  formElements.forEach(({ element }) => {
    const inputControl = element.parentElement;
    inputControl.classList.remove("form__success", "form__error");
    const errorDisplay = inputControl.querySelector(".form__error");
    errorDisplay.innerText = "";
  });
};
