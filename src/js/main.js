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
            if (filePreviewModal && filePreviewModal.classList.contains('active')) {
                filePreviewModal.classList.remove('active');
            }
        }
    });

    // Files: Folder Navigation and File Preview
    const folderItems = document.querySelectorAll('.folder-item');
    const fileItems = document.querySelectorAll('.file-item');
    const filePreviewModal = document.getElementById('filePreviewModal');
    const closePreviewModal = document.getElementById('closePreviewModal');
    const previewFileName = document.getElementById('previewFileName');
    const previewBody = document.getElementById('previewBody');
    const minimizeModal = document.getElementById('minimizeModal');
    const maximizeModal = document.getElementById('maximizeModal');
    const currentFolderTitle = document.getElementById('currentFolder');
    const filesCount = document.getElementById('filesCount');
    const filesGrid = document.getElementById('filesGrid');

    const fileContents = {
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

    const folderContents = {
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

    function updateFilesGrid(folder) {
        if (!filesGrid || !folderContents[folder]) return;

        const files = folderContents[folder];
        filesGrid.innerHTML = '';

        files.forEach(function(file) {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.setAttribute('data-type', file.type);
            fileItem.setAttribute('data-content', file.content);
            fileItem.innerHTML = '<div class="file-icon">' + file.icon + '</div><div class="file-name">' + file.name + '</div><div class="file-meta">' + file.meta + '</div>';
            filesGrid.appendChild(fileItem);

            fileItem.addEventListener('click', function() {
                const contentType = this.getAttribute('data-content');
                openFilePreview(contentType);
            });
        });

        if (currentFolderTitle) {
            const folderNames = {
                documentos: 'Documentos',
                imagenes: 'Imágenes',
                videos: 'Videos',
                investigacion: 'Investigación'
            };
            currentFolderTitle.textContent = folderNames[folder] || folder;
        }

        if (filesCount) {
            filesCount.textContent = files.length + ' archivos';
        }
    }

    function openFilePreview(contentType) {
        if (!filePreviewModal || !fileContents[contentType]) return;

        const file = fileContents[contentType];
        if (previewFileName) previewFileName.textContent = file.title;
        if (previewBody) previewBody.innerHTML = '<p>' + file.content + '</p>';
        filePreviewModal.classList.add('active');
    }

    folderItems.forEach(function(item) {
        item.addEventListener('click', function() {
            folderItems.forEach(function(i) { i.classList.remove('active'); });
            this.classList.add('active');
            const folder = this.getAttribute('data-folder');
            updateFilesGrid(folder);
        });
    });

    fileItems.forEach(function(item) {
        item.addEventListener('click', function() {
            const contentType = this.getAttribute('data-content');
            openFilePreview(contentType);
        });
    });

    if (closePreviewModal && filePreviewModal) {
        closePreviewModal.addEventListener('click', function() {
            filePreviewModal.classList.remove('active');
        });
    }

    if (filePreviewModal) {
        filePreviewModal.addEventListener('click', function(e) {
            if (e.target === filePreviewModal) {
                filePreviewModal.classList.remove('active');
            }
        });
    }

    if (minimizeModal && filePreviewModal) {
        minimizeModal.addEventListener('click', function() {
            const content = filePreviewModal.querySelector('.file-preview-content');
            if (content) {
                if (content.style.height === '40px') {
                    content.style.height = '400px';
                    content.style.minHeight = '300px';
                } else {
                    content.style.height = '40px';
                    content.style.minHeight = '40px';
                    content.style.overflow = 'hidden';
                }
            }
        });
    }

    if (maximizeModal && filePreviewModal) {
        maximizeModal.addEventListener('click', function() {
            const content = filePreviewModal.querySelector('.file-preview-content');
            if (content) {
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
            }
        });
    }

    if (filePreviewModal) {
        filePreviewModal.addEventListener('click', function(e) {
            if (e.target === filePreviewModal) {
                filePreviewModal.classList.remove('active');
                const content = filePreviewModal.querySelector('.file-preview-content');
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
        });
    }
});
