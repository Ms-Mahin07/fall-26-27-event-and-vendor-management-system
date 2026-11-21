const sections = [
  "dashboard",
  "users",
  "complaints",
  "announcements",
  "vendorVerification",
];

let selectedVendorIndex = -1;

function renderUsers() {
  let keyword = document.getElementById("userSearch").value.toLowerCase();
  let role = document.getElementById("roleFilter").value;
  let status = document.getElementById("statusFilter").value;

  let rows = "";
  let shown = 0;

  for (let i = 0; i < users.length; i++) {
    let u = users[i];

    let matches =
      u.name.toLowerCase().indexOf(keyword) !== -1 ||
      u.email.toLowerCase().indexOf(keyword) !== -1;

    if (
      matches &&
      (role === "All Roles" || u.role === role) &&
      (status === "All Statuses" || u.status === status)
    ) {
      let color = u.status === "Active" ? "green" : "red";

      rows += "<tr>";

      rows += "<td>" + u.id + "</td>";
      rows += "<td>" + u.name + "</td>";
      rows += "<td>" + u.email + "</td>";
      rows += "<td>" + u.role + "</td>";

      rows +=
        "<td><span class='pill " + color + "'>" + u.status + "</span></td>";

      rows += "<td>";

      rows +=
        "<button class='action gray' onclick='editUser(" +
        i +
        ")'>Edit</button>";

      rows +=
        "<button class='action gray' onclick='activateUser(" +
        i +
        ")'>" +
        (u.status === "Active" ? "Suspend" : "Activate") +
        "</button>";

      rows +=
        "<button class='action redbtn' onclick='deleteUser(" +
        i +
        ")'>Delete</button>";

      rows += "</td></tr>";

      shown++;
    }
  }

  if (shown === 0) {
    rows = "<tr><td colspan='6'>No users found.</td></tr>";
  }

  document.getElementById("userRows").innerHTML = rows;

  document.getElementById("userCount").innerHTML =
    "Showing " + shown + " of " + users.length + " users";
}

function removeAt(list, index) {
  return list.slice(0, index).concat(list.slice(index + 1));
}

// Add user

function showUserForm() {
  document.getElementById("userForm").style.display = "flex";

  document.getElementById("userName").value = "";
  document.getElementById("userEmail").value = "";
}

function saveUser() {
  let name = document.getElementById("userName").value.trim();
  let email = document.getElementById("userEmail").value.trim();
  let role = document.getElementById("userRole").value;

  if (name !== "" && email !== "") {
    users.push({
      id: users.length + 1,
      name: name,
      email: email,
      role: role,
      status: "Active",
    });

    document.getElementById("userForm").style.display = "none";

    renderUsers();
  }
}

// Edit user

function editUser(index) {
  document.getElementById("userForm").style.display = "flex";

  document.getElementById("userName").value = users[index].name;
  document.getElementById("userEmail").value = users[index].email;
  document.getElementById("userRole").value = users[index].role;

  deleteUser(index);
}

// Activate or suspend user

function activateUser(index) {
  if (users[index].status === "Active") {
    users[index].status = "Suspended";
  } else {
    users[index].status = "Active";
  }

  renderUsers();
}

// Delete user

function deleteUser(index) {
  users = removeAt(users, index);

  renderUsers();
}

// VENDOR VERIFICATION

