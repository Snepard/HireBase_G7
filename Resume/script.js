document.addEventListener("DOMContentLoaded", function () {
  // ===== Navbar Elements =====
  const header = document.querySelector("header");
  const navbar = document.querySelector("nav.header");
  const navLinks = document.querySelector(".nav-links");
  const links = navLinks ? navLinks.querySelectorAll("a") : [];
  const hamburger = document.querySelector(".hamburger");
  
  // ===== Resume Builder Elements =====
  const form = document.getElementById('resumeForm');
  const generateBtn = document.getElementById('generateBtn');
  const downloadBtn = document.getElementById('downloadBtn');
  const resumePreview = document.getElementById('resumePreview');
  const formGroups = document.querySelectorAll('.form-group');
  
  // ===== Navbar Functionality =====
  
  // Apply sticky and scrolled classes
  if (header) header.classList.add("sticky");
  if (navbar) {
    navbar.classList.add("scrolled");
    navbar.classList.remove("transparent");
  }
  
  // Determine active link
  const currentPath = window.location.pathname;
  let activeLink = null;
  
  if (links.length > 0) {
    links.forEach(link => {
      const href = link.getAttribute("href");
      if (currentPath === href || 
          (currentPath === "/" && href === "#") || 
          (currentPath.includes(href) && href !== "#")) {
        link.classList.add("active");
        activeLink = link;
      }
    });
  }
  
  // Initialize the pill effect with active link
  if (activeLink && navLinks) {
    const navRect = navLinks.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();
    const linkLeft = linkRect.left - navRect.left;
    const linkWidth = linkRect.width;
    
    navLinks.style.setProperty("--pill-width", `${linkWidth}px`);
    navLinks.style.setProperty("--pill-left", `${linkLeft}px`);
    navLinks.style.setProperty("--pill-transition", "none");
    
    setTimeout(() => {
      navLinks.style.setProperty("--pill-transition", "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)");
    }, 50);
  }
  
  // Pill hover effect functions
  function updatePill(e) {
    if (!navLinks) return;
    
    const hovered = e.target.closest("a");
    if (hovered) {
      const { offsetLeft: left, offsetWidth: width } = hovered;
      navLinks.style.setProperty("--pill-left", `${left}px`);
      navLinks.style.setProperty("--pill-width", `${width}px`);
    }
  }
  
  function resetPill() {
    if (!navLinks) return;
    
    if (activeLink) {
      const navRect = navLinks.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      const linkLeft = linkRect.left - navRect.left;
      const linkWidth = linkRect.width;
      
      navLinks.style.setProperty("--pill-width", `${linkWidth}px`);
      navLinks.style.setProperty("--pill-left", `${linkLeft}px`);
    } else {
      navLinks.style.setProperty("--pill-width", "0px");
    }
  }
  
  // Apply event listeners for pill effect
  if (navLinks) {
    navLinks.style.setProperty("--pill-opacity", "0");
    
    navLinks.addEventListener("mouseover", function() {
      navLinks.style.setProperty("--pill-opacity", "1");
    });
    
    navLinks.addEventListener("mousemove", updatePill);
    navLinks.addEventListener("mouseleave", resetPill);
    
    links.forEach(link => {
      link.addEventListener("mouseenter", updatePill);
      link.addEventListener("focus", updatePill);
    });
  }
  
  // Mobile menu toggle
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function() {
      navLinks.classList.toggle("mobile-active");
    });
  }
  
  // Scroll effects for header
  let lastScrollY = window.scrollY;
  
  window.addEventListener("scroll", function() {
    if (window.scrollY > 100) {
      if (header) header.classList.add("scrolled");
    } else {
      if (header) header.classList.remove("scrolled");
    }
    lastScrollY = window.scrollY;
  });
  
  // ===== Resume Builder Functionality =====
  
  // Form field animations
  formGroups.forEach((group) => {
    const input = group.querySelector("input, textarea");
    if (input) {
      input.addEventListener("focus", function() {
        group.classList.add("focus");
      });
      
      input.addEventListener("blur", function() {
        group.classList.remove("focus");
      });
    }
  });
  
  // Generate Resume
  function generateResume() {
    // Get all form values
    const fullName = document.getElementById('fullName')?.value || '';
    const email = document.getElementById('email')?.value || '';
    const phone = document.getElementById('phone')?.value || '';
    const address = document.getElementById('address')?.value || '';
    const degree = document.getElementById('degree')?.value || '';
    const university = document.getElementById('university')?.value || '';
    const gradYear = document.getElementById('gradYear')?.value || '';
    const jobTitle = document.getElementById('jobTitle')?.value || '';
    const company = document.getElementById('company')?.value || '';
    const jobDescription = document.getElementById('jobDescription')?.value || '';
    
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
    
    if (resumePreview) {
      resumePreview.innerHTML = resumeHTML;
      resumePreview.classList.add('page-transition');
      
      // Reset animation
      setTimeout(() => {
        resumePreview.classList.remove('page-transition');
      }, 600);
      
      if (downloadBtn) downloadBtn.disabled = false;
    }
  }
  
  // Download Resume
  function downloadResume() {
    alert('In a complete application, this would generate a PDF. For now, use Ctrl+P to save as PDF.');
  }
  
  // Button ripple effect
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      button.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
  
  // Connect event listeners
  if (generateBtn) generateBtn.addEventListener('click', generateResume);
  if (downloadBtn) downloadBtn.addEventListener('click', downloadResume);
  
  // Optional: Dark mode toggle functionality
  const darkModeToggle = document.getElementById('darkModeToggle');
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      
      // Store preference
      const isDarkMode = document.body.classList.contains('dark-mode');
      localStorage.setItem('darkMode', isDarkMode);
    });
    
    // Check for saved preference
    if (localStorage.getItem('darkMode') === 'true') {
      document.body.classList.add('dark-mode');
    }
  }
  
  // Add animation class to body for page transitions
  document.body.classList.add('page-transition');
  
  // Function to load sample data (commented out by default)
  function loadSampleData() {
    if (document.getElementById('fullName')) document.getElementById('fullName').value = 'John Doe';
    if (document.getElementById('email')) document.getElementById('email').value = 'john.doe@example.com';
    if (document.getElementById('phone')) document.getElementById('phone').value = '(123) 456-7890';
    if (document.getElementById('address')) document.getElementById('address').value = '123 Main St, Anytown, USA';
    if (document.getElementById('degree')) document.getElementById('degree').value = 'Bachelor of Science in Computer Science';
    if (document.getElementById('university')) document.getElementById('university').value = 'State University';
    if (document.getElementById('gradYear')) document.getElementById('gradYear').value = '2020';
    if (document.getElementById('jobTitle')) document.getElementById('jobTitle').value = 'Software Developer';
    if (document.getElementById('company')) document.getElementById('company').value = 'Tech Solutions Inc.';
    if (document.getElementById('jobDescription')) document.getElementById('jobDescription').value = 'Developed web applications using JavaScript and React.';
  }
  
  // Uncomment to auto-load sample data
  // loadSampleData();
});