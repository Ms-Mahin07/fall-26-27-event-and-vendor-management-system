
//vendorshowsection--loops these list
const vendorSections = ["vendorServicesSection", "vendorProfitSection", "vendorChecklistSection", "vendorPrepSection"];


const currentVendorId = "U-1";


//adding new service create or update 
let vendorEditServiceIndex = -1;

const vendorServiceFields = ["vendorServiceTitle", "vendorServicePrice", "vendorServiceCategory", "vendorServiceDuration", "vendorServiceCapacity", "vendorServiceRequirements", "vendorServiceAvailability"];
const vendorChecklistFields = ["vendorChecklistEventType", "vendorChecklistEquipment", "vendorChecklistQuantity"];
const vendorPrepFields = ["vendorPrepBooking", "vendorPrepTaskName", "vendorPrepWorkers", "vendorPrepHours"];





// read and search 
function vendorRenderServices() {
  let keyword = document.getElementById("vendorServiceSearch").value;
  let categoryFilter = document.getElementById("vendorServiceCategoryFilter").value;
  let availabilityFilter = document.getElementById("vendorServiceAvailabilityFilter").value;
  let rows = "";
  let shown = 0;
  let mine = 0;

  for (let i = 0; i < vendorServices.length; i++) {
    let service = vendorServices[i];
    let isMine = (service.vendorId === currentVendorId);  
    if (isMine) {
      mine++;
    }

//search match the keyword
    let matchesKeyword = vendorContainsText(service.title, keyword) || vendorContainsText(service.category, keyword) ||
                         vendorContainsText(service.price, keyword);
    let matchesCategory = (categoryFilter === "All" || service.category === categoryFilter);
    let matchesAvailability = (availabilityFilter === "All" || service.availability === availabilityFilter);



    if (isMine && matchesKeyword && matchesCategory && matchesAvailability) {
      //status button color
      let statusColor;
      switch (service.availability) {
        case "Available":
          statusColor = "green";
          break;
        default:
          statusColor = "orange";
      }
//new services added in the my services table in rows
      rows += "<tr>" +
                "<td>" + service.id + "</td>" +
                "<td><strong>" + service.title + "</strong><br><span class='vendor-hint'>" + service.capacity + "</span></td>" +"<td>" + service.category + "</td>" +
                "<td>" + service.price + "</td>" +"<td>" + service.duration + "<br><span class='vendor-hint'>" + service.requirements + "</span></td>" +
                "<td><span class='vendor-badge vendor-" + statusColor + "'>" + service.availability + "</span></td>" +
                "<td>" +

                  "<button type='button' class='vendor-btn vendor-btn-small' onclick='vendorEditService(" + i + ")'>Edit</button>" +                          //edit remembers the info in the row and loads it in the section 
                  "<button type='button' class='vendor-btn vendor-btn-small vendor-btn-danger' onclick='vendorDeleteService(" + i + ")'>Delete</button>" +
                "</td>" +
              "</tr>";
      shown++;
    }
  }


  if (shown === 0) 
  {
    rows = "<tr><td colspan='7' class='vendor-empty-row'>No services match your search.</td></tr>"; //no search found
  }

  document.getElementById("vendorServiceTableBody").innerHTML = rows;
  document.getElementById("vendorServiceCount").innerHTML = "Showing " + shown + " of " + mine + " services";   // 5 of 5 services
}


//create and update
function vendorSaveService() 
{
  let title = document.getElementById("vendorServiceTitle").value.trim();
  let price = document.getElementById("vendorServicePrice").value.trim();
  let category = document.getElementById("vendorServiceCategory").value;
  let duration = document.getElementById("vendorServiceDuration").value.trim();
  let capacity = document.getElementById("vendorServiceCapacity").value.trim();
  let requirements = document.getElementById("vendorServiceRequirements").value.trim();
  let availability = document.getElementById("vendorServiceAvailability").value;

  let isValid = true;
  vendorClearErrors(vendorServiceFields); //initially true so no red marks

  //validation 

  if (title.length < 3) {
    vendorShowError("vendorServiceTitle", "Title must be at least 3 characters.");
    isValid = false;
  }

  if (vendorIsEmpty(price)) {
    vendorShowError("vendorServicePrice", "Please enter the base price.");
    isValid = false;
  }

  if (category === "") {
    vendorShowError("vendorServiceCategory", "Please choose a category.");
    isValid = false;
  }

  if (isValid === false) {
    return false;
  }

  

  //create new service
  if (vendorEditServiceIndex === -1)
  {
  
    let newService = { id: vendorNextId("V", vendorServices), vendorId: currentVendorId, title: title, category: category,
                        price: price, duration: duration, capacity: capacity, requirements: requirements,
                       availability: availability };
    vendorServices.push(newService);
    vendorShowMessage("vendorServiceMessage", "Service " + newService.id + " <strong>" + title + "</strong> was added.", "success");
  } 
  
  else 
      
  //update or edit
  {
  
    let service = vendorServices[vendorEditServiceIndex];
    service.title = title;
    service.price = price;
    service.category = category;
    service.duration = duration;
    service.capacity = capacity;
    service.requirements = requirements;
    service.availability = availability;
    vendorShowMessage("vendorServiceMessage", "Service " + service.id + " was updated.", "success");
  }

  //after  create clear table reset all info
  vendorResetServiceForm();
  vendorRenderServices();
  return false;
}


