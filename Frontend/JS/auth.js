// auth.js
document.addEventListener("DOMContentLoaded", function() {
    const userId = localStorage.getItem('userId');
    const currentPage = window.location.pathname.split("/").pop();

    // If user is logged in and tries to access login or registration page
    if (userId && (currentPage === 'login.html' || currentPage === 'registration.html')) {
        window.location.href = 'index.html';
    }

    // If user is not logged in and tries to access index or instruction page
    if (!userId && (currentPage === 'index.html' || currentPage === 'instruction.html' || currentPage === 'leaderboard.html')) {
        window.location.href = 'login.html';
    }
});
