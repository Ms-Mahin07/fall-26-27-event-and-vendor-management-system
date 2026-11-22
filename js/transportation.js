const sections = [];

let editingTransportIndex = -1;

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

function getSelectedVehicles() {
  return getCheckedValues("vehicles");
}
function renderTransportBookings() {
  let keyword = document.getElementById("transportSearch").value;
  let statusFilter = document.getElementById("transportStatusFilter").value;
  let rows = "";
  let shown = 0;

  for (let i = 0; i < transportBookings.length; i++) {
    let booking = transportBookings[i];
    let matches = containsText(booking.event, keyword) ||
                  containsText(booking.vehicles.join(", "), keyword) ||
                  containsText(booking.pickup, keyword) ||
                  containsText(booking.drop, keyword);
    let statusMatches = statusFilter === "All" || booking.status === statusFilter;

    if (matches && statusMatches) {
      rows += "<tr><td>" + booking.event + "</td>" +
        "<td>" + booking.vehicles.join(", ") + "</td><td>" + booking.quantity + "</td>" +
        "<td>" + booking.date + "</td><td>" + booking.pickup + "</td>" +
        "<td>" + booking.drop + "</td><td>" + booking.status + "</td><td>" +
        "<button type='button' class='btn btn-small' onclick='editTransportBooking(" + i + ")'>Edit</button> " +
        "<button type='button' class='btn btn-small btn-danger' onclick='deleteTransportBooking(" + i + ")'>Delete</button>" +
        "</td></tr>";
      shown++;
    }
  }

  if (shown === 0) {
    rows = "<tr><td colspan='8' class='empty-row'>No transportation bookings found.</td></tr>";
  }
  document.getElementById("transportTableBody").innerHTML = rows;
}

function saveTransportBooking() {
  clearError("eventType");
  hideMessage("transportMessage");

  let event = document.getElementById("eventType").value;
  let vehicles = getSelectedVehicles();
  let quantityText = document.getElementById("vehicleQuantity").value;
  let quantity = Number(quantityText);
  let date = document.getElementById("pickupDate").value;
  let pickup = document.getElementById("pickupLocation").value.trim();
  let drop = document.getElementById("dropLocation").value.trim();
  let note = document.getElementById("transportNote").value.trim();
  let valid = true;

  if (event === "") {
    showError("eventType", "Please select an event.");
    valid = false;
  }
  if (vehicles.length === 0) {
    showMessage("transportMessage", "Please select at least one vehicle.", "error");
    valid = false;
  }
  if (quantityText === "" || quantity < 1) {
    showMessage("transportMessage", "Vehicle quantity must be at least 1.", "error");
    valid = false;
  }
  if (date === "" || daysBetween(todayString(), date) < 0) {
    showMessage("transportMessage", "Choose a valid pickup date (today or later).", "error");
    valid = false;
  }
  if (pickup.length < 3 || drop.length < 3) {
    showMessage("transportMessage", "Enter both pickup and drop-off locations.", "error");
    valid = false;
  }
  if (valid === false) { return false; }

  if (editingTransportIndex === -1) {
    transportBookings.push({
      id: nextTransportId(), event: event, vehicles: vehicles,
      quantity: quantity, date: date, pickup: pickup,
      drop: drop, note: note, status: "Pending"
    });
    saveEVMSData(EVMS_KEYS.transports, transportBookings);
    showMessage("transportMessage", "Transportation booking submitted. Status: Pending.", "success");
  } else {
    let booking = transportBookings[editingTransportIndex];
    booking.event = event;
    booking.vehicles = vehicles;
    booking.quantity = quantity;
    booking.date = date;
    booking.pickup = pickup;
    booking.drop = drop;
    booking.note = note;
    saveEVMSData(EVMS_KEYS.transports, transportBookings);
    showMessage("transportMessage", "Transportation booking was updated.", "success");
  }

  resetTransportForm();
  renderTransportBookings();
  return false;
}

function nextTransportId() {
  return "TR-" + String(transportBookings.length + 1).padStart(3, "0");
}

function editTransportBooking(index) {
  let booking = transportBookings[index];
  editingTransportIndex = index;
  document.getElementById("eventType").value = booking.event;

  let boxes = document.getElementsByName("vehicles");
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].checked = booking.vehicles.indexOf(boxes[i].value) !== -1;
  }

  document.getElementById("vehicleQuantity").value = booking.quantity;
  document.getElementById("pickupDate").value = booking.date;
  document.getElementById("pickupLocation").value = booking.pickup;
  document.getElementById("dropLocation").value = booking.drop;
  document.getElementById("transportNote").value = booking.note;
  document.getElementById("transportFormTitle").innerHTML = "Edit Booking";
  document.getElementById("transportSaveButton").value = "Update Booking";
  hideMessage("transportMessage");
}

function deleteTransportBooking(index) {
  let booking = transportBookings[index];
  if (confirm("Delete this transportation booking?")) {
    transportBookings = removeAt(transportBookings, index);
    saveEVMSData(EVMS_KEYS.transports, transportBookings);
    showMessage("transportMessage", "Transportation booking was deleted.", "info");
    resetTransportForm();
    renderTransportBookings();
  }
}

function resetTransportForm() {
  editingTransportIndex = -1;
  document.getElementById("transportForm").reset();
  document.getElementById("transportFormTitle").innerHTML = "Booking Details";
  document.getElementById("transportSaveButton").value = "Book Transportation";
}

renderTransportBookings();
