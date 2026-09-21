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
                    '<a href="#suenos" class="category-item active">' +
                        '<span class="category-icon">&#128161;</span>' +
                        '<span class="category-name">Sueños</span>' +
                        '<span class="category-count">12</span>' +
                    '</a>' +
                    '<a href="#compulsiones" class="category-item">' +
                        '<span class="category-icon">&#129504;</span>' +
                        '<span class="category-name">Compulsiones</span>' +
                        '<span class="category-count">8</span>' +
                    '</a>' +
                    '<a href="#dibujos" class="category-item">' +
                        '<span class="category-icon">&#127912;</span>' +
                        '<span class="category-name">Dibujos</span>' +
                        '<span class="category-count">15</span>' +
                    '</a>' +
                '</nav>' +
            '</div>' +
            '<div class="sidebar-section">' +
                '<button class="upload-drawing-btn" id="uploadDrawingBtn">' +
                    '<span class="btn-icon">&#128228;</span>' +
                    'Subir mi dibujo' +
                '</button>' +
            '</div>' +
        '</aside>' +
        '<section class="forum-content">' +
            '<div class="forum-header">' +
                '<h2>Sueños</h2>' +
                '<span class="forum-topic-count">12 temas</span>' +
            '</div>' +
            '<div class="topic-list">' +
                '<article class="topic-item">' +
                    '<div class="topic-avatar">' +
                        '<span class="avatar-initials">HA</span>' +
                    '</div>' +
                    '<div class="topic-info">' +
                        '<h4 class="topic-title">Visión recurrente del templo submarino</h4>' +
                        '<p class="topic-excerpt">Cada noche veo las mismas estructuras bajo el agua, con criaturas que se mueven entre los corales...</p>' +
                        '<div class="topic-meta">' +
                            '<span class="topic-author">Prof. Armitage</span>' +
                            '<span class="topic-date">Hace 2 horas</span>' +
                            '<span class="topic-replies">5 respuestas</span>' +
                        '</div>' +
                    '</div>' +
                    '<div class="topic-stats">' +
                        '<span class="stat-icon">&#128065;</span>' +
                        '<span class="stat-count">47</span>' +
                    '</div>' +
                '</article>' +
                '<article class="topic-item">' +
                    '<div class="topic-avatar">' +
                        '<span class="avatar-initials">EW</span>' +
                    '</div>' +
                    '<div class="topic-info">' +
                        '<h4 class="topic-title">Pesadillas con entidades geometrical</h4>' +
                        '<p class="topic-excerpt">Las figuras geométricas que aparecen en mis sueños no siguen las leyes de la física conocida...</p>' +
                        '<div class="topic-meta">' +
                            '<span class="topic-author">Decano West</span>' +
                            '<span class="topic-date">Hace 5 horas</span>' +
                            '<span class="topic-replies">12 respuestas</span>' +
                        '</div>' +
                    '</div>' +
                    '<div class="topic-stats">' +
                        '<span class="stat-icon">&#128065;</span>' +
                        '<span class="stat-count">89</span>' +
                    '</div>' +
                '</article>' +
                '<article class="topic-item">' +
                    '<div class="topic-avatar">' +
                        '<span class="avatar-initials">AL</span>' +
                    '</div>' +
                    '<div class="topic-info">' +
                        '<h4 class="topic-title">Sueño con el Libro prohibido</h4>' +
                        '<p class="topic-excerpt">En mi sueño, encontré una copia del Necronomicón en la biblioteca subterránea...</p>' +
                        '<div class="topic-meta">' +
                            '<span class="topic-author">Est. López</span>' +
                            '<span class="topic-date">Ayer</span>' +
                            '<span class="topic-replies">8 respuestas</span>' +
                        '</div>' +
                    '</div>' +
                    '<div class="topic-stats">' +
                        '<span class="stat-icon">&#128065;</span>' +
                        '<span class="stat-count">156</span>' +
                    '</div>' +
                '</article>' +
                '<article class="topic-item">' +
                    '<div class="topic-avatar">' +
                        '<span class="avatar-initials">MR</span>' +
                    '</div>' +
                    '<div class="topic-info">' +
                        '<h4 class="topic-title">Visión de la ciudad de R\'lyeh</h4>' +
                        '<p class="topic-excerpt">Vi la ciudad sagrada en sueños, con sus ángulos imposibles y su arquitectura antinatural...</p>' +
                        '<div class="topic-meta">' +
                            '<span class="topic-author">Dr. Rivera</span>' +
                            '<span class="topic-date">Hace 2 días</span>' +
                            '<span class="topic-replies">15 respuestas</span>' +
                        '</div>' +
                    '</div>' +
                    '<div class="topic-stats">' +
                        '<span class="stat-icon">&#128065;</span>' +
                        '<span class="stat-count">234</span>' +
                    '</div>' +
                '</article>' +
            '</div>' +
        '</section>';

    placeholder.innerHTML = '';
    placeholder.appendChild(main);

    var uploadBtn = main.querySelector('#uploadDrawingBtn');
    var uploadModal = document.getElementById('uploadModal');
    if (uploadBtn && uploadModal) {
        uploadBtn.addEventListener('click', function() {
            uploadModal.classList.add('active');
        });
    }
};