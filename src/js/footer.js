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
                '<a href="#" data-disclaimer="true">Aviso Legal</a>' +
                '<a href="#" data-disclaimer="true">Política de Privacidad</a>' +
                '<a href="#" data-disclaimer="true">Contacto</a>' +
            '</div>' +
        '</div>';

    placeholder.appendChild(footer);

    footer.querySelectorAll('.footer-links a').forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            var modal = document.getElementById('disclaimerModal');
            if (modal) {
                modal.classList.add('active');
            }
        });
    });
});
