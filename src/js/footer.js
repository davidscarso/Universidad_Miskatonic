document.addEventListener('DOMContentLoaded', function() {
    var placeholder = document.getElementById('footer-placeholder');
    if (!placeholder) return;

    var footer = document.createElement('footer');
    footer.className = 'footer';
    footer.innerHTML =
        '<div class="footer-container">' +
            '<div class="footer-info">' +
                '<p>&copy; 2026 Universidad Kaliber. Todos los derechos reservados.</p>' +
                '<p class="footer-address">Neuquén, NEUQUÉN, Argentina.</p>' +
            '</div>' +
            '<div class="footer-links">' +
                '<a href="#">Aviso Legal</a>' +
                '<a href="#">Política de Privacidad</a>' +
                '<a href="#">Contacto</a>' +
            '</div>' +
        '</div>';

    placeholder.appendChild(footer);
});
