const observer = new IntersectionObserver((entries) => {});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Offset for header height
        behavior: "smooth",
      });
    }
  });
});

document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});

// Menú hamburguesa
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");

function toggleMenu() {
  menuToggle.classList.toggle("active");
  nav.classList.toggle("active");
  document.body.classList.toggle("menu-open");
}

menuToggle.addEventListener("click", toggleMenu);

// Cerrar menú al hacer clic fuera
document.addEventListener("click", (e) => {
  if (
    nav.classList.contains("active") &&
    !nav.contains(e.target) &&
    !menuToggle.contains(e.target)
  ) {
    toggleMenu();
  }
});
