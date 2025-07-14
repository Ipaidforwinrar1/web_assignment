 document.addEventListener("DOMContentLoaded", function () {
    const userData = JSON.parse(localStorage.getItem("users")) || [];
    const currentEmail = localStorage.getItem("loggedInUser");
    const loggedIn = localStorage.getItem("loggedIn") === "true";

    if (loggedIn && currentEmail) {
      const user = userData.find(u => u.email === currentEmail);
      if (user) {
        document.getElementById("signInLink").style.display = "none";
        document.getElementById("userDropdown").style.display = "inline-block";
        document.getElementById("userName").textContent = user.firstName || "User";
      }
    }

   
    const userBtn = document.getElementById("userBtn");
    const dropdown = document.getElementById("dropdownMenu");

    if (userBtn && dropdown) {
      userBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
      });

      window.addEventListener("click", function (e) {
        if (!userBtn.contains(e.target)) {
          dropdown.style.display = "none";
        }
      });
    }
  });

  function logout() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
  }
