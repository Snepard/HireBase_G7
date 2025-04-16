function togglePassword() {
    const password = document.getElementById('password');
    const icon = document.querySelector('.toggle-password');
    if (password.type === 'password') {
        password.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        password.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const accountTypeOptions = document.querySelectorAll('.account-type-option');
    
    accountTypeOptions.forEach(option => {
        option.addEventListener('click', function() {
            accountTypeOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            const input = this.querySelector('input');
            input.checked = true;
        });
    });

    // Password strength indicator
    const passwordInput = document.getElementById('password');
    passwordInput.addEventListener('input', function() {
        const strengthBar = document.querySelector('.strength-bar');
        const strengthText = document.querySelector('.strength-text span');
        const password = this.value;
        let strength = 0;
        
        if (password.length > 0) strength += 1;
        if (password.length >= 8) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        
        const width = (strength / 5) * 100;
        strengthBar.style.width = `${width}%`;
        
        if (strength <= 1) {
            strengthBar.style.backgroundColor = '#ef4444';
            strengthText.textContent = 'weak';
        } else if (strength <= 3) {
            strengthBar.style.backgroundColor = '#f59e0b';
            strengthText.textContent = 'medium';
        } else {
            strengthBar.style.backgroundColor = '#10b981';
            strengthText.textContent = 'strong';
        }
    });
});