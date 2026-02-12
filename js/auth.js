window.ckTravelsAuth = {
    getUser: function () {
        const userJson = localStorage.getItem('ck_travels_user');
        return userJson ? JSON.parse(userJson) : null;
    },
    setUser: function (userData) {
        localStorage.setItem('ck_travels_user', JSON.stringify(userData));
    },
    logout: function () {
        localStorage.removeItem('ck_travels_user');
        window.location.href = 'index.html';
    },
    isAuthenticated: function () {
        return this.getUser() !== null;
    },
    isAdmin: function () {
        try {
            const user = this.getUser();
            if (!user) return false;
            const email = (user.email || '').toLowerCase().trim();
            const role = (user.role || '').toLowerCase().trim();
            return role === 'admin' || email === 'admin@cktravels.com' || email === 'admin';
        } catch (e) {
            console.error('Error checking admin status:', e);
            return false;
        }
    },
    updateNavigation: function () {
        const user = this.getUser();
        const navButtons = Array.from(document.querySelectorAll('.navbar a, #main-nav a'));
        const loginBtn = navButtons.find(a => a.textContent.trim().toLowerCase().includes('login'));
        if (user && loginBtn) {
            loginBtn.textContent = (user.name || user.email).toUpperCase();
            loginBtn.href = 'dashboard.html';
        }
    }
};
