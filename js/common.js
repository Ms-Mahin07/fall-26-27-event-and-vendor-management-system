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

function vendorShowError(fieldId, message) 
{
  document.getElementById(fieldId + "Error").innerHTML = message;

  let field = document.getElementById(fieldId);
  if (field != null) {
    field.style.border = "2px solid red";
  }
}

//when something is written in  the input field clears the error....only for one error
function vendorClearError(fieldId) 
{
  document.getElementById(fieldId + "Error").innerHTML = "";

  let field = document.getElementById(fieldId);
  if (field != null) {
    field.style.border = "";   // css black border
  }
}


//clear multiple errors Id's
function vendorClearErrors(fieldIds) 
{
  for (let i = 0; i < fieldIds.length; i++) {
    vendorClearError(fieldIds[i]);
  }
}


//shows the error popup css gives color 
function vendorShowMessage(boxId, text, type) 
{
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
function vendorIsEmpty(value) 
{
  return value.trim() === "";
}


// email vadilation
function vendorIsValidEmail(email) {
  let atPosition = email.indexOf("@");
  let dotPosition = email.indexOf(".", atPosition);

  if (atPosition < 1) 
  {
    return false;                       // @
  }
  if (dotPosition < atPosition + 2) {
    return false;                       // no . after @
  }
  if (dotPosition === email.length - 1) {
    return false;                      // no . last character
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


//search... ignote lower or upper case..  if found show data
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

  // 0 in front of the new id and add the prefix ir T-
  let newNumber = String(biggest + 1);
  while (newNumber.length < digits) {
    newNumber = "0" + newNumber;
  }
  return prefix + "-" + newNumber;
}
