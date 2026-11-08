function fillDemo(email, password) {
  document.getElementById("email").value = email;
  document.getElementById("password").value = password;
}

function validateLogin() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  for (let i = 0; i < demoUsers.length; i++) {
    if (demoUsers[i].email === email && demoUsers[i].password === password) {
      saveCurrentUser(demoUsers[i]);
      window.location.href = demoUsers[i].dashboard;
      return false;
    }
  }

  alert("Invalid email or password!");
  return false;
}
