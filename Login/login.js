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

        // Simulate successful login (replace with actual auth logic if needed)
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (email && password) {
            // Redirect to job.html
            window.location.href = "../Job Listing/index.html"; // Adjust path if needed
        } else {
            alert("Please enter both email and password.");
        }
    });
});
