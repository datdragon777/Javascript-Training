import showMessageString from "../helpers/messegeString";

const formElements = [
  {
    element: document.getElementById("input-logo"),
    paramName: "Logo",
    rule: {
      isRequired: true,
    },
  },
  {
    element: document.getElementById("input-title"),
    paramName: "Title",
    rule: {
      isRequired: true,
      maxLength: 100,
    },
  },
  {
    element: document.getElementById("input-location"),
    paramName: "Location",
    rule: {
      isRequired: true,
    },
  },
  {
    element: document.getElementById("select-menu"),
    paramName: "Category",
    rule: {
      isRequired: true,
      mustIn: ["active", "unfinished", "completed"],
    },
  },
  {
    element: document.getElementById("input-description"),
    paramName: "Description",
    rule: {
      isRequired: true,
      maxLength: 500,
    },
  },
];

/**
 * Set error when users submits wrong
 * @param {DOM} element - Call document object model
 * @param {string} message - Message invalid input
 */
const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".form__error");

  errorDisplay.innerText = message;
  inputControl.classList.add("form__error");
  inputControl.classList.remove("form__success");
};

/**
 * Set success when user submits right
 * @param {DOM} element - Call document object model
 */
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
  if (!str)
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
      setError(element, showMessageString.MSGE00001(paramName));
      isValid = false;
    } else {
      setSuccess(element);
    }
  });

  return isValid;
};

/**
 * Clear all CSS validation
 */
export const clearValidationStyles = () => {
  formElements.forEach(({ element }) => {
    const inputControl = element.parentElement;
    inputControl.classList.remove("form__success", "form__error");
    const errorDisplay = inputControl.querySelector(".form__error");
    errorDisplay.innerText = "";
  });
};
