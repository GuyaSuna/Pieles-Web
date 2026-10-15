# Pieles APP

Web educativa del proyecto de egreso de 3.º DA Estilismo Artístico, Escuela Técnica UTU Juan Lacaze. HTML, CSS y JavaScript, sin compilación ni servidor de aplicación. Funciona en GitHub Pages y en subcarpetas.

## Publicar en GitHub Pages

1. Subir estos archivos al repositorio (rama `main` o `master`).
2. En GitHub, abrir **Settings → Pages → Build and deployment → Source → GitHub Actions**.
3. El workflow `.github/workflows/pages.yml` publica con cada push. También se puede ejecutar desde **Actions → Publicar en GitHub Pages → Run workflow**.
4. La URL aparecerá en Settings → Pages y en el resultado del workflow. Normalmente será `https://USUARIO.github.io/Pieles-Web/`.

Alternativa sin Actions: seleccionar **Deploy from a branch**, la rama correspondiente y **/(root)**. El sitio no necesita compilación. No requiere dominio, claves ni variables de entorno.

## Ver en la computadora

Desde esta carpeta, ejecutar `python -m http.server 4173` y visitar `http://localhost:4173`. También se puede abrir `index.html`, pero el modo sin conexión requiere HTTP local o HTTPS.

## Funciones incluidas

- Cuestionario de 5 preguntas, progreso, navegación anterior y resultado orientativo.
- Cuatro biotipos; sensibilidad y tendencia al acné se evalúan como condiciones adicionales.
- Empates o respuestas insuficientes se señalan como resultado no concluyente.
- Seis guías con características, categorías de productos y rutina de mañana/noche.
- Videos externos de AAD en YouTube, filtros y favoritos.
- Espacio preparado para el video en lengua de señas uruguaya.
- Lectura en voz alta de guías mediante las voces del navegador.
- Nombre opcional, historial, diario con hábitos, experiencias personales con productos y exportación/borrado de datos.
- Presentación del proyecto, integrantes, docentes, objetivos, marco teórico, FODA, bibliografía, privacidad y accesibilidad.
- Diseño adaptable, navegación por teclado, foco visible y respeto a la preferencia de reducir movimiento.
- Caché del contenido esencial mediante service worker para visitas posteriores sin internet. YouTube y fuentes externas requieren conexión. Las tipografías externas tienen alternativas locales.

## Incorporar el video de LSU

1. Guardar el video como `assets/introduccion-lsu.mp4`.
2. Opcionalmente, crear subtítulos WebVTT en español como `assets/introduccion-lsu.vtt` y una portada en `assets/introduccion-lsu.jpg`.
3. En `content.js`, completar:

```js
signVideo: {
  src: 'assets/introduccion-lsu.mp4',
  captions: 'assets/introduccion-lsu.vtt',
  poster: 'assets/introduccion-lsu.jpg'
}
```

Dejar `captions` o `poster` vacíos si aún no existen. El reproductor reemplaza automáticamente el aviso pendiente. Mantener el video por debajo de los límites de archivos de GitHub (idealmente menos de 25 MB). La transcripción educativa está en la sección Accesibilidad y debe adaptarse al guion final si cambia.

## Editar contenidos

`content.js` contiene las preguntas, guías y videos. `app.js` contiene las vistas y funciones. `styles.css` define la identidad visual. Los videos son enlaces directos extraídos de las páginas oficiales de la Academia Americana de Dermatología; están en inglés, sin prometer subtítulos traducidos. Revisar periódicamente su disponibilidad. No se cargan reproductores externos automáticamente.

Las ilustraciones de rostros se dibujan en SVG desde código y están inspiradas en las referencias, adaptadas a una web. `assets/propuestas-logo.png` conserva la lámina de propuestas del documento como recurso de referencia; no se presenta como un logotipo individual. El escudo de la escuela proviene del documento facilitado.

## Datos y alcance

Todo se guarda en `localStorage`, clave `pieles-v1`, sin envío a un servidor. Las reseñas son privadas, no una comunidad con cuentas. El diario conserva los últimos 60 registros; el historial y las experiencias, 30. Los datos dependen del navegador, no se sincronizan entre dispositivos y pueden borrarse al limpiar datos. El botón Descargar mis datos exporta un JSON (no hay importación). La web no ofrece notificaciones automáticas ni diagnósticos médicos.

Los cuidados se basan en fuentes enlazadas en la sección Fuentes. Se prioriza limpieza suave, hidratación y protección solar; no se prescribe medicación ni se presentan tónicos o exfoliación como pasos obligatorios. El documento original es material de referencia y no se publica completo.

Para cambios del contenido sin conexión, incrementar la versión `CACHE` en `sw.js`. Al publicar, volver a abrir la página con internet para actualizar la copia local.

## Comprobaciones

Ejecutar `node --test tests/site.test.cjs` con Node.js 18 o superior. Las 12 pruebas comprueban vistas, clasificación, respuestas no concluyentes, sensibilidad, persistencia, escape de texto, configuración del video y rutas relativas. Se comprobó también que el servidor local entrega HTML, JavaScript e imágenes con respuesta HTTP 200. Estas comprobaciones no sustituyen la revisión visual en un navegador; la herramienta de navegador de la sesión no pudo conectarse.

## Lista para la entrega

- Verificar nombres y datos institucionales con las alumnas.
- Incorporar el video propio de LSU cuando esté grabado.
- Revisar el contenido educativo con docentes y, si es posible, un profesional de dermatología.
- Publicar y probar el enlace desde un celular.

No se publicó ni se subió ningún cambio a GitHub automáticamente durante la preparación local.
