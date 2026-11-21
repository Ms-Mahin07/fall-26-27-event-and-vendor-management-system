const sections = ["dashboardSection", "eventsSection"];
let customerEvents = [];
let editingEventIndex = -1;

const eventFields = ["eventName", "eventType", "eventDate", "eventLocation"];

function renderCustomerEvents() {
  let keyword = document.getElementById("eventSearch").value;
  let typeFilter = document.getElementById("eventTypeFilter").value;
  let rows = "";
  let shown = 0;

  for (let i = 0; i < customerEvents.length; i++) {
    let event = customerEvents[i];
    let matchesText = containsText(event.id, keyword) || containsText(event.name, keyword) || containsText(event.location, keyword);
    let matchesType = typeFilter === "All" || event.type === typeFilter;

    if (matchesText && matchesType) {
      rows += "<tr>" +
        "<td>" + event.id + "</td>" +
        "<td><strong>" + event.name + "</strong></td>" +
        "<td>" + event.type + "</td>" +
        "<td>" + event.date + "</td>" +
        "<td>" + event.location + "</td>" +
        "<td>" + Number(event.budget).toLocaleString() + " Tk</td>" +
        "<td>" +
          "<button type='button' class='btn btn-small' onclick='editCustomerEvent(" + i + ")'>Edit</button> " +
          "<button type='button' class='btn btn-small btn-danger' onclick='deleteCustomerEvent(" + i + ")'>Delete</button>" +
        "</td></tr>";
      shown++;
    }
  }

  if (shown === 0) {
    rows = "<tr><td colspan='7' class='empty-row'>No events found.</td></tr>";
  }

  document.getElementById("customerEventsTableBody").innerHTML = rows;
  updateClientDashboard();
}

function saveCustomerEvent() {
  clearErrors(eventFields);
  hideMessage("eventMessage");

  let name = document.getElementById("eventName").value.trim();
  let type = document.getElementById("eventType").value;
  let date = document.getElementById("eventDate").value;
  let location = document.getElementById("eventLocation").value.trim();
  let guests = Number(document.getElementById("guestCount").value);
  let budgetText = document.getElementById("eventBudget").value;
  let budget = Number(budgetText);
  let description = document.getElementById("eventDescription").value.trim();
  let valid = true;

  if (name.length < 3) {
    showError("eventName", "Event name must be at least 3 characters.");
    valid = false;
  }
  if (type === "") {
    showError("eventType", "Please select an event type.");
    valid = false;
  }
  if (date === "") {
    showError("eventDate", "Please select the event date.");
    valid = false;
  } else if (daysBetween(todayString(), date) < 0) {
    showError("eventDate", "Event date cannot be in the past.");
    valid = false;
  }
  if (location.length < 3) {
    showError("eventLocation", "Please enter the event location.");
    valid = false;
  }
  if (document.getElementById("guestCount").value !== "" && guests < 1) {
    showMessage("eventMessage", "Guest count must be at least 1.", "error");
    valid = false;
  }
  if (budgetText !== "" && budget < 0) {
    showMessage("eventMessage", "Budget cannot be negative.", "error");
    valid = false;
  }

  if (valid === false) {
    return false;
  }

  if (editingEventIndex === -1) {
    let newEvent = {
      id: nextClientEventId(),
      name: name,
      type: type,
      date: date,
      location: location,
      guests: guests,
      budget: budget,
      description: description
    };
    customerEvents.push(newEvent);
    showMessage("eventMessage", "Event <strong>" + name + "</strong> was added.", "success");
  } else {
    let event = customerEvents[editingEventIndex];
    event.name = name;
    event.type = type;
    event.date = date;
    event.location = location;
    event.guests = guests;
    event.budget = budget;
    event.description = description;
    showMessage("eventMessage", "Event <strong>" + name + "</strong> was updated.", "success");
  }

  resetEventForm();
  renderCustomerEvents();
  return false;
}

function nextClientEventId() {
  let largest = 0;
  for (let i = 0; i < customerEvents.length; i++) {
    let number = Number(customerEvents[i].id.replace("EV-", ""));
    if (number > largest) { largest = number; }
  }
  return "EV-" + String(largest + 1).padStart(3, "0");
}

function editCustomerEvent(index) {
  let event = customerEvents[index];
  editingEventIndex = index;

  document.getElementById("eventName").value = event.name;
  document.getElementById("eventType").value = event.type;
  document.getElementById("eventDate").value = event.date;
  document.getElementById("eventLocation").value = event.location;
  document.getElementById("guestCount").value = event.guests;
  document.getElementById("eventBudget").value = event.budget;
  document.getElementById("eventDescription").value = event.description;

  document.getElementById("eventFormTitle").innerHTML = "Edit Event " + event.id;
  document.getElementById("eventSaveButton").value = "Update Event";
  hideMessage("eventMessage");
  showSection("eventsSection");
}

function deleteCustomerEvent(index) {
  let event = customerEvents[index];
  if (confirm("Delete the event '" + event.name + "'?")) {
    customerEvents = removeAt(customerEvents, index);
    showMessage("eventMessage", "Event " + event.id + " was deleted.", "info");
    resetEventForm();
    renderCustomerEvents();
  }
}

function resetEventForm() {
  editingEventIndex = -1;
  document.getElementById("customerEventForm").reset();
  clearErrors(eventFields);
  document.getElementById("eventFormTitle").innerHTML = "Create New Event";
  document.getElementById("eventSaveButton").value = "Create Event";
}

function updateClientDashboard() {
  let totalBudget = 0;
  for (let i = 0; i < customerEvents.length; i++) {
    totalBudget += Number(customerEvents[i].budget) || 0;
  }

  document.getElementById("customerEventCount").innerHTML = customerEvents.length;
  document.getElementById("customerBookingCount").innerHTML = "0";
  document.getElementById("customerServiceCount").innerHTML = "0";
  document.getElementById("customerTotalExpense").innerHTML = totalBudget.toLocaleString() + " Tk";
}


/* Navigation for the customer pages.
   The HTML uses client.js, so this file must define the dashboard functions. */
function showSection(sectionId) {
  if (sectionId === "menuSection") {
    window.location.href = "menu-select.html";
    return;
  }
  if (sectionId === "activitiesSection") {
    window.location.href = "activities.html";
    return;
  }
  if (sectionId === "transportationSection" || sectionId === "transportatioSection") {
    window.location.href = "transportation.html";
    return;
  }

  let pageSections = ["dashboardSection", "eventsSection"];
  for (let i = 0; i < pageSections.length; i++) {
    let section = document.getElementById(pageSections[i]);
    if (section !== null) {
      section.style.display = (pageSections[i] === sectionId) ? "block" : "none";
    }
  }

  let navButtons = ["dashboardSection", "menuSection", "activitiesSection", "transportationSection"];
  for (let i = 0; i < navButtons.length; i++) {
    let button = document.getElementById("nav-" + navButtons[i]);
    if (button !== null) {
      button.className = (navButtons[i] === sectionId) ? "active" : "";
    }
  }
}

/* Initial page setup */
renderCustomerEvents();
showSection("dashboardSection");
showSection("eventsSection");
