// Sample data

let users = [
  {
    id: 1,
    name: "Rahim Ahmed",
    email: "rahim@example.com",
    role: "Vendor",
    status: "Active",
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    email: "nusrat@example.com",
    role: "Client",
    status: "Active",
  },
  {
    id: 3,
    name: "Tanvir Hasan",
    email: "tanvir@example.com",
    role: "Vendor",
    status: "Suspended",
  },
  {
    id: 4,
    name: "Sadia Islam",
    email: "sadia@example.com",
    role: "Client",
    status: "Active",
  },
];

let complaints = [
  {
    id: "C001",
    name: "Rahim Ahmed",
    subject: "Delayed Vendor Service",
    priority: "High",
    status: "Open",
  },
  {
    id: "C002",
    name: "Nusrat Jahan",
    subject: "Payment Issue",
    priority: "Medium",
    status: "Open",
  },
  {
    id: "C003",
    name: "Tanvir Hasan",
    subject: "Account Dispute",
    priority: "Low",
    status: "Closed",
  },
];

let announcements = [
  { id: "A001", title: "Scheduled Maintenance", status: "Published" },
  { id: "A002", title: "New Vendor Guidelines", status: "Published" },
];

let sections = ["dashboard", "users", "complaints", "announcements"];

// Navigation

function showSection(id) {
  for (let i = 0; i < sections.length; i++) {
    document.getElementById(sections[i]).style.display =
      sections[i] === id ? "block" : "none";

    let nav = document.getElementById("nav-" + sections[i]);

    if (nav != null) {
      nav.className = sections[i] === id ? "active" : "";
    }
  }

  let titles = {
    dashboard: "Admin Dashboard",
    users: "Admin Management",
    complaints: "Admin Management",
    announcements: "Admin Management",
  };

  document.getElementById("pageTitle").innerHTML = titles[id];

  document.getElementById("pageSubtitle").innerHTML =
    id === "dashboard"
      ? "Overview of your platform"
      : "Manage users, complaints, and platform announcements";

  renderUsers();
  renderComplaints();
  renderAnnouncements();
}

// Remove an array element

function removeAt(list, index) {
  return list.slice(0, index).concat(list.slice(index + 1));
}

// USER MANAGEMENT

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
        "<td><button class='action gray' onclick='closeComplaint(" +
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
        "<button class='action gray' onclick='publishAnnouncement(" +
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

// Initial display

renderUsers();
renderComplaints();
renderAnnouncements();