function renderVendors() {
  let keyword = document.getElementById("vendorSearch").value.toLowerCase();
  let filter = document.getElementById("vendorStatusFilter").value;

  let rows = "";

  let pending = 0;
  let approved = 0;
  let rejected = 0;

  for (let i = 0; i < vendorUsers.length; i++) {
    let v = vendorUsers[i];

    // Count verification statuses
    if (v.verificationStatus === "Pending") {
      pending++;
    }

    if (v.verificationStatus === "Approved") {
      approved++;
    }

    if (v.verificationStatus === "Rejected") {
      rejected++;
    }

    // Search vendor and business names
    let matches =
      v.name.toLowerCase().indexOf(keyword) !== -1 ||
      v.businessName.toLowerCase().indexOf(keyword) !== -1;

    // Apply status filter
    if (matches && (filter === "All" || v.verificationStatus === filter)) {
      let color = "pending-status";

      if (v.verificationStatus === "Approved") {
        color = "approved-status";
      }

      if (v.verificationStatus === "Rejected") {
        color = "rejected-status";
      }

      rows += "<tr>";

      rows += "<td>" + v.id + "</td>";
      rows += "<td>" + v.businessName + "</td>";
      rows += "<td>" + v.name + "</td>";
      rows += "<td>" + v.category + "</td>";
      rows += "<td>" + v.status + "</td>";

      rows +=
        "<td><span class='verify-pill " +
        color +
        "'>" +
        v.verificationStatus +
        "</span></td>";

      rows += "<td>";

      rows +=
        "<button class='action' onclick='viewVendor(" +
        i +
        ")'>Verify</button>";

      rows += "</td>";

      rows += "</tr>";
    }
  }

  if (rows === "") {
    rows = "<tr><td colspan='7'>No vendors found.</td></tr>";
  }

  document.getElementById("vendorRows").innerHTML = rows;
}

// View selected vendor

function viewVendor(index) {
  selectedVendorIndex = index;

  let v = vendorUsers[index];

  document.getElementById("vendorDetails").style.display = "block";

  document.getElementById("vendorInfo").innerHTML =
    "<div class='vendor-info'>" +
    "<p><strong>Vendor ID:</strong> " +
    v.id +
    "</p>" +
    "<p><strong>Vendor Name:</strong> " +
    v.name +
    "</p>" +
    "<p><strong>Business Name:</strong> " +
    v.businessName +
    "</p>" +
    "<p><strong>Category:</strong> " +
    v.category +
    "</p>" +
    "<p><strong>Email:</strong> " +
    v.email +
    "</p>" +
    "<p><strong>Phone:</strong> " +
    v.phone +
    "</p>" +
    "<p><strong>Address:</strong> " +
    v.address +
    "</p>" +
    "<p><strong>Account Status:</strong> " +
    v.status +
    "</p>" +
    "<p><strong>Verification Status:</strong> " +
    v.verificationStatus +
    "</p>" +
    "</div>";

  // Load saved checklist values
  document.getElementById("businessInfo").checked = v.businessInfo;

  document.getElementById("ownerInfo").checked = v.ownerInfo;

  document.getElementById("contactInfo").checked = v.contactInfo;

  document.getElementById("addressInfo").checked = v.addressInfo;

  document.getElementById("verificationMessage").innerHTML = "";

  // Show the details panel
  document.getElementById("vendorDetails").scrollIntoView({
    behavior: "smooth",
  });
}

// Save checklist values

function saveVendorChecklist() {
  if (selectedVendorIndex === -1) {
    return;
  }

  let v = vendorUsers[selectedVendorIndex];

  v.businessInfo = document.getElementById("businessInfo").checked;

  v.ownerInfo = document.getElementById("ownerInfo").checked;

  v.contactInfo = document.getElementById("contactInfo").checked;

  v.addressInfo = document.getElementById("addressInfo").checked;

  document.getElementById("verificationMessage").innerHTML =
    "Checklist saved successfully.";

  renderVendors();
}

// Check whether all required information is verified

function isVendorChecklistComplete(v) {
  return (
    v.businessInfo === true &&
    v.ownerInfo === true &&
    v.contactInfo === true &&
    v.addressInfo === true
  );
}

// Approve vendor

function approveVendor() {
  if (selectedVendorIndex === -1) {
    return;
  }

  // Save current checkbox values first
  let v = vendorUsers[selectedVendorIndex];

  v.businessInfo = document.getElementById("businessInfo").checked;

  v.ownerInfo = document.getElementById("ownerInfo").checked;

  v.contactInfo = document.getElementById("contactInfo").checked;

  v.addressInfo = document.getElementById("addressInfo").checked;

  // All checklist items must be completed
  if (!isVendorChecklistComplete(v)) {
    document.getElementById("verificationMessage").innerHTML =
      "Please complete all verification checklist items before approval.";

    return;
  }

  v.verificationStatus = "Approved";

  document.getElementById("verificationMessage").innerHTML =
    "Vendor approved successfully.";

  renderVendors();
  viewVendor(selectedVendorIndex);
}

