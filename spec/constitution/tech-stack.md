# Tech stack y convenciones

_Cómo está construido el proyecto y las reglas que todo el código debe respetar. Es la referencia técnica que ningún plan de feature debería contradecir._

## Tecnologías

- **Lenguaje:** html, css, javascript
- **Framework / runtime:** ninguno
- **Base de datos:** sqlite o archivos json, solo si es necesario
- **Tests:** no hay suite
- **Despliegue:** localmente por el momento, a futueo por medios de git enla web de github

## Archivos / módulos clave

_Mapa breve de dónde vive cada cosa. Solo lo que un recién llegado necesita para orientarse._

- `src` — contendra todo el codigo.


## Comandos

- `<comando dev>` — arranca el entorno local.
- `<comando test>` — ejecuta los tests.
- `<comando lint>` — revisa el estilo.
- `<comando build>` — compila para producción.

## Modelo de datos / dominio

_Las entidades o estructuras centrales y sus campos/reglas. Documenta solo lo no obvio: invariantes, mecánicas especiales, qué campo controla qué. Omite esta sección si no aplica._

- `<entidad/campo>` — <significado, tipo, reglas o mecánica especial>.
- `<entidad/campo>` — <significado, tipo, reglas o mecánica especial>.

## Convenciones

_Reglas de estilo y patrones a seguir. Nombres, organización, manejo de errores, validación, idioma del contenido, etc._

- <Estilo de nombres, p. ej. camelCase para variables y funciones.>
- <Dónde van los tests, p. ej. junto al archivo: `foo.ts` + `foo.test.ts`.>
- <Manejo de errores / validación de entradas.>
- <Patrón a seguir propio del proyecto.>

## Estilo visual

_Solo si el proyecto tiene interfaz. Tema, colores/tokens, tipografías, responsive. Omite si no aplica._

- buscamos emular el estilo de foros de los 2000. oscuro.

## Límites duros

_Lo que NUNCA se debe hacer. Reglas de seguridad, dependencias prohibidas, zonas congeladas._

- <Límite, p. ej. no añadir dependencias sin avisar.>
- <Zona prohibida, p. ej. no tocar `src/legacy/`.>
- <Regla de seguridad, p. ej. no subir `.env*` al repo.>
