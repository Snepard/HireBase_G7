// Toggle menu function for mobile navigation
function toggleMenu() {
  const nav = document.getElementById("navMenu");
  const hamburger = document.querySelector(".hamburger");
  const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
  nav.classList.toggle("active");
  hamburger.setAttribute("aria-expanded", !isExpanded);
  document.body.style.overflow = nav.classList.contains("active") ? "hidden" : "";
}

// Main logic
document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("header");
  const navbar = document.querySelector("nav.header");
  const navLinks = document.querySelectorAll(".nav-links a");
  const navLinksContainer = document.querySelector(".nav-links");
  const authButtons = document.querySelector(".auth-buttons");

  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  
  // Replace "Get Started" with avatar if logged in
  if (isLoggedIn) {
    const avatarId = localStorage.getItem("avatarId") || Math.floor(Math.random() * 100);
    const gender = Math.random() > 0.5 ? "men" : "women";
    
    // Remove the "Get Started" button
    authButtons.innerHTML = `
      <div class="user-avatar">
        <img src="https://randomuser.me/api/portraits/${gender}/${avatarId}.jpg" alt="User Avatar" />
        <div class="dropdown-menu">
          <a href="Profile/hirebase.html"><i class="fas fa-user"></i> My Profile</a>
          <a href="#" id="logout-btn"><i class="fas fa-sign-out-alt"></i> Logout</a>
        </div>
      </div>
    `;
    
    // Add event listener for logout
    document.getElementById("logout-btn").addEventListener("click", function() {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("avatarId");
      window.location.reload();
    });
    
    // Add event listener for avatar dropdown
    const avatar = document.querySelector(".user-avatar");
    avatar.addEventListener("click", function(e) {
      const dropdown = this.querySelector(".dropdown-menu");
      dropdown.classList.toggle("active");
      e.stopPropagation();
    });
    
    // Close dropdown when clicking outside
    document.addEventListener("click", function(e) {
      const dropdown = document.querySelector(".dropdown-menu");
      if (dropdown && dropdown.classList.contains("active")) {
        dropdown.classList.remove("active");
      }
    });
  }

  // Scroll To Top Button
  const scrollToTopBtn = document.createElement("button");
  scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollToTopBtn.className = "scroll-to-top";
  scrollToTopBtn.setAttribute("aria-label", "Scroll to top");
  document.body.appendChild(scrollToTopBtn);

  // Fluid Pill Effect
  function updatePill(event) {
    if (!navLinksContainer) return;

    const navRect = navLinksContainer.getBoundingClientRect();
    let targetLink;

    if (event.type === "mouseleave") {
      navLinksContainer.style.setProperty("--pill-width", "0px");
      navLinksContainer.style.setProperty("--pill-left", "0px");
      return;
    }

    if (event.target.tagName === "A") {
      targetLink = event.target;
    } else {
      return;
    }

    const linkRect = targetLink.getBoundingClientRect();
    const linkLeft = linkRect.left - navRect.left;
    const linkWidth = linkRect.width;

    navLinksContainer.style.setProperty("--pill-width", `${linkWidth}px`);
    navLinksContainer.style.setProperty("--pill-left", `${linkLeft}px`);
  }

  if (navLinksContainer) {
    navLinksContainer.addEventListener("mousemove", updatePill);
    navLinksContainer.addEventListener("mouseleave", updatePill);
    navLinks.forEach((link) => {
      link.addEventListener("mouseenter", updatePill);
      link.addEventListener("focus", updatePill);
    });
  }

  // Remove active when on top
  function removeActiveClass() {
    if (window.pageYOffset <= 100) {
      navLinks.forEach(link => link.classList.remove("active"));
    }
  }

  removeActiveClass();

  // Scroll Events
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.style.opacity = "1";
      scrollToTopBtn.style.visibility = "visible";
    } else {
      scrollToTopBtn.style.opacity = "0";
      scrollToTopBtn.style.visibility = "hidden";
    }

    if (window.pageYOffset > 100) {
      header.classList.add("sticky");
      navbar.classList.add("scrolled");
      navbar.classList.remove("transparent");

      document.querySelectorAll(".nav-links.minimal a").forEach(link => link.style.display = "inline-flex");
      document.querySelectorAll(".auth-buttons.minimal-auth a").forEach(button => button.style.display = "inline-flex");

      const currentPath = window.location.pathname;
      navLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (currentPath === href || (currentPath === "/" && href === "#") || (currentPath.includes(href) && href !== "#")) {
          link.classList.add("active");
        }
      });
    } else {
      header.classList.remove("sticky");
      navbar.classList.add("transparent");
      navbar.classList.remove("scrolled");

      document.querySelectorAll(".nav-links.minimal a:not(:first-child)").forEach(link => link.style.display = "none");
      document.querySelectorAll(".auth-buttons.minimal-auth a:not(:first-child)").forEach(button => button.style.display = "none");

      removeActiveClass();
    }
  });

  scrollToTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768 && document.getElementById("navMenu").classList.contains("active")) {
        toggleMenu();
      }
    });
  });

  document.addEventListener("click", (event) => {
    const nav = document.getElementById("navMenu");
    const hamburger = document.querySelector(".hamburger");
    if (nav && nav.classList.contains("active") && !nav.contains(event.target) && !hamburger.contains(event.target)) {
      toggleMenu();
    }
  });

  // Animate On Scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(element => {
      element.style.opacity = 0;
      element.style.transform = "translateY(20px)";
      element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(element);
    });
  };
  animateOnScroll();

  // Smooth anchor scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  if (window.pageYOffset > 100) {
    header.classList.add("sticky");
    navbar.classList.add("scrolled");
    navbar.classList.remove("transparent");
  } else {
    navbar.classList.add("transparent");
    removeActiveClass();
  }

  document.documentElement.style.setProperty('--pill-width', '0px');
  document.documentElement.style.setProperty('--pill-left', '0px');
});