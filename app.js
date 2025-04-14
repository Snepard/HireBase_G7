function toggleMenu() {
  const nav = document.getElementById("navMenu");
  const hamburger = document.querySelector(".hamburger");
  const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
  
  nav.classList.toggle("active");
  hamburger.setAttribute("aria-expanded", !isExpanded);
  
  document.body.style.overflow = nav.classList.contains("active") ? "hidden" : "";
}

//Scroll to top
document.addEventListener('DOMContentLoaded', function() {
  const scrollToTopBtn = document.createElement('button');
  scrollToTopBtn.innerHTML = '↑';
  scrollToTopBtn.className = 'scroll-to-top';
  scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
  document.body.appendChild(scrollToTopBtn);

  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.style.opacity = '1';
      scrollToTopBtn.style.visibility = 'visible';
    } else {
      scrollToTopBtn.style.opacity = '0';
      scrollToTopBtn.style.visibility = 'hidden';
    }
  });

  scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        toggleMenu();
      }
    });
  });
});