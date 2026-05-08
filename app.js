const fileInput = document.getElementById("fileInput");
const previewContainer = document.getElementById("previewContainer");
const urlList = document.getElementById("urlList");
const progress = document.getElementById("progress");
const dropArea = document.getElementById("dropArea");

let selectedFiles = [];

fileInput.addEventListener("change", (e) => {
  selectedFiles = [...e.target.files];
  showPreview();
});

dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
});

dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  selectedFiles = [...e.dataTransfer.files];
  showPreview();
});

function showPreview() {
  previewContainer.innerHTML = "";

  selectedFiles.forEach(file => {
    const reader = new FileReader();

    reader.onload = function (e) {
      const img = document.createElement("img");
      img.src = e.target.result;
      previewContainer.appendChild(img);
    };

    reader.readAsDataURL(file);
  });
}

async function uploadImages() {
  if (!selectedFiles.length) {
    alert("Please select images first");
    return;
  }

  progress.innerHTML = "Uploading...";
  urlList.innerHTML = "";

  const cloudName = "dtuuauzyz";
  const uploadPreset = "dtuuauzyz";

  for (const file of selectedFiles) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const response = await fetch(url, {
      method: "POST",
      body: formData
    });

}