//edit
function vendorEditService(index) {
  let service = vendorServices[index];
  vendorEditServiceIndex = index;

  document.getElementById("vendorServiceTitle").value = service.title;
  document.getElementById("vendorServicePrice").value = service.price;
  document.getElementById("vendorServiceCategory").value = service.category;
  document.getElementById("vendorServiceDuration").value = service.duration;
  document.getElementById("vendorServiceCapacity").value = service.capacity;
  document.getElementById("vendorServiceRequirements").value = service.requirements;
  document.getElementById("vendorServiceAvailability").value = service.availability;

  document.getElementById("vendorServiceFormTitle").innerHTML = "Edit Service " + service.id;
  document.getElementById("vendorServiceSaveButton").value = "Update Service"; 
  vendorHideMessage("vendorServiceMessage");
}


//delete
function vendorDeleteService(index) {
  let service = vendorServices[index];
  vendorServices = vendorRemoveAt(vendorServices, index);
  vendorShowMessage("vendorServiceMessage", "Service " + service.id + " <strong>" + service.title + "</strong> was deleted.", "info");
  vendorResetServiceForm();
  vendorRenderServices();
}

//reset
function vendorResetServiceForm() {
  vendorEditServiceIndex = -1;
  document.getElementById("vendorServiceForm").reset();
  vendorClearErrors(vendorServiceFields);
  document.getElementById("vendorServiceFormTitle").innerHTML = "New Service";
  document.getElementById("vendorServiceSaveButton").value = "Add Service";
}



//unique feature : 1....vendor expense and profit calculator
//reads the prebuid data or changed values
function vendorCalculateProfit() {
  let revenue = Number(document.getElementById("vendorProfitRevenue").value);
  let material = Number(document.getElementById("vendorProfitMaterial").value);
  let worker = Number(document.getElementById("vendorProfitWorker").value);
  let transport = Number(document.getElementById("vendorProfitTransport").value);
  let other = Number(document.getElementById("vendorProfitOther").value);

  let totalExpense = material + worker + transport + other;
  let profit = revenue - totalExpense;

//your setimate box
  document.getElementById("vendorProfitResult").innerHTML =
    "<p>Service revenue: <strong>৳" + revenue + "</strong></p>" +
    "<p>Total expenses: <strong>৳" + totalExpense + "</strong></p>" +
    "<p>Estimated profit: <span class='vendor-big' id='vendorProfitAmount'>৳" + profit + "</span></p>";


  //profit greeen red loos
  document.getElementById("vendorProfitAmount").style.color = profit >= 0 ? "#2E7D32" : "#C62828";

  return false;   
}


//unique feature 2...equipment checklist

//all tick value saved
function vendorGetCheckedValues(groupName) 
{
  let boxes = document.getElementsByName(groupName);
  let selected = [];
  for (let i = 0; i < boxes.length; i++) {
    if (boxes[i].checked) {
      selected.push(boxes[i].value);
    }
  }
  return selected;
}

function vendorShowEquipment() 
{
  let eventType = document.getElementById("vendorChecklistEventType").value;

  document.getElementById("vendorEquipmentHint").style.display = (eventType === "") ? "block" : "none";
  document.getElementById("vendorEquipmentWedding").style.display = (eventType === "Wedding Stage & Reception") ? "block" : "none";
  document.getElementById("vendorEquipmentBirthday").style.display = (eventType === "Birthday Bash") ? "block" : "none";
  document.getElementById("vendorEquipmentCorporate").style.display = (eventType === "Corporate Conference") ? "block" : "none";
  document.getElementById("vendorEquipmentConcert").style.display = (eventType === "Concert / Live Sound") ? "block" : "none";
  document.getElementById("vendorEquipmentCinematic").style.display = (eventType === "Cinematic Shoot") ? "block" : "none";
}


// CREATE (one checklist item for every ticked equipment)
function vendorSaveChecklist() {
  let eventType = document.getElementById("vendorChecklistEventType").value;
  let quantity = Number(document.getElementById("vendorChecklistQuantity").value);

//same checkboxes
  let groupName = "";
  switch (eventType) {
    case "Wedding Stage & Reception":
      groupName = "vendorEquipmentWedding";
      break;
    case "Birthday Bash":
      groupName = "vendorEquipmentBirthday";
      break;
    case "Corporate Conference":
      groupName = "vendorEquipmentCorporate";
      break;
    case "Concert / Live Sound":
      groupName = "vendorEquipmentConcert";
      break;
    case "Cinematic Shoot":
      groupName = "vendorEquipmentCinematic";
      break;
  }

  let chosen = vendorGetCheckedValues(groupName);

  //validation
  let isValid = true;
  vendorClearErrors(vendorChecklistFields);

  if (eventType === "") {
    vendorShowError("vendorChecklistEventType", "Please select an event .");
    isValid = false;
  } else if (chosen.length === 0) {
    vendorShowError("vendorChecklistEquipment", "Select at least one equipment.");
    isValid = false;
  }

  if (quantity < 1) {
    vendorShowError("vendorChecklistQuantity", "Quantity at least 1.");
    isValid = false;
  }

  if (isValid === false) {
    return false;
  }

  for (const equipment of chosen) {
    vendorChecklistItems.push({ eventType: eventType, item: equipment, qty: quantity, done: false });
  }

  //successfully added
  vendorShowMessage("vendorChecklistMessage", chosen.length + " equipment item(s) added to the checklist.", "success");
  vendorResetChecklistForm();
  vendorRenderChecklist();
  return false;
}

//clears the form
function vendorResetChecklistForm() {
  document.getElementById("vendorChecklistForm").reset();
  vendorClearErrors(vendorChecklistFields);
  vendorShowEquipment();
}


//builds the table and run showvendorequipment
function vendorRenderChecklist() {
  let rows = "";

  for (let i = 0; i < vendorChecklistItems.length; i++) {
    let entry = vendorChecklistItems[i];
    let statusColor = entry.done ? "green" : "orange";
    let statusText = entry.done ? "Done" : "To do"; 
    let buttonText = entry.done ? "Undo" : "Mark done"; 

    rows += "<tr>" +
              "<td>" + entry.eventType + "</td>" +
              "<td>" + entry.item + "</td>" +
              "<td>" + entry.qty + "</td>" +
              "<td><span class='vendor-badge vendor-" + statusColor + "'>" + statusText + "</span></td>" +
              "<td>" +
                "<button type='button' class='vendor-btn vendor-btn-small' onclick='vendorToggleChecklistItem(" + i + ")'>" + buttonText + "</button>" +
                "<button type='button' class='vendor-btn vendor-btn-small vendor-btn-danger' onclick='vendorDeleteChecklistItem(" + i + ")'>Delete</button>" +
              "</td>" +
            "</tr>";
  }

  if (rows === "") {
    rows = "<tr><td colspan='5' class='vendor-empty-row'>No items in the checklist yet.</td></tr>";
  }
  document.getElementById("vendorChecklistTableBody").innerHTML = rows;
}


//update done or undo
function vendorToggleChecklistItem(index) {
  vendorChecklistItems[index].done = !vendorChecklistItems[index].done;
  vendorRenderChecklist();
}


//delete item new & list form
function vendorDeleteChecklistItem(index) {
  vendorChecklistItems = vendorRemoveAt(vendorChecklistItems, index);
  vendorRenderChecklist();
}




//booking preparation tasks

//add option to select booking
function vendorAddOption(select, value, text) {
  let option = document.createElement("option");
  option.value = value;
  option.innerHTML = text;
  select.appendChild(option);
}



//booking dropdown list fillup
function vendorFillPrepBookingSelect() {
  let select = document.getElementById("vendorPrepBooking");

  select.innerHTML = "";
  vendorAddOption(select, "", "-- Select Booking --");
  for (const booking of vendorBookings) {
    if (booking.vendorId === currentVendorId) {
      vendorAddOption(select, booking.client + " (" + booking.event + ")", booking.client + " - " + booking.event);
    }
  }
}


