(function() {
    var timers = [];
    var activeKeydown = null;
    var modal = null;
    var output = null;
    var input = null;
    var inputLine = null;
    var maximizeBtn = null;

    var BANNER = [
        ['████████╗', '██║     ', ' █████╗ '],
        ['   ██║   ', '██║     ', '██╔══██╗'],
        ['   ██║   ', '██║     ', '███████║'],
        ['   ██║   ', '██║     ', '██╔══██║'],
        ['████████╗', '███████╗', '██║  ██║'],
        ['╚═══════╝', '╚══════╝', '╚═╝  ╚═╝']
    ].map(function(fila) { return fila.join(' '); }).join('\n');

    var SECUENCIA_INICIAL = [
        { t: BANNER, c: 'term-banner', d: 300 },
        { t: 'Kaliber AI department', c: 'term-subtitle', d: 450 },
        { t: '', d: 200 },
        { t: 'KaliberOS 2.6 — nodo de cálculo 136', d: 350 },
        { t: 'Conectando con servidor remoto (kaliber-01)… listo', d: 400 },
        { prog: { prefijo: 'Cargando modelo ILA-7 ', desde: 0, hasta: 80, celdas: 20 }, c: 'term-progress', d: 1500 },
        { t: 'ERROR E-MOD-13: fallo al iniciar el modelo', c: 'term-error', d: 650 },
        { prog: { prefijo: 'Estado de análisis: ', desde: 0, hasta: 98, celdas: 20 }, c: 'term-progress', d: 1500 },
        { t: '', d: 200 },
        { t: '¿Desea continuar? Escriba "Continuar" y pulse Enter.', d: 350, a: habilitarInput }
    ];

    var SECUENCIA_REANUDACION = [
        { t: 'Reanudando análisis desde el nodo 136…', d: 400 },
        { prog: { prefijo: 'Verificando bloques de memoria ', desde: 0, hasta: 100, celdas: 20, sufijo: ' OK' }, c: 'term-progress', d: 1500 },
        { t: 'Sincronizando pesos del modelo ILA-7… 98% → 99%', d: 550 },
        { t: 'ERROR FATAL: el modelo ha colapsado (código 0xA1).', c: 'term-error', d: 600 },
        { t: '', d: 250 },
        { t: 'Se requiere reinicio manual en la terminal 136 para continuar.', c: 'term-error term-blink', d: 500, a: finalizarSecuencia }
    ];

    function crearLinea(clase) {
        if (!output) return null;
        var linea = document.createElement('div');
        linea.className = 'term-line' + (clase ? ' ' + clase : '');
        output.appendChild(linea);
        output.scrollTop = output.scrollHeight;
        return linea;
    }

    function agregarLinea(texto, clase) {
        var linea = crearLinea(clase);
        if (linea) linea.textContent = texto || '\u00a0';
    }

    function pintarCarga(prog, pct, celdas) {
        var rango = prog.hasta - prog.desde || 1;
        var ratio = (pct - prog.desde) / rango;
        var llenos = ratio >= 1 ? celdas : Math.floor(ratio * celdas);
        var barra = '';
        for (var i = 0; i < celdas; i++) {
            if (i < llenos) barra += '█';
            else if (i === llenos && ratio < 1) barra += '▓';
            else barra += '░';
        }
        return prog.prefijo + '[' + barra + '] ' + pct + '%' + (prog.sufijo || '');
    }

    function programarCarga(paso, inicio) {
        var linea = crearLinea(paso.c);
        if (!linea) return;
        var prog = paso.prog;
        var celdas = prog.celdas || 20;
        var intervalo = (paso.d || 0) / (celdas + 1);
        for (var k = 0; k <= celdas; k++) {
            (function(k) {
                programar(function() {
                    var pct = Math.round(prog.desde + (prog.hasta - prog.desde) * (k / celdas));
                    linea.textContent = pintarCarga(prog, pct, celdas);
                    output.scrollTop = output.scrollHeight;
                }, intervalo * k);
            })(k);
        }
    }

    function programar(fn, delay) {
        var id = setTimeout(function() {
            timers = timers.filter(function(t) { return t !== id; });
            fn();
        }, delay);
        timers.push(id);
    }

    function limpiarTimers() {
        timers.forEach(function(id) { clearTimeout(id); });
        timers = [];
    }

    function reproducir(secuencia) {
        var acumulado = 0;
        secuencia.forEach(function(paso) {
            var inicio = acumulado;
            acumulado += paso.d || 0;
            if (paso.prog) {
                programar(function() {
                    programarCarga(paso, inicio);
                }, inicio);
            } else {
                programar(function() {
                    if (paso.t !== undefined) agregarLinea(paso.t, paso.c);
                    if (paso.a) paso.a();
                }, inicio);
            }
        });
    }

    function habilitarInput() {
        if (!input || !inputLine) return;
        inputLine.classList.remove('is-disabled');
        input.disabled = false;
        input.focus();
    }

    function deshabilitarInput() {
        if (!input || !inputLine) return;
        input.disabled = true;
        inputLine.classList.add('is-disabled');
    }

    function finalizarSecuencia() {
        deshabilitarInput();
        if (window.programarCongelacionILA) window.programarCongelacionILA();
    }

    function procesarEntrada() {
        if (!input || input.disabled) return;
        var valor = input.value;
        var normalizado = valor.trim().toLowerCase();
        agregarLinea('ila@kaliber:~$ ' + valor, 'term-echo');
        input.value = '';

        if (normalizado === 'continuar') {
            reproducir(SECUENCIA_REANUDACION);
        } else {
            agregarLinea('ERROR: el comando no es correcto. Vuelva a intentarlo.', 'term-error');
        }
    }

    function abrirTerminalILA() {
        if (!modal || !output || !input) return;
        limpiarTimers();
        output.innerHTML = '';
        input.value = '';
        deshabilitarInput();
        var content = modal.querySelector('.terminal-content');
        if (content) content.classList.remove('is-maximized');
        if (maximizeBtn) maximizeBtn.setAttribute('title', 'Maximizar');
        modal.classList.add('active');
        reproducir(SECUENCIA_INICIAL);
    }

    function cerrarTerminal() {
        if (!modal) return;
        limpiarTimers();
        if (window.cancelarCongelacionILA) window.cancelarCongelacionILA();
        modal.classList.remove('active');
    }

    function bindTerminalILA(main) {
        modal = main.querySelector('#terminalModal');
        if (!modal) return;
        output = modal.querySelector('#terminalOutput');
        input = modal.querySelector('#terminalInput');
        inputLine = modal.querySelector('#terminalInputLine');
        maximizeBtn = modal.querySelector('#terminalMaximizeBtn');

        var closeBtn = modal.querySelector('#terminalCloseBtn');
        if (closeBtn) {
            closeBtn.addEventListener('click', cerrarTerminal);
        }

        if (maximizeBtn) {
            maximizeBtn.addEventListener('click', function() {
                var content = modal.querySelector('.terminal-content');
                if (!content) return;
                var maximizado = content.classList.toggle('is-maximized');
                maximizeBtn.setAttribute('title', maximizado ? 'Restaurar' : 'Maximizar');
            });
        }

        modal.addEventListener('click', function(e) {
            if (e.target === modal) cerrarTerminal();
        });

        if (input) {
            input.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    procesarEntrada();
                }
            });
        }

        if (activeKeydown) {
            document.removeEventListener('keydown', activeKeydown);
        }
        activeKeydown = function(e) {
            if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
                cerrarTerminal();
            }
        };
        document.addEventListener('keydown', activeKeydown);
    }

    window.abrirTerminalILA = abrirTerminalILA;
    window.bindTerminalILA = bindTerminalILA;
})();
