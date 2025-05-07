document.addEventListener('DOMContentLoaded', function() {
    const saveJobButtons = document.querySelectorAll('.save-job');
    saveJobButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.style.color = 'var(--primary-color)';
                showNotification('Job saved to your favorites!');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.style.color = 'var(--light-text)';
                showNotification('Job removed from favorites');
            }
        });
    });
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchInput = document.querySelector('.search-input');
            if (searchInput.value.trim() !== '') {
                alert(`Searching for: ${searchInput.value}`);
            } else {
                showNotification('Please enter a search term', 'error');
            }
        });
        const searchInput = document.querySelector('.search-input');
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    }
    const applyButtons = document.querySelectorAll('.job-card .btn-primary');
    applyButtons.forEach(button => {
        if (!button.classList.contains('search-btn')) {
            button.addEventListener('click', function() {
                const jobTitle = this.closest('.job-card').querySelector('.job-title').textContent;
                alert(`Applying for: ${jobTitle}`);
            });
        }
    });
    function setupMobileMenu() {
        const nav = document.querySelector('.nav-links');
        const header = document.querySelector('.header-content');
        
        if (window.innerWidth <= 768) {
            if (!document.querySelector('.mobile-menu-btn')) {
                const mobileBtn = document.createElement('button');
                mobileBtn.className = 'mobile-menu-btn';
                mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
                header.insertBefore(mobileBtn, nav);
                
                mobileBtn.addEventListener('click', function() {
                    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
                    this.innerHTML = nav.style.display === 'flex' ? 
                        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
                });
            }
            nav.style.display = 'none';
        } else {
            const mobileBtn = document.querySelector('.mobile-menu-btn');
            if (mobileBtn) mobileBtn.remove();
            nav.style.display = 'flex';
        }
    }
    
    window.addEventListener('resize', setupMobileMenu);
    setupMobileMenu();
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
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        const style = document.createElement('style');
        style.textContent = `
            .notification {
                position: fixed;
                bottom: 20px;
                right: 20px;
                padding: 12px 24px;
                border-radius: 6px;
                color: white;
                background-color: var(--primary-color);
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 1000;
                animation: fadeInOut 3s ease-in-out;
            }
            .notification.success {
                background-color: var(--success-color);
            }
            .notification.error {
                background-color: #e53e3e;
            }
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translateY(20px); }
                10% { opacity: 1; transform: translateY(0); }
                90% { opacity: 1; transform: translateY(0); }
                100% { opacity: 0; transform: translateY(20px); }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.remove();
            style.remove();
        }, 3000);
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    const jobCards = document.querySelectorAll('.job-card');
    jobCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });

    if (typeof tippy !== 'undefined') {
        tippy('.social-link', {
            content(reference) {
                const platform = reference.querySelector('i').className.split('-')[1];
                return `Follow us on ${platform.charAt(0).toUpperCase() + platform.slice(1)}`;
            },
            placement: 'bottom',
            animation: 'shift-away',
            theme: 'light',
        });
    }
});