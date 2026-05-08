// Register
function register() {
  let user = document.getElementById("regUser").value;
  let pass = document.getElementById("regPass").value;

  if (!user || !pass) {
    alert("Fill all fields");
    return;
  }

  localStorage.setItem(user, pass);
  alert("Registered!");
}

// Login
function login() {
  let user = document.getElementById("logUser").value;
  let pass = document.getElementById("logPass").value;

  if (localStorage.getItem(user) === pass) {
    localStorage.setItem("currentUser", user);
    window.location.href = "dashboard.html";
  } else {
    alert("Wrong username or password!");
  }
}

// Logout
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}

// Add Contribution
function addMoney() {
  let amount = document.getElementById("amount").value;
  let user = localStorage.getItem("currentUser");

  if (!amount) {
    alert("Enter amount");
    return;
  }

  let data = JSON.parse(localStorage.getItem("contributions")) || [];

  data.push({ user: user, amount: Number(amount) });

  localStorage.setItem("contributions", JSON.stringify(data));

  document.getElementById("amount").value = "";

  loadData();
}

// Load Data
function loadData() {
  let data = JSON.parse(localStorage.getItem("contributions")) || [];

  let list = document.getElementById("list");
  let total = 0;

  list.innerHTML = "";

  data.forEach(item => {
    let li = document.createElement("li");
    li.innerText = item.user + " = " + item.amount;
    list.appendChild(li);

    total += item.amount;
  });

  document.getElementById("total").innerText = total;
}

// Page load
window.onload = function () {
  if (document.getElementById("list")) {
    loadData();
  }
};