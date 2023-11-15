const validateInput = (inputId) => {
  const inputEl = document.getElementById(inputId);
  const inputValue = inputEl.value;

  if (inputValue === "") {
    inputEl.classList.add("error");
    showError(inputEl, "This field is required!");
  } else {
    inputEl.classList.remove("error");
    hideError(inputEl);
  }
};

function showError(inputEl, errorMessage) {
    const errorEl = document.createElement("span");
    errorEl.className = "error-message"
    errorEl.innerHTML = errorMessage;

    const parentEl = inputEl.parentNode;
    parentEl.appendChild(errorEl);
}

function hideError(inputEl) {
    const parentEl = inputEl.parentNode;
    const errorEl = parentEl.querySelector(".error-message")
    if(errorEl) {
        parentEl.removeChild(errorEl)
    }
}