const sections = [];
let menuSelections = [];
let editingMenuIndex = -1;

function showSection(sectionId) {
  if (sectionId === "dashboardSection") {
    window.location.href = "client.html";
  } else if (sectionId === "menuSection") {
    window.location.href = "menu-select.html";
  } else if (sectionId === "activitiesSection") {
    window.location.href = "activities.html";
  } else if (sectionId === "transportationSection" || sectionId === "transportatioSection") {
    window.location.href = "transportation.html";
  }
}

function getSelectedMenuFoods() {
  let boxes = document.querySelectorAll("input#food");
  let selected = [];
  for (let i = 0; i < boxes.length; i++) {
    if (boxes[i].checked) {
      selected.push(boxes[i].nextSibling.textContent.trim());
    }
  }
  return selected;
}

function renderMenuSelections() {
  let keyword = document.getElementById("menuSearch").value;
  let categoryFilter = document.getElementById("menuCategoryFilter").value;
  let rows = "";
  let shown = 0;

  for (let i = 0; i < menuSelections.length; i++) {
    let item = menuSelections[i];
    let matches = containsText(item.id, keyword) ||
                  containsText(item.event, keyword) ||
                  containsText(item.foods.join(", "), keyword) ||
                  containsText(item.other, keyword);
    let categoryMatches = categoryFilter === "All" || item.category === categoryFilter;

    if (matches && categoryMatches) {
      rows += "<tr><td>" + item.id + "</td><td>" + item.event + "</td>" +
        "<td>" + item.category + "</td><td>" + item.foods.join(", ") +
        (item.other === "" ? "" : ", " + item.other) + "</td>" +
        "<td>" + item.guests + "</td><td>" + item.notes + "</td><td>" +
        "<button type='button' class='btn btn-small' onclick='editMenuSelection(" + i + ")'>Edit</button> " +
        "<button type='button' class='btn btn-small btn-danger' onclick='deleteMenuSelection(" + i + ")'>Delete</button>" +
        "</td></tr>";
      shown++;
    }
  }

  if (shown === 0) {
    rows = "<tr><td colspan='7' class='empty-row'>No menu selections found.</td></tr>";
  }
  document.getElementById("menuTableBody").innerHTML = rows;
}

function saveMenuSelection() {
  clearError("eventType");
  hideMessage("menuMessage");

  let event = document.getElementById("eventType").value;
  let foods = getSelectedMenuFoods();
  let other = document.getElementById("foodItem").value.trim();
  let guestsText = document.getElementById("foodQuantity").value;
  let guests = Number(guestsText);
  let notes = document.getElementById("foodNotes").value.trim();
  let valid = true;

  if (event === "") {
    showError("eventType", "Please select an event.");
    valid = false;
  }
  if (foods.length === 0 && other === "") {
    showMessage("menuMessage", "Please select at least one food item or enter another item.", "error");
    valid = false;
  }
  if (guestsText === "" || guests < 1) {
    showMessage("menuMessage", "Enter the number of guests.", "error");
    valid = false;
  }
  if (valid === false) { return false; }

  let category = document.getElementById("menuCategoryFilter").value;
  if (category === "All") { category = "Regular Foods"; }

  if (editingMenuIndex === -1) {
    let newItem = {
      id: nextMenuId(), event: event, category: category,
      foods: foods, other: other, guests: guests, notes: notes
    };
    menuSelections.push(newItem);
    showMessage("menuMessage", "Menu selection was added successfully.", "success");
  } else {
    let item = menuSelections[editingMenuIndex];
    item.event = event;
    item.foods = foods;
    item.other = other;
    item.guests = guests;
    item.notes = notes;
    item.category = category;
    showMessage("menuMessage", "Menu selection was updated.", "success");
  }

  resetMenuForm();
  renderMenuSelections();
  return false;
}

function nextMenuId() {
  return "MN-" + String(menuSelections.length + 1).padStart(3, "0");
}

function editMenuSelection(index) {
  let item = menuSelections[index];
  editingMenuIndex = index;
  document.getElementById("eventType").value = item.event;
  let boxes = document.querySelectorAll("input#food");
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].checked = item.foods.indexOf(boxes[i].nextSibling.textContent.trim()) !== -1;
  }
  document.getElementById("foodItem").value = item.other;
  document.getElementById("foodQuantity").value = item.guests;
  document.getElementById("foodNotes").value = item.notes;
  document.getElementById("menuFormTitle").innerHTML = "Edit Menu Selection " + item.id;
  document.getElementById("menuSaveButton").value = "Update Menu";
  hideMessage("menuMessage");
}

function deleteMenuSelection(index) {
  let item = menuSelections[index];
  if (confirm("Delete this menu selection?")) {
    menuSelections = removeAt(menuSelections, index);
    showMessage("menuMessage", "Menu selection " + item.id + " was deleted.", "info");
    resetMenuForm();
    renderMenuSelections();
  }
}

function resetMenuForm() {
  editingMenuIndex = -1;
  document.getElementById("menuForm").reset();
  document.getElementById("menuFormTitle").innerHTML = "Menu Details";
  document.getElementById("menuSaveButton").value = "Add to Menu";
}

renderMenuSelections();
