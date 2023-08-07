import { showMessageString } from "./message";
import { addClass, removeClass } from "./ui-control";

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
  addClass(inputControl, "form__error");
  removeClass(inputControl, "form__success");
};

/**
 * Set success when user submits right
 * @param {DOM} element - Call document object model
 */
const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".form__error");

  errorDisplay.innerText = "";
  addClass(inputControl, "form__success");
  removeClass(inputControl, "form__error");
};

/**
 * Return true when empty string or array
 * @param {string | array} str
 * @returns if empty, return True.
 */
export const isEmpty = (str) => {
  if (!str) return true;
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
      setError(element, showMessageString(paramName));
      isValid = false;
    } else {
      // Additional check for logo link validation
      if (paramName === "Logo") {
        if (!isValidLogoLink(value)) {
          setError(element, "Invalid logo image link.");
          isValid = false;
        } else {
          setSuccess(element);
        }
      } else {
        setSuccess(element);
      }
    }
  });

  return isValid;
};

/**
 * Function to check if a given URL is a valid image link
 * @param {string} url - The URL to check
 * @returns {boolean} - True if the URL is a valid image link, otherwise false
 */
const isValidLogoLink = (url) => {
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg"];
  const lowerCaseUrl = url.toLowerCase();
  return imageExtensions.some((ext) => lowerCaseUrl.endsWith(ext));
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
