function submitForm(event) {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  event.preventDefault(); // Prevent default page reload
  if (name === "" || email === "" || message === "") {
    console.log("Please enter a name or email or a message");
    return;
  } else {
    const logInfor = { name: name, email: email, message: message };
    console.log(logInfor);
  }
}
