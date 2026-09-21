document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('loginBtn');
    const profileBtn = document.getElementById('profileBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const loginModal = document.getElementById('loginModal');
    const closeModal = document.getElementById('closeModal');
    const loginForm = document.getElementById('loginForm');

    function toggleRestrictedLinks(enable) {
        const restrictedLinks = document.querySelectorAll('[data-restricted="true"]');
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

    window.toggleRestrictedLinks = toggleRestrictedLinks;

    document.querySelectorAll('[data-restricted="true"]').forEach(function(link) {
        link.addEventListener('click', function(e) {
            if (this.classList.contains('restricted')) {
                e.preventDefault();
            }
        });
    });

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
            const username = document.getElementById('username').value.toUpperCase();
            const password = document.getElementById('password').value;

            if (username === 'SALCEDO.D' && password === '136136') {
                loginModal.classList.remove('active');
                localStorage.setItem('loggedIn', 'true');
                localStorage.setItem('username', 'Damián Salcedo');
                updateUIForLoggedInUser('Damián Salcedo');
            } else {
                alert('Credenciales incorrectas. Acceso denegado.');
                // TODO: agradar una modal con el mensaje. cerrar el login.
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

    // Forum: Upload Drawing Modal
    const uploadDrawingBtn = document.getElementById('uploadDrawingBtn');
    const uploadModal = document.getElementById('uploadModal');
    const closeUploadModal = document.getElementById('closeUploadModal');
    const uploadForm = document.getElementById('uploadForm');
    const fileUploadArea = document.getElementById('fileUploadArea');
    const drawingFileInput = document.getElementById('drawingFile');
    const fileNameDisplay = document.getElementById('fileName');

    if (uploadDrawingBtn && uploadModal) {
        uploadDrawingBtn.addEventListener('click', function() {
            uploadModal.classList.add('active');
        });
    }

    if (closeUploadModal && uploadModal) {
        closeUploadModal.addEventListener('click', function() {
            uploadModal.classList.remove('active');
        });
    }

    if (uploadModal) {
        uploadModal.addEventListener('click', function(e) {
            if (e.target === uploadModal) {
                uploadModal.classList.remove('active');
            }
        });
    }

    if (fileUploadArea && drawingFileInput) {
        fileUploadArea.addEventListener('click', function() {
            drawingFileInput.click();
        });

        drawingFileInput.addEventListener('change', function() {
            if (this.files && this.files.length > 0) {
                fileNameDisplay.textContent = this.files[0].name;
            } else {
                fileNameDisplay.textContent = 'Ningún archivo seleccionado';
            }
        });
    }

    if (uploadForm) {
        uploadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Dibujo publicado exitosamente (simulación)');
            uploadModal.classList.remove('active');
            uploadForm.reset();
            if (fileNameDisplay) {
                fileNameDisplay.textContent = 'Ningún archivo seleccionado';
            }
        });
    }

    // Forum: Notification Modal
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationModal = document.getElementById('notificationModal');
    const closeNotificationModal = document.getElementById('closeNotificationModal');
    const markAllReadBtn = document.getElementById('markAllReadBtn');
    const notificationBadge = document.getElementById('notificationBadge');

    if (notificationBtn && notificationModal) {
        notificationBtn.addEventListener('click', function() {
            notificationModal.classList.add('active');
        });
    }

    if (closeNotificationModal && notificationModal) {
        closeNotificationModal.addEventListener('click', function() {
            notificationModal.classList.remove('active');
        });
    }

    if (notificationModal) {
        notificationModal.addEventListener('click', function(e) {
            if (e.target === notificationModal) {
                notificationModal.classList.remove('active');
            }
        });
    }

    if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', function() {
            const unreadNotifications = document.querySelectorAll('.notification-item.unread');
            unreadNotifications.forEach(function(notification) {
                notification.classList.remove('unread');
            });
            if (notificationBadge) {
                notificationBadge.style.display = 'none';
            }
        });
    }

    // Close modals with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (uploadModal && uploadModal.classList.contains('active')) {
                uploadModal.classList.remove('active');
            }
            if (notificationModal && notificationModal.classList.contains('active')) {
                notificationModal.classList.remove('active');
            }
        }
    });
});
