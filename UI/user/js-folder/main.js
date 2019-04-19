const previewImage = (e) => {
  const reader = new FileReader();
  const imageField = document.getElementById("image");
  reader.onload = () => {
    if (reader.readyState === 2) {
      imageField.src = reader.result;
    }
  };
  reader.readAsDataURL(e.files[0]);
};

const openModal = (current) => {
  const modal = document.getElementById(current);
  modal.style.display = "block";
};

const closeModal = (current) => {
  const modal = document.getElementById(current);
  modal.style.display = "none";
};

const deleteBtn = () => {
  window.location.href = "accounts.html";
};
const activateBtn = () => {
  window.location.href = "accounts.html";
};
// eslint-disable-next-line no-unused-vars
const deactivateBtn = () => {
  window.location.href = "accounts.html";
};

document.onreadystatechange = () => {
  // eslint-disable-next-line no-empty
  if (document.readyState !== "complete") {
    
  }
};

const dashboard = document.getElementById("side_dashboard").addEventListener("click", (e) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user.permission === "admin".toUpperCase()) {
    window.location.href = "dashboard-admin.html";
  } else if (user.permission === "staff".toUpperCase()) {
    window.location.href = "dashboard-staff.html";
  } else if (user.permission === "user".toUpperCase()) {
    window.location.href = "profile.html";
  }
});
const user = JSON.parse(localStorage.getItem("user"));
document.getElementById("username").innerHTML = user.name;
