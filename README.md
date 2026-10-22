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
- Videos externos con audio en español de Canal Enfermero y Medicina Televisión, con filtros y favoritos. El video de protección solar abre directamente en YouTube.
- Video del profesor en lengua de señas, disponible en Inicio, Videos y Accesibilidad.
- Lectura en voz alta de guías mediante las voces del navegador.
- Sección Reseñas en el menú y acceso desde Inicio y Mi espacio: producto, puntuación de 1 a 5 estrellas, experiencia, fecha y eliminación. Conserva las experiencias guardadas anteriormente.
- Nombre opcional, historial, diario con hábitos y exportación/borrado de datos.
- Presentación del proyecto, integrantes, docentes, objetivos, marco teórico, FODA, bibliografía, privacidad y accesibilidad.
- Diseño adaptable, navegación por teclado, foco visible y respeto a la preferencia de reducir movimiento.
- Caché del contenido esencial mediante service worker para visitas posteriores sin internet. YouTube y fuentes externas requieren conexión. Las tipografías externas tienen alternativas locales.

## Video del profesor en lengua de señas

El archivo facilitado el 22 de octubre de 2026 está incorporado como `assets/profesor-lengua-senas.mp4`, con una portada del mismo video en `assets/profesor-lengua-senas.jpg`. Dura aproximadamente 2 minutos y 41 segundos y pesa 14,7 MB. Se convirtió a H.264/AAC con inicio rápido para la web, conservando el encuadre completo de 478 × 850 y el audio.

La configuración está en `content.js`:

```js
signVideo: {
  src: 'assets/profesor-lengua-senas.mp4',
  captions: '',
  poster: 'assets/profesor-lengua-senas.jpg'
}
```

El reproductor tiene controles nativos y reproducción dentro de la página en móviles, sin inicio automático. No hay subtítulos ni transcripción verificada del archivo: la guía escrita de Accesibilidad se identifica como un recurso independiente. Para incorporar subtítulos revisados, agregar un WebVTT en `assets` y completar `captions`. El video no se guarda en la caché del service worker; las solicitudes parciales pasan directamente al servidor para permitir la reproducción y los saltos.

## Editar contenidos

`content.js` contiene las preguntas, guías y videos. `app.js` contiene las vistas y funciones. `styles.css` define la identidad visual. Los videos seleccionados tienen audio en español; cada tarjeta identifica al proveedor y enlaza su fuente. Se verificaron en Canal Enfermero en YouTube, Diario Enfermero (Consejo General de Enfermería) y Medicina Televisión el 22 de octubre de 2026. El recurso de RTVE se reemplazó por «Protección solar: ¿cómo y cuándo aplicarla?» de Canal Enfermero debido al problema de acceso comunicado. Revisar periódicamente su disponibilidad. No se cargan reproductores externos automáticamente. Las referencias escritas de AAD siguen disponibles como bibliografía en inglés.

Las ilustraciones de rostros se dibujan en SVG desde código y están inspiradas en las referencias, adaptadas a una web. `assets/propuestas-logo.png` conserva la lámina de propuestas del documento como recurso de referencia; no se presenta como un logotipo individual. El escudo de la escuela proviene del documento facilitado.

## Datos y alcance

Todo se guarda en `localStorage`, clave `pieles-v1`, sin envío a un servidor. Las reseñas son privadas, no una comunidad con cuentas. El diario conserva los últimos 60 registros; el historial y las experiencias, 30. Los datos dependen del navegador, no se sincronizan entre dispositivos y pueden borrarse al limpiar datos. El botón Descargar mis datos exporta un JSON (no hay importación). La web no ofrece notificaciones automáticas ni diagnósticos médicos.

Los cuidados se basan en fuentes enlazadas en la sección Fuentes. Se prioriza limpieza suave, hidratación y protección solar; no se prescribe medicación ni se presentan tónicos o exfoliación como pasos obligatorios. El documento original es material de referencia y no se publica completo.

Para cambios del contenido sin conexión, incrementar la versión `CACHE` en `sw.js`. Al publicar, volver a abrir la página con internet para actualizar la copia local.

## Comprobaciones

Ejecutar `node --test tests/site.test.cjs` con Node.js 18 o superior. Las 15 pruebas comprueban vistas, clasificación, respuestas no concluyentes, sensibilidad, persistencia, escape de texto, recursos del video, enlaces de videos en español y rutas relativas. Incluyen guardar, recuperar y eliminar reseñas, así como rechazar puntuaciones inválidas. Estas comprobaciones no sustituyen la revisión visual en un navegador; la sesión no tiene un navegador conectado para esa revisión.

## Lista para la entrega

- Verificar nombres y datos institucionales con las alumnas.
- Revisar el video del profesor y preparar subtítulos o una transcripción verificada si se necesitan.
- Revisar el contenido educativo con docentes y, si es posible, un profesional de dermatología.
- Publicar y probar el enlace desde un celular.

No se publicó ni se subió ningún cambio a GitHub automáticamente durante la preparación local.
