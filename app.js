function toggleMenu() {
  const nav = document.getElementById("navMenu");
  const hamburger = document.querySelector(".hamburger");
  const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
  
  nav.classList.toggle("active");
  hamburger.setAttribute("aria-expanded", !isExpanded);
  
  document.body.style.overflow = nav.classList.contains("active") ? "hidden" : "";
}  