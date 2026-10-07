(function() {
    var timer = null;
    var interval = null;
    var activo = false;
    var GLYPHS = '░▓█▄▀▒■◄►▲▼╬╣╠╦╩═║╔╗╚╝⊕⊗≡≠≈∞¶§†‡';

    function cadena(longitud) {
        var texto = '';
        for (var i = 0; i < longitud; i++) {
            if (Math.random() < 0.18) {
                texto += ' ';
            } else {
                texto += GLYPHS.charAt(Math.floor(Math.random() * GLYPHS.length));
            }
        }
        return texto;
    }

    function generarDump() {
        var lineas = [];
        for (var i = 0; i < 8; i++) {
            var dir = '0x' + (0x7FF3A000 + Math.floor(Math.random() * 65536)).toString(16).toUpperCase();
            var bytes = [];
            for (var j = 0; j < 8; j++) {
                bytes.push(('0' + Math.floor(Math.random() * 256).toString(16).toUpperCase()).slice(-2));
            }
            lineas.push(dir + '  ' + bytes.join(' ') + '  ' + cadena(6));
        }
        return lineas.join('\n');
    }

    function generarFilas(cantidad) {
        var filas = [];
        for (var i = 0; i < cantidad; i++) {
            filas.push(cadena(72));
        }
        return filas.join('\n');
    }

    function pintar() {
        var top = document.getElementById('freezeSymbolsTop');
        var bottom = document.getElementById('freezeSymbolsBottom');
        var dump = document.getElementById('freezeDump');
        if (top) top.textContent = generarFilas(3);
        if (bottom) bottom.textContent = generarFilas(2);
        if (dump) dump.textContent = generarDump();
    }

    function mostrar() {
        var modal = document.getElementById('freezeModal');
        if (!modal || activo) return;
        activo = true;
        modal.classList.add('active');
        pintar();
        interval = setInterval(pintar, 200);
    }

    function cancelar() {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
    }

    window.programarCongelacionILA = function() {
        cancelar();
        if (activo) return;
        timer = setTimeout(function() {
            timer = null;
            mostrar();
        }, 7000);
    };

    window.cancelarCongelacionILA = cancelar;

    document.addEventListener('keydown', function(e) {
        if (!activo || e.key !== 'Escape') return;
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
    }, true);
})();
