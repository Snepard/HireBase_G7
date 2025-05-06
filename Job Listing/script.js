// Fetch job data from external JSON file
async function fetchJobData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error('Failed to fetch job data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading job data:', error);
        // Fallback data in case fetch fails
        return {
            "jobs": [
                {
                    "job_id": "job_001",
                    "title": "Staff Therapist",
                    "company_name": "HealthPlus",
                    "location": "Toronto, CA",
                    "posted_by": "Alan",
                    "posted_date": "2 days ago",
                    "experience_level": "Experienced (3+ years)",
                    "employment_type": "Full-time",
                    "salary_range": "$125K - $150K",
                    "specialization": "Clinical patient care",
                    "work_setting": "Hybrid (Office/Remote)"
                }
            ]
        };
    }
}

// Function to render job cards
async function renderJobCards() {
    const jobsGrid = document.getElementById('jobsGrid');
    const jobCount = document.getElementById('jobCount');
    
    // Clear existing content
    jobsGrid.innerHTML = '';
    
    // Fetch job data
    const jobData = await fetchJobData();
    
    // Update job count
    jobCount.textContent = jobData.jobs.length;
    
    // Create and append job cards
    jobData.jobs.forEach(job => {
        const jobCard = document.createElement('div');
        jobCard.className = 'job-card';
        
        // Create tags from employment type, experience level, and work setting
        const tags = [
            job.employment_type,
            job.experience_level,
            job.work_setting
        ];
        
        if (job.specialization) {
            tags.push(job.specialization);
        }
        
        jobCard.innerHTML = `
            <div class="job-date">
                <span>${job.posted_date}</span>
                <span class="bookmark-icon" data-job-id="${job.job_id}">♥</span>
            </div>
            
            <div class="company-name">${job.company_name}</div>
            <h3 class="job-title">${job.title}</h3>
            
            <div class="job-tags">
                ${tags.map(tag => `<span class="job-tag">${tag}</span>`).join('')}
            </div>
            <div class="show-more-toggle">Show more</div>
            
            <div class="job-info">
                <div class="job-payment">
                    <div class="job-salary">${job.salary_range}</div>
                    <div class="job-location">${job.location}</div>
                </div>
                <button class="job-button">Details</button>
            </div>
        `;
        
        jobsGrid.appendChild(jobCard);
        
        // Get the job tags container and show more toggle
        const jobTagsContainer = jobCard.querySelector('.job-tags');
        const showMoreToggle = jobCard.querySelector('.show-more-toggle');
        
        // Check if show more toggle is needed
        setTimeout(() => {
            // Calculate if tags need show more button
            const tagsList = jobCard.querySelectorAll('.job-tag');
            
            // If there's only one row of tags or less, hide the toggle
            if (tagsList.length <= 2) {
                showMoreToggle.classList.add('hidden');
            }
        }, 0);
        
        // Add click event for show more toggle
        showMoreToggle.addEventListener('click', function() {
            // Toggle expanded class on tags container
            jobTagsContainer.classList.toggle('expanded');
            
            // Update toggle text based on state
            this.textContent = jobTagsContainer.classList.contains('expanded') ? 'Show less' : 'Show more';
        });
    });
    
    // Setup bookmark functionality
    setupBookmarkButtons();
}

// Function to set up bookmark button functionality
function setupBookmarkButtons() {
    const bookmarkIcons = document.querySelectorAll('.bookmark-icon');
    
    bookmarkIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            // Toggle active class
            this.classList.toggle('active');
            
            // Get job ID
            const jobId = this.getAttribute('data-job-id');
            
            // Get current bookmarks from localStorage
            let bookmarks = JSON.parse(localStorage.getItem('jobBookmarks')) || [];
            
            // Check if job is already bookmarked
            const bookmarkIndex = bookmarks.indexOf(jobId);
            
            if (bookmarkIndex === -1) {
                // Add to bookmarks
                bookmarks.push(jobId);
                console.log(`Job ${jobId} bookmarked`);
            } else {
                // Remove from bookmarks
                bookmarks.splice(bookmarkIndex, 1);
                console.log(`Job ${jobId} removed from bookmarks`);
            }
            
            // Save updated bookmarks to localStorage
            localStorage.setItem('jobBookmarks', JSON.stringify(bookmarks));
        });
    });
    
    // Check for existing bookmarks and mark them as active
    const savedBookmarks = JSON.parse(localStorage.getItem('jobBookmarks')) || [];
    bookmarkIcons.forEach(icon => {
        const jobId = icon.getAttribute('data-job-id');
        if (savedBookmarks.includes(jobId)) {
            icon.classList.add('active');
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    // Render job cards
    renderJobCards();
    
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
    function toggleMenu() {
        navMenu.classList.toggle("active");
        hamburger.setAttribute("aria-expanded", 
            hamburger.getAttribute("aria-expanded") === "false" ? "true" : "false");
    }
    
    // Make toggleMenu accessible in the global scope
    window.toggleMenu = toggleMenu;
});
// Add click event for show more toggle
showMoreToggle.addEventListener('click', function (e) {
    const currentCard = e.target.closest('.job-card');
    const tagContainer = currentCard.querySelector('.job-tags');

    tagContainer.classList.toggle('expanded');
    this.textContent = tagContainer.classList.contains('expanded') ? 'Show less' : 'Show more';
});
