const applicationsList = document.getElementById('applications-list');
const addApplicationBtn = document.getElementById('add-application-btn');
const addApplicationModal = document.getElementById('add-application-modal');
const applicationForm = document.getElementById('application-form');
const detailsModal = document.getElementById('application-details-modal');
const tabButtons = document.querySelectorAll('.tab-nav button');
const viewToggleBtn = document.getElementById('view-toggle');
const filterBtn = document.getElementById('filter-btn');
const sortBtn = document.getElementById('sort-btn');
const searchInput = document.getElementById('search-input');
const notificationsBtn = document.getElementById('notifications-btn');
const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdownContent = document.querySelector('.dropdown-content');
const closeModalButtons = document.querySelectorAll('.close-modal');
const editApplicationBtn = document.getElementById('edit-application-btn');
const addTimelineEventBtn = document.getElementById('add-timeline-event-btn');

let applications = [
  {
    id: 1,
    jobTitle: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    status: "interview",
    date: "2023-05-15",
    updated: "2023-05-18",
    priority: "high",
    notes: "Had a great conversation with the recruiter about the company culture. The technical stack aligns perfectly with my skills.",
    url: "https://example.com/job/123",
    timeline: [
      { event: "Application Submitted", date: "2023-05-15", active: true },
      { event: "Recruiter Screening", date: "2023-05-17", active: true },
      { event: "Technical Interview", date: "2023-05-22", active: true, current: true }
    ]
  },
  {
    id: 2,
    jobTitle: "Product Manager",
    company: "DesignHub",
    location: "Remote",
    type: "Full-time",
    status: "applied",
    date: "2023-05-10",
    updated: "2023-05-10",
    priority: "medium",
    notes: "Exciting opportunity to lead a new product team.",
    url: "https://example.com/job/456"
  },
  {
    id: 3,
    jobTitle: "UX Designer",
    company: "CreativeMinds",
    location: "New York, NY",
    type: "Contract",
    status: "offer",
    date: "2023-04-28",
    updated: "2023-05-15",
    priority: "high",
    notes: "Received offer, negotiating terms.",
    url: "https://example.com/job/789"
  },
  {
    id: 4,
    jobTitle: "Backend Engineer",
    company: "DataSystems",
    location: "Boston, MA",
    type: "Full-time",
    status: "rejected",
    date: "2023-04-20",
    updated: "2023-05-05",
    priority: "medium",
    notes: "Rejected after technical interview. Need to work on system design skills.",
    url: "https://example.com/job/101"
  }
];
let currentTab = 'all';
let currentView = 'list'; 
let currentApplicationId = null;
document.addEventListener('DOMContentLoaded', () => {
  renderApplications();
  setupEventListeners();
});
function setupEventListeners() {
  addApplicationBtn.addEventListener('click', () => toggleModal(addApplicationModal));
  closeModalButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal');
      toggleModal(modal);
    });
  });
  applicationForm.addEventListener('submit', handleFormSubmit);
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      currentTab = button.dataset.tab;
      renderApplications();
    });
  });
  viewToggleBtn.addEventListener('click', toggleView);
  filterBtn.addEventListener('click', () => alert('Filter functionality will be implemented'));
  sortBtn.addEventListener('click', () => alert('Sort functionality will be implemented'));
  searchInput.addEventListener('input', () => {
    renderApplications();
  });
  dropdownToggle.addEventListener('click', () => {
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown-menu')) {
      dropdownContent.style.display = 'none';
    }
  });
  notificationsBtn.addEventListener('click', () => {
    alert('You have 3 new notifications');
  });
  editApplicationBtn.addEventListener('click', () => {
    toggleModal(detailsModal);
    alert('Edit functionality will be implemented');
  });

  addTimelineEventBtn.addEventListener('click', () => {
    alert('Add timeline event functionality will be implemented');
  });
}

