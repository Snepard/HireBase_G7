// JavaScript for fluid pill hover effect
document.addEventListener("DOMContentLoaded", function () {
  // Get navbar elements
  const header = document.querySelector("header");
  const navbar = document.querySelector("nav.header");
  const navLinks = document.querySelectorAll(".nav-links a");
  const navLinksContainer = document.querySelector(".nav-links");
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-links");
  
  // Apply sticky and scrolled classes by default
  if (header) header.classList.add("sticky");
  if (navbar) {
    navbar.classList.add("scrolled");
    navbar.classList.remove("transparent");
  }
  
  // Set active page in navigation
  const currentPath = window.location.pathname;
  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (currentPath === href || 
        (currentPath === "/" && href === "#") || 
        (currentPath.includes(href) && href !== "#")) {
      link.classList.add("active");
    }
  });
  
  // Function to handle the fluid pill effect
  function updatePill(event) {
    if (!navLinksContainer) return;
    
    const navRect = navLinksContainer.getBoundingClientRect();
    let targetLink;
    
    if (event.type === "mouseleave") {
      // Reset pill when mouse leaves the navigation
      navLinksContainer.style.setProperty("--pill-width", "0px");
      navLinksContainer.style.setProperty("--pill-left", "0px");
      return;
    }
    
    // Make sure we have the correct target
    if (event.target.tagName === "A") {
      targetLink = event.target;
    } else {
      return;
    }
    
    // Get precise measurements
    const linkRect = targetLink.getBoundingClientRect();
    const linkLeft = linkRect.left - navRect.left;
    const linkWidth = linkRect.width;
    
    // Set the CSS variables for the pill effect
    navLinksContainer.style.setProperty("--pill-width", `${linkWidth}px`);
    navLinksContainer.style.setProperty("--pill-left", `${linkLeft}px`);
  }
  
  // Setup event listeners for the fluid pill effect
  if (navLinksContainer) {
    // Add event listeners to container
    navLinksContainer.addEventListener("mouseover", updatePill);
    navLinksContainer.addEventListener("mouseleave", updatePill);
    
    // Add event listeners to each link
    navLinks.forEach(link => {
      link.addEventListener("mouseenter", updatePill);
      link.addEventListener("focus", updatePill);
    });
  }
  
  // Toggle mobile menu function
  function toggleMenu() {
    if (navMenu) {
      navMenu.classList.toggle("active");
      if (hamburger) {
        const expanded = hamburger.getAttribute("aria-expanded") === "true";
        hamburger.setAttribute("aria-expanded", !expanded);
        hamburger.classList.toggle("active");
      }
    }
  }
  
  // Add mobile menu toggle functionality
  if (hamburger) {
    hamburger.addEventListener("click", toggleMenu);
  }
  
  // Close mobile menu when clicking nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768 && navMenu && navMenu.classList.contains("active")) {
        toggleMenu();
      }
    });
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener("click", (event) => {
    if (
      navMenu && 
      navMenu.classList.contains("active") &&
      !navMenu.contains(event.target) &&
      hamburger && !hamburger.contains(event.target)
    ) {
      toggleMenu();
    }
  });
});