document.addEventListener("DOMContentLoaded", function () {
    // ===== Navbar Functionality from Script 1 =====
    const header = document.querySelector("header");
    const navbar = document.querySelector("nav.header");
    const navLinks = document.querySelectorAll(".nav-links a");
    const navLinksContainer = document.querySelector(".nav-links");
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-links");
  
    // Apply sticky and scrolled classes
    if (header) header.classList.add("sticky");
    if (navbar) {
      navbar.classList.add("scrolled");
      navbar.classList.remove("transparent");
    }
  
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
  
    // Initialize pill
    if (activeLink && navLinksContainer) {
      const navRect = navLinksContainer.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      const linkLeft = linkRect.left - navRect.left;
      const linkWidth = linkRect.width;
  
      navLinksContainer.style.setProperty("--pill-width", `${linkWidth}px`);
      navLinksContainer.style.setProperty("--pill-left", `${linkLeft}px`);
      navLinksContainer.style.setProperty("--pill-transition", "none");
  
      setTimeout(() => {
        navLinksContainer.style.setProperty("--pill-transition", "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)");
      }, 50);
    }
  
    function updatePill(event) {
      if (!navLinksContainer) return;
      const navRect = navLinksContainer.getBoundingClientRect();
      let targetLink;
  
      if (event.type === "mouseleave") {
        if (activeLink) {
          const linkRect = activeLink.getBoundingClientRect();
          const linkLeft = linkRect.left - navRect.left;
          const linkWidth = linkRect.width;
  
          navLinksContainer.style.setProperty("--pill-width", `${linkWidth}px`);
          navLinksContainer.style.setProperty("--pill-left", `${linkLeft}px`);
        } else {
          navLinksContainer.style.setProperty("--pill-width", "0px");
          navLinksContainer.style.setProperty("--pill-left", "0px");
        }
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
      navLinksContainer.style.setProperty("--pill-opacity", "0");
      navLinksContainer.addEventListener("mouseover", function () {
        navLinksContainer.style.setProperty("--pill-opacity", "1");
      });
      navLinksContainer.addEventListener("mouseleave", updatePill);
  
      navLinks.forEach(link => {
        link.addEventListener("mouseenter", updatePill);
        link.addEventListener("focus", updatePill);
      });
    }
  
    // ===== Resume Generator Functionality from Script 2 =====
    const form = document.getElementById('resumeForm');
    const generateBtn = document.getElementById('generateBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const resumePreview = document.getElementById('resumePreview');
  
    generateBtn.addEventListener('click', generateResume);
    downloadBtn.addEventListener('click', downloadResume);
  
    function generateResume() {
      const fullName = document.getElementById('fullName').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const address = document.getElementById('address').value;
      const degree = document.getElementById('degree').value;
      const university = document.getElementById('university').value;
      const gradYear = document.getElementById('gradYear').value;
      const jobTitle = document.getElementById('jobTitle').value;
      const company = document.getElementById('company').value;
      const jobDescription = document.getElementById('jobDescription').value;
  
      if (!fullName || !email) {
        alert('Please fill in at least your name and email');
        return;
      }
  
      let resumeHTML = `
        <div class="generated-resume">
          <h1>${fullName}</h1>
          <div class="contact-info">
            ${email ? `<p>Email: ${email}</p>` : ''}
            ${phone ? `<p>Phone: ${phone}</p>` : ''}
            ${address ? `<p>Address: ${address}</p>` : ''}
          </div>
      `;
  
      if (degree || university || gradYear) {
        resumeHTML += `
          <section class="education-section">
            <h2>Education</h2>
            <div class="education">
              ${degree ? `<p class="degree">${degree}</p>` : ''}
              ${university ? `<p class="university">${university}</p>` : ''}
              ${gradYear ? `<p class="dates">Graduated: ${gradYear}</p>` : ''}
            </div>
          </section>
        `;
      }
  
      if (jobTitle || company || jobDescription) {
        resumeHTML += `
          <section class="experience-section">
            <h2>Work Experience</h2>
            <div class="job">
              ${jobTitle ? `<p class="job-title">${jobTitle}</p>` : ''}
              ${company ? `<p class="company">${company}</p>` : ''}
              ${jobDescription ? `<p class="job-description">${jobDescription}</p>` : ''}
            </div>
          </section>
        `;
      }
  
      resumeHTML += `</div>`;
      resumePreview.innerHTML = resumeHTML;
      downloadBtn.disabled = false;
    }
  
    function downloadResume() {
      alert('In a complete application, this would generate a PDF. For now, use Ctrl+P to save as PDF.');
    }
  
    // Uncomment to auto-load sample data
    // loadSampleData();
  
    function loadSampleData() {
      document.getElementById('fullName').value = 'John Doe';
      document.getElementById('email').value = 'john.doe@example.com';
      document.getElementById('phone').value = '(123) 456-7890';
      document.getElementById('address').value = '123 Main St, Anytown, USA';
      document.getElementById('degree').value = 'Bachelor of Science in Computer Science';
      document.getElementById('university').value = 'State University';
      document.getElementById('gradYear').value = '2020';
      document.getElementById('jobTitle').value = 'Software Developer';
      document.getElementById('company').value = 'Tech Solutions Inc.';
      document.getElementById('jobDescription').value = 'Developed web applications using JavaScript and React.';
    }
  });
  