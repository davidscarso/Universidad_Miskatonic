window.renderPerfil = function() {
    var placeholder = document.getElementById('main-placeholder');
    if (!placeholder) return;

    var username = localStorage.getItem('username') || 'Profesor Admin';

    var main = document.createElement('main');
    main.className = 'main';
    main.innerHTML =
        '<section class="profile-section">' +
            '<h2 class="section-title">Mi Perfil</h2>' +
            '<div class="profile-card">' +
                '<div class="profile-avatar">' +
                    '<span class="avatar-symbol">&#9786;</span>' +
                '</div>' +
                '<div class="profile-info">' +
                    '<h3 class="profile-name">' + username + '</h3>' +
                    '<p class="profile-role">Departamento de Investigación Oculta</p>' +
                    '<p class="profile-email">admin@miskatonic.edu</p>' +
                '</div>' +
            '</div>' +
        '</section>' +
        '<section class="profile-links">' +
            '<h3 class="section-title">Accesos Rápidos</h3>' +
            '<div class="links-grid">' +
                '<a href="#inicio" class="quick-link-card">' +
                    '<span class="link-icon">&#127968;</span>' +
                    '<h4>Inicio</h4>' +
                    '<p>Volver al portal principal</p>' +
                '</a>' +
                '<a href="#correo" class="quick-link-card restricted" data-restricted="true" title="Necesitas iniciar sesión">' +
                    '<span class="link-icon">&#9993;</span>' +
                    '<h4>Correo</h4>' +
                    '<p>Bandeja de entrada</p>' +
                '</a>' +
                '<a href="#archivos" class="quick-link-card restricted" data-restricted="true" title="Necesitas iniciar sesión">' +
                    '<span class="link-icon">&#128193;</span>' +
                    '<h4>Archivos</h4>' +
                    '<p>Gestor de archivos</p>' +
                '</a>' +
            '</div>' +
        '</section>';

    placeholder.innerHTML = '';
    placeholder.appendChild(main);
};