//mah-hours = workers*hours
function vendorPreviewPrepEffort() {
  let workers = Number(document.getElementById("vendorPrepWorkers").value);
  let hours = Number(document.getElementById("vendorPrepHours").value);
  let box = document.getElementById("vendorPrepEstimate");

  if (workers > 0 && hours > 0) {
    box.innerHTML = "<p>Allocated workers: <strong>" + workers + "</strong></p>" +
                    "<p>Duration: <strong>" + hours + " hrs</strong></p>" +
                    "<p>Total effort: <span class='vendor-big'>" + (workers * hours) + " man-hours</span></p>";
  } else {
    box.innerHTML = "Add task details to see the preparation estimate.";
  }
}



//create
function vendorSavePrepTask() {
  let booking = document.getElementById("vendorPrepBooking").value;
  let task = document.getElementById("vendorPrepTaskName").value.trim();
  let workers = Number(document.getElementById("vendorPrepWorkers").value);
  let hours = Number(document.getElementById("vendorPrepHours").value);
  let priority = document.getElementById("vendorPrepPriority").checked ? "High" : "Normal";

  let isValid = true;
  vendorClearErrors(vendorPrepFields);

  if (booking === "") {
    vendorShowError("vendorPrepBooking", "Please choose a booking.");
    isValid = false;
  }

  if (task.length < 3) {
    vendorShowError("vendorPrepTaskName", "Task name must be at least 3 characters.");
    isValid = false;
  }

  if (workers < 1 || workers > 50) {
    vendorShowError("vendorPrepWorkers", "Workers must be between 1 and 50.");
    isValid = false;
  }

  if (hours < 1 || hours > 48) {
    vendorShowError("vendorPrepHours", "Duration must be between 1 and 48 hours.");
    isValid = false;
  }

  if (isValid === false) {
    return false;
  }

  let newTask = { id: vendorNextId("T", vendorPrepTasks), vendorId: currentVendorId, booking: booking, task: task,
                  workers: workers, hours: hours, priority: priority, status: "Pending" };
  vendorPrepTasks.push(newTask);

  vendorShowMessage("vendorPrepMessage", "Task " + newTask.id + " <strong>" + task + "</strong> was saved.", "success");
  vendorResetPrepForm();
  vendorRenderPrepTasks();
  return false;
}


function vendorResetPrepForm() {
  document.getElementById("vendorPrepForm").reset();
  vendorClearErrors(vendorPrepFields);
  vendorPreviewPrepEffort();
}


//reead
function vendorRenderPrepTasks() {
  let rows = "";

  for (let i = 0; i < vendorPrepTasks.length; i++) {
    let task = vendorPrepTasks[i];

    if (task.vendorId === currentVendorId) {
      let priorityBadge = "";
      if (task.priority === "High") {
        priorityBadge = " <span class='vendor-badge vendor-red'>High</span>";
      }

      rows += "<tr>" +
                "<td>" + task.id + "</td>" +
                "<td>" + task.booking + "</td>" +
                "<td>" + task.task + priorityBadge + "</td>" +
                "<td>" + task.workers + "</td>" +
                "<td>" + task.hours + " hrs</td>" +
                "<td><span class='vendor-badge vendor-orange'>" + task.status + "</span></td>" +
                "<td><button type='button' class='vendor-btn vendor-btn-small vendor-btn-danger' onclick='vendorDeletePrepTask(" + i + ")'>Delete</button></td>" +
              "</tr>";
    }
  }

  if (rows === "") {
    rows = "<tr><td colspan='7' class='vendor-empty-row'>No preparation tasks yet.</td></tr>";
  }
  document.getElementById("vendorPrepTableBody").innerHTML = rows;
}


//delete
function vendorDeletePrepTask(index) {
  let task = vendorPrepTasks[index];
  vendorPrepTasks = vendorRemoveAt(vendorPrepTasks, index);
  vendorShowMessage("vendorPrepMessage", "Task " + task.id + " <strong>" + task.task + "</strong> was deleted.", "info");
  vendorRenderPrepTasks();
}


vendorRenderServices();
vendorRenderChecklist();
vendorFillPrepBookingSelect();
vendorRenderPrepTasks();
vendorShowSection("vendorServicesSection");
