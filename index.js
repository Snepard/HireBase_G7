document.addEventListener('DOMContentLoaded'), function() {
    const saveJobButtons = document.querySelectorAll('.save-job');
    saveJobButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.style.color = 'var(--primary-color)';
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.style.color = 'var(--light-text)';
            }
        });
    });
}
const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchInput = document.querySelector('.search-input');
            alert(`Searching for: ${searchInput.value}`);
        });
    }
    const applyButtons = document.querySelectorAll('.job-card .btn-primary');
    applyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const jobTitle = this.closest('.job-card').querySelector('.job-title').textContent;
            alert(`Applying for: ${jobTitle}`);
        });
    });
    function animateStats() {
        const stats = document.querySelector('.stats');
        const statNumbers = document.querySelectorAll('.stat-number');
        
        if (isElementInViewport(stats)) {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent.replace('+', '').replace(/,/g, ''));
                const duration = 2000;
                const increment = target / (duration / 16); 
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        clearInterval(timer);
                        stat.textContent = target.toLocaleString() + '+';
                    } else {
                        stat.textContent = Math.floor(current).toLocaleString() + '+';
                    }
                }, 16);
            });
            window.removeEventListener('scroll', animateStats);
        }
    }
    
    window.addEventListener('scroll', animateStats);
    animateStats(); 
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }