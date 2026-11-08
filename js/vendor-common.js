/* =====================================================================
   vendor-common.js  -  Helper functions shared by every page
   ---------------------------------------------------------------------
   Loaded after vendor-data.js and before each page's own script:
     <script src="js/vendor-data.js"></script>
     <script src="js/vendor-common.js"></script>
     <script src="js/vendor.js"></script>
   An external .js file contains only JavaScript, no <script> tags.
   ===================================================================== */


/* ---------------------------------------------------------------------
   1. SHOW ONE SECTION AT A TIME
   Each dashboard page declares an array called "sections" with the ids
   of its sections. Clicking a menu button calls vendorShowSection("id").
   We change the CSS with the DOM:  element.style.display = "block"
   --------------------------------------------------------------------- */
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


/* ---------------------------------------------------------------------
   2. SHOWING AND CLEARING ERRORS
   Every field has a <span class="error" id="fieldIdError"></span>
   next to it. We write the message with innerHTML and colour the
   field's border red with element.style (Lab 04, Task 1).
   --------------------------------------------------------------------- */
function vendorShowError(fieldId, message) {
  document.getElementById(fieldId + "Error").innerHTML = message;

  // Radio-button groups have no single element with this id, so check first
  let field = document.getElementById(fieldId);
  if (field != null) {
    field.style.border = "2px solid red";
  }
}

function vendorClearError(fieldId) {
  document.getElementById(fieldId + "Error").innerHTML = "";

  let field = document.getElementById(fieldId);
  if (field != null) {
    field.style.border = "";   // "" gives the border back to the CSS file
  }
}

// Clears the errors of many fields at once; fieldIds is an array
function vendorClearErrors(fieldIds) {
  for (let i = 0; i < fieldIds.length; i++) {
    vendorClearError(fieldIds[i]);
  }
}


/* ---------------------------------------------------------------------
   3. MESSAGE BOXES
   type is "success", "error" or "info" (these are CSS classes)
   --------------------------------------------------------------------- */
function vendorShowMessage(boxId, text, type) {
  let box = document.getElementById(boxId);
  box.innerHTML = text;
  box.className = "vendor-message vendor-" + type;
  box.style.display = "block";
}

function vendorHideMessage(boxId) {
  document.getElementById(boxId).style.display = "none";
}


/* ---------------------------------------------------------------------
   4. SMALL VALIDATION HELPERS
   Each returns true or false, so they can be used inside if ( ... )
   --------------------------------------------------------------------- */

// true when the user typed nothing (or only spaces)
function vendorIsEmpty(value) {
  return value.trim() === "";
}

// A simple e-mail check: something@something.something
function vendorIsValidEmail(email) {
  let atPosition = email.indexOf("@");
  let dotPosition = email.indexOf(".", atPosition);

  if (atPosition < 1) {
    return false;                       // no @, or @ is the first character
  }
  if (dotPosition < atPosition + 2) {
    return false;                       // no dot after the @
  }
  if (dotPosition === email.length - 1) {
    return false;                       // the dot is the last character
  }
  return true;
}

// true when every character of text is a digit 0-9
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

/* ---------------------------------------------------------------------
   5. SEARCH HELPER
   true when "text" contains "keyword", ignoring upper/lower case.
   Uses the string methods toLowerCase() and indexOf() from Lecture 03.
   --------------------------------------------------------------------- */
function vendorContainsText(text, keyword) {
  return String(text).toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
}


/* ---------------------------------------------------------------------
   6. ARRAY HELPERS
   --------------------------------------------------------------------- */

// Returns a NEW array without the element at "index".
// slice() copies part of an array and concat() joins two arrays (Lecture 05).
function vendorRemoveAt(list, index) {
  return list.slice(0, index).concat(list.slice(index + 1));
}

// Makes the next id, e.g. vendorNextId("V", services) gives "V-106"
// and vendorNextId("T", prepTasks) gives "T-003" (same number of digits as the others).
// It looks for the biggest number already used and adds 1.
function vendorNextId(prefix, list) {
  let biggest = 0;
  let digits = 3;
  for (let i = 0; i < list.length; i++) {
    let numberText = list[i].id.slice(prefix.length + 1);   // "V-105" -> "105"
    digits = numberText.length;
    if (Number(numberText) > biggest) {
      biggest = Number(numberText);
    }
  }

  // Add zeros at the front until the number has enough digits: 3 -> "003"
  let newNumber = String(biggest + 1);
  while (newNumber.length < digits) {
    newNumber = "0" + newNumber;
  }
  return prefix + "-" + newNumber;
}
