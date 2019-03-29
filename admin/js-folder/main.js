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
