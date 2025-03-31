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

// Form submission handling
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Here you would typically send the data to a server
    // For demonstration, we'll just log it and show a success message
    console.log("Form submitted:", { name, email, message });

    // Show success message
    alert("¡Gracias por tu mensaje! Te responderé pronto.");

    // Reset form
    contactForm.reset();
  });
}

// Add active class to navigation links based on scroll position
window.addEventListener("scroll", function () {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav ul li a");

  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (pageYOffset >= sectionTop - 150) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});

// Add animation to elements when they come into view
const animateOnScroll = function () {
  const elements = document.querySelectorAll(".project-card, .timeline-item");

  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementPosition < windowHeight - 100) {
      element.classList.add("fade-in");
    }
  });
};

// Add fade-in class for CSS animation
document.addEventListener("DOMContentLoaded", function () {
  // Add CSS for the animation
  const style = document.createElement("style");
  style.textContent = `
      .project-card, .timeline-item {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
      }
      
      .fade-in {
        opacity: 1;
        transform: translateY(0);
      }
    `;
  document.head.appendChild(style);

  // Initial check for elements in view
  animateOnScroll();

  // Check on scroll
  window.addEventListener("scroll", animateOnScroll);
});

// Mobile navigation toggle (for smaller screens)
const createMobileNav = function () {
  if (window.innerWidth <= 768) {
    const header = document.querySelector("header");
    const nav = document.querySelector("nav");
    const navUl = document.querySelector("nav ul");

    if (!document.querySelector(".nav-toggle")) {
      const toggleBtn = document.createElement("button");
      toggleBtn.classList.add("nav-toggle");
      toggleBtn.innerHTML = "☰";
      toggleBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            display: none;
          `;

      // Insertar de forma segura
      if (header.contains(nav)) {
        header.insertBefore(toggleBtn, nav);
      } else {
        header.prepend(toggleBtn);
      }

      navUl.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background-color: var(--bg-color);
            flex-direction: column;
            padding: 20px;
            border-bottom: 1px solid var(--border-color);
            display: none;
          `;

      toggleBtn.addEventListener("click", function () {
        const isVisible = navUl.style.display === "flex";
        navUl.style.display = isVisible ? "none" : "flex";
        toggleBtn.innerHTML = isVisible ? "☰" : "✕";
      });

      if (window.innerWidth <= 768) {
        toggleBtn.style.display = "block";
      }
    }
  }
};

// Check screen size on load and resize
window.addEventListener("load", createMobileNav);
window.addEventListener("resize", createMobileNav);
