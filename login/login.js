document.getElementById("login").addEventListener("submit", function (event) {
  event.preventDefault();
  const usernameInput = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch("./data/users.json")
    .then((response) => response.json())
    .then((data) => {
      var user = data.user.find(
        (user) => user.username === usernameInput && user.password === password
      );

      if (user) {
        document.getElementById("error-message").textContent = "";
        alert("Login successful");
        const { username, ...otherUserData } = user;
        localStorage.setItem(
          "currentUser",
          JSON.stringify({ username: usernameInput })
        );

        if (user.role === "admin") {
          window.location.href = "dashboard.html";
        } else {
          window.location.href = "index.html";
        }
      } else {
        document.getElementById("error-message").textContent =
          "Invalid username or password.";
      }
    })
    .catch((error) => console.error("Error loading user data:", error));
});
