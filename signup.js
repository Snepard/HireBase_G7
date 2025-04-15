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
});