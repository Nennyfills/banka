const logMeIn = e => {
  e.preventDefault();
  let username = document.getElementById("username").value;
  let password = document.getElementById("userpassword").value;
  let content = document.getElementById("login-respond");
  console.log(username, password);

  if (username === "admin" && password === "admin") {
    localStorage.setItem(
      "user",
      JSON.stringify({ name: "ADMIN", permission: "ADMIN" })
    );
    window.location.href = "UI/user/dashboard-admin.html";
    return false;
  } else if (username === "staff" && password === "staff") {
    window.location.href = "UI/user/dashboard-staff.html";
    localStorage.setItem(
      "user",
      JSON.stringify({ name: "STAFF", permission: "STAFF" })
    );
    return false;
  } else if (username === "user" && password === "user") {
    window.location.href = "UI/user/dashboard-user.html";
    localStorage.setItem(
      "user",
      JSON.stringify({ name: "USER", permission: "USER" })
    );
    return false;
  } else {
    content.style.display = "block";
  }

  return false;
};
