(function() {
    var currentFolder = 'inbox';
    var activeKeydown = null;
    var openIndex = null;

    var mailboxes = {
        inbox: {
            title: 'Bandeja de Entrada',
            name: 'Entrada',
            icon: '&#128232;',
            emails: [
                {
                    from: 'Prof. Armitage',
                    fromEmail: 'armitage@kaliber.edu',
                    to: 'Damián Salcedo',
                    toEmail: 'dsalcedo@kaliber.edu',
                    subject: 'Re: Descubrimiento en la expedición Arkham',
                    date: '15 Oct',
                    read: false,
                    preview: 'Estimado colega, los resultados preliminares son...',
                    body: '<p>Estimado colega,</p>' +
                        '<p>Los resultados preliminares de la expedición a Arkham superan todas nuestras expectativas. Los textos encontrados en las ruinas subterráneas parecen corresponder a una versión desconocida del Necronomicón.</p>' +
                        '<p>Le sugiero que agendemos una reunión urgente para discutir los hallazgos y determinar los próximos pasos de investigación.</p>' +
                        '<p>Atentamente,<br>Prof. Henry Armitage<br>Departamento de Lenguas Antiguas</p>'
                },
                {
                    from: 'Decano West',
                    fromEmail: 'dwest@kaliber.edu',
                    to: 'Damián Salcedo',
                    toEmail: 'dsalcedo@kaliber.edu',
                    subject: 'Reunión del departamento - Jueves',
                    date: '14 Oct',
                    read: false,
                    preview: 'Le informo que la próxima reunión del departamento será...',
                    body: '<p>Estimado profesor,</p>' +
                        '<p>Le informo que la próxima reunión del departamento será el jueves a las 10 en la Sala 3. Se tratará la compra del equipo nuevo y el estado de las investigaciones en curso.</p>' +
                        '<p>Le agradeceré puntualidad. La asistencia es obligatoria para todo el cuerpo docente.</p>' +
                        '<p>Atentamente,<br>Decano West</p>'
                },
                {
                    from: 'Biblioteca Central',
                    fromEmail: 'biblioteca@kaliber.edu',
                    to: 'Damián Salcedo',
                    toEmail: 'dsalcedo@kaliber.edu',
                    subject: 'Solicitud de manuscrito aprobada',
                    date: '12 Oct',
                    read: false,
                    preview: 'Su solicitud del manuscrito Nro. 2847 ha sido aprobada...',
                    body: '<p>Estimado investigador,</p>' +
                        '<p>Su solicitud del manuscrito Nro. 2847 ha sido aprobada por el comité de adquisiciones. Podrá retirarlo en el mostrador de consulta a partir del lunes, previa presentación de su credencial.</p>' +
                        '<p>Recordamos que el manuscrito no puede fotografiarse ni extraerse del salón de lectura.</p>' +
                        '<p>Biblioteca Central</p>'
                }
            ]
        },
        sent: {
            title: 'Bandeja de Salida',
            name: 'Salida',
            icon: '&#128228;',
            emails: [
                {
                    from: 'Damián Salcedo',
                    fromEmail: 'dsalcedo@kaliber.edu',
                    to: 'Prof. Henry Armitage',
                    toEmail: 'armitage@kaliber.edu',
                    subject: 'Consulta sobre el manuscrito Nro. 2847',
                    date: '15 Oct',
                    read: true,
                    preview: 'Profesor, quisiera preguntarle si ya revisó los...',
                    body: '<p>Estimado profesor Armitage,</p>' +
                        '<p>Quisiera preguntarle si ya revisó los fragmentos del manuscrito Nro. 2847 que mencionamos la semana pasada. La biblioteca acaba de aprobar mi solicitud de consulta.</p>' +
                        '<p>Quedo a la espera de su respuesta.</p>' +
                        '<p>Saludos cordiales,<br>Damián Salcedo</p>'
                }
            ]
        },
        drafts: {
            title: 'Borradores',
            name: 'Borradores',
            icon: '&#128221;',
            emails: [
                {
                    from: 'Damián Salcedo',
                    fromEmail: 'dsalcedo@kaliber.edu',
                    to: 'Decano West',
                    toEmail: 'dwest@kaliber.edu',
                    subject: 'Apuntes para la reunión del jueves',
                    date: '14 Oct',
                    read: true,
                    preview: 'Puntos a tratar: equipo nuevo, estado de las...',
                    body: '<p>(borrador sin enviar)</p>' +
                        '<p>Puntos a tratar:</p>' +
                        '<p>1. Equipo nuevo para el laboratorio.</p>' +
                        '<p>2. Estado de las investigaciones en curso.</p>' +
                        '<p>3. …preguntar por el manuscrito</p>'
                }
            ]
        },
        deleted: {
            title: 'Eliminados',
            name: 'Eliminados',
            icon: '&#128465;',
            emails: [
                {
                    from: 'Remitente desconocido',
                    fromEmail: 'noreply@dominio-desconocido.net',
                    to: 'Damián Salcedo',
                    toEmail: 'dsalcedo@kaliber.edu',
                    subject: 'No abras este archivo adjunto',
                    date: '2 Oct',
                    read: true,
                    preview: 'Su expediente ha sido seleccionado para una...',
                    body: '<p>Estimado usuario,</p>' +
                        '<p>Su expediente ha sido seleccionado para una revisión especial. El archivo adjunto contiene los resultados de su última evaluación. No responda a este mensaje.</p>' +
                        '<p>(el remitente no figura en el directorio de la universidad)</p>'
                }
            ]
        }
    };

    function countFor(folder) {
        var emails = mailboxes[folder].emails;
        if (folder === 'inbox') {
            return emails.filter(function(email) {
                return !email.read;
            }).length;
        }
        return emails.length;
    }

    function formatAddr(name, addr) {
        return addr ? name + ' &lt;' + addr + '&gt;' : name;
    }

    function mailboxLinksHtml() {
        return Object.keys(mailboxes).map(function(folder) {
            var mailbox = mailboxes[folder];
            return '<a href="#correo" class="mailbox-item' + (folder === currentFolder ? ' active' : '') + '" data-mailbox="' + folder + '">' +
                '<span class="mailbox-icon">' + mailbox.icon + '</span>' +
                '<span class="mailbox-name">' + mailbox.name + '</span>' +
                '<span class="mailbox-count" data-count="' + folder + '">' + countFor(folder) + '</span>' +
            '</a>';
        }).join('');
    }

    function previewModalHtml() {
        return '<div class="modal preview-modal" id="emailPreviewModal">' +
            '<div class="modal-content preview-content">' +
                '<div class="modal-header">' +
                    '<h3 id="emailPreviewTitle">Correo</h3>' +
                    '<div class="modal-controls">' +
                        '<button type="button" class="modal-control-btn" id="emailMaximizeBtn" title="Maximizar">' +
                            '<span class="icon-maximize">&#9633;</span><span class="icon-restore">&#10697;</span>' +
                        '</button>' +
                        '<button type="button" class="modal-control-btn close-btn" id="emailCloseBtn" title="Cerrar">&times;</button>' +
                    '</div>' +
                '</div>' +
                '<div class="modal-body">' +
                    '<div class="detail-meta" id="emailMeta"></div>' +
                    '<div class="detail-body" id="emailBody"></div>' +
                '</div>' +
                '<div class="preview-footer">' +
                    '<button type="button" class="preview-read-btn" id="emailReadBtn">Leído</button>' +
                '</div>' +
            '</div>' +
        '</div>';
    }

    function composeModalHtml() {
        return '<div class="modal" id="composeModal" role="dialog" aria-modal="true" aria-labelledby="composeTitle">' +
            '<div class="modal-content compose-modal-content">' +
                '<div class="modal-header">' +
                    '<h3 id="composeTitle">Redactar correo</h3>' +
                    '<div class="modal-controls">' +
                        '<button type="button" class="modal-control-btn close-btn" id="composeCloseBtn" title="Cerrar" aria-label="Cerrar redacción">&times;</button>' +
                    '</div>' +
                '</div>' +
                '<form class="compose-form" id="composeForm">' +
                    '<div class="form-group">' +
                        '<label for="composeTo">Destinatario:</label>' +
                        '<input type="email" id="composeTo" name="composeTo" required>' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<label for="composeSubject">Asunto:</label>' +
                        '<input type="text" id="composeSubject" name="composeSubject" required>' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<label for="composeBody">Mensaje:</label>' +
                        '<textarea id="composeBody" name="composeBody" rows="7" required></textarea>' +
                    '</div>' +
                    '<button type="submit" class="submit-btn">Enviar mensaje</button>' +
                    '<p class="compose-status" id="composeStatus" role="status" aria-live="polite"></p>' +
                '</form>' +
            '</div>' +
        '</div>';
    }

    function updateCounts(main) {
        Object.keys(mailboxes).forEach(function(folder) {
            var badge = main.querySelector('.mailbox-count[data-count="' + folder + '"]');
            if (badge) {
                badge.textContent = countFor(folder);
            }
        });
    }

    function renderFolder(main) {
        var mailbox = mailboxes[currentFolder];
        var titleEl = main.querySelector('#mailboxTitle');
        var totalEl = main.querySelector('#mailboxTotal');
        var listEl = main.querySelector('#emailList');
        if (!mailbox || !titleEl || !totalEl || !listEl) return;

        main.querySelectorAll('.mailbox-item').forEach(function(item) {
            item.classList.toggle('active', item.getAttribute('data-mailbox') === currentFolder);
        });

        titleEl.textContent = mailbox.title;

        var total = mailbox.emails.length;
        totalEl.textContent = total === 1 ? '1 mensaje' : total + ' mensajes';

        if (total === 0) {
            listEl.innerHTML = '<p class="email-empty">No hay mensajes en esta bandeja.</p>';
            return;
        }

        listEl.innerHTML = mailbox.emails.map(function(email, index) {
            return '<article class="email-item' + (email.read ? '' : ' unread') + '" data-email="' + index + '">' +
                '<div class="email-status"></div>' +
                '<div class="email-from">' + email.from + '</div>' +
                '<div class="email-subject">' + email.subject + '</div>' +
                '<div class="email-preview">' + email.preview + '</div>' +
                '<div class="email-date">' + email.date + '</div>' +
            '</article>';
        }).join('');
    }

    function resetPreviewState(modal) {
        var content = modal.querySelector('.preview-content');
        if (content) {
            content.classList.remove('is-maximized');
        }
        var maximizeBtn = modal.querySelector('#emailMaximizeBtn');
        if (maximizeBtn) {
            maximizeBtn.setAttribute('title', 'Maximizar');
        }
    }

    function closeEmailModal(modal) {
        if (!modal) return;
        modal.classList.remove('active');
        resetPreviewState(modal);
        openIndex = null;
    }

    function openEmail(main, index) {
        var modal = main.querySelector('#emailPreviewModal');
        var email = mailboxes[currentFolder].emails[index];
        if (!modal || !email) return;

        openIndex = index;

        var titleEl = main.querySelector('#emailPreviewTitle');
        var metaEl = main.querySelector('#emailMeta');
        var bodyEl = main.querySelector('#emailBody');
        var readBtn = main.querySelector('#emailReadBtn');

        if (titleEl) titleEl.textContent = email.subject;
        if (metaEl) {
            metaEl.innerHTML =
                '<span class="detail-from">De: ' + formatAddr(email.from, email.fromEmail) + '</span>' +
                '<span class="detail-from">Para: ' + formatAddr(email.to, email.toEmail) + '</span>' +
                '<span class="detail-from">Asunto: ' + email.subject + '</span>';
        }
        if (bodyEl) bodyEl.innerHTML = email.body;
        if (readBtn) readBtn.style.display = currentFolder === 'inbox' ? 'inline-block' : 'none';

        resetPreviewState(modal);
        modal.classList.add('active');
    }

    function bindCorreo(main) {
        var composeBtn = main.querySelector('#composeBtn');
        var composeModal = main.querySelector('#composeModal');
        var composeCloseBtn = main.querySelector('#composeCloseBtn');
        var composeForm = main.querySelector('#composeForm');
        var composeStatus = main.querySelector('#composeStatus');
        var mailboxNav = main.querySelector('.mailbox-nav');

        if (composeBtn && composeModal) {
            composeBtn.addEventListener('click', function() {
                composeModal.classList.add('active');
                var recipient = main.querySelector('#composeTo');
                if (recipient) recipient.focus();
            });
        }

        if (composeCloseBtn && composeModal) {
            composeCloseBtn.addEventListener('click', function() {
                composeModal.classList.remove('active');
                if (composeForm) composeForm.reset();
                if (composeStatus) composeStatus.textContent = '';
            });
        }

        if (composeModal) {
            composeModal.addEventListener('click', function(e) {
                if (e.target === composeModal) {
                    composeModal.classList.remove('active');
                    if (composeForm) composeForm.reset();
                    if (composeStatus) composeStatus.textContent = '';
                }
            });
        }

        if (composeForm) {
            composeForm.addEventListener('submit', function(e) {
                e.preventDefault();
                if (!composeForm.checkValidity()) {
                    composeForm.reportValidity();
                    return;
                }
                composeForm.reset();
                if (composeStatus) {
                    composeStatus.textContent = 'Mensaje enviado (simulación).';
                }
            });
        }

        if (mailboxNav) {
            mailboxNav.addEventListener('click', function(e) {
                var item = e.target.closest('.mailbox-item');
                if (!item) return;
                e.preventDefault();
                var folder = item.getAttribute('data-mailbox');
                if (folder && mailboxes[folder] && folder !== currentFolder) {
                    currentFolder = folder;
                    renderFolder(main);
                }
            });
        }

        var listEl = main.querySelector('#emailList');
        if (listEl) {
            listEl.addEventListener('click', function(e) {
                var item = e.target.closest('.email-item');
                if (!item) return;
                openEmail(main, parseInt(item.getAttribute('data-email'), 10));
            });
        }

        var modal = main.querySelector('#emailPreviewModal');
        var closeBtn = main.querySelector('#emailCloseBtn');
        var maximizeBtn = main.querySelector('#emailMaximizeBtn');
        var readBtn = main.querySelector('#emailReadBtn');

        if (closeBtn && modal) {
            closeBtn.addEventListener('click', function() {
                closeEmailModal(modal);
            });
        }

        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeEmailModal(modal);
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

        if (readBtn && modal) {
            readBtn.addEventListener('click', function() {
                if (currentFolder === 'inbox' && openIndex !== null) {
                    mailboxes.inbox.emails[openIndex].read = true;
                    var row = main.querySelector('#emailList .email-item[data-email="' + openIndex + '"]');
                    if (row) {
                        row.classList.remove('unread');
                    }
                    updateCounts(main);
                }
                closeEmailModal(modal);
            });
        }

        if (activeKeydown) {
            document.removeEventListener('keydown', activeKeydown);
        }
        activeKeydown = function(e) {
            if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
                closeEmailModal(modal);
            }
            if (e.key === 'Escape' && composeModal && composeModal.classList.contains('active')) {
                composeModal.classList.remove('active');
                if (composeForm) composeForm.reset();
                if (composeStatus) composeStatus.textContent = '';
            }
        };
        document.addEventListener('keydown', activeKeydown);
    }

    window.renderCorreo = function() {
        var placeholder = document.getElementById('main-placeholder');
        if (!placeholder) return;

        var main = document.createElement('main');
        main.className = 'main email-layout';
        main.innerHTML =
            '<aside class="email-sidebar">' +
                '<button class="compose-btn" id="composeBtn" type="button">Redactar</button>' +
                '<nav class="mailbox-nav">' + mailboxLinksHtml() + '</nav>' +
            '</aside>' +
            '<section class="email-content">' +
                '<div class="email-header">' +
                    '<h2 id="mailboxTitle"></h2>' +
                    '<span class="email-total" id="mailboxTotal"></span>' +
                '</div>' +
                '<div class="email-list" id="emailList"></div>' +
            '</section>' +
            previewModalHtml() +
            composeModalHtml();

        placeholder.innerHTML = '';
        placeholder.appendChild(main);

        renderFolder(main);
        bindCorreo(main);
    };
})();
