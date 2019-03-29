const logMeIn = e => {
  e.preventDefault();
  let username = document.getElementById("username").value;
  let password = document.getElementById("userpassword").value;
  let content = document.getElementById("login-respond");
  console.log(username, password);

  if (username === "admin" && password === "admin") {
    window.location.href = "admin/dashboard.html";
    return false;
  } else if (username === "staff" && password === "staff") {
    window.location.href = "staff/dashboard.html";
    return false;
  } else if (username === "user" && password === "user") {
    window.location.href = "user/dashboard.html";
    return false;
  } else{
    content.style.display= "block";

  }
};

document.getElementById("loginSubmit").addEventListener("click", logMeIn);
