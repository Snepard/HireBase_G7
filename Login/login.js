// login.js

function togglePassword() {
    const passwordInput = document.getElementById("password");
    const toggleIcon = document.querySelector(".toggle-password");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleIcon.classList.remove("fa-eye-slash");
        toggleIcon.classList.add("fa-eye");
    } else {
        passwordInput.type = "password";
        toggleIcon.classList.remove("fa-eye");
        toggleIcon.classList.add("fa-eye-slash");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent default form submission

        // Get form data
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (email && password) {
            // Set login state in localStorage
            localStorage.setItem("isLoggedIn", "true");
            
            // Generate random avatar ID
            const avatarId = Math.floor(Math.random() * 100);
            localStorage.setItem("avatarId", avatarId);
            
            // Redirect to job.html
            window.location.href = "../index.html"; // Redirect to home page
        } else {
            alert("Please enter both email and password.");
        }
    });
});