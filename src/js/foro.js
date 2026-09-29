(function() {
    var activeKeydown = null;

    var forumCategories = {
        suenos: {
            name: 'Sueños',
            icon: '&#128161;',
            topics: [
                {
                    initials: 'HA',
                    title: 'Visión recurrente del templo submarino',
                    excerpt: 'Cada noche veo las mismas estructuras bajo el agua, con criaturas que se mueven entre los corales...',
                    author: 'Prof. Armitage',
                    date: 'Hace 2 horas',
                    replies: 5,
                    views: 47,
                    body: '<p>Desde hace tres semanas sueño con un templo sumergido cuyos corredores cambian de forma cada vez que intento recorrerlos.</p><p>Las figuras que aparecen entre los corales no parecen hostiles, pero siempre señalan hacia una puerta que no consigo abrir. Busco comparar estas imágenes con otros registros de sueños recurrentes.</p>'
                },
                {
                    initials: 'EW',
                    title: 'Pesadillas con entidades geométricas',
                    excerpt: 'Las figuras geométricas que aparecen en mis sueños no siguen las leyes de la física conocida...',
                    author: 'Decano West',
                    date: 'Hace 5 horas',
                    replies: 12,
                    views: 89,
                    body: '<p>Las formas aparecen suspendidas sobre un paisaje sin horizonte. Al despertar, todavía puedo recordar sus ángulos, aunque no consigo dibujarlos sin que el resultado pierda toda proporción.</p><p>¿Alguien ha observado una relación entre estas pesadillas y los diagramas del archivo de Lenguas Antiguas?</p>'
                },
                {
                    initials: 'AL',
                    title: 'Sueño con el libro prohibido',
                    excerpt: 'En mi sueño encontré una copia del Necronomicón en la biblioteca subterránea...',
                    author: 'Est. López',
                    date: 'Ayer',
                    replies: 8,
                    views: 156,
                    body: '<p>El libro estaba encadenado a una mesa de piedra. No podía leer el texto, pero reconocía algunas ilustraciones de los manuscritos de la biblioteca.</p><p>Lo más extraño es que al despertar encontré polvo oscuro en las manos, aunque no había salido de mi habitación.</p>'
                },
                {
                    initials: 'MR',
                    title: 'Visión de la ciudad de R\'lyeh',
                    excerpt: 'Vi la ciudad sagrada en sueños, con sus ángulos imposibles y su arquitectura antinatural...',
                    author: 'Dr. Rivera',
                    date: 'Hace 2 días',
                    replies: 15,
                    views: 234,
                    body: '<p>La ciudad se alzaba sobre un océano inmóvil. Sus edificios parecían haber sido construidos para una escala distinta de la humana y proyectaban sombras en direcciones contradictorias.</p><p>La secuencia se repite siempre antes del despertar: una puerta que se abre bajo el agua y una voz que pronuncia mi nombre.</p>'
                }
            ]
        },
        compulsiones: {
            name: 'Compulsiones',
            icon: '&#129504;',
            topics: [
                {
                    initials: 'SC',
                    title: 'El ritual de contar las ventanas',
                    excerpt: 'La necesidad de contar las ventanas del edificio aumenta cada vez que cae la noche...',
                    author: 'Dra. Salvatierra',
                    date: 'Hace 1 día',
                    replies: 6,
                    views: 72,
                    body: '<p>El registro comenzó como una costumbre durante las guardias nocturnas, pero ahora la secuencia debe repetirse hasta que todos los números coincidan.</p><p>Se solicita comparar este caso con los informes archivados del ala norte.</p>'
                },
                {
                    initials: 'JP',
                    title: 'Manuscritos que deben alinearse',
                    excerpt: 'Cinco investigadores describen la misma necesidad de ordenar los documentos antes de leerlos...',
                    author: 'Prof. Paredes',
                    date: 'Hace 3 días',
                    replies: 4,
                    views: 51,
                    body: '<p>Los documentos pierden legibilidad cuando se colocan fuera de una alineación precisa. El efecto no parece depender del idioma ni del estado del papel.</p><p>Se adjuntará un protocolo de observación cuando finalice la revisión del archivo.</p>'
                },
                {
                    initials: 'NF',
                    title: 'La puerta que debe cerrarse tres veces',
                    excerpt: 'Una puerta del pabellón antiguo parece exigir una secuencia exacta para permanecer cerrada...',
                    author: 'N. Ferrer',
                    date: 'Hace 4 días',
                    replies: 9,
                    views: 103,
                    body: '<p>El mecanismo funciona con normalidad, pero la puerta vuelve a abrirse si no se comprueba el cierre tres veces consecutivas.</p><p>El personal de mantenimiento no ha encontrado una explicación mecánica para el comportamiento.</p>'
                }
            ]
        },
        dibujos: {
            name: 'Dibujos',
            icon: '&#127912;',
            topics: [
                {
                    initials: 'DM',
                    title: 'El grabado de la montaña',
                    excerpt: 'Una serie de dibujos reproduce una montaña que no aparece en ningún mapa de la región...',
                    author: 'Damián Salcedo',
                    date: 'Hace 4 horas',
                    replies: 7,
                    views: 64,
                    body: '<p>Los bocetos fueron realizados a partir de una imagen que aparece durante el sueño, siempre desde la misma distancia.</p><p>La silueta coincide parcialmente con un relieve registrado en mapas antiguos, aunque la ubicación señalada no corresponde con ningún punto del territorio conocido.</p>'
                },
                {
                    initials: 'VG',
                    title: 'Símbolos del archivo de Arkham',
                    excerpt: 'Comparación visual entre marcas encontradas en un manuscrito y dibujos de estudiantes...',
                    author: 'V. Gómez',
                    date: 'Ayer',
                    replies: 11,
                    views: 118,
                    body: '<p>Las formas fueron copiadas sin consultar el manuscrito original. A pesar de ello, varias proporciones coinciden con los símbolos del expediente Arkham.</p><p>Se solicita que cualquier coincidencia adicional se publique en este hilo.</p>'
                },
                {
                    initials: 'RM',
                    title: 'Bocetos de una arquitectura imposible',
                    excerpt: 'Los pasillos dibujados no pueden conectarse en un espacio tridimensional ordinario...',
                    author: 'R. Méndez',
                    date: 'Hace 2 días',
                    replies: 13,
                    views: 147,
                    body: '<p>Los dibujos muestran una estructura cerrada desde el exterior, pero con corredores que se prolongan indefinidamente en el interior.</p><p>El autor afirma no haber visto los planos de la universidad antes de realizar los bocetos.</p>'
                }
            ]
        }
    };

    function topicModalHtml() {
        return '<div class="modal preview-modal" id="topicPreviewModal">' +
            '<div class="modal-content preview-content">' +
                '<div class="modal-header">' +
                    '<h3 id="topicPreviewTitle">Tema</h3>' +
                    '<div class="modal-controls">' +
                        '<button type="button" class="modal-control-btn" id="topicMaximizeBtn" title="Maximizar" aria-label="Maximizar tema">' +
                            '<span class="icon-maximize">&#9633;</span><span class="icon-restore">&#10697;</span>' +
                        '</button>' +
                        '<button type="button" class="modal-control-btn close-btn" id="topicCloseBtn" title="Cerrar" aria-label="Cerrar tema">&times;</button>' +
                    '</div>' +
                '</div>' +
                '<div class="modal-body">' +
                    '<div class="detail-meta" id="topicPreviewMeta"></div>' +
                    '<div class="detail-body" id="topicPreviewBody"></div>' +
                '</div>' +
            '</div>' +
        '</div>';
    }

    function resetTopicModal(modal) {
        var content = modal.querySelector('.preview-content');
        if (content) content.classList.remove('is-maximized');

        var maximizeBtn = modal.querySelector('#topicMaximizeBtn');
        if (maximizeBtn) maximizeBtn.setAttribute('title', 'Maximizar');
    }

    function closeTopicModal(modal) {
        if (!modal) return;
        modal.classList.remove('active');
        resetTopicModal(modal);
    }

    function openTopic(main, topic) {
        var modal = main.querySelector('#topicPreviewModal');
        if (!modal || !topic) return;

        var title = main.querySelector('#topicPreviewTitle');
        var meta = main.querySelector('#topicPreviewMeta');
        var body = main.querySelector('#topicPreviewBody');

        if (title) title.textContent = topic.title;
        if (meta) {
            meta.innerHTML =
                '<span class="detail-from">Autor: ' + topic.author + '</span>' +
                '<span class="detail-from">Publicado: ' + topic.date + '</span>' +
                '<span class="detail-from">Respuestas: ' + topic.replies + '</span>';
        }
        if (body) body.innerHTML = topic.body;

        resetTopicModal(modal);
        modal.classList.add('active');
    }

    function topicHtml(topic, index) {
        return '<article class="topic-item" data-topic="' + index + '" tabindex="0" role="button" aria-label="Abrir tema: ' + topic.title + '">' +
            '<div class="topic-avatar"><span class="avatar-initials">' + topic.initials + '</span></div>' +
            '<div class="topic-info">' +
                '<h4 class="topic-title">' + topic.title + '</h4>' +
                '<p class="topic-excerpt">' + topic.excerpt + '</p>' +
                '<div class="topic-meta">' +
                    '<span class="topic-author">' + topic.author + '</span>' +
                    '<span class="topic-date">' + topic.date + '</span>' +
                    '<span class="topic-replies">' + topic.replies + ' respuestas</span>' +
                '</div>' +
            '</div>' +
            '<div class="topic-stats">' +
                '<span class="stat-icon">&#128065;</span>' +
                '<span class="stat-count">' + topic.views + '</span>' +
            '</div>' +
        '</article>';
    }

    function renderCategory(main, categoryKey) {
        var category = forumCategories[categoryKey];
        if (!category) return;

        var title = main.querySelector('#forumCategoryTitle');
        var count = main.querySelector('#forumTopicCount');
        var topicList = main.querySelector('#forumTopicList');

        main.querySelectorAll('.category-item').forEach(function(item) {
            var isActive = item.getAttribute('data-category') === categoryKey;
            item.classList.toggle('active', isActive);
            if (isActive) {
                item.setAttribute('aria-current', 'page');
            } else {
                item.removeAttribute('aria-current');
            }
        });

        if (title) title.textContent = category.name;
        if (count) count.textContent = category.topics.length + (category.topics.length === 1 ? ' tema' : ' temas');
        if (topicList) topicList.innerHTML = category.topics.map(topicHtml).join('');
    }

    function bindForum(main) {
        var categoryNav = main.querySelector('.category-nav');
        var topicList = main.querySelector('#forumTopicList');
        var modal = main.querySelector('#topicPreviewModal');
        var closeBtn = main.querySelector('#topicCloseBtn');
        var maximizeBtn = main.querySelector('#topicMaximizeBtn');
        var uploadBtn = main.querySelector('#uploadDrawingBtn');
        var uploadModal = document.getElementById('uploadModal');

        if (categoryNav) {
            categoryNav.addEventListener('click', function(e) {
                var item = e.target.closest('.category-item');
                if (!item) return;
                e.preventDefault();
                renderCategory(main, item.getAttribute('data-category'));
            });
        }

        if (topicList) {
            topicList.addEventListener('click', function(e) {
                var item = e.target.closest('.topic-item');
                if (!item) return;
                var categoryItem = main.querySelector('.category-item.active');
                var categoryKey = categoryItem ? categoryItem.getAttribute('data-category') : 'suenos';
                var topic = forumCategories[categoryKey].topics[parseInt(item.getAttribute('data-topic'), 10)];
                openTopic(main, topic);
            });

            topicList.addEventListener('keydown', function(e) {
                if (e.key !== 'Enter' && e.key !== ' ') return;
                var item = e.target.closest('.topic-item');
                if (!item) return;
                e.preventDefault();
                item.click();
            });
        }

        if (uploadBtn && uploadModal) {
            uploadBtn.addEventListener('click', function() {
                uploadModal.classList.add('active');
            });
        }

        if (closeBtn && modal) {
            closeBtn.addEventListener('click', function() {
                closeTopicModal(modal);
            });
        }

        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === modal) closeTopicModal(modal);
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

        if (activeKeydown) document.removeEventListener('keydown', activeKeydown);
        activeKeydown = function(e) {
            if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
                closeTopicModal(modal);
            }
        };
        document.addEventListener('keydown', activeKeydown);
    }

    window.renderForo = function() {
        var placeholder = document.getElementById('main-placeholder');
        if (!placeholder) return;

        var main = document.createElement('main');
        main.className = 'main forum-layout';
        main.innerHTML =
            '<aside class="forum-sidebar">' +
                '<div class="sidebar-section">' +
                    '<h3 class="sidebar-title">Categorías</h3>' +
                    '<nav class="category-nav">' +
                        Object.keys(forumCategories).map(function(key) {
                            var category = forumCategories[key];
                            return '<a href="#foro" class="category-item" data-category="' + key + '">' +
                                '<span class="category-icon">' + category.icon + '</span>' +
                                '<span class="category-name">' + category.name + '</span>' +
                                '<span class="category-count">' + category.topics.length + '</span>' +
                            '</a>';
                        }).join('') +
                    '</nav>' +
                '</div>' +
                '<div class="sidebar-section">' +
                    '<button class="upload-drawing-btn" id="uploadDrawingBtn" type="button">' +
                        '<span class="btn-icon">&#128228;</span>' +
                        'Subir mi dibujo' +
                    '</button>' +
                '</div>' +
            '</aside>' +
            '<section class="forum-content">' +
                '<div class="forum-header">' +
                    '<h2 id="forumCategoryTitle"></h2>' +
                    '<span class="forum-topic-count" id="forumTopicCount"></span>' +
                '</div>' +
                '<div class="topic-list" id="forumTopicList"></div>' +
            '</section>' +
            topicModalHtml();

        placeholder.innerHTML = '';
        placeholder.appendChild(main);

        var firstCategory = main.querySelector('.category-item');
        if (firstCategory) {
            firstCategory.classList.add('active');
            renderCategory(main, firstCategory.getAttribute('data-category'));
        }
        bindForum(main);
    };
})();
