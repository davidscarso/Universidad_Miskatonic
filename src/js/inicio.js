window.renderInicio = function() {
    var placeholder = document.getElementById('main-placeholder');
    if (!placeholder) return;

    var main = document.createElement('main');
    main.className = 'main';
    main.innerHTML =
        '<section class="hero">' +
            '<div class="hero-content">' +
                '<h2>Bienvenidos a la Universidad Kaliber</h2>' +
                '<p class="hero-subtitle">Departamento de Investigación e IA Aplicada</p>' +
                '<p class="hero-description">' +
                    'Fundada en 1972, la Universidad Kaliber COMPLETAR ALGO ACA, ES UNA JOVEN UNIVERCIDAD PERO CON MENTES DE BRILLANTES  Y DURINSAS. CENTRO PUNTA E NEQUIPAMINTO PARA LA PATAGONIA. ' +
                    'Area de investigacion recive doativos de uivescidades del estrajero com la de masachuset, y otros entes de eeuu, y de europa.' +
                '</p>' +
            '</div>' +
        '</section>' +
        '<section class="news">' +
            '<h3 class="section-title">Últimas Noticias</h3>' +
            '<div class="news-grid">' +
                '<article class="news-card">' +
                    '<span class="news-date">15 de Octubre, 1998</span>' +
                    '<h4>Conferencia sobre Mitos de Cthulhu</h4>' +
                    '<p>El profesor Armitage presentará sus hallazgos sobre los textos encontrados en la expedición a Arkham.</p>' +
                    '<a href="acceso-restringido.html" class="news-link">Leer más &raquo;</a>' +
                '</article>' +
                '<article class="news-card">' +
                    '<span class="news-date">12 de Octubre, 2005</span>' +
                    '<h4>Tesis sobre EL Sueño Lúcido</h4>' +
                    '<p>Un importante tesis enel campo de la psicología y la neurociencia, que esta llevando las plasticidad mental mas allas de lo imaginable.</p>' +
                    '<a href="acceso-restringido.html" class="news-link">Leer más &raquo;</a>' +
                '</article>' +
                '<article class="news-card">' +
                    '<span class="news-date">8 de Octubre, 2020</span>' +
                    '<h4>Teoria de los Hilos Cuánticos</h4>' +
                    '<p>Nueva teoria que esplicaria conecciones entre los diferentes planos de existencia.</p>' +
                    '<a href="acceso-restringido.html" class="news-link">Leer más &raquo;</a>' +
                '</article>' +
            '</div>' +
        '</section>' +
        '<section class="quick-links">' +
            '<h3 class="section-title">Accesos Rápidos</h3>' +
            '<div class="links-grid">' +
                '<a href="#foro" class="quick-link-card">' +
                    '<span class="link-icon">&#128221;</span>' +
                    '<h4>Foro de Investigación</h4>' +
                    '<p>Discusiones académicas y descubrimientos recientes</p>' +
                '</a>' +
                '<a href="#correo" class="quick-link-card restricted" data-restricted="true" title="Necesitas iniciar sesión">' +
                    '<span class="link-icon">&#9993;</span>' +
                    '<h4>Correo Interno</h4>' +
                    '<p>Bandeja de entrada del personal académico</p>' +
                '</a>' +
                '<a href="#archivos" class="quick-link-card restricted" data-restricted="true" title="Necesitas iniciar sesión">' +
                    '<span class="link-icon">&#128193;</span>' +
                    '<h4>Archivos</h4>' +
                    '<p>Gestor de archivos universitario</p>' +
                '</a>' +
            '</div>' +
        '</section>';

    placeholder.innerHTML = '';
    placeholder.appendChild(main);

    var disclaimerModal = document.getElementById('disclaimerModal');
    if (disclaimerModal && localStorage.getItem('disclaimerAccepted') !== 'true') {
        disclaimerModal.classList.add('active');
    }
};