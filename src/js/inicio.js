(function() {
    var activeKeydown = null;

    var newsArticles = {
        ia: {
            title: 'Impulso para la aplicacion de Inteligencia artificial',
            date: '15 de Octubre, 2024',
            summary: 'La universidad recibe importante donativo para el desarrollo de proyectos de inteligencia artificial y un centro de datos.',
            body:
                '<p>La Universidad Kaliber anunció la recepción de un importante donativo destinado al desarrollo de proyectos de inteligencia artificial y a la construcción de un nuevo centro de datos para el campus.</p>' +
                '<p>La infraestructura se instalará en el sector norte de la Patagonia, donde el clima favorece la refrigeración de los servidores. El equipo inicial estará compuesto por doce investigadores y cuatro equipos de cómputo de última generación.</p>' +
                '<p>El Departamento de Investigación Oculta participará en las primeras fases del proyecto, aportando los archivos históricos de la universidad como conjunto de entrenamiento para los modelos.</p>'
        },
        sueno: {
            title: 'Tesis sobre EL Sueño Lúcido',
            date: '12 de Octubre, 2020',
            summary: 'Un importante tesis enel campo de la psicología y la neurociencia, que esta llevando las plasticidad mental mas allas de lo imaginable.',
            body:
                '<p>Una tesis del área de psicología y neurociencia está llamando la atención de la comunidad académica: sostiene que la plasticidad mental puede llevarse más allá de lo imaginable mediante el entrenamiento del sueño lúcido.</p>' +
                '<p>El estudio siguió a veinte voluntarios durante un año, registrando su actividad cerebral mientras dormían y midiendo su capacidad para reconocer que estaban soñando.</p>' +
                '<p>Los resultados preliminares sugieren que, tras semanas de práctica, los participantes lograban mantener la lucidez durante periodos cada vez más largos. El jurado destacó la rigorosa metodología y recomendó ampliar la muestra.</p>'
        },
        hilos: {
            title: 'Teoria de los Hilos Cuánticos',
            date: '8 de Octubre, 2015',
            summary: 'Nueva teoria que esplicaria conecciones entre los diferentes planos de existencia.',
            body:
                '<p>El departamento de Física Teórica presentó una nueva teoría que explicaría conexiones entre los diferentes planos de existencia a partir de una red de hilos cuánticos invisibles al ojo humano.</p>' +
                '<p>Según el modelo, cada evento deja una huella en dicha red, y ciertos fenómenos observados en Arkham podrían corresponder a interferencias entre planos.</p>' +
                '<p>La teoría se encuentra en fase de revisión por pares. Sus autores advierten que, de confirmarse, obligaría a reescribir varios de los principios aceptados de la física moderna.</p>'
        }
    };

    function resetPreviewState(modal) {
        var content = modal.querySelector('.preview-content');
        if (content) {
            content.classList.remove('is-maximized');
        }
        var maximizeBtn = modal.querySelector('#newsMaximizeBtn');
        if (maximizeBtn) {
            maximizeBtn.setAttribute('title', 'Maximizar');
        }
    }

    function closeNewsModal(modal) {
        if (!modal) return;
        modal.classList.remove('active');
        resetPreviewState(modal);
    }

    function openNewsArticle(modal, key) {
        var article = newsArticles[key];
        if (!modal || !article) return;

        var titleEl = modal.querySelector('#newsPreviewTitle');
        var metaEl = modal.querySelector('#newsPreviewMeta');
        var bodyEl = modal.querySelector('#newsPreviewBody');
        if (titleEl) titleEl.textContent = article.title;
        if (metaEl) metaEl.textContent = article.date;
        if (bodyEl) bodyEl.innerHTML = article.body;

        resetPreviewState(modal);
        modal.classList.add('active');
    }

    function newsModalHtml() {
        return '<div class="modal preview-modal" id="newsPreviewModal">' +
            '<div class="modal-content preview-content">' +
                '<div class="modal-header">' +
                    '<h3 id="newsPreviewTitle">Noticia</h3>' +
                    '<div class="modal-controls">' +
                        '<button type="button" class="modal-control-btn" id="newsMaximizeBtn" title="Maximizar">' +
                            '<span class="icon-maximize">&#9633;</span><span class="icon-restore">&#10697;</span>' +
                        '</button>' +
                        '<button type="button" class="modal-control-btn close-btn" id="newsCloseBtn" title="Cerrar">&times;</button>' +
                    '</div>' +
                '</div>' +
                '<div class="modal-body">' +
                    '<div class="detail-meta" id="newsPreviewMeta"></div>' +
                    '<div class="detail-body" id="newsPreviewBody"></div>' +
                '</div>' +
            '</div>' +
        '</div>';
    }

    function bindInicio(main) {
        var newsGrid = main.querySelector('.news-grid');
        var modal = main.querySelector('#newsPreviewModal');
        var closeBtn = main.querySelector('#newsCloseBtn');
        var maximizeBtn = main.querySelector('#newsMaximizeBtn');

        if (newsGrid && modal) {
            newsGrid.addEventListener('click', function(e) {
                var link = e.target.closest('.news-link');
                if (!link) return;
                e.preventDefault();
                openNewsArticle(modal, link.getAttribute('data-article'));
            });
        }

        if (closeBtn && modal) {
            closeBtn.addEventListener('click', function() {
                closeNewsModal(modal);
            });
        }

        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeNewsModal(modal);
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
                closeNewsModal(modal);
            }
        };
        document.addEventListener('keydown', activeKeydown);
    }

    function newsCardHtml(key) {
        var article = newsArticles[key];
        return '<article class="news-card">' +
            '<span class="news-date">' + article.date + '</span>' +
            '<h4>' + article.title + '</h4>' +
            '<p>' + article.summary + '</p>' +
            '<a href="#" class="news-link" data-article="' + key + '">Leer más &raquo;</a>' +
        '</article>';
    }

    window.renderInicio = function() {
        var placeholder = document.getElementById('main-placeholder');
        if (!placeholder) return;

        var main = document.createElement('main');
        main.className = 'main';
        main.innerHTML =
            '<section class="hero">' +
                '<div class="hero-content">' +
                    '<h2>Bienvenidos a la Universidad Kaliber</h2>' +
                    '<p class="hero-subtitle">Departamento de Investigación</p>' +
                    '<p class="hero-description">' +
                        'Fundada en 1972, la Universidad Kaliber COMPLETAR ALGO ACA, ES UNA JOVEN UNIVERCIDAD PERO CON MENTES DE BRILLANTES  Y DURINSAS. CENTRO PUNTA E NEQUIPAMINTO PARA LA PATAGONIA. ' +
                        'Area de investigacion recive doativos de uivescidades del estrajero com la de masachuset, y otros entes de eeuu, y de europa.' +
                    '</p>' +
                '</div>' +
            '</section>' +
            '<section class="news">' +
                '<h3 class="section-title">Últimas Noticias</h3>' +
                '<div class="news-grid">' +
                    newsCardHtml('ia') +
                    newsCardHtml('sueno') +
                    newsCardHtml('hilos') +
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
            '</section>' +
            newsModalHtml();

        placeholder.innerHTML = '';
        placeholder.appendChild(main);
        bindInicio(main);

        var disclaimerModal = document.getElementById('disclaimerModal');
        if (disclaimerModal && localStorage.getItem('disclaimerAccepted') !== 'true') {
            disclaimerModal.classList.add('active');
        }
    };
})();
