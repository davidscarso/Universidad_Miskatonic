(function() {
    var timers = [];
    var procesando = false;

    var modal = document.getElementById('uploadModal');
    if (!modal) return;

    var form = document.getElementById('uploadForm');
    var closeBtn = document.getElementById('closeUploadModal');
    var fileArea = document.getElementById('fileUploadArea');
    var fileInput = document.getElementById('drawingFile');
    var fileName = document.getElementById('fileName');
    var fileError = document.getElementById('uploadFileError');
    var processBox = document.getElementById('uploadProcess');
    var phaseText = document.getElementById('uploadPhaseText');
    var progress = document.getElementById('uploadProgress');
    var logBox = document.getElementById('uploadLog');
    var resultBox = document.getElementById('uploadResult');
    var summary = document.getElementById('matchSummary');
    var matchList = document.getElementById('matchList');
    var resultClose = document.getElementById('uploadResultClose');
    var submitBtn = form ? form.querySelector('button[type="submit"]') : null;

    var TITULOS = [
        'Visión del abismo',
        'La ciudad sin puertas',
        'Espirales en la niebla',
        'Retrato del guardián',
        'El pozo de los susurros',
        'Cartografía del sueño',
        'Sombras sobre Arkham',
        'La mano que señalaba',
        'Puerta interdimensional',
        'El tercero que observa',
        'Marea de ojos',
        'Corredores infinitos',
        'La figura detrás del vidrio',
        'Nudo de símbolos'
    ];
    var USUARIOS = [
        'Prof. Armitage',
        'Decano West',
        'Est. López',
        'Dr. Rivera',
        'Dra. Salvatierra',
        'Prof. Paredes',
        'N. Ferrer',
        'Damián Salcedo',
        'V. Gómez',
        'R. Méndez'
    ];
    var MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    var LOGS_ANALISIS = [
        'Extrayendo trazos del dibujo…',
        'Calculando huella perceptual…',
        'Comparando con archivo histórico…'
    ];

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

    function entero(max) {
        return Math.floor(Math.random() * max);
    }

    function barajar(lista) {
        var copia = lista.slice();
        for (var i = copia.length - 1; i > 0; i--) {
            var j = entero(i + 1);
            var tmp = copia[i];
            copia[i] = copia[j];
            copia[j] = tmp;
        }
        return copia;
    }

    function pintarBarra(prefijo, pct, celdas) {
        var ratio = pct / 100;
        var llenos = ratio >= 1 ? celdas : Math.floor(ratio * celdas);
        var barra = '';
        for (var i = 0; i < celdas; i++) {
            if (i < llenos) barra += '█';
            else if (i === llenos && ratio > 0 && ratio < 1) barra += '▓';
            else barra += '░';
        }
        return prefijo + '[' + barra + '] ' + pct + '%';
    }

    function fechaAleatoria() {
        var hoy = new Date();
        var inicio = new Date(hoy.getTime());
        inicio.setFullYear(hoy.getFullYear() - 10);
        var fin = new Date(hoy.getTime() - 86400000);
        var min = inicio.getTime();
        var max = fin.getTime();
        var d = new Date(min + Math.random() * (max - min));
        var dia = ('0' + d.getDate()).slice(-2);
        return dia + ' ' + MESES[d.getMonth()] + ' ' + d.getFullYear();
    }

    function generarNro(usados) {
        var nro;
        do {
            nro = 'REG-' + ('000' + (1 + entero(9999))).slice(-4);
        } while (usados[nro]);
        usados[nro] = true;
        return nro;
    }

    function generarRegistros(n) {
        var titulos = barajar(TITULOS).slice(0, n);
        var usuarios = barajar(USUARIOS).slice(0, n);
        var usados = {};
        var registros = [];
        for (var i = 0; i < n; i++) {
            registros.push({
                nombre: titulos[i],
                nro: generarNro(usados),
                usuario: usuarios[i],
                fecha: fechaAleatoria()
            });
        }
        return registros;
    }

    function agregarLog(texto) {
        var linea = document.createElement('div');
        linea.className = 'upload-log-line';
        linea.textContent = texto;
        logBox.appendChild(linea);
    }

    function programarBarra(paso) {
        if (!progress) return;
        var celdas = 20;
        var duracion = paso.d || 0;
        var intervalo = duracion / (celdas + 1);
        for (var k = 0; k <= celdas; k++) {
            (function(k) {
                programar(function() {
                    var pct = Math.round((k / celdas) * 100);
                    progress.textContent = pintarBarra(paso.prefijo, pct, celdas);
                }, intervalo * k);
            })(k);
        }
        if (paso.logs) {
            paso.logs.forEach(function(texto, i) {
                programar(function() {
                    agregarLog(texto);
                }, duracion * (i + 1) / (paso.logs.length + 1));
            });
        }
    }

    function reproducir(secuencia) {
        var acumulado = 0;
        secuencia.forEach(function(paso) {
            var inicio = acumulado;
            acumulado += paso.d || 0;
            programar(function() {
                if (paso.prefijo) {
                    phaseText.textContent = paso.fase || '';
                    programarBarra(paso);
                } else if (paso.a) {
                    paso.a();
                }
            }, inicio);
        });
    }

    function mostrarResultado() {
        var n = 1 + entero(10);
        var registros = generarRegistros(n);
        summary.textContent = n === 1
            ? 'Tu dibujo coincide con 1 dibujo anterior:'
            : 'Tu dibujo coincide con ' + n + ' dibujos anteriores:';
        var html = '<div class="match-row match-head">' +
            '<span>Nro</span><span>Nombre</span><span>Usuario</span><span>Fecha</span></div>';
        registros.forEach(function(r) {
            html += '<div class="match-row">' +
                '<span class="match-nro">' + r.nro + '</span>' +
                '<span class="match-nombre">' + r.nombre + '</span>' +
                '<span class="match-usuario">' + r.usuario + '</span>' +
                '<span class="match-fecha">' + r.fecha + '</span></div>';
        });
        matchList.innerHTML = html;
        processBox.hidden = true;
        resultBox.hidden = false;
        procesando = false;
        if (submitBtn) submitBtn.disabled = false;
    }

    function arrancar(nombreArchivo) {
        procesando = true;
        if (submitBtn) submitBtn.disabled = true;
        form.hidden = true;
        processBox.hidden = false;
        resultBox.hidden = true;
        logBox.innerHTML = '';
        progress.textContent = '';
        reproducir([
            { fase: 'Fase 1 de 2 · Subida', prefijo: 'Subiendo ' + nombreArchivo + ' ', d: 1500 },
            { fase: 'Fase 2 de 2 · Análisis', prefijo: 'Analizando coincidencias ', d: 2000, logs: LOGS_ANALISIS },
            { d: 250, a: mostrarResultado }
        ]);
    }

    function resetModal() {
        limpiarTimers();
        procesando = false;
        if (submitBtn) submitBtn.disabled = false;
        form.hidden = false;
        processBox.hidden = true;
        resultBox.hidden = true;
        logBox.innerHTML = '';
        progress.textContent = '';
        phaseText.textContent = '';
        matchList.innerHTML = '';
        summary.textContent = '';
        if (fileError) fileError.hidden = true;
        form.reset();
        if (fileName) fileName.textContent = 'Ningún archivo seleccionado';
    }

    function cerrarModal() {
        modal.classList.remove('active');
        resetModal();
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', cerrarModal);
    }

    modal.addEventListener('click', function(e) {
        if (e.target === modal) cerrarModal();
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            cerrarModal();
        }
    });

    if (fileArea && fileInput) {
        fileArea.addEventListener('click', function() {
            fileInput.click();
        });

        fileInput.addEventListener('change', function() {
            if (this.files && this.files.length > 0) {
                fileName.textContent = this.files[0].name;
                if (fileError) fileError.hidden = true;
            } else {
                fileName.textContent = 'Ningún archivo seleccionado';
            }
        });
    }

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (procesando) return;
            if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
                if (fileError) fileError.hidden = false;
                return;
            }
            if (fileError) fileError.hidden = true;
            arrancar(fileInput.files[0].name);
        });
    }

    if (resultClose) {
        resultClose.addEventListener('click', cerrarModal);
    }
})();
