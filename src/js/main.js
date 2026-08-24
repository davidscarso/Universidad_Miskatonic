document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const closeModal = document.getElementById('closeModal');
    const loginForm = document.getElementById('loginForm');

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
                alert('Bienvenido, Profesor ' + username);
                loginModal.classList.remove('active');
                localStorage.setItem('loggedIn', 'true');
                localStorage.setItem('username', username);
                updateUIForLoggedInUser(username);
            } else {
                alert('Credenciales incorrectas. Acceso denegado.');
            }
        });
    }

    function updateUIForLoggedInUser(username) {
        if (loginBtn) {
            loginBtn.textContent = username;
            loginBtn.classList.add('logged-in');
        }
    }

    if (localStorage.getItem('loggedIn') === 'true') {
        const username = localStorage.getItem('username') || 'Admin';
        updateUIForLoggedInUser(username);
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && loginModal && loginModal.classList.contains('active')) {
            loginModal.classList.remove('active');
        }
    });

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(function(link) {
        link.addEventListener('mouseenter', function() {
            this.style.textShadow = '0 0 5px ' + getComputedStyle(document.documentElement).getPropertyValue('--accent-glow');
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
