document.addEventListener('DOMContentLoaded', function() {
    var placeholder = document.getElementById('main-placeholder');
    if (!placeholder) return;

    var inicioLink = document.querySelector('.nav-link[data-view="inicio"]');
    var foroLink = document.querySelector('.nav-link[data-view="foro"]');
    var correoLink = document.querySelector('.nav-link[data-view="correo"]');
    var archivosLink = document.querySelector('.nav-link[data-view="archivos"]');
    var profileBtn = document.getElementById('profileBtn');
    var restrictedViews = ['correo', 'archivos', 'perfil'];
    var currentView = null;

    function isRestricted(view) {
        return restrictedViews.indexOf(view) !== -1;
    }

    function hasSession() {
        return localStorage.getItem('loggedIn') === 'true';
    }

    function setActive(view) {
        if (inicioLink) inicioLink.classList.toggle('active', view === 'inicio');
        if (foroLink) foroLink.classList.toggle('active', view === 'foro');
        if (correoLink) correoLink.classList.toggle('active', view === 'correo');
        if (archivosLink) archivosLink.classList.toggle('active', view === 'archivos');
        if (profileBtn) profileBtn.classList.toggle('active', view === 'perfil');
    }

    function renderView(view) {
        if (isRestricted(view) && !hasSession()) {
            window.renderAccesoRestringido();
        } else if (view === 'foro') {
            window.renderForo();
        } else if (view === 'correo') {
            window.renderCorreo();
        } else if (view === 'archivos') {
            window.renderArchivos();
        } else if (view === 'perfil') {
            window.renderPerfil();
        } else {
            window.renderInicio();
        }
        currentView = view;
        setActive(view);

        if (typeof window.toggleRestrictedLinks === 'function') {
            window.toggleRestrictedLinks(hasSession());
        }
    }

    function getViewFromHash(hash) {
        if (hash === '#foro') return 'foro';
        if (hash === '#correo') return 'correo';
        if (hash === '#archivos') return 'archivos';
        if (hash === '#perfil') return 'perfil';
        if (hash === '' || hash === '#' || hash === '#inicio') return 'inicio';
        return null;
    }

    renderView(getViewFromHash(window.location.hash) || 'inicio');

    document.addEventListener('click', function(e) {
        var target = e.target;
        var link = target && typeof target.closest === 'function' ? target.closest('[data-restricted="true"]') : null;
        if (link && link.classList.contains('restricted')) {
            e.preventDefault();
        }
    });

    window.addEventListener('hashchange', function() {
        var view = getViewFromHash(window.location.hash);
        if (view !== null && view !== currentView) {
            renderView(view);
        }
    });

    window.refreshCurrentView = function() {
        if (currentView !== null) {
            renderView(currentView);
        }
    };
});
