(function() {
    var ANALITICA_ENDPOINT = 'https://unicaliber.goatcounter.com/count';
    var RUTAS = {
        '': 'Inicio',
        '#': 'Inicio',
        '#inicio': 'Inicio',
        '#foro': 'Foro',
        '#correo': 'Correo',
        '#archivos': 'Archivos',
        '#perfil': 'Perfil'
    };
    var yaConto = false;

    function decidir(protocolo, host) {
        if (protocolo !== 'https:' && protocolo !== 'http:') return false;
        return /\.github\.io$/.test(host || '');
    }

    function contarVista() {
        var gc = window.goatcounter;
        if (!gc || typeof gc.count !== 'function') return;
        var titulo = RUTAS[window.location.hash];
        if (!titulo) return;
        try {
            gc.count({
                path: window.location.pathname + window.location.search + window.location.hash,
                title: titulo
            });
            yaConto = true;
        } catch (e) {
        }
    }

    function cargar() {
        if (!ANALITICA_ENDPOINT) return;
        try {
            window.goatcounter = { no_onload: true };
            var script = document.createElement('script');
            script.async = true;
            script.src = 'https://gc.zgo.at/count.js';
            script.setAttribute('data-goatcounter', ANALITICA_ENDPOINT);
            document.head.appendChild(script);
            var intentos = 0;
            var espera = setInterval(function() {
                intentos += 1;
                if (window.goatcounter && typeof window.goatcounter.count === 'function') {
                    clearInterval(espera);
                    if (!yaConto) contarVista();
                } else if (intentos >= 10) {
                    clearInterval(espera);
                }
            }, 100);
        } catch (e) {
        }
    }

    window.addEventListener('hashchange', contarVista);

    if (decidir(window.location.protocol, window.location.hostname)) {
        cargar();
    }

    window.analitica = {
        decidir: decidir,
        contarVista: contarVista,
        RUTAS: RUTAS
    };
})();
