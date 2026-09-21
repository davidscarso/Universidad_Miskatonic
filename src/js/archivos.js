(function() {
    var activeKeydown = null;

    var fileContents = {
        tesis: {
            title: 'Tesis sobre los Mitos.txt',
            content: '<p>TESIS: Los Mitos de Cthulhu y su Influencia en la Cultura Antigua</p><p>Autor: Prof. Henry Armitage</p><p>Fecha: 15 de Octubre, 1928</p><br><p>Los mitos de Cthulhu representan un cuerpo de conocimiento antiguo que ha sobrevivido a través de los siglos, transmitido de generación en generación por aquellos que han tenido el coraje de explorar los límites de la comprensión humana.</p><p>Este trabajo de investigación analiza las conexiones entre los textos antiguos y los fenómenos recientes observados en la región de Arkham.</p>'
        },
        carta: {
            title: 'Carta del Decano.txt',
            content: '<p>Estimado Profesor Armitage,</p><p>Le escribo para informarle sobre los resultados de la reunión del departamento. Hemos decidido continuar con la investigación sobre los manuscritos encontrados en la expedición.</p><p>Su contribución ha sido invaluable y esperamos que pueda presentar sus hallazgos en la próxima conferencia.</p><p>Atentamente,</p><p>Decano West</p>'
        },
        notas: {
            title: 'Notas de clase.txt',
            content: '<p>NOTAS DE CLASE - Lenguas Antiguas</p><p>Fecha: 10 de Octubre, 1928</p><br><p>Tema: El Necronomicón y sus traducciones</p><p>1. El original fue escrito por el Locuente Louvain en árabe</p><p>2. La traducción al latín fue realizada en el siglo XV</p><p>3. Existen fragmentos en la biblioteca de la universidad</p><p>4. Precaución: No leer en voz alta</p>'
        },
        templo: {
            title: 'Templo submarino.jpg',
            content: '<p>[IMAGEN: Vista del templo submarino de R\'lyeh]</p><p>Descripción: Estructura de piedra con ángulos imposibles, cubierta de algas y coral. Se observan símbolos extraños tallados en las paredes.</p><p>Fuente: Expedición Arkham, 1928</p>'
        },
        manuscrito: {
            title: 'Manuscrito antiguo.jpg',
            content: '<p>[IMAGEN: Página del manuscrito antiguo]</p><p>Descripción: Manuscrito en árabe con ilustraciones de entidades desconocidas. El texto parece describir rituales de invocación.</p><p>Estado: Parcialmente deteriorado</p>'
        },
        profesor: {
            title: 'Profesor Armitage.jpg',
            content: '<p>[IMAGEN: Retrato del Profesor Henry Armitage]</p><p>Cargo: Profesor de Lenguas Antiguas</p><p>Departamento: Filosofía y Letras</p><p>Especialización: Mitos de Cthulhu, Textos Antiguos</p>'
        },
        excavacion: {
            title: 'Excavación Arkham.mp4',
            content: '<p>[VIDEO: Excavación en Arkham]</p><p>Duración: 15:30</p><p>Descripción: Registro de la excavación arqueológica en las ruinas subterráneas de Arkham. Se observan estructuras de origen desconocido.</p><p>Fecha: Octubre, 1928</p>'
        },
        conferencia: {
            title: 'Conferencia Cthulhu.mp4',
            content: '<p>[VIDEO: Conferencia sobre los Mitos de Cthulhu]</p><p>Duración: 45:00</p><p>Descripción: Conferencia impartida por el Profesor Armitage sobre los hallazgos recientes y su relación con los mitos de Cthulhu.</p><p>Fecha: 15 de Octubre, 1928</p>'
        },
        reporte: {
            title: 'Reporte expedición.txt',
            content: '<p>REPORTE DE EXPEDICIÓN</p><p>Destino: Ruinas subterráneas de Arkham</p><p>Fecha: Octubre, 1928</p><br><p>Resumen:</p><p>Se encontraron estructuras subterráneas con inscripciones en una lengua desconocida. Los símbolos parecen corresponder a una variante del Necronomicón.</p><p>Recomendación: Continuar la investigación con precaución.</p>'
        },
        analisis: {
            title: 'Análisis manuscritos.txt',
            content: '<p>ANÁLISIS DE MANUSCRITOS</p><p>Fecha: 8 de Octubre, 1928</p><br><p>Manuscritos analizados: 5</p><p>Idiomas identificados: Árabe, Latín, Desconocido</p><p>Temas principales:</p><p>1. Invocaciones a entidades cósmicas</p><p>2. Descripciones de dimensiones alternas</p><p>3. Ritual de apertura de portales</p><p>Conclusión: Los manuscritos contienen información potencialmente peligrosa.</p>'
        }
    };

    var folderContents = {
        documentos: [
            { name: 'Tesis sobre los Mitos.txt', type: 'text', content: 'tesis', meta: '2 KB • 15 Oct 1928', icon: '&#128196;' },
            { name: 'Carta del Decano.txt', type: 'text', content: 'carta', meta: '1 KB • 12 Oct 1928', icon: '&#128196;' },
            { name: 'Notas de clase.txt', type: 'text', content: 'notas', meta: '3 KB • 10 Oct 1928', icon: '&#128196;' }
        ],
        imagenes: [
            { name: 'Templo submarino.jpg', type: 'image', content: 'templo', meta: '150 KB • 14 Oct 1928', icon: '&#128444;' },
            { name: 'Manuscrito antiguo.jpg', type: 'image', content: 'manuscrito', meta: '200 KB • 13 Oct 1928', icon: '&#128444;' },
            { name: 'Profesor Armitage.jpg', type: 'image', content: 'profesor', meta: '85 KB • 11 Oct 1928', icon: '&#128444;' }
        ],
        videos: [
            { name: 'Excavación Arkham.mp4', type: 'video', content: 'excavacion', meta: '25 MB • 14 Oct 1928', icon: '&#127910;' },
            { name: 'Conferencia Cthulhu.mp4', type: 'video', content: 'conferencia', meta: '120 MB • 15 Oct 1928', icon: '&#127910;' }
        ],
        investigacion: [
            { name: 'Reporte expedición.txt', type: 'text', content: 'reporte', meta: '4 KB • 15 Oct 1928', icon: '&#128196;' },
            { name: 'Análisis manuscritos.txt', type: 'text', content: 'analisis', meta: '5 KB • 8 Oct 1928', icon: '&#128196;' }
        ]
    };

    var folderNames = {
        documentos: 'Documentos',
        imagenes: 'Imágenes',
        videos: 'Videos',
        investigacion: 'Investigación'
    };

    function updateFilesGrid(filesGrid, currentFolderTitle, filesCount, folder) {
        var files = folderContents[folder];
        if (!filesGrid || !files) return;

        filesGrid.innerHTML = '';

        files.forEach(function(file) {
            var fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.setAttribute('data-type', file.type);
            fileItem.setAttribute('data-content', file.content);
            fileItem.innerHTML = '<div class="file-icon">' + file.icon + '</div><div class="file-name">' + file.name + '</div><div class="file-meta">' + file.meta + '</div>';
            filesGrid.appendChild(fileItem);
        });

        if (currentFolderTitle) {
            currentFolderTitle.textContent = folderNames[folder] || folder;
        }

        if (filesCount) {
            filesCount.textContent = files.length + ' archivos';
        }
    }

    function openFilePreview(contentType) {
        var filePreviewModal = document.getElementById('filePreviewModal');
        var file = fileContents[contentType];
        if (!filePreviewModal || !file) return;

        var previewFileName = filePreviewModal.querySelector('#previewFileName');
        var previewBody = filePreviewModal.querySelector('#previewBody');
        if (previewFileName) previewFileName.textContent = file.title;
        if (previewBody) previewBody.innerHTML = '<p>' + file.content + '</p>';
        filePreviewModal.classList.add('active');
    }

    function resetModalSize(filePreviewModal) {
        var content = filePreviewModal.querySelector('.file-preview-content');
        if (content) {
            content.style.width = '600px';
            content.style.height = '400px';
            content.style.minWidth = '400px';
            content.style.minHeight = '300px';
            content.style.position = '';
            content.style.top = '';
            content.style.left = '';
            content.style.zIndex = '';
        }
    }

    function bindHandlers(main) {
        var filesGrid = main.querySelector('#filesGrid');
        var currentFolderTitle = main.querySelector('#currentFolder');
        var filesCount = main.querySelector('#filesCount');
        var folderTree = main.querySelector('.folder-tree');
        var filePreviewModal = main.querySelector('#filePreviewModal');
        var closePreviewModal = main.querySelector('#closePreviewModal');
        var minimizeModal = main.querySelector('#minimizeModal');
        var maximizeModal = main.querySelector('#maximizeModal');

        var folderItems = main.querySelectorAll('.folder-item');

        if (folderTree) {
            folderTree.addEventListener('click', function(e) {
                var item = e.target.closest('.folder-item');
                if (!item) return;
                folderItems.forEach(function(i) {
                    i.classList.remove('active');
                });
                item.classList.add('active');
                updateFilesGrid(filesGrid, currentFolderTitle, filesCount, item.getAttribute('data-folder'));
            });
        }

        if (filesGrid) {
            filesGrid.addEventListener('click', function(e) {
                var item = e.target.closest('.file-item');
                if (!item) return;
                openFilePreview(item.getAttribute('data-content'));
            });
        }

        if (closePreviewModal && filePreviewModal) {
            closePreviewModal.addEventListener('click', function() {
                filePreviewModal.classList.remove('active');
                resetModalSize(filePreviewModal);
            });
        }

        if (filePreviewModal) {
            filePreviewModal.addEventListener('click', function(e) {
                if (e.target === filePreviewModal) {
                    filePreviewModal.classList.remove('active');
                    resetModalSize(filePreviewModal);
                }
            });
        }

        if (minimizeModal && filePreviewModal) {
            minimizeModal.addEventListener('click', function() {
                var content = filePreviewModal.querySelector('.file-preview-content');
                if (!content) return;
                if (content.style.height === '40px') {
                    content.style.height = '400px';
                    content.style.minHeight = '300px';
                } else {
                    content.style.height = '40px';
                    content.style.minHeight = '40px';
                    content.style.overflow = 'hidden';
                }
            });
        }

        if (maximizeModal && filePreviewModal) {
            maximizeModal.addEventListener('click', function() {
                var content = filePreviewModal.querySelector('.file-preview-content');
                if (!content) return;
                if (content.style.width === '100vw') {
                    content.style.width = '600px';
                    content.style.height = '400px';
                    content.style.minWidth = '400px';
                    content.style.minHeight = '300px';
                } else {
                    content.style.width = '100vw';
                    content.style.height = '100vh';
                    content.style.minWidth = '100vw';
                    content.style.minHeight = '100vh';
                    content.style.position = 'fixed';
                    content.style.top = '0';
                    content.style.left = '0';
                    content.style.zIndex = '300';
                }
            });
        }

        if (activeKeydown) {
            document.removeEventListener('keydown', activeKeydown);
        }
        activeKeydown = function(e) {
            if (e.key === 'Escape' && filePreviewModal) {
                var modal = document.getElementById('filePreviewModal');
                if (modal && modal.classList.contains('active')) {
                    modal.classList.remove('active');
                    resetModalSize(modal);
                }
            }
        };
        document.addEventListener('keydown', activeKeydown);

        if (folderItems.length > 0) {
            folderItems.forEach(function(i) {
                i.classList.remove('active');
            });
            folderItems[0].classList.add('active');
            updateFilesGrid(filesGrid, currentFolderTitle, filesCount, folderItems[0].getAttribute('data-folder'));
        }
    }

    window.renderArchivos = function() {
        var placeholder = document.getElementById('main-placeholder');
        if (!placeholder) return;

        var main = document.createElement('main');
        main.className = 'main files-layout';
        main.innerHTML =
            '<aside class="files-sidebar">' +
                '<div class="sidebar-section">' +
                    '<h3 class="sidebar-title">Carpetas</h3>' +
                    '<nav class="folder-tree">' +
                        '<div class="folder-item active" data-folder="documentos">' +
                            '<span class="folder-icon">&#128193;</span>' +
                            '<span class="folder-name">Documentos</span>' +
                        '</div>' +
                        '<div class="folder-item" data-folder="imagenes">' +
                            '<span class="folder-icon">&#128194;</span>' +
                            '<span class="folder-name">Imágenes</span>' +
                        '</div>' +
                        '<div class="folder-item" data-folder="videos">' +
                            '<span class="folder-icon">&#128190;</span>' +
                            '<span class="folder-name">Videos</span>' +
                        '</div>' +
                        '<div class="folder-item" data-folder="investigacion">' +
                            '<span class="folder-icon">&#128193;</span>' +
                            '<span class="folder-name">Investigación</span>' +
                        '</div>' +
                    '</nav>' +
                '</div>' +
            '</aside>' +
            '<section class="files-content">' +
                '<div class="files-header">' +
                    '<h2 id="currentFolder">Documentos</h2>' +
                    '<span class="files-count" id="filesCount">3 archivos</span>' +
                '</div>' +
                '<div class="files-grid" id="filesGrid">' +
                    '<div class="file-item" data-type="text" data-content="tesis">' +
                        '<div class="file-icon">&#128196;</div>' +
                        '<div class="file-name">Tesis sobre los Mitos.txt</div>' +
                        '<div class="file-meta">2 KB • 15 Oct 1928</div>' +
                    '</div>' +
                    '<div class="file-item" data-type="text" data-content="carta">' +
                        '<div class="file-icon">&#128196;</div>' +
                        '<div class="file-name">Carta del Decano.txt</div>' +
                        '<div class="file-meta">1 KB • 12 Oct 1928</div>' +
                    '</div>' +
                    '<div class="file-item" data-type="text" data-content="notas">' +
                        '<div class="file-icon">&#128196;</div>' +
                        '<div class="file-name">Notas de clase.txt</div>' +
                        '<div class="file-meta">3 KB • 10 Oct 1928</div>' +
                    '</div>' +
                '</div>' +
            '</section>' +
            '<div class="modal file-preview-modal" id="filePreviewModal">' +
                '<div class="modal-content file-preview-content">' +
                    '<div class="modal-header">' +
                        '<h3 id="previewFileName">Archivo</h3>' +
                        '<div class="modal-controls">' +
                            '<button class="modal-control-btn" id="minimizeModal" title="Minimizar">&#9472;</button>' +
                            '<button class="modal-control-btn" id="maximizeModal" title="Maximizar">&#9723;</button>' +
                            '<span class="close-modal" id="closePreviewModal">&times;</span>' +
                        '</div>' +
                    '</div>' +
                    '<div class="modal-body" id="previewBody">' +
                        '<p>Contenido del archivo...</p>' +
                    '</div>' +
                '</div>' +
            '</div>';

        placeholder.innerHTML = '';
        placeholder.appendChild(main);
        bindHandlers(main);
    };
})();