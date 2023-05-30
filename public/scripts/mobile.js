const mobileMenuBtn = document.getElementById("mobile-menu-btn")
const mobileMenu = document.getElementById("mobile-menu")

function toggleMobileMenu() {
  mobileMenu.classList.toggle("toggle")
}

mobileMenuBtn.addEventListener("click", toggleMobileMenu)
