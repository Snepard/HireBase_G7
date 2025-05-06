// Function to load and display job data
function loadJobData() {
  // Get the job data from sessionStorage
  const jobData = JSON.parse(sessionStorage.getItem('currentJob'));
  
  if (jobData) {
    try {
      // Update the page title
      document.title = `${jobData.title} - ${jobData.company_name} | HireBase`;
      
      // Update the main job details
      document.getElementById('job-title').textContent = jobData.title;
      document.getElementById('company-name').textContent = jobData.company_name;
      document.getElementById('sidebar-company-name').textContent = jobData.company_name;
      document.getElementById('job-poster-name').textContent = jobData.posted_by;
      document.getElementById('job-posted-date').textContent = jobData.posted_date;
      document.getElementById('job-experience-level').textContent = jobData.experience_level;
      document.getElementById('job-specialization').textContent = jobData.specialization;
      document.getElementById('job-work-setting').textContent = jobData.work_setting;
      document.getElementById('job-description').textContent = jobData.description;
      document.getElementById('about-company').textContent = jobData.about_company;
      
      // Update images
      document.getElementById('banner-image').src = jobData.banner_image_url;
      document.getElementById('poster-avatar').src = jobData.poster_avatar_url;
      
      // Update the job meta tags
      const jobMeta = document.getElementById('job-meta');
      jobMeta.innerHTML = `
        <span class="pill"><i class="fas fa-user-tie"></i> ${jobData.experience_level}</span>
        <span class="pill"><i class="fas fa-clock"></i> ${jobData.employment_type}</span>
        <span class="pill"><i class="fas fa-dollar-sign"></i> ${jobData.salary_range}</span>
        <span class="pill"><i class="fas fa-hospital"></i> ${jobData.specialization}</span>
        <span class="pill"><i class="fas fa-map-marker-alt"></i> ${jobData.location}</span>
      `;
      
      // Update the skills list
      const skillsList = document.getElementById('job-skills');
      skillsList.innerHTML = jobData.skills_required.map(skill => `<li>${skill}</li>`).join('');
      
      // Update the responsibilities list
      const responsibilitiesList = document.getElementById('job-responsibilities');
      responsibilitiesList.innerHTML = jobData.responsibilities.map(resp => `<li>${resp}</li>`).join('');
      
      // Load sidebar jobs
      loadSidebarJobs(jobData);
    } catch (error) {
      console.error('Error updating job details:', error);
    }
  } else {
    // If no job data found, try to load from data.json
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        if (data && data.jobs && data.jobs.length > 0) {
          // Store the first job as the current job
          sessionStorage.setItem('currentJob', JSON.stringify(data.jobs[0]));
          // Retry loading job data
          loadJobData();
        } else {
          // Redirect if no jobs found
          window.location.href = 'index.html';
        }
      })
      .catch(error => {
        console.error('Error loading job data:', error);
        window.location.href = 'index.html';
      });
  }
}

// Function to load sidebar jobs
function loadSidebarJobs(jobData) {
  const sidebarJobsContainer = document.getElementById('sidebar-jobs-container');
  sidebarJobsContainer.innerHTML = ''; // Clear existing content
  
  // Check if the job has sidebar jobs
  if (jobData.sidebar_jobs && jobData.sidebar_jobs.length > 0) {
    // Create HTML for each sidebar job
    jobData.sidebar_jobs.forEach(sidebarJob => {
      const sidebarJobHTML = `
        <div class="sidebar-job-card">
          <div class="sidebar-job-content">
            <div class="sidebar-job-header">
              <div class="sidebar-job-location">${sidebarJob.location}</div>
              <div class="sidebar-job-posted">${sidebarJob.posted_date}</div>
            </div>
            <h3 class="sidebar-job-title">${sidebarJob.title}</h3>
            <div class="sidebar-job-meta">
              <span>${jobData.experience_level}</span>
              <span>${sidebarJob.employment_type}</span>
              <span>${sidebarJob.salary_range}</span>
            </div>
          </div>
          <div class="sidebar-job-footer">
            <div class="sidebar-job-user">
              <img src="${sidebarJob.poster_avatar_url || jobData.poster_avatar_url}" alt="${sidebarJob.posted_by}" />
              ${sidebarJob.posted_by}
            </div>
            <div class="sidebar-job-actions">
              <a href="#" onclick="shareJob('${sidebarJob.title}')">Share</a>
              <a href="#" onclick="saveJob('${sidebarJob.title}')">Save</a>
            </div>
          </div>
        </div>
      `;
      sidebarJobsContainer.innerHTML += sidebarJobHTML;
    });
  } else {
    // Display a message if no sidebar jobs are available
    sidebarJobsContainer.innerHTML = `<p class="no-jobs-message">No other jobs available at ${jobData.company_name} at this time.</p>`;
  }
}

// Function to handle job sharing
function shareJob(jobTitle) {
  alert(`Sharing job: ${jobTitle}`);
  // In a real app, this would open a sharing modal or functionality
}

// Function to handle job saving
function saveJob(jobTitle) {
  alert(`Job saved: ${jobTitle}`);
  // In a real app, this would save the job to user's saved jobs
}

// Function to change current job
function changeJob(jobId) {
  // Get all jobs from sessionStorage
  const allJobs = JSON.parse(sessionStorage.getItem('allJobs'));
  
  if (allJobs) {
    // Find the job with the matching ID
    const selectedJob = allJobs.find(job => job.job_id === jobId);
    
    if (selectedJob) {
      // Set as current job and reload
      sessionStorage.setItem('currentJob', JSON.stringify(selectedJob));
      loadJobData();
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Load and display the job data
  loadJobData();
  
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
  
  // Toggle mobile menu
  window.toggleMenu = function() {
      navMenu.classList.toggle("active");
      hamburger.setAttribute("aria-expanded", 
          hamburger.getAttribute("aria-expanded") === "false" ? "true" : "false");
  };
  
  // Handle "Apply now" button click
  const applyNowBtn = document.querySelector('.apply-now-btn');
  if (applyNowBtn) {
    applyNowBtn.addEventListener('click', function() {
      const currentJob = JSON.parse(sessionStorage.getItem('currentJob'));
      if (currentJob) {
        alert(`Applying for ${currentJob.title} at ${currentJob.company_name}`);
        // In a real app, this would open an application form
      }
    });
  }
});