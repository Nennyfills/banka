const previewImage = e => {
  let reader = new FileReader();
  let imageField = document.getElementById("image");
  reader.onload = () => {
    if (reader.readyState === 2) {
      imageField.src = reader.result;
    }
  };
  reader.readAsDataURL(e.files[0]);

};

const openModal = () => {
  let modal = document.getElementById("simpleModalDelete");
  modal.style.display = "block";
};

const closeModal = () => {
  let modal = document.getElementById("simpleModalDelete");
  modal.style.display = "none";
};
const deleteBtn = () => {
  window.location.href = "accounts.html";
};
