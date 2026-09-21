window.renderCorreo = function() {
    var placeholder = document.getElementById('main-placeholder');
    if (!placeholder) return;

    var main = document.createElement('main');
    main.className = 'main email-layout';
    main.innerHTML =
        '<aside class="email-sidebar">' +
            '<button class="compose-btn">Redactar</button>' +
            '<nav class="mailbox-nav">' +
                '<a href="#inbox" class="mailbox-item active">' +
                    '<span class="mailbox-icon">&#128232;</span>' +
                    '<span class="mailbox-name">Entrada</span>' +
                    '<span class="mailbox-count">3</span>' +
                '</a>' +
                '<a href="#sent" class="mailbox-item">' +
                    '<span class="mailbox-icon">&#128228;</span>' +
                    '<span class="mailbox-name">Salida</span>' +
                    '<span class="mailbox-count">0</span>' +
                '</a>' +
                '<a href="#drafts" class="mailbox-item">' +
                    '<span class="mailbox-icon">&#128221;</span>' +
                    '<span class="mailbox-name">Borradores</span>' +
                    '<span class="mailbox-count">1</span>' +
                '</a>' +
                '<a href="#deleted" class="mailbox-item">' +
                    '<span class="mailbox-icon">&#128465;</span>' +
                    '<span class="mailbox-name">Eliminados</span>' +
                    '<span class="mailbox-count">0</span>' +
                '</a>' +
            '</nav>' +
        '</aside>' +
        '<section class="email-content">' +
            '<div class="email-header">' +
                '<h2>Bandeja de Entrada</h2>' +
                '<span class="email-total">3 mensajes</span>' +
            '</div>' +
            '<div class="email-list">' +
                '<article class="email-item unread">' +
                    '<div class="email-status"></div>' +
                    '<div class="email-from">Prof. Armitage</div>' +
                    '<div class="email-subject">Re: Descubrimiento en la expedición Arkham</div>' +
                    '<div class="email-preview">Estimado colega, los resultados preliminares son...</div>' +
                    '<div class="email-date">15 Oct</div>' +
                '</article>' +
                '<article class="email-item">' +
                    '<div class="email-status"></div>' +
                    '<div class="email-from">Decano West</div>' +
                    '<div class="email-subject">Reunión del departamento - Jueves</div>' +
                    '<div class="email-preview">Le informo que la próxima reunión del departamento será...</div>' +
                    '<div class="email-date">14 Oct</div>' +
                '</article>' +
                '<article class="email-item">' +
                    '<div class="email-status"></div>' +
                    '<div class="email-from">Biblioteca Central</div>' +
                    '<div class="email-subject">Solicitud de manuscrito aprobada</div>' +
                    '<div class="email-preview">Su solicitud del manuscrito Nro. 2847 ha sido aprobada...</div>' +
                    '<div class="email-date">12 Oct</div>' +
                '</article>' +
            '</div>' +
            '<div class="email-detail" style="display: none;">' +
                '<div class="detail-header">' +
                    '<h3>Descubrimiento en la expedición Arkham</h3>' +
                    '<div class="detail-meta">' +
                        '<span class="detail-from">De: Prof. Armitage &lt;armitage@miskatonic.edu&gt;</span>' +
                        '<span class="detail-date">15 de Octubre, 1928</span>' +
                    '</div>' +
                '</div>' +
                '<div class="detail-body">' +
                    '<p>Estimado colega,</p>' +
                    '<p>Los resultados preliminares de la expedición a Arkham superan todas nuestras expectativas. Los textos encontrados en las ruinas subterráneas parecen corresponder a una versión desconocida del Necronomicón.</p>' +
                    '<p>Le sugiero que agendemos una reunión urgente para discutir los hallazgos y determinar los próximos pasos de investigación.</p>' +
                    '<p>Atentamente,<br>Prof. Henry Armitage<br>Departamento de Lenguas Antiguas</p>' +
                '</div>' +
            '</div>' +
        '</section>';

    placeholder.innerHTML = '';
    placeholder.appendChild(main);
};