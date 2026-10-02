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
            image: 'assets/images/Archivos/Templo submarino.png',
            imageAlt: 'Vista del templo submarino de R\'lyeh',
            content: '<p>[IMAGEN: Vista del templo submarino de R\'lyeh]</p><p>Descripción: Estructura de piedra con ángulos imposibles, cubierta de algas y coral. Se observan símbolos extraños tallados en las paredes.</p><p>Fuente: Expedición Arkham, 1928</p>'
        },
        manuscrito: {
            title: 'Manuscrito antiguo.jpg',
            image: 'assets/images/Archivos/Manuscrito antiguo.png',
            imageAlt: 'Página del manuscrito antiguo',
            content: '<p>[IMAGEN: Página del manuscrito antiguo]</p><p>Descripción: Manuscrito en árabe con ilustraciones de entidades desconocidas. El texto parece describir rituales de invocación.</p><p>Estado: Parcialmente deteriorado</p>'
        },
        profesor: {
            title: 'Profesor Armitage.jpg',
            image: 'assets/images/Archivos/Profesor Armitage.png',
            imageAlt: 'Retrato del Profesor Henry Armitage',
            content: '<p>[IMAGEN: Retrato del Profesor Henry Armitage]</p><p>Cargo: Profesor de Lenguas Antiguas</p><p>Departamento: Filosofía y Letras</p><p>Especialización: Mitos de Cthulhu, Textos Antiguos</p>'
        },
        reporte: {
            title: 'Reporte expedición.txt',
            content: '<p>REPORTE DE EXPEDICIÓN</p><p>Destino: Ruinas subterráneas de Arkham</p><p>Fecha: Octubre, 1928</p><br><p>Resumen:</p><p>Se encontraron estructuras subterráneas con inscripciones en una lengua desconocida. Los símbolos parecen corresponder a una variante del Necronomicón.</p><p>Recomendación: Continuar la investigación con precaución.</p>'
        },
        analisis: {
            title: 'Análisis manuscritos.txt',
            content: '<p>ANÁLISIS DE MANUSCRITOS</p><p>Fecha: 8 de Octubre, 1928</p><br><p>Manuscritos analizados: 5</p><p>Idiomas identificados: Árabe, Latín, Desconocido</p><p>Temas principales:</p><p>1. Invocaciones a entidades cósmicas</p><p>2. Descripciones de dimensiones alternas</p><p>3. Ritual de apertura de portales</p><p>Conclusión: Los manuscritos contienen información potencialmente peligrosa.</p>'
        },
        reporteILA: {
            title: 'Reporte ILA.txt',
            content: '<p>REPORTE ILA</p><p>Generado por: Kaliber AI (nodo de cálculo 136)</p><p>Fecha: 16 de Octubre, 1928</p><br><p>El análisis automático de manuscritos quedó detenido tras un fallo en el inicio del modelo. El último estado registrado fue del 98% del proceso.</p><p>Para revisar la sesión completa, ejecute el simulador de terminal:</p><p><a href="#" class="terminal-launch">&#9656; Ejecutar simulador de terminal (ILA)</a></p><p>Nota: el operador deberá confirmar la continuación dentro de la propia terminal.</p>'
        }
    };

    var folderContents = {
        documentos: [
            { name: 'Tesis sobre los Mitos.txt', type: 'text', content: 'tesis', meta: '2 KB • 15 Oct 1928', icon: '&#128196;' },
            { name: 'Carta del Decano.txt', type: 'text', content: 'carta', meta: '1 KB • 12 Oct 1928', icon: '&#128196;' },
            { name: 'Notas de clase.txt', type: 'text', content: 'notas', meta: '3 KB • 10 Oct 1928', icon: '&#128196;' }
        ],
        imagenes: [
            { name: 'Templo submarino.jpg', type: 'image', content: 'templo', meta: '150 KB • 14 Oct 1928', icon: '&#128444;', thumb: 'assets/images/Archivos/Templo submarino.png' },
            { name: 'Manuscrito antiguo.jpg', type: 'image', content: 'manuscrito', meta: '200 KB • 13 Oct 1928', icon: '&#128444;', thumb: 'assets/images/Archivos/Manuscrito antiguo.png' },
            { name: 'Profesor Armitage.jpg', type: 'image', content: 'profesor', meta: '85 KB • 11 Oct 1928', icon: '&#128444;', thumb: 'assets/images/Archivos/Profesor Armitage.png' }
        ],
        investigacion: [
            { name: 'Reporte expedición.txt', type: 'text', content: 'reporte', meta: '4 KB • 15 Oct 1928', icon: '&#128196;' },
            { name: 'Análisis manuscritos.txt', type: 'text', content: 'analisis', meta: '5 KB • 8 Oct 1928', icon: '&#128196;' },
            { name: 'Reporte ILA.txt', type: 'text', content: 'reporteILA', meta: '6 KB • 16 Oct 1928', icon: '&#128187;' }
        ]
    };

    var folderNames = {
        documentos: 'Documentos',
        imagenes: 'Imágenes',
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
            var media = file.thumb
                ? '<div class="file-thumb"><img src="' + encodeURI(file.thumb) + '" alt=""></div>'
                : '<div class="file-icon">' + file.icon + '</div>';
            fileItem.innerHTML = media + '<div class="file-name">' + file.name + '</div><div class="file-meta">' + file.meta + '</div>';
            filesGrid.appendChild(fileItem);
        });

        if (currentFolderTitle) {
            currentFolderTitle.textContent = folderNames[folder] || folder;
        }

        if (filesCount) {
            filesCount.textContent = files.length + ' archivos';
        }
    }

    function buildPreviewBody(file) {
        if (!file.image) {
            return file.content;
        }
        return '<div class="preview-media">' +
                '<img class="preview-media-img" src="' + encodeURI(file.image) + '" alt="' + file.imageAlt + '">' +
            '</div>' +
            '<div class="detail-body preview-detail">' + file.content + '</div>';
    }

    function openFilePreview(contentType) {
        var filePreviewModal = document.getElementById('filePreviewModal');
        var file = fileContents[contentType];
        if (!filePreviewModal || !file) return;

        var previewFileName = filePreviewModal.querySelector('#previewFileName');
        var previewBody = filePreviewModal.querySelector('#previewBody');
        if (previewFileName) previewFileName.textContent = file.title;
        if (previewBody) {
            previewBody.classList.toggle('is-split', !!file.image);
            previewBody.innerHTML = buildPreviewBody(file);
        }
        resetPreviewState(filePreviewModal);
        filePreviewModal.classList.add('active');
    }

    function resetPreviewState(filePreviewModal) {
        var content = filePreviewModal.querySelector('.preview-content');
        if (content) {
            content.classList.remove('is-maximized');
        }
        var maximizeBtn = filePreviewModal.querySelector('#maximizeModal');
        if (maximizeBtn) {
            maximizeBtn.setAttribute('title', 'Maximizar');
        }
    }

    function closePreview(filePreviewModal) {
        filePreviewModal.classList.remove('active');
        resetPreviewState(filePreviewModal);
    }

    function bindHandlers(main) {
        var filesGrid = main.querySelector('#filesGrid');
        var currentFolderTitle = main.querySelector('#currentFolder');
        var filesCount = main.querySelector('#filesCount');
        var folderTree = main.querySelector('.folder-tree');
        var filePreviewModal = main.querySelector('#filePreviewModal');
        var closePreviewModal = main.querySelector('#closePreviewModal');
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
                closePreview(filePreviewModal);
            });
        }

        if (filePreviewModal) {
            filePreviewModal.addEventListener('click', function(e) {
                var launch = e.target.closest ? e.target.closest('.terminal-launch') : null;
                if (launch) {
                    e.preventDefault();
                    if (typeof window.abrirTerminalILA === 'function') {
                        window.abrirTerminalILA();
                    }
                    return;
                }
                if (e.target === filePreviewModal) {
                    closePreview(filePreviewModal);
                }
            });
        }

        if (maximizeModal && filePreviewModal) {
            maximizeModal.addEventListener('click', function() {
                var content = filePreviewModal.querySelector('.preview-content');
                if (!content) return;
                var maximized = content.classList.toggle('is-maximized');
                maximizeModal.setAttribute('title', maximized ? 'Restaurar' : 'Maximizar');
            });
        }

        if (activeKeydown) {
            document.removeEventListener('keydown', activeKeydown);
        }
        activeKeydown = function(e) {
            if (e.key === 'Escape' && filePreviewModal) {
                if (document.querySelector('.terminal-modal.active')) return;
                var modal = document.getElementById('filePreviewModal');
                if (modal && modal.classList.contains('active')) {
                    closePreview(modal);
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
            '<div class="modal preview-modal" id="filePreviewModal">' +
                '<div class="modal-content preview-content">' +
                    '<div class="modal-header">' +
                        '<h3 id="previewFileName">Archivo</h3>' +
                        '<div class="modal-controls">' +
                            '<button type="button" class="modal-control-btn" id="maximizeModal" title="Maximizar">' +
                                '<span class="icon-maximize">&#9633;</span><span class="icon-restore">&#10697;</span>' +
                            '</button>' +
                            '<button type="button" class="modal-control-btn close-btn" id="closePreviewModal" title="Cerrar">&times;</button>' +
                        '</div>' +
                    '</div>' +
                    '<div class="modal-body" id="previewBody">' +
                        '<p>Contenido del archivo...</p>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="modal terminal-modal" id="terminalModal">' +
                '<div class="modal-content terminal-content">' +
                    '<div class="modal-header">' +
                        '<h3 id="terminalTitle">Terminal ILA — simulador de servidores</h3>' +
                        '<div class="modal-controls">' +
                            '<button type="button" class="modal-control-btn" id="terminalMaximizeBtn" title="Maximizar">' +
                                '<span class="icon-maximize">&#9633;</span><span class="icon-restore">&#10697;</span>' +
                            '</button>' +
                            '<button type="button" class="modal-control-btn close-btn" id="terminalCloseBtn" title="Cerrar">&times;</button>' +
                        '</div>' +
                    '</div>' +
                    '<div class="modal-body terminal-body">' +
                        '<div class="terminal-output" id="terminalOutput"></div>' +
                        '<div class="terminal-input-line is-disabled" id="terminalInputLine">' +
                            '<span class="terminal-prompt">ila@kaliber:~$</span>' +
                            '<input type="text" id="terminalInput" autocomplete="off" spellcheck="false" disabled>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>';

        placeholder.innerHTML = '';
        placeholder.appendChild(main);
        bindHandlers(main);
        if (typeof window.bindTerminalILA === 'function') {
            window.bindTerminalILA(main);
        }
    };
})();
