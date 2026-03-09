function handleLogin() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("errorMsg");

  if (username === "admin" && password === "admin123") {
    errorMsg.classList.add("hidden");
    window.location.href = "main.html";
  } else {
    errorMsg.classList.remove("hidden");
  }
}

