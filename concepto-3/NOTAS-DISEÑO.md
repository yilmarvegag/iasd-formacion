# Concepto 3 · Atrio

Datos ficticios. «OneVoice» es título provisional, sin contenido oficial. Abrir `1-inicio.html`.

## Declaración
- **Propósito:** formar predicadores laicos. Meta: saber hacer el llamado a bautizarse tras un estudio.
- **Tono:** mosaico luminoso y arquitectónico. Verde petróleo, salvia, arena y un ámbar de acento. Esquinas amplias y sombras suaves.
- **Restricciones:** texto de 18 px o más con A−/A+, targets de 48 px o más, AA mínimo, sin build, usable por personas mayores.
- **Diferenciación:** todo está en mosaicos (bento). Un dock flotante con 4 destinos, igual en móvil y escritorio. El avance es un anillo de 7 tramos. La lección va paso a paso y el sermón se arma moviendo bloques.

## Tendencias tomadas y cómo se hacen sobrias
Fuentes: Tilda Education (estilos de diseño web) y Fuselab Creative (tendencias UI/UX 2026). Ver «Qué no pude leer».

| Tendencia | Fuente | Uso |
|---|---|---|
| Estilo bento | Tilda | Mosaicos de 3 tamaños y 4 tintes suaves, cada uno con título e icono. Sin tarjetas decorativas |
| Gradientes, grano y capas | Tilda (resumen de tendencias 2025) | Solo un grano muy tenue (9 %) sobre el mosaico oscuro principal. El dock lleva desenfoque con fondo casi opaco |
| Comportamiento consistente en escritorio, teléfono y tableta | Fuselab | El dock es el mismo en todos los tamaños |
| IA que se puede comprobar y anular | Fuselab | «Sugerencia del sistema»: regla visible (posición del llamado), con «¿Por qué lo sugerimos?» y «Descartar». No es IA y lo dice |
| Personalización por rol | Fuselab | «Predicador laico», mentor y avalistas por módulo |
| Accesibilidad como base | Fuselab | AAA en casi todo, foco de 3 px, A−/A+, reduced-motion |
| Biblioteca propia | recent.design, saaspo, mobbin | Entrada escalonada de mosaicos, dock inferior, pasos de lección |

## Decisiones
- **Navegación:** dock flotante con icono y palabra. Arriba: buscar, A−/A+, Ayuda y Mi cuenta, más migas.
- **Avance:** anillo con 7 tramos: sólido (completo), rayado (en curso), fino (bloqueado). Leyenda con texto. Los 7 módulos van como mosaicos con borde sólido, grueso o punteado.
- **Lección:** 4 pasos (Entender, Leer, Practicar, Llevar) con indicador y botones Anterior y Siguiente. Los 5 pasos del llamado son casillas «practicado». Sin JavaScript se ve la lección completa.
- **Evaluación:** todas las preguntas como tarjetas con medidor «0 de 3 respondidas». El resultado aparece arriba con anillo, explicación por pregunta (icono y palabra) y repetir. Sin cronómetro.
- **Mi púlpito:** bloques ordenables con Subir y Bajar (alternativa accesible a arrastrar, con aviso hablado), minutos con − y +, total con medidor. Retroalimentación con casillas «ya lo apliqué». Enviar pide confirmación.
- **Cifras:** se usa la fuente de texto, porque Young Serif dibuja el 1 como una «I».
- **Sin enlaces rotos:** Mi cuenta, Guardar borrador, Lección anterior, Guardar y salir y la búsqueda muestran un aviso con «Cerrar».
- **Fuentes:** Lexend y Young Serif (Google Fonts, requieren internet). Sin conexión: Verdana y Georgia.

## Contraste (WCAG 2.x, calculado)
| Par | Razón | Nivel |
|---|---|---|
| Texto #10231F sobre fondo #E6EDEA / blanco | 13.78 / 16.38 | AAA |
| Secundario #33474F sobre fondo / blanco / arena / cielo / salvia | 8.20 / 9.74 / 8.45 / 7.95 / 7.44 | AAA |
| Botón blanco sobre #0B5148 | 9.19 | AAA |
| Mosaico oscuro #073A34: blanco / suave #CFE5DF / ámbar #F2B544 | 12.62 / 9.57 / 6.89 | AAA / AAA / AA |
| Botón ámbar: #073A34 sobre #F2B544 | 6.89 | AA |
| Completo #0B5148 sobre #D3E5DE | 7.02 | AAA |
| En curso #6B3A00 sobre #FBE8C5 | 7.82 | AAA |
| Bloqueado #33414D sobre #E3E8E6 | 8.46 | AAA |
| En revisión #1F4E79 sobre #DDEAF2 | 7.06 | AAA |
| Correcto #0A3F38 sobre salvia / Revisar #7F2418 sobre #FBE9E5 | 9.00 / 8.25 | AAA |
| Ámbar de texto #7A4300 sobre blanco / arena / salvia | 7.98 / 6.92 / 6.10 | AAA / AA / AA |
| Dock: texto sobre #F7FAF9 / activo blanco sobre #0B5148 | 15.60 / 9.19 | AAA |
| Marcador de posición #55665F sobre blanco | 6.08 | AA |
| No texto: borde de campo #5F716B sobre blanco | 5.17 | AA (mínimo 3) |
| No texto: tramo bloqueado del anillo #5F716B sobre salvia | 3.95 | cumple 3 |
| A−/A+ y botones desactivados #4E5C58 sobre #E3E8E6 | 5.66 | AA |

## Verificado
- Estructura HTML con un script propio: etiquetas balanceadas, sin ids duplicados, sin enlaces ni anclas rotos, íconos existentes, un solo `h1`, sin saltos de encabezado, sin emojis, campos con etiqueta (las casillas van dentro de su `label`).
- Sintaxis de `app.js` (`node --check`).
- Capturas en Edge sin interfaz de Inicio y Mi púlpito en escritorio y de Evaluación en móvil. Con ellas se corrigió el anillo, que se pintaba entero en ámbar, y los números con forma de «I».
- Contrastes calculados con script.

## No verificado
- Interacciones con clic (A−/A+, pasos, cuestionario, Subir y Bajar, diálogo) en un navegador real: solo se revisó el código.
- Ajuste del encabezado en 390 px reales tras el último cambio (las capturas de Edge sin interfaz usan un ancho mínimo mayor). Validador oficial de HTML, lectores de pantalla, zoom al 200 %, tabletas, texto en A+ máximo.
- `:has()` (casillas marcadas) y `backdrop-filter` necesitan un navegador reciente; sin ellos se pierde solo el relleno, no la función.
- Fuentes web sin conexión.

## Qué no pude leer
Las dos URL de tendencias fallaron al abrirlas (error de certificado). Usé solo los resúmenes de búsqueda: de Fuselab, accesibilidad como base, IA verificable y anulable, personalización por rol y coherencia entre dispositivos; de Tilda, la lista de estilos (incluido bento) y un resumen de filtros como gradiente, desenfoque y grano. No leí las descripciones completas.