// Reject vendor

function rejectVendor() {
  if (selectedVendorIndex === -1) {
    return;
  }

  let v = vendorUsers[selectedVendorIndex];

  v.verificationStatus = "Rejected";

  document.getElementById("verificationMessage").innerHTML =
    "Vendor application rejected.";

  renderVendors();
  viewVendor(selectedVendorIndex);
}

// COMPLAINT MANAGEMENT

function renderComplaints() {
  let keyword = document.getElementById("complaintSearch").value.toLowerCase();

  let rows = "";

  for (let i = 0; i < complaints.length; i++) {
    let c = complaints[i];

    if (
      c.subject.toLowerCase().indexOf(keyword) !== -1 ||
      c.name.toLowerCase().indexOf(keyword) !== -1
    ) {
      rows += "<tr>";

      rows += "<td>" + c.id + "</td>";
      rows += "<td>" + c.name + "</td>";
      rows += "<td>" + c.subject + "</td>";
      rows += "<td>" + c.priority + "</td>";

      rows +=
        "<td><span class='pill " +
        (c.status === "Open" ? "green" : "red") +
        "'>" +
        c.status +
        "</span></td>";

      rows +=
        "<td><button class='action' onclick='closeComplaint(" +
        i +
        ")'>Details / Close</button></td>";

      rows += "</tr>";
    }
  }

  if (rows === "") {
    rows = "<tr><td colspan='6'>No complaints found.</td></tr>";
  }

  document.getElementById("complaintRows").innerHTML = rows;
}

// Close complaint

function closeComplaint(index) {
  if (complaints[index].status === "Open") {
    complaints[index].status = "Closed";
  } else {
    complaints[index].status = "Open";
  }

  renderComplaints();
}

// ANNOUNCEMENT MANAGEMENT

function renderAnnouncements() {
  let keyword = document
    .getElementById("announcementSearch")
    .value.toLowerCase();

  let rows = "";
  let published = 0;

  for (let i = 0; i < announcements.length; i++) {
    let a = announcements[i];

    if (a.status === "Published") {
      published++;
    }

    if (a.title.toLowerCase().indexOf(keyword) !== -1) {
      rows += "<tr>";

      rows += "<td>" + a.id + "</td>";
      rows += "<td>" + a.title + "</td>";
      rows += "<td>" + a.status + "</td>";

      rows += "<td>";

      rows +=
        "<button class='action' onclick='publishAnnouncement(" +
        i +
        ")'>" +
        (a.status === "Published" ? "Unpublish" : "Publish") +
        "</button>";

      rows +=
        "<button class='action redbtn' onclick='deleteAnnouncement(" +
        i +
        ")'>Delete</button>";

      rows += "</td></tr>";
    }
  }

  if (rows === "") {
    rows = "<tr><td colspan='4'>No announcements found.</td></tr>";
  }

  document.getElementById("announcementRows").innerHTML = rows;

  document.getElementById("publishedCount").innerHTML = published;
}

// Add announcement

function showAnnouncementForm() {
  document.getElementById("announcementForm").style.display = "flex";

  document.getElementById("announcementTitle").value = "";
}

function addAnnouncement() {
  let title = document.getElementById("announcementTitle").value.trim();

  if (title !== "") {
    announcements.push({
      id: "A00" + (announcements.length + 1),
      title: title,
      status: "Draft",
    });

    document.getElementById("announcementForm").style.display = "none";

    renderAnnouncements();
  }
}

// Publish or unpublish announcement

function publishAnnouncement(index) {
  if (announcements[index].status === "Published") {
    announcements[index].status = "Draft";
  } else {
    announcements[index].status = "Published";
  }

  renderAnnouncements();
}

// Delete announcement

function deleteAnnouncement(index) {
  announcements = removeAt(announcements, index);

  renderAnnouncements();
}

renderUsers();
renderComplaints();
renderAnnouncements();
renderVendors();
