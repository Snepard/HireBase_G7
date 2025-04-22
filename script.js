function toggleDescription() {
    const content = document.querySelector('.description-content');
    const icon = document.querySelector('.toggle-icon');
    
    content.classList.toggle('show');
    icon.classList.toggle('rotate');
  }
  
  // Optional: Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.job-description')) {
      document.querySelector('.description-content').classList.remove('show');
      document.querySelector('.toggle-icon').classList.remove('rotate');
    }
  });