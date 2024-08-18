(function () {
    'use strict';

    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!email || !password) {
            displayError("Please fill all fields.");
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/M00916353/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include'
            });

            const data = await response.json();

            if (data.message === 'ok') {
                displaySuccess("Logged in successfully.");
                // Save userId in local storage
                localStorage.setItem('userId', data.userData._id);
                // Redirect to dashboard or home page after successful login
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 3000);
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
        authScreen.insertBefore(errorDiv, loginForm);

        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }

    function displaySuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'alert alert-success';
        successDiv.textContent = message;

        const authScreen = document.querySelector('.auth-screen');
        authScreen.insertBefore(successDiv, loginForm);

        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }
})();
