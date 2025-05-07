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
  const resetBtn = document.getElementById('resetBtn');
  const sampleDataBtn = document.getElementById('sampleDataBtn');
  const addEducationBtn = document.getElementById('addEducationBtn');
  const addExperienceBtn = document.getElementById('addExperienceBtn');
  const resumePreview = document.getElementById('resumePreview');
  const formGroups = document.querySelectorAll('.form-group');
  const darkModeToggle = document.getElementById('darkModeToggle');
  
  // ===== Navbar Functionality (unchanged from original) =====
  
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
  
  // Generate Resume with enhanced animation
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
          animateError();
          alert('Please fill in at least your name and email');
          return;
      }
      
      // Create particles for visual feedback
      createParticles(generateBtn);
      
      let resumeHTML = `
          <div class="generated-resume">
              <h1>${fullName}</h1>
              <div class="contact-info">
                  ${email ? `<p><i class="fas fa-envelope"></i> ${email}</p>` : ''}
                  ${phone ? `<p><i class="fas fa-phone"></i> ${phone}</p>` : ''}
                  ${address ? `<p><i class="fas fa-map-marker-alt"></i> ${address}</p>` : ''}
              </div>
      `;
      
      if (degree || university || gradYear) {
          resumeHTML += `
              <section class="education-section">
                  <h2><i class="fas fa-graduation-cap"></i> Education</h2>
                  <div class="education">
                      ${degree ? `<p class="degree">${degree}</p>` : ''}
                      ${university ? `<p class="university"><i class="fas fa-university"></i> ${university}</p>` : ''}
                      ${gradYear ? `<p class="dates">Graduated: ${gradYear}</p>` : ''}
                  </div>
              </section>
          `;
      }
      
      if (jobTitle || company || jobDescription) {
          resumeHTML += `
              <section class="experience-section">
                  <h2><i class="fas fa-briefcase"></i> Work Experience</h2>
                  <div class="job">
                      ${jobTitle ? `<p class="job-title">${jobTitle}</p>` : ''}
                      ${company ? `<p class="company"><i class="fas fa-building"></i> ${company}</p>` : ''}
                      ${jobDescription ? `<p class="job-description">${jobDescription}</p>` : ''}
                  </div>
              </section>
          `;
      }
      
      resumeHTML += `</div>`;
      
      if (resumePreview) {
          // Add transition effect
          resumePreview.classList.add('page-transition');
          
          setTimeout(() => {
              resumePreview.innerHTML = resumeHTML;
              resumePreview.classList.remove('page-transition');
              
              // Animate in the new content
              const sections = resumePreview.querySelectorAll('section');
              sections.forEach((section, index) => {
                  setTimeout(() => {
                      section.style.animation = `slideUp 0.6s cubic-bezier(0.23, 1, 0.32, 1) ${index * 0.1}s both`;
                      section.style.opacity = 1;
                      section.style.transform = 'translateY(0)';
                  }, 50);
              });
              
              if (downloadBtn) downloadBtn.disabled = false;
          }, 300);
      }
  }
  
  // Create particles animation
  function createParticles(element) {
      const rect = element.getBoundingClientRect();
      const particles = [];
      const colors = ['#4361ee', '#2ec4b6', '#ffffff'];
      
      for (let i = 0; i < 15; i++) {
          const particle = document.createElement('div');
          particle.classList.add('particle');
          
          // Random properties
          const size = Math.random() * 8 + 4;
          const color = colors[Math.floor(Math.random() * colors.length)];
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * 50 + 30;
          const duration = Math.random() * 1 + 0.5;
          
          // Set styles
          particle.style.width = `${size}px`;
          particle.style.height = `${size}px`;
          particle.style.backgroundColor = color;
          particle.style.left = `${rect.left + rect.width / 2}px`;
          particle.style.top = `${rect.top + rect.height / 2}px`;
          particle.style.opacity = '0';
          
          // Add to document
          document.body.appendChild(particle);
          
          // Animate
          setTimeout(() => {
              particle.style.transition = `all ${duration}s cubic-bezier(0.1, 0.8, 0.2, 1)`;
              particle.style.opacity = '0.8';
              particle.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0.1)`;
              
              // Remove after animation
              setTimeout(() => {
                  particle.remove();
              }, duration * 900);
          }, 10);
          
          particles.push(particle);
      }
  }
  
  // Animate error state
  function animateError() {
      const inputs = form.querySelectorAll('input[required], textarea[required]');
      
      inputs.forEach(input => {
          if (!input.value) {
              input.classList.add('error');
              setTimeout(() => {
                  input.classList.remove('error');
              }, 1000);
          }
      });
  }
  
  // Download Resume
  function downloadResume() {
      if (!resumePreview.querySelector('.generated-resume')) {
          alert('Please generate a resume first');
          return;
      }
      
      // Create visual feedback
      createParticles(downloadBtn);
      
      // In a real implementation, this would use a PDF library like jsPDF or html2pdf
      alert('In a complete application, this would generate a PDF. For now, use Ctrl+P to save as PDF.');
  }
  
  // Reset Form
  function resetForm() {
      form.reset();
      if (resumePreview) {
          resumePreview.innerHTML = `
              <div class="preview-placeholder">
                  <i class="fas fa-file-alt"></i>
                  <p>Your professional resume will appear here</p>
              </div>
          `;
      }
      if (downloadBtn) downloadBtn.disabled = true;
  }
  
  // Load Sample Data
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
      document.getElementById('jobDescription').value = 'Developed web applications using JavaScript and React.\nCollaborated with cross-functional teams to deliver high-quality software solutions.\nImplemented responsive designs and optimized front-end performance.';
      
      // Visual feedback
      createParticles(sampleDataBtn);
  }
  
  // Toggle Dark Mode
  function toggleDarkMode() {
      document.body.classList.toggle('dark-mode');
      
      // Store preference
      const isDarkMode = document.body.classList.contains('dark-mode');
      localStorage.setItem('darkMode', isDarkMode);
  }
  
  // Connect event listeners
  if (generateBtn) generateBtn.addEventListener('click', generateResume);
  if (downloadBtn) downloadBtn.addEventListener('click', downloadResume);
  if (resetBtn) resetBtn.addEventListener('click', resetForm);
  if (sampleDataBtn) sampleDataBtn.addEventListener('click', loadSampleData);
  if (darkModeToggle) darkModeToggle.addEventListener('change', toggleDarkMode);
  
  // Check for saved dark mode preference
  if (localStorage.getItem('darkMode') === 'true') {
      document.body.classList.add('dark-mode');
      if (darkModeToggle) darkModeToggle.checked = true;
  }
  
  // Add animation class to body for page transitions
  document.body.classList.add('page-transition');
  
  // Add CSS for particles
  const style = document.createElement('style');
  style.textContent = `
      .particle {
          position: fixed;
          border-radius: 50%;
          pointer-events: none;
          z-index: 1000;
          transform: translate(-50%, -50%);
          will-change: transform, opacity;
      }
      
      input.error {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
          border-color: #ff3860 !important;
          box-shadow: 0 0 0 3px rgba(255, 56, 96, 0.15) !important;
      }
      
      @keyframes shake {
          10%, 90% { transform: translateX(-1px); }
          20%, 80% { transform: translateX(2px); }
          30%, 50%, 70% { transform: translateX(-4px); }
          40%, 60% { transform: translateX(4px); }
      }
  `;
  document.head.appendChild(style);
});