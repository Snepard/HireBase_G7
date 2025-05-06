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
  
  // Set active page in navigation and initialize pill for active link
  const currentPath = window.location.pathname;
  let activeLink = null;
  
  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (currentPath === href || 
        (currentPath === "/" && href === "#") || 
        (currentPath.includes(href) && href !== "#")) {
      link.classList.add("active");
      activeLink = link;
    }
  });
  
  // Initialize the pill on the active link if one exists
  if (activeLink && navLinksContainer) {
    const navRect = navLinksContainer.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();
    const linkLeft = linkRect.left - navRect.left;
    const linkWidth = linkRect.width;
    
    navLinksContainer.style.setProperty("--pill-width", `${linkWidth}px`);
    navLinksContainer.style.setProperty("--pill-left", `${linkLeft}px`);
    navLinksContainer.style.setProperty("--pill-transition", "none"); // No animation on load
    
    // Re-enable transitions after initial positioning
    setTimeout(() => {
      navLinksContainer.style.setProperty("--pill-transition", "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)");
    }, 50);
  }
  
  // Function to handle the fluid pill effect
  function updatePill(event) {
    if (!navLinksContainer) return;
    
    const navRect = navLinksContainer.getBoundingClientRect();
    let targetLink;
    
    if (event.type === "mouseleave") {
      // When mouse leaves, move pill back to active link if exists
      if (activeLink) {
        const linkRect = activeLink.getBoundingClientRect();
        const linkLeft = linkRect.left - navRect.left;
        const linkWidth = linkRect.width;
        
        navLinksContainer.style.setProperty("--pill-width", `${linkWidth}px`);
        navLinksContainer.style.setProperty("--pill-left", `${linkLeft}px`);
      } else {
        // Or hide it if no active link
        navLinksContainer.style.setProperty("--pill-width", "0px");
        navLinksContainer.style.setProperty("--pill-left", "0px");
      }
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
    // Show the pill on hover
    navLinksContainer.style.setProperty("--pill-opacity", "0");
    
    // Add event listeners to container
    navLinksContainer.addEventListener("mouseover", function() {
      navLinksContainer.style.setProperty("--pill-opacity", "1");
    });
    
    navLinksContainer.addEventListener("mouseleave", updatePill);
    
    // Add event listeners to each link
    navLinks.forEach(link => {
      link.addEventListener("mouseenter", updatePill);
      link.addEventListener("focus", updatePill);
    });
  }
  
  // Rest of your existing code for mobile menu toggle...
});