const CLOUD_NAME = "YOUR_CLOUD_NAME";
const UPLOAD_PRESET = "YOUR_UNSIGNED_PRESET";

let images = JSON.parse(localStorage.getItem("cloudImages")) || [];

function render() {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";

  images.forEach((url, index) => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${url}" />
      <br/>
      <button onclick="deleteImage(${index})">Delete</button>
    `;

    gallery.appendChild(div);
  });
}

async function uploadImage() {
  const file = document.getElementById("fileInput").files[0];
  if (!file) return alert("Select image first!");

  const formData = new FormData();
  formData.append("dtuuauzyz", file);
  formData.append("dtuuauzyz", UPLOAD_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData
    }
  );

  const data = await res.json();

  images.push(data.secure_url);
  localStorage.setItem("cloudImages", JSON.stringify(images));

  document.getElementById("fileInput").value = "";

  render(); // auto back to home update
}

function deleteImage(index) {
  images.splice(index, 1);
  localStorage.setItem("cloudImages", JSON.stringify(images));
  render();
}

render();