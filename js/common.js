//admin
let currentUser = null;

function saveCurrentUser(user) {
  currentUser = user;
}

function getCurrentUser() {
  return currentUser;
}

function logout() {
  currentUser = null;
  window.location.href = "login.html";
}

function showSection(sectionId) {
  for (let i = 0; i < sections.length; i++) {
    let section = document.getElementById(sections[i]);
    let navButton = document.getElementById("nav-" + sections[i]);

    if (section != null) {
      section.style.display = sections[i] === sectionId ? "block" : "none";
    }

    if (navButton != null) {
      navButton.className = sections[i] === sectionId ? "active" : "";
    }
  }
}

//vendor part
//left navigation button click and find by id , show it and change make button blue
function vendorShowSection(sectionId) {
  for (let i = 0; i < vendorSections.length; i++) {
    let section = document.getElementById(vendorSections[i]);
    let navButton = document.getElementById("nav-" + vendorSections[i]);

    if (vendorSections[i] === sectionId) {
      section.style.display = "block";
      navButton.className = "vendor-active";
    } else {
      section.style.display = "none";
      navButton.className = "";
    }
  }
}

//red error button with border for any error if nothing is written in the input field like : Write the vendor name

function vendorShowError(fieldId, message) {
  document.getElementById(fieldId + "Error").innerHTML = message;

  let field = document.getElementById(fieldId);
  if (field != null) {
    field.style.border = "2px solid red";
  }
}

//when something is written in  the input field clears the error....only for one error
function vendorClearError(fieldId) {
  document.getElementById(fieldId + "Error").innerHTML = "";

  let field = document.getElementById(fieldId);
  if (field != null) {
    field.style.border = ""; // css black border
  }
}

//clear multiple errors Id's
function vendorClearErrors(fieldIds) {
  for (let i = 0; i < fieldIds.length; i++) {
    vendorClearError(fieldIds[i]);
  }
}

//shows the error popup css gives color
function vendorShowMessage(boxId, text, type) {
  let box = document.getElementById(boxId);
  box.innerHTML = text;
  box.className = "vendor-message vendor-" + type;
  box.style.display = "block";
}

//or the success when no error thus hides it
function vendorHideMessage(boxId) {
  document.getElementById(boxId).style.display = "none";
}

//validations

//if nothing or only space is typed in the input field trims it and compare with empty string
function vendorIsEmpty(value) {
  return value.trim() === "";
}

// email vadilation
function vendorIsValidEmail(email) {
  let atPosition = email.indexOf("@");
  let dotPosition = email.indexOf(".", atPosition);

  if (atPosition < 1) {
    return false; // @
  }
  if (dotPosition < atPosition + 2) {
    return false; // no . after @
  }
  if (dotPosition === email.length - 1) {
    return false; // no . last character
  }
  return true;
}

// only all digits 0-9 allowed
function vendorIsDigitsOnly(text) {
  if (text.length === 0) {
    return false;
  }
  let digits = "0123456789";
  for (let i = 0; i < text.length; i++) {
    if (digits.indexOf(text[i]) === -1) {
      return false;
    }
  }
  return true;
}

function vendorContainsText(text, keyword) {
  return String(text).toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
}

//array

// return new arry if item empty and slice remove item
function vendorRemoveAt(list, index) {
  return list.slice(0, index).concat(list.slice(index + 1));
}

//search shrough th existing ids..remove the letters is V- and search the highest number...then adds +1 to it to create new id
function vendorNextId(prefix, list) {
  let biggest = 0;
  let digits = 3;
  for (let i = 0; i < list.length; i++) {
    let numberText = list[i].id.slice(prefix.length + 1);
    digits = numberText.length;
    if (Number(numberText) > biggest) {
      biggest = Number(numberText);
    }
  }

  let newNumber = String(biggest + 1);
  while (newNumber.length < digits) {
    newNumber = "0" + newNumber;
  }
  return prefix + "-" + newNumber;
}

function containsText(value, keyword) {
  return (
    String(value || "")
      .toLowerCase()
      .indexOf(String(keyword || "").toLowerCase()) !== -1
  );
}

function removeAt(array, index) {
  return array.slice(0, index).concat(array.slice(index + 1));
}

