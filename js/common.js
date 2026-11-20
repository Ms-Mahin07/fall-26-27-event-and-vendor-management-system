//admin
function saveCurrentUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}












//vendor common
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


//span clas error

function vendorShowError(fieldId, message) {
  document.getElementById(fieldId + "Error").innerHTML = message;




  let field = document.getElementById(fieldId);
  if (field != null) {
    field.style.border = "2px solid red";
  }
}

function vendorClearError(fieldId) {
  document.getElementById(fieldId + "Error").innerHTML = "";

  let field = document.getElementById(fieldId);
  if (field != null) {
    field.style.border = "";   // css black border
  }
}

//all error clear
function vendorClearErrors(fieldIds) {
  for (let i = 0; i < fieldIds.length; i++) {
    vendorClearError(fieldIds[i]);
  }
}



function vendorShowMessage(boxId, text, type) {
  let box = document.getElementById(boxId);
  box.innerHTML = text;
  box.className = "vendor-message vendor-" + type;
  box.style.display = "block";
}

function vendorHideMessage(boxId) {
  document.getElementById(boxId).style.display = "none";
}




//validations


function vendorIsEmpty(value) {
  return value.trim() === "";
}

// email vadilation
function vendorIsValidEmail(email) {
  let atPosition = email.indexOf("@");
  let dotPosition = email.indexOf(".", atPosition);

  if (atPosition < 1) {
    return false;                       // @
  }
  if (dotPosition < atPosition + 2) {
    return false;                       // . after @
  }
  if (dotPosition === email.length - 1) {
    return false;                      // . last character
  }
  return true;
}

// only all digits
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

//search ignote lower or upper case and if found show data
function vendorContainsText(text, keyword) {
  return String(text).toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
}


//array 

// return new arry if item empty and slice remove item
function vendorRemoveAt(list, index) {
  return list.slice(0, index).concat(list.slice(index + 1));
}

//makes new if v101 v102 
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

  // 0 in front until 003 or 005
  let newNumber = String(biggest + 1);
  while (newNumber.length < digits) {
    newNumber = "0" + newNumber;
  }
  return prefix + "-" + newNumber;
}
