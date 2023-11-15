function handleFocus() {
  const emailError = document.getElementById("emailError");
  const emailInput = document.getElementById("emailInput");
  emailError.style.display = "none";
  emailInput.classList.remove("error-input")
}

function handleBlur() {
  const emailInput = document.getElementById("email");
  const emailError = document.getElementById("emailError");
  const emailValue = emailInput.value;

  if (emailValue === "") {
    emailInput.classList.add("error-input");
    emailError.textContent = "Email is required";
    emailError.style.display = "block";
  } else if (!isValidEmail(emailValue)) {
    emailError.classList.add("error-input");
    emailError.textContent = "Email is not valid";
    emailError.style.display = "block";
  }
}

function isValidEmail(email) {
  // Validate email using a regular expression
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
