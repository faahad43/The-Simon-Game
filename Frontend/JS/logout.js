$(document).ready(function() {
    $('.logout').click(async function() {
        try {
            const response = await fetch('http://localhost:3000/M00916353/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            const data = await response.json();

            if (response.ok) {
                // Clear userId from local storage
                localStorage.removeItem('userId');

                // Redirect to login page or update the UI accordingly
                window.location.href = 'login.html'; // Adjust the path as needed
            } else {
                console.error('Logout failed:', data.error);
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    });
});
