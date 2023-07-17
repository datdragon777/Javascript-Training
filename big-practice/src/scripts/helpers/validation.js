import MessageString from "../constants/messegeString";

const formElements = [
  {
    element: document.getElementById("input__logo"),
    paramName: "Logo",
    rule: {
      isRequired: true
    },
  },
  {
    element: document.getElementById("input__title"),
    paramName: "Title",
    rule: {
      isRequired: true,
      maxLength: 100,
    },
  },
  {
    element: document.getElementById("input__location"),
    paramName: "Location",
    rule: {
      isRequired: true,
    },
  },
  {
    element: document.getElementById("select__menu"),
    paramName: "Category",
    rule: {
      isRequired: true,
      mustIn: ["active", "unfinished", "completed"],
    },
  },
  {
    element: document.getElementById("input__description"),
    paramName: "Description",
    rule: {
      isRequired: true,
      maxLength: 500,
    },
  },
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

/**
 * Return true when empty string or array
 * @param {string | array} str
 * @returns if empty, return True.
 */
export const isEmpty = (str) => {
  if (str === "" || str === null || str === undefined || str === [])
    return true;
  return false;
};

/**
 * Check validation form
 */
export const validationForm = () => {
  let isValid = true;

  formElements.forEach(({ element, paramName, rule }) => {
    const value = element.value.trim();

    // check empty
    if (!!rule.isRequired && isEmpty(value)) {
      setError(element, MessageString.MSGE00001(paramName));
      isValid = false;
    } else {
      setSuccess(element);
    }
  });

  return isValid;
};

// Clear all CSS validation
export const clearValidationStyles = () => {
  formElements.forEach(({ element }) => {
    const inputControl = element.parentElement;
    inputControl.classList.remove("form__success", "form__error");
    const errorDisplay = inputControl.querySelector(".form__error");
    errorDisplay.innerText = "";
  });
};
