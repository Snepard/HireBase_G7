// Toggle menu function for mobile navigation
function toggleMenu() {
  const nav = document.getElementById("navMenu");
  const hamburger = document.querySelector(".hamburger");
  const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
  nav.classList.toggle("active");
  hamburger.setAttribute("aria-expanded", !isExpanded);
  document.body.style.overflow = nav.classList.contains("active")
    ? "hidden"
    : "";
}

// Initialize animations, scroll behavior, and navbar functionality
document.addEventListener("DOMContentLoaded", function () {
  // Get navbar elements
  const header = document.querySelector("header");
  const navbar = document.querySelector("nav.header");
  const navLinks = document.querySelectorAll(".nav-links a");
  const navLinksContainer = document.querySelector(".nav-links");
  
  // Scroll to top button
  const scrollToTopBtn = document.createElement("button");
  scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollToTopBtn.className = "scroll-to-top";
  scrollToTopBtn.setAttribute("aria-label", "Scroll to top");
  document.body.appendChild(scrollToTopBtn);
  
  // Handle fluid hover effect for navigation pills
  let pillActive = false;
  let activeLinkIndex = -1;
  
  // Create the fluid pill effect
  function updatePill(event) {
    if (!navLinksContainer) return;
    
    const navRect = navLinksContainer.getBoundingClientRect();
    let targetLink;
    
    if (event.type === "mouseleave") {
      // Hide pill when mouse leaves the nav container
      navLinksContainer.style.setProperty("--pill-width", "0px");
      navLinksContainer.style.setProperty("--pill-left", "0px");
      pillActive = false;
      return;
    }
    
    // Find the target link
    if (event.target.tagName === "A") {
      targetLink = event.target;
    } else {
      return;
    }
    
    // Get link metrics
    const linkRect = targetLink.getBoundingClientRect();
    const linkLeft = linkRect.left - navRect.left;
    const linkWidth = linkRect.width;
    
    // Update CSS variables for the pill position and size
    navLinksContainer.style.setProperty("--pill-width", `${linkWidth}px`);
    navLinksContainer.style.setProperty("--pill-left", `${linkLeft}px`);
    pillActive = true;
    
    // Update active link index for keyboard nav
    activeLinkIndex = Array.from(navLinks).indexOf(targetLink);
  }
  
  // Setup event listeners for the fluid pill effect
  if (navLinksContainer) {
    navLinksContainer.addEventListener("mousemove", updatePill);
    navLinksContainer.addEventListener("mouseleave", updatePill);
    
    // Add events to each link
    navLinks.forEach((link, index) => {
      link.addEventListener("mouseenter", updatePill);
      link.addEventListener("focus", updatePill);
    });
  }
  
  // Remove active class from all links on main screen (when at top)
  const removeActiveClass = () => {
    if (window.pageYOffset <= 100) {
      navLinks.forEach(link => {
        link.classList.remove("active");
      });
    }
  };
  
  // Initial check
  removeActiveClass();
  
  // Handle scroll events
  window.addEventListener("scroll", function () {
    // Scroll to top button visibility
    if (window.pageYOffset > 300) {
      scrollToTopBtn.style.opacity = "1";
      scrollToTopBtn.style.visibility = "visible";
    } else {
      scrollToTopBtn.style.opacity = "0";
      scrollToTopBtn.style.visibility = "hidden";
    }
    
    // Navbar appearance on scroll
    if (window.pageYOffset > 100) {
      header.classList.add("sticky");
      navbar.classList.add("scrolled");
      navbar.classList.remove("transparent");
      
      // Show all nav links when scrolled and activate current page
      document.querySelectorAll(".nav-links.minimal a").forEach(link => {
        link.style.display = "inline-flex";
      });
      
      document.querySelectorAll(".auth-buttons.minimal-auth a").forEach(button => {
        button.style.display = "inline-flex";
      });
      
      // Set active page in navigation only when scrolled
      const currentPath = window.location.pathname;
      navLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (currentPath === href || 
            (currentPath === "/" && href === "#") || 
            (currentPath.includes(href) && href !== "#")) {
          link.classList.add("active");
        }
      });
    } else {
      header.classList.remove("sticky");
      navbar.classList.add("transparent");
      navbar.classList.remove("scrolled");
      
      // Hide non-first nav links when at top (if minimal class is present)
      document.querySelectorAll(".nav-links.minimal a:not(:first-child)").forEach(link => {
        link.style.display = "none";  
      });
      
      document.querySelectorAll(".auth-buttons.minimal-auth a:not(:first-child)").forEach(button => {
        button.style.display = "none";
      });
      
      // Remove active class when at top
      removeActiveClass();
    }
  });
  
  // Scroll to top functionality
  scrollToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
  
  // Close mobile menu when clicking nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768 && document.getElementById("navMenu").classList.contains("active")) {
        toggleMenu();
      }
    });
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener("click", (event) => {
    const nav = document.getElementById("navMenu");
    const hamburger = document.querySelector(".hamburger");
    if (
      nav.classList.contains("active") &&
      !nav.contains(event.target) &&
      !hamburger.contains(event.target)
    ) {
      toggleMenu();
    }
  });
  
  // Animation observer for fade-in elements
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );
    elements.forEach((element) => {
      element.style.opacity = 0;
      element.style.transform = "translateY(20px)";
      element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(element);
    });
  };
  animateOnScroll();
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
  
  // Initial check for scroll position on page load
  if (window.pageYOffset > 100) {
    header.classList.add("sticky");
    navbar.classList.add("scrolled");
    navbar.classList.remove("transparent");
  } else {
    navbar.classList.add("transparent");
    // Remove active class when at top initially
    removeActiveClass();
  }
  
  // Add CSS variables for pill animation to the :root
  document.documentElement.style.setProperty('--pill-width', '0px');
  document.documentElement.style.setProperty('--pill-left', '0px');
});