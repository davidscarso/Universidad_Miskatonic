document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('loginBtn');
    const profileBtn = document.getElementById('profileBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const loginModal = document.getElementById('loginModal');
    const closeModal = document.getElementById('closeModal');
    const loginForm = document.getElementById('loginForm');

    function toggleRestrictedLinks(enable) {
        const restrictedLinks = document.querySelectorAll('.restricted');
        restrictedLinks.forEach(function(link) {
            if (enable) {
                link.classList.remove('restricted');
                link.removeAttribute('title');
            } else {
                link.classList.add('restricted');
                link.setAttribute('title', 'Necesitas iniciar sesión');
            }
        });
    }

    function updateUIForLoggedInUser(username) {
        if (loginBtn) {
            loginBtn.style.display = 'none';
        }
        if (profileBtn) {
            profileBtn.textContent = username;
            profileBtn.style.display = 'inline-block';
        }
        if (logoutBtn) {
            logoutBtn.style.display = 'flex';
        }
        toggleRestrictedLinks(true);
    }

    function updateUIForLoggedOutUser() {
        if (loginBtn) {
            loginBtn.style.display = 'inline-block';
        }
        if (profileBtn) {
            profileBtn.style.display = 'none';
        }
        if (logoutBtn) {
            logoutBtn.style.display = 'none';
        }
        toggleRestrictedLinks(false);
    }

    function logout() {
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('username');
        updateUIForLoggedOutUser();
    }

    if (loginBtn && loginModal) {
        loginBtn.addEventListener('click', function() {
            loginModal.classList.add('active');
        });
    }

    if (closeModal && loginModal) {
        closeModal.addEventListener('click', function() {
            loginModal.classList.remove('active');
        });
    }

    if (loginModal) {
        loginModal.addEventListener('click', function(e) {
            if (e.target === loginModal) {
                loginModal.classList.remove('active');
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (username === 'admin' && password === 'miskatonic') {
                loginModal.classList.remove('active');
                localStorage.setItem('loggedIn', 'true');
                localStorage.setItem('username', username);
                updateUIForLoggedInUser(username);
            } else {
                alert('Credenciales incorrectas. Acceso denegado.');
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            logout();
        });
    }

    if (localStorage.getItem('loggedIn') === 'true') {
        const username = localStorage.getItem('username') || 'Admin';
        updateUIForLoggedInUser(username);
    } else {
        updateUIForLoggedOutUser();
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && loginModal && loginModal.classList.contains('active')) {
            loginModal.classList.remove('active');
        }
    });

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(function(link) {
        link.addEventListener('mouseenter', function() {
            if (!this.classList.contains('restricted')) {
                this.style.textShadow = '0 0 5px ' + getComputedStyle(document.documentElement).getPropertyValue('--accent-glow');
            }
        });
        link.addEventListener('mouseleave', function() {
            this.style.textShadow = 'none';
        });
    });

    const cards = document.querySelectorAll('.news-card, .quick-link-card');
    cards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
});
