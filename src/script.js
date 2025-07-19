// ================================
// SHARED FUNCTIONALITY FOR ALL PAGES
// ================================

document.addEventListener("DOMContentLoaded", function () {
  initializeUserDropdown();
  initializeBackToTop();
  addHoverEffects();
});

// ================================
// USER AUTHENTICATION & DROPDOWN
// ================================

function initializeUserDropdown() {
  const userData = JSON.parse(localStorage.getItem("users")) || [];
  const currentEmail = localStorage.getItem("loggedInUser");
  const loggedIn = localStorage.getItem("loggedIn") === "true";

  if (loggedIn && currentEmail) {
    const user = userData.find(u => u.email === currentEmail);
    if (user) {
      const signInLink = document.getElementById("signInLink");
      const userDropdown = document.getElementById("userDropdown");
      const userName = document.getElementById("userName");

      if (signInLink) signInLink.style.display = "none";
      if (userDropdown) userDropdown.style.display = "inline-block";
      if (userName) userName.textContent = user.firstName || "User";
    }
  }

  // Toggle dropdown menu
  const userBtn = document.getElementById("userBtn");
  const dropdown = document.getElementById("dropdownMenu");

  if (userBtn && dropdown) {
    userBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    });

    // Close menu if clicked outside
    window.addEventListener("click", function (e) {
      if (!userBtn.contains(e.target)) {
        dropdown.style.display = "none";
      }
    });
  }
}

function logout() {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("loggedInUser");
  localStorage.removeItem("loggedInUserFirstName");
  window.location.href = "login.html";
}

// ================================
// BACK TO TOP FUNCTIONALITY
// ================================

function initializeBackToTop() {
  // Show/hide back to top button on scroll
  window.addEventListener('scroll', function () {
    const btn = document.getElementById("backToTopBtn");
    if (btn) {
      btn.style.display = (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) ? "block" : "none";
    }
  });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ================================
// FORM VALIDATION UTILITIES
// ================================

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function getDateString(date) {
  return date.toISOString().slice(0, 10);
}

// ================================
// COMMON ANIMATIONS & EFFECTS
// ================================

function addHoverEffects() {
  // Add touch optimization for mobile
  if ('ontouchstart' in window) {
    document.querySelectorAll('.btn, .contact-links a, .whatsapp-btn, .submit-btn, .purchase-btn, .category-list button').forEach(function (element) {
      element.addEventListener('touchstart', function () {
        this.style.transform = 'scale(0.98)';
      });

      element.addEventListener('touchend', function () {
        this.style.transform = 'scale(1)';
      });
    });
  }
}