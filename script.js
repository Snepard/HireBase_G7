document.querySelector('.description-toggle').addEventListener('click', function() {
  const content = document.getElementById('description-content');
  const isExpanded = this.getAttribute('aria-expanded') === 'true';
  
  this.setAttribute('aria-expanded', !isExpanded);
  content.classList.toggle('show');
});