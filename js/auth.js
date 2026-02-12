/**
 * Authentication Utilities for CK Travels
 * Handles user session management with localStorage
 */

// Get current logged-in user
export function getUser() {
    const userJson = localStorage.getItem('ck_travels_user');
    return userJson ? JSON.parse(userJson) : null;
}

// Save user data to localStorage
export function setUser(userData) {
    localStorage.setItem('ck_travels_user', JSON.stringify(userData));
}

// Clear user data and logout
export function logout() {
    localStorage.removeItem('ck_travels_user');
    window.location.href = 'index.html';
}

// Check if user is authenticated
export function isAuthenticated() {
    return getUser() !== null;
}

// Check if user is an admin
export function isAdmin() {
    try {
        const user = getUser();
        if (!user) return false;

        const email = (user.email || '').toLowerCase().trim();
        const role = (user.role || '').toLowerCase().trim();

        return role === 'admin' || email === 'admin@cktravels.com' || email === 'admin';
    } catch (e) {
        console.error('Error checking admin status:', e);
        return false;
    }
}

// Update navigation UI based on auth state
export function updateNavigation() {
    const user = getUser();
    const navButtons = Array.from(document.querySelectorAll('.navbar a'));
    const navLinksContainer = document.querySelector('.nav-links');

    // Find the buttons
    const loginBtn = navButtons.find(a => a.textContent.trim() === 'Login');
    const signInBtn = navButtons.find(a => a.textContent.trim() === 'Sign In');
    const signUpBtn = navButtons.find(a => a.classList.contains('btn-signup'));

    // Admin Portal link removed from global navigation per user request

    if (!loginBtn && !signInBtn && !signUpBtn) return;

    if (user) {
        // Hide Sign In and Sign Up buttons if they exist
        if (signInBtn) signInBtn.style.display = 'none';
        if (signUpBtn) signUpBtn.style.display = 'none';

        // Update Login button to show username if it exists
        const btnToUpdate = loginBtn || signInBtn; // Fallback
        if (btnToUpdate) {
            btnToUpdate.textContent = user.name || user.email;
            btnToUpdate.href = 'dashboard.html'; // Direct to dashboard instead of '#'
            btnToUpdate.onclick = null; // Remove the auto-logout confirm if we want them to go to dashboard
        }
    }
}
