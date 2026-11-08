/* =====================================================================
   vendor-register.js  -  Registration form for Vendors
   ---------------------------------------------------------------------
   1. vendorValidateRegister() checks the common fields, then the fields that
      only a vendor has (business details).
   2. If everything is valid, a new user object is push()ed into the
      users array.
   3. The register button stays disabled until the terms box is ticked
      (vendorToggleRegisterButton).
   ===================================================================== */

// Fields shared by every type of user
const vendorCommonFields = ["vendorFullName", "vendorEmail", "vendorPhone", "vendorNewUsername", "vendorNewPassword", "vendorConfirmPassword"];

// Fields that belong to a vendor only
const vendorBusinessFields = ["vendorBusinessName", "vendorCategory", "vendorAddress"];


/* ---------------------------------------------------------------------
   VALIDATION
   --------------------------------------------------------------------- */
function vendorValidateRegister() {
  vendorClearAllRegisterErrors();

  // Run the common checks and the checks for a vendor
  let commonOk = vendorValidateCommon();
  let vendorOk = vendorValidateBusiness();

  if (!(commonOk && vendorOk)) {
    vendorShowMessage("vendorRegisterMessage", "Please fix the fields marked in red.", "error");
    return false;
  }

  // ----- Everything is valid: build the new user object -----
  let newUser = {
    id: vendorNextId("U", vendorUsers),
    name: document.getElementById("vendorFullName").value.trim(),
    username: document.getElementById("vendorNewUsername").value.trim(),
    password: document.getElementById("vendorNewPassword").value,
    email: document.getElementById("vendorEmail").value.trim(),
    phone: document.getElementById("vendorPhone").value.trim(),
    role: "Vendor",
    status: "Active"
  };

  // Add the properties that only a vendor has
  newUser.businessName = document.getElementById("vendorBusinessName").value.trim();
  newUser.category = document.getElementById("vendorCategory").value;
  newUser.address = document.getElementById("vendorAddress").value.trim();
  newUser.description = document.getElementById("vendorDescription").value.trim();

  vendorUsers.push(newUser);
  console.log("New user:", newUser);

  let text = "Welcome, <strong>" + newUser.name + "</strong>! Your vendor account for <strong>" +
             newUser.businessName + "</strong> was created (user id " + newUser.id + "). " +
             "<a href='login.html'>Log in now</a> or <a href='vendor.html'>open the vendor dashboard</a>." +
             "<br><span class='vendor-hint'>Frontend version: the account is kept until this page reloads. " +
             "The PHP backend will save it permanently.</span>";
  vendorShowMessage("vendorRegisterMessage", text, "success");

  // Empty the form
  document.getElementById("vendorRegisterForm").reset();
  vendorResetRegisterForm();
  return false;   // stay on this page so the message can be read
}


// Checks shared by every type of user
function vendorValidateCommon() {
  let isValid = true;

  let fullName = document.getElementById("vendorFullName").value.trim();
  let email = document.getElementById("vendorEmail").value.trim();
  let phone = document.getElementById("vendorPhone").value.trim();
  let username = document.getElementById("vendorNewUsername").value.trim();
  let password = document.getElementById("vendorNewPassword").value;
  let confirmPassword = document.getElementById("vendorConfirmPassword").value;

  if (fullName.length < 3) {
    vendorShowError("vendorFullName", "Full name must be at least 3 characters.");
    isValid = false;
  }

  if (vendorIsEmpty(email)) {
    vendorShowError("vendorEmail", "Email is required.");
    isValid = false;
  } else if (vendorIsValidEmail(email) === false) {
    vendorShowError("vendorEmail", "Please enter a valid email address.");
    isValid = false;
  } else if (vendorIsTaken("email", email)) {
    vendorShowError("vendorEmail", "An account with this email already exists.");
    isValid = false;
  }

  if (vendorIsDigitsOnly(phone) === false || phone.length !== 11 || phone.slice(0, 2) !== "01") {
    vendorShowError("vendorPhone", "Phone must be 11 digits and start with 01.");
    isValid = false;
  }

  if (username.length < 4) {
    vendorShowError("vendorNewUsername", "Username must be at least 4 characters.");
    isValid = false;
  } else if (username.indexOf(" ") !== -1) {
    vendorShowError("vendorNewUsername", "Username cannot contain spaces.");
    isValid = false;
  } else if (vendorIsTaken("username", username)) {
    vendorShowError("vendorNewUsername", "This username is already taken.");
    isValid = false;
  }

  if (password.length < 8) {
    vendorShowError("vendorNewPassword", "Password must be at least 8 characters.");
    isValid = false;
  } else if (vendorHasDigit(password) === false) {
    vendorShowError("vendorNewPassword", "Password must contain at least one digit.");
    isValid = false;
  }

  if (confirmPassword === "" || confirmPassword !== password) {
    vendorShowError("vendorConfirmPassword", "Password and Confirm Password must match.");
    isValid = false;
  }

  return isValid;
}


function vendorValidateBusiness() {
  let isValid = true;
  let businessName = document.getElementById("vendorBusinessName").value.trim();
  let address = document.getElementById("vendorAddress").value.trim();

  if (businessName.length < 3) {
    vendorShowError("vendorBusinessName", "Business name must be at least 3 characters.");
    isValid = false;
  }

  if (document.getElementById("vendorCategory").value === "") {
    vendorShowError("vendorCategory", "Please select your business category.");
    isValid = false;
  }

  if (address.length < 10) {
    vendorShowError("vendorAddress", "Please write your full address (at least 10 characters).");
    isValid = false;
  } else if (address.length > 200) {
    vendorShowError("vendorAddress", "Address must be 200 characters or less.");
    isValid = false;
  }

  return isValid;
}


/* ---------------------------------------------------------------------
   SMALL HELPERS
   --------------------------------------------------------------------- */

// true if any user already has this value in this property, e.g. vendorIsTaken("email", "a@b.com")
// Bracket notation user[property] reads a property whose name is in a variable.
function vendorIsTaken(property, value) {
  for (const user of vendorUsers) {
    if (user[property] !== undefined && String(user[property]).toLowerCase() === value.toLowerCase()) {
      return true;
    }
  }
  return false;
}

function vendorHasDigit(text) {
  let digits = "0123456789";
  for (let i = 0; i < text.length; i++) {
    if (digits.indexOf(text[i]) !== -1) {
      return true;
    }
  }
  return false;
}

// DHTML: the button is enabled only when the terms box is ticked
function vendorToggleRegisterButton() {
  document.getElementById("vendorRegisterButton").disabled = !document.getElementById("vendorTerms").checked;
}

function vendorClearAllRegisterErrors() {
  vendorClearErrors(vendorCommonFields);
  vendorClearErrors(vendorBusinessFields);
}

// Back to the start: clear the errors and disable the button again
function vendorResetRegisterForm() {
  vendorClearAllRegisterErrors();
  document.getElementById("vendorRegisterButton").disabled = true;
}
