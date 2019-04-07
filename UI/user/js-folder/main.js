const previewImage = e => {
  let reader = new FileReader();
  let imageField = document.getElementById("image");
  reader.onload = () => {
    if (reader.readyState === 2) {
      imageField.src = reader.result;
    }
  };
  reader.readAsDataURL(e.files[0]);

  alert("file uploaded");
};

const openModal = current => {
  let modal = document.getElementById(current);
  modal.style.display = "block";
};

const closeModal = current => {
  let modal = document.getElementById(current);
  modal.style.display = "none";
};

const deleteBtn = () => {
  window.location.href = "account.html";
};
const activateBtn = () => {
  window.location.href = "account.html";
};
const deactivateBtn = () => {
  window.location.href = "account.html";
};

document.onreadystatechange = () => {
  if (document.readyState !== "complete") {
    return;
  }
};

let dashboard = document.getElementById("side_dashboard").addEventListener("click", e => {
  console.log('got here')
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user)
  if (user.permission === "admin".toUpperCase()) {
    window.location.href = "dashboard-admin.html";
  } else if (user.permission === "staff".toUpperCase()) {
    window.location.href = "dashboard-staff.html";
  } else if (user.permission === "user".toUpperCase()) {
    window.location.href = "dashboard-user.html";
  }

});
const user = JSON.parse(localStorage.getItem('user'));
document.getElementById("username").innerHTML = user.name

