const logMeIn = e => {
  e.preventDefault();
  let username = document.getElementById("username").value;
  let password = document.getElementById("userpassword").value;
  console.log(username, password);

  if (username === "admin" && password === "admin") {
    alert("Login successfully");
    window.location.href = "admin/dashboard.html";
    return false;
  } else if (username === "staff" && password === "staff") {
    alert("Login successfully");
    window.location.href = "staff/dashboard.html";
    return false;
  } else if (username === "user" && password === "user") {
    alert("Login successfully");
    window.location.href = "user/dashboard.html";
    return false;
  } else{
    alert("wrong Username and Password")
  }
};

document.getElementById("loginSubmit").addEventListener("click", logMeIn);

