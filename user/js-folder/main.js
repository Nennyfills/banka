const previewImage = e => {
  let reader = new FileReader();
  let imageField = document.getElementById("image");
  reader.onload = () => {
    if (reader.readyState === 2) {
      imageField.src = reader.result;
    }
  };
  reader.readAsDataURL(e.files[0]);
}