function toggleModal(modal) {
  if (modal.style.display === 'block') {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  } else {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
}
function handleFormSubmit(e) {
  e.preventDefault();
  const newApplication = {
    id: applications.length + 1,
    jobTitle: document.getElementById('job-title').value,
    company: document.getElementById('company-name').value,
    location: document.getElementById('location').value,
    type: document.getElementById('job-type').value || 'Not specified',
    status: document.getElementById('status').value,
    date: document.getElementById('application-date').value || new Date().toISOString().split('T')[0],
    updated: new Date().toISOString().split('T')[0],
    priority: document.querySelector('input[name="priority"]:checked').value,
    notes: document.getElementById('notes').value,
    url: document.getElementById('job-url').value
  };
  applications.unshift(newApplication);

  applicationForm.reset();
  toggleModal(addApplicationModal);

  renderApplications();

  alert('Application added successfully!');
}
function renderApplications() {
  applicationsList.innerHTML = '';

  let filteredApplications = applications;

  if (currentTab !== 'all') {
    filteredApplications = applications.filter(app => app.status === currentTab);
  }
  const searchTerm = searchInput.value.toLowerCase();
  if (searchTerm) {
    filteredApplications = filteredApplications.filter(app =>
      app.jobTitle.toLowerCase().includes(searchTerm) ||
      app.company.toLowerCase().includes(searchTerm)
    );
  }

  if (filteredApplications.length === 0) {
    applicationsList.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-clipboard-list"></i>
        <h3>No applications found</h3>
        <p>Try adjusting your search or add a new application</p>
      </div>
    `;
    return;
  }

  filteredApplications.forEach((application, index) => {
    const applicationElement = createApplicationElement(application);
    applicationsList.appendChild(applicationElement);

    applicationElement.addEventListener('click', () => {
      showApplicationDetails(application);
      toggleModal(detailsModal);
    });

    applicationElement.style.animationDelay = `${index * 0.1}s`;
  });
}

function createApplicationElement(application) {
  const statusClass = `status-${application.status}`;
  const priorityClass = application.priority;
  const formattedDate = formatDate(application.date);
  const statusText = getStatusText(application.status);

  const applicationElement = document.createElement('div');
  applicationElement.className = 'application-card';
  applicationElement.dataset.id = application.id;

  applicationElement.innerHTML = `
    <div class="job-info">
      <div class="job-title">
        <span class="job-priority ${priorityClass}"></span>
        ${application.jobTitle}
      </div>
      <div class="company-name">${application.company}</div>
      <div class="job-meta">
        <div class="job-meta-item">
          <i class="fas fa-map-marker-alt"></i>
          ${application.location || 'Remote'}
        </div>
        <div class="job-meta-item">
          <i class="fas fa-briefcase"></i>
          ${application.type}
        </div>
        <div class="job-meta-item">
          <i class="fas fa-calendar-alt"></i>
          ${formattedDate}
        </div>
      </div>
    </div>
    <div class="status">
      <span class="status-badge ${statusClass}">
        ${statusText}
      </span>
      <div class="actions">
        <button class="btn-icon">
          <i class="fas fa-bookmark"></i>
        </button>
        <button class="btn-icon">
          <i class="fas fa-ellipsis-v"></i>
        </button>
      </div>
    </div>
  `;

  return applicationElement;
}

function showApplicationDetails(application) {
  currentApplicationId = application.id;
  
  document.getElementById('details-job-title').textContent = application.jobTitle;
  document.getElementById('details-company').textContent = application.company;
  document.getElementById('details-location').textContent = application.location || 'Not specified';
  document.getElementById('details-type').textContent = application.type || 'Not specified';
  document.getElementById('details-date').textContent = formatDate(application.date);
  document.getElementById('details-updated').textContent = formatDate(application.updated);
  document.getElementById('details-notes').innerHTML = `<p>${application.notes || 'No notes available'}</p>`;

  const statusBadge = document.getElementById('details-status');
  statusBadge.textContent = getStatusText(application.status);
  statusBadge.className = 'job-status-badge ' + `status-${application.status}`;

  const priorityBadge = document.getElementById('details-priority');
  priorityBadge.className = 'job-priority ' + application.priority;

  const timelineContainer = document.getElementById('timeline-container');
  timelineContainer.innerHTML = '';

  if (application.timeline && application.timeline.length > 0) {
    application.timeline.forEach(item => {
      const timelineItem = document.createElement('div');
      timelineItem.className = `timeline-item ${item.active ? 'active' : ''} ${item.current ? 'current' : ''}`;

      timelineItem.innerHTML = `
        <div class="timeline-marker"></div>
        <div class="timeline-content">
          <h5>${item.event}</h5>
          <p>${item.date ? formatDate(item.date) : 'Not scheduled'}</p>
        </div>
      `;

      timelineContainer.appendChild(timelineItem);
    });
  } else {
    timelineContainer.innerHTML = '<p>No timeline events yet</p>';
  }

  const linksContainer = document.getElementById('links-container');
  linksContainer.innerHTML = '';

  if (application.url) {
    const linkElement = document.createElement('a');
    linkElement.href = application.url;
    linkElement.className = 'job-link';
    linkElement.target = '_blank';
    linkElement.innerHTML = '<i class="fas fa-external-link-alt"></i> Original Job Posting';
    linksContainer.appendChild(linkElement);
  } else {
    linksContainer.innerHTML = '<p>No links available</p>';
  }
}
function toggleView() {
  currentView = currentView === 'list' ? 'grid' : 'list';
  const icon = viewToggleBtn.querySelector('i');
  icon.className = currentView === 'list' ? 'fas fa-list' : 'fas fa-th-large';
  viewToggleBtn.innerHTML = `
    <i class="${icon.className}"></i> ${currentView === 'list' ? 'List' : 'Grid'} View
  `;
  renderApplications();
}
function formatDate(dateString) {
  if (!dateString) return 'Not specified';

  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}
function getStatusText(status) {
  const statusMap = {
    applied: 'Applied',
    interview: 'Interview',
    offer: 'Offer Received',
    rejected: 'Rejected'
  };

  return statusMap[status] || status;
}