// Client form error helpers.
function showError(fieldId, message) {
  let errorBox = document.getElementById(fieldId + "Error");
  if (errorBox !== null) {
    errorBox.innerHTML = message;
  }

  let field = document.getElementById(fieldId);
  if (field !== null) {
    field.style.border = "2px solid red";
  }
}

function clearError(fieldId) {
  let errorBox = document.getElementById(fieldId + "Error");
  if (errorBox !== null) {
    errorBox.innerHTML = "";
  }

  let field = document.getElementById(fieldId);
  if (field !== null) {
    field.style.border = "";
  }
}

function clearErrors(fieldIds) {
  for (let i = 0; i < fieldIds.length; i++) {
    clearError(fieldIds[i]);
  }
}

// Client success/error message helpers.
function showMessage(boxId, message, type) {
  let box = document.getElementById(boxId);
  if (box !== null) {
    box.innerHTML = message;
    box.className = "message " + (type || "");
    box.style.display = "block";
  }
}

function hideMessage(boxId) {
  let box = document.getElementById(boxId);
  if (box !== null) {
    box.innerHTML = "";
    box.className = "message";
    box.style.display = "none";
  }
}

// Read checked checkbox values, following the same pattern as vendorGetCheckedValues().
function getCheckedValues(groupName) {
  let boxes = document.getElementsByName(groupName);
  let selected = [];

  for (let i = 0; i < boxes.length; i++) {
    if (boxes[i].checked) {
      selected.push(boxes[i].value);
    }
  }
  return selected;
}

function todayString() {
  let date = new Date();
  let month = String(date.getMonth() + 1).padStart(2, "0");
  let day = String(date.getDate()).padStart(2, "0");
  return date.getFullYear() + "-" + month + "-" + day;
}

function daysBetween(first, second) {
  return Math.round(
    (new Date(second + "T00:00:00") - new Date(first + "T00:00:00")) / 86400000,
  );
}

function isValidEmail(email) {
  let atPosition = email.indexOf("@");
  let dotPosition = email.indexOf(".", atPosition);

  if (atPosition < 1) {
    return false;
  }
  if (dotPosition < atPosition + 2) {
    return false;
  }
  if (dotPosition === email.length - 1) {
    return false;
  }
  return true;
}

function isDigitsOnly(value) {
  if (value.length === 0) {
    return false;
  }

  let digits = "0123456789";
  for (let i = 0; i < value.length; i++) {
    if (digits.indexOf(value[i]) === -1) {
      return false;
    }
  }
  return true;
}

// Convert all client selections into one array of uniform objects.
// The dashboard displays this combined array below its summary cards.
function refreshClientSelections() {
  clientSelections = [];

  // Menu selections
  for (let i = 0; i < menuSelections.length; i++) {
    let item = menuSelections[i];
    let foods = item.foods ? item.foods.slice() : [];

    if (item.other !== undefined && item.other !== "") {
      foods.push(item.other);
    }

    clientSelections.push({
      id: item.id,
      type: "Menu",
      event: item.event || "",
      selected: foods.join(", "),
      categoryDate: item.category || "Regular Foods",
      quantity: item.guests || "",
      details: item.notes || "",
    });
  }

  // Transportation bookings
  for (let i = 0; i < transportBookings.length; i++) {
    let item = transportBookings[i];

    clientSelections.push({
      id: item.id,
      type: "Transportation",
      event: item.event || "",
      selected: item.vehicles ? item.vehicles.join(", ") : "",
      categoryDate: item.date || "",
      quantity: item.quantity || "",
      details:
        (item.pickup || "") +
        " -- " +
        (item.drop || "") +
        (item.note ? " | " + item.note : ""),
    });
  }

  // Activity selections
  for (let i = 0; i < activitySelections.length; i++) {
    let item = activitySelections[i];

    clientSelections.push({
      id: item.id,
      type: "Activity",
      event: item.event || "",
      selected: item.services ? item.services.join(", ") : "",
      categoryDate: item.date || "",
      quantity: item.quantity || "",
      details: (item.option || "") + (item.note ? " | " + item.note : ""),
    });
  }

  return clientSelections;
}
