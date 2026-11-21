const sections = [];
let activitySelections = [];
let editingActivityIndex = -1;

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

function getSelectedActivities() {
  let boxes = document.querySelectorAll("input#activities");
  let selected = [];
  for (let i = 0; i < boxes.length; i++) {
    if (boxes[i].checked) {
      selected.push(boxes[i].nextSibling.textContent.trim());
    }
  }
  return selected;
}

function renderActivities() {
  let keyword = document.getElementById("activitySearch").value;
  let filter = document.getElementById("activityFilter").value;
  let rows = "";
  let shown = 0;

  for (let i = 0; i < activitySelections.length; i++) {
    let activity = activitySelections[i];
    let matches = containsText(activity.id, keyword) ||
                  containsText(activity.event, keyword) ||
                  containsText(activity.services.join(", "), keyword) ||
                  containsText(activity.option, keyword);
    let filterMatches = filter === "All" || activity.services.indexOf(filter) !== -1;

    if (matches && filterMatches) {
      rows += "<tr><td>" + activity.id + "</td><td>" + activity.event + "</td>" +
        "<td>" + activity.services.join(", ") + "</td><td>" + activity.option + "</td>" +
        "<td>" + activity.date + "</td><td>" + activity.quantity + "</td><td>" +
        "<button type='button' class='btn btn-small' onclick='editActivity(" + i + ")'>Edit</button> " +
        "<button type='button' class='btn btn-small btn-danger' onclick='deleteActivity(" + i + ")'>Delete</button>" +
        "</td></tr>";
      shown++;
    }
  }

  if (shown === 0) {
    rows = "<tr><td colspan='7' class='empty-row'>No activity selections found.</td></tr>";
  }
  document.getElementById("activityTableBody").innerHTML = rows;
}

function saveActivity() {
  clearError("eventType");
  hideMessage("activityMessage");

  let event = document.getElementById("eventType").value;
  let services = getSelectedActivities();
  let option = document.getElementById("activityOption").value.trim();
  let date = document.getElementById("activityDate").value;
  let quantity = document.getElementById("activityQuantity").value.trim();
  let note = document.getElementById("activityNote").value.trim();
  let valid = true;

  if (event === "") {
    showError("eventType", "Please select an event.");
    valid = false;
  }
  if (services.length === 0) {
    showMessage("activityMessage", "Please select at least one activity or service.", "error");
    valid = false;
  }
  if (date === "" || daysBetween(todayString(), date) < 0) {
    showMessage("activityMessage", "Choose a valid required date (today or later).", "error");
    valid = false;
  }
  if (quantity === "") {
    showMessage("activityMessage", "Enter the quantity or duration.", "error");
    valid = false;
  }
  if (valid === false) { return false; }

  if (editingActivityIndex === -1) {
    activitySelections.push({
      id: nextActivityId(), event: event, services: services,
      option: option, date: date, quantity: quantity, note: note
    });
    showMessage("activityMessage", "Activity selection was added successfully.", "success");
  } else {
    let activity = activitySelections[editingActivityIndex];
    activity.event = event;
    activity.services = services;
    activity.option = option;
    activity.date = date;
    activity.quantity = quantity;
    activity.note = note;
    showMessage("activityMessage", "Activity selection was updated.", "success");
  }

  resetActivityForm();
  renderActivities();
  return false;
}

function nextActivityId() {
  return "AC-" + String(activitySelections.length + 1).padStart(3, "0");
}

function editActivity(index) {
  let activity = activitySelections[index];
  editingActivityIndex = index;
  document.getElementById("eventType").value = activity.event;

  let boxes = document.querySelectorAll("input#activities");
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].checked = activity.services.indexOf(boxes[i].nextSibling.textContent.trim()) !== -1;
  }

  document.getElementById("activityOption").value = activity.option;
  document.getElementById("activityDate").value = activity.date;
  document.getElementById("activityQuantity").value = activity.quantity;
  document.getElementById("activityNote").value = activity.note;
  document.getElementById("activityFormTitle").innerHTML = "Edit Activity " + activity.id;
  document.getElementById("activitySaveButton").value = "Update Selection";
  hideMessage("activityMessage");
}

function deleteActivity(index) {
  let activity = activitySelections[index];
  if (confirm("Delete this activity selection?")) {
    activitySelections = removeAt(activitySelections, index);
    showMessage("activityMessage", "Activity selection " + activity.id + " was deleted.", "info");
    resetActivityForm();
    renderActivities();
  }
}

function resetActivityForm() {
  editingActivityIndex = -1;
  document.getElementById("activityForm").reset();
  document.getElementById("activityFormTitle").innerHTML = "Activity Details";
  document.getElementById("activitySaveButton").value = "Add Selection";
}

renderActivities();
