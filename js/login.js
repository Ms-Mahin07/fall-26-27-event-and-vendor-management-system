function fillDemo(email, password) {
  document.getElementById("email").value = email;
  document.getElementById("password").value = password;
}

function validateLogin() {
  let email = document.getElementById("email").value.trim().toLowerCase();
  let password = document.getElementById("password").value;

  for (let i = 0; i < users.length; i++) {
    if (
      users[i].email.toLowerCase() === email &&
      users[i].password === password &&
      users[i].status === "Active"
    ) {
      saveCurrentUser(users[i]);
      window.location.href = users[i].dashboard;
      return false;
    }
  }

  alert("Invalid email or password, or account is inactive!");
  return false;
}
