(function() {
    var timer = null;
    var interval = null;
    var activo = false;
    var consolaAbierta = false;
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

    function pintarLineaConsola(texto, clase) {
        var output = document.getElementById('consoleOutput');
        if (!output) return;
        var linea = document.createElement('div');
        linea.className = 'console-line' + (clase ? ' ' + clase : '');
        linea.textContent = texto || '\u00a0';
        output.appendChild(linea);
        output.scrollTop = output.scrollHeight;
    }

    function abrirConsola() {
        var modal = document.getElementById('consoleModal');
        var output = document.getElementById('consoleOutput');
        var input = document.getElementById('consoleInput');
        var content = modal ? modal.querySelector('.console-content') : null;
        var maximizeBtn = document.getElementById('consoleMaximizeBtn');
        if (!modal || consolaAbierta) return;
        consolaAbierta = true;
        if (output) output.textContent = '';
        pintarLineaConsola('■ CONSOLA DE MANTENIMIENTO — NODO 136 ■', 'console-banner');
        pintarLineaConsola('Sesión de emergencia de la terminal 136.', 'console-hint');
        pintarLineaConsola('Escriba cualquier comando.', 'console-hint');
        if (input) input.value = '';
        if (content) content.classList.remove('is-maximized');
        if (maximizeBtn) maximizeBtn.setAttribute('title', 'Maximizar');
        modal.classList.add('active');
        if (input) input.focus();
    }

    function cerrarConsola() {
        var modal = document.getElementById('consoleModal');
        if (!consolaAbierta) return;
        consolaAbierta = false;
        if (modal) modal.classList.remove('active');
    }

    function procesarEntradaConsola() {
        var input = document.getElementById('consoleInput');
        if (!input) return;
        var valor = input.value;
        if (!valor.trim()) return;
        pintarLineaConsola('ila@kaliber:~$ ' + valor, 'console-echo');
        pintarLineaConsola('ERROR: comando no reconocido.', 'console-error');
        input.value = '';
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

    (function bindConsola() {
        var modal = document.getElementById('consoleModal');
        if (!modal) return;
        var closeBtn = document.getElementById('consoleCloseBtn');
        var maximizeBtn = document.getElementById('consoleMaximizeBtn');
        var input = document.getElementById('consoleInput');
        if (closeBtn) closeBtn.addEventListener('click', cerrarConsola);
        if (maximizeBtn) {
            maximizeBtn.addEventListener('click', function() {
                var content = modal.querySelector('.console-content');
                if (!content) return;
                var maximizado = content.classList.toggle('is-maximized');
                maximizeBtn.setAttribute('title', maximizado ? 'Restaurar' : 'Maximizar');
            });
        }
        modal.addEventListener('click', function(e) {
            if (e.target === modal) cerrarConsola();
        });
        if (input) {
            input.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    procesarEntradaConsola();
                }
            });
        }
    })();

    document.addEventListener('keydown', function(e) {
        if (!activo || e.key !== 'Escape') return;
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        if (consolaAbierta) cerrarConsola();
        else abrirConsola();
    }, true);
})();
