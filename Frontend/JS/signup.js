// form.js

(function () {
    'use strict';

    const registrationForm = document.getElementById('registrationForm');

    registrationForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const gender = document.querySelector('input[name="gender"]:checked');
        const password = document.getElementById('password').value.trim();
        const confirmPassword = document.getElementById('confirm-password').value.trim();

        if (!name || !email || !gender || !password || !confirmPassword) {
            displayError("Please fill all fields.");
            return;
        }

        if (password !== confirmPassword) {
            displayError("Passwords do not match.");
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/M00916353/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    gender: gender.value,
                    password,
                    confirmPassword
                })
            });

            const data = await response.json();

            if (data.message === 'ok') {
                displaySuccess("User created successfully.");
            } else if (data.error) {
                displayError(data.error);
            } else {
                displayError("Unknown error occurred.");
            }
        } catch (error) {
            displayError(error.message);
        }
    });

    function displayError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'alert alert-danger';
        errorDiv.textContent = message;

        const authScreen = document.querySelector('.auth-screen');
        authScreen.insertBefore(errorDiv, registrationForm);

        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }

    function displaySuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'alert alert-success';
        successDiv.textContent = message;

        const authScreen = document.querySelector('.auth-screen');
        authScreen.insertBefore(successDiv, registrationForm);

        setTimeout(() => {
            successDiv.remove();
            window.location.href = 'login.html'; // Redirect to login page after success
        }, 3000);
    }
})();
