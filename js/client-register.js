
const clientRegisterFields = [
  "fullName", "email", "phone", "gender", "dob",
  "address", "newUsername", "newPassword", "confirmPassword"
];

function validateRegister() {
  clearErrors(clientRegisterFields);
  hideMessage("registerMessage");

  let name = document.getElementById("fullName").value.trim();
  let email = document.getElementById("email").value.trim();
  let phone = document.getElementById("phone").value.trim();
  let dob = document.getElementById("dob").value;
  let address = document.getElementById("address").value.trim();
  let username = document.getElementById("newUsername").value.trim();
  let password = document.getElementById("newPassword").value;
  let confirmPassword = document.getElementById("confirmPassword").value;
  let gender = getRadioValue("gender");
  let valid = true;

  if (name.length < 3) {
    showError("fullName", "Name must contain at least 3 characters.");
    valid = false;
  }

  if (email === "" || isValidEmail(email) === false) {
    showError("email", "Enter a valid email address.");
    valid = false;
  } else if (isClientValueTaken("email", email)) {
    showError("email", "This email is already registered.");
    valid = false;
  }

  if (isDigitsOnly(phone) === false || phone.length !== 11 || phone.slice(0, 2) !== "01") {
    showError("phone", "Phone number must contain 11 digits and start with 01.");
    valid = false;
  }

  if (gender === "") {
    showError("gender", "Please select your gender.");
    valid = false;
  }

  if (dob === "") {
    showError("dob", "Please select your date of birth.");
    valid = false;
  } else if (daysBetween(dob, todayString()) < 18 * 365) {
    showError("dob", "Client must be at least 18 years old.");
    valid = false;
  }

  if (address.length < 5) {
    showError("address", "Please enter your full address.");
    valid = false;
  }

  if (username.length < 4 || username.indexOf(" ") !== -1) {
    showError("newUsername", "Username must be at least 4 characters and contain no spaces.");
    valid = false;
  } else if (isClientValueTaken("username", username)) {
    showError("newUsername", "This username is already taken.");
    valid = false;
  }

  if (password.length < 8 || hasClientDigit(password) === false) {
    showError("newPassword", "Password must be at least 8 characters and contain a digit.");
    valid = false;
  }

  if (confirmPassword === "" || confirmPassword !== password) {
    showError("confirmPassword", "Passwords do not match.");
    valid = false;
  }

  if (document.getElementById("terms").checked === false) {
    showMessage("registerMessage", "Please agree to the terms and conditions.", "error");
    valid = false;
  }

  if (valid === false) {
    showMessage("registerMessage", "Please correct the fields marked above.", "error");
    return false;
  }

  let newClient = {
    id: nextId("U", users),
    name: name,
    username: username,
    password: password,
    email: email,
    phone: phone,
    gender: gender,
    dob: dob,
    address: address,
    role: "Client",
    status: "Active"
  };

  users.push(newClient);
  saveEVMSData(EVMS_KEYS.users, users);

  showMessage(
    "registerMessage",
    "Welcome, <strong>" + newClient.name + "</strong>! Your client account was created successfully. " +
    "<a href='login.html'>Login here</a>.",
    "success"
  );

  document.getElementById("registerForm").reset();
  resetRegisterForm();
  return false;
}

function isClientValueTaken(property, value) {
  for (let i = 0; i < users.length; i++) {
    if (users[i][property] !== undefined &&
        String(users[i][property]).toLowerCase() === value.toLowerCase()) {
      return true;
    }
  }
  return false;
}

function hasClientDigit(text) {
  let digits = "0123456789";
  for (let i = 0; i < text.length; i++) {
    if (digits.indexOf(text[i]) !== -1) {
      return true;
    }
  }
  return false;
}

function showPasswordStrength() {
  let password = document.getElementById("newPassword").value;
  let strength = document.getElementById("strengthText");
  let score = 0;

  if (password.length >= 8) { score++; }
  if (password.length >= 12) { score++; }
  if (hasClientDigit(password)) { score++; }
  if (password.toLowerCase() !== password) { score++; }

  if (password === "") {
    strength.innerHTML = "";
  } else if (score <= 1) {
    strength.innerHTML = "Strength: Weak";
    strength.style.color = "#C62828";
  } else if (score <= 2) {
    strength.innerHTML = "Strength: Fair";
    strength.style.color = "#EF6C00";
  } else {
    strength.innerHTML = "Strength: Strong";
    strength.style.color = "#2E7D32";
  }
}

function toggleRegisterButton() {
  document.getElementById("registerButton").disabled =
    !document.getElementById("terms").checked;
}

function resetRegisterForm() {
  clearErrors(clientRegisterFields);
  document.getElementById("strengthText").innerHTML = "";
  document.getElementById("registerButton").disabled = true;
}
