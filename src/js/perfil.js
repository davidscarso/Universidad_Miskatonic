(function() {
    var activeKeydown = null;

    var PHOTO_SRC = 'assets/images/Fotos/Foto_Damian.png';
    var PHOTO_ALT = 'Foto de Damián Salcedo';

    function resetPreviewState(modal) {
        var content = modal.querySelector('.preview-content');
        if (content) {
            content.classList.remove('is-maximized');
        }
        var maximizeBtn = modal.querySelector('#avatarMaximizeBtn');
        if (maximizeBtn) {
            maximizeBtn.setAttribute('title', 'Maximizar');
        }
    }

    function closeAvatarModal(modal) {
        if (!modal) return;
        modal.classList.remove('active');
        resetPreviewState(modal);
    }

    function openAvatarModal(modal) {
        if (!modal) return;
        resetPreviewState(modal);
        modal.classList.add('active');
    }

    function avatarModalHtml() {
        return '<div class="modal preview-modal" id="avatarPreviewModal">' +
            '<div class="modal-content preview-content">' +
                '<div class="modal-header">' +
                    '<h3 id="avatarPreviewTitle">Foto de Damián Salcedo</h3>' +
                    '<div class="modal-controls">' +
                        '<button type="button" class="modal-control-btn" id="avatarMaximizeBtn" title="Maximizar">' +
                            '<span class="icon-maximize">&#9633;</span><span class="icon-restore">&#10697;</span>' +
                        '</button>' +
                        '<button type="button" class="modal-control-btn close-btn" id="avatarCloseBtn" title="Cerrar">&times;</button>' +
                    '</div>' +
                '</div>' +
                '<div class="modal-body avatar-preview-body">' +
                    '<img class="avatar-preview-img" src="' + PHOTO_SRC + '" alt="' + PHOTO_ALT + '">' +
                '</div>' +
            '</div>' +
        '</div>';
    }

    function bindPerfil(main) {
        var avatar = main.querySelector('.profile-avatar');
        var modal = main.querySelector('#avatarPreviewModal');
        var closeBtn = main.querySelector('#avatarCloseBtn');
        var maximizeBtn = main.querySelector('#avatarMaximizeBtn');

        if (avatar && modal) {
            avatar.addEventListener('click', function() {
                openAvatarModal(modal);
            });
        }

        if (closeBtn && modal) {
            closeBtn.addEventListener('click', function() {
                closeAvatarModal(modal);
            });
        }

        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeAvatarModal(modal);
                }
            });
        }

        if (maximizeBtn && modal) {
            maximizeBtn.addEventListener('click', function() {
                var content = modal.querySelector('.preview-content');
                if (!content) return;
                var maximized = content.classList.toggle('is-maximized');
                maximizeBtn.setAttribute('title', maximized ? 'Restaurar' : 'Maximizar');
            });
        }

        if (activeKeydown) {
            document.removeEventListener('keydown', activeKeydown);
        }
        activeKeydown = function(e) {
            if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
                closeAvatarModal(modal);
            }
        };
        document.addEventListener('keydown', activeKeydown);
    }

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
                    '<div class="profile-avatar" title="Ampliar foto">' +
                        '<img class="profile-avatar-img" src="' + PHOTO_SRC + '" alt="' + PHOTO_ALT + '">' +
                    '</div>' +
                    '<div class="profile-info">' +
                        '<h3 class="profile-name">' + username + '</h3>' +
                        '<p class="profile-role">Departamento de Investigación Oculta</p>' +
                        '<p class="profile-email">salcedo.d@kaliber.edu</p>' +
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
            '</section>' +
            avatarModalHtml();

        placeholder.innerHTML = '';
        placeholder.appendChild(main);
        bindPerfil(main);
    };
})();
