// signup.js

function togglePassword() {
    const passwordInput = document.getElementById("password");
    const toggleIcon = document.querySelector(".toggle-password");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleIcon.classList.remove("fa-eye");
        toggleIcon.classList.add("fa-eye-slash");
    } else {
        passwordInput.type = "password";
        toggleIcon.classList.remove("fa-eye-slash");
        toggleIcon.classList.add("fa-eye");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent default form submission

        // Grab values
        const firstName = document.getElementById("first-name").value;
        const lastName = document.getElementById("last-name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const termsAccepted = document.getElementById("terms").checked;

        if (firstName && lastName && email && password && termsAccepted) {
            // Simulate successful sign-up and redirect
            window.location.href = "../Job/job.html"; // Adjust path if needed
        } else {
            alert("Please fill out all fields and accept the terms.");
        }
    });
});
