# Concepto 2 · Sendero

Datos ficticios. «OneVoice» es título provisional, sin contenido oficial. Abrir `1-inicio.html`.

## Declaración
- **Propósito:** formar predicadores laicos. Meta: saber hacer el llamado a bautizarse tras un estudio.
- **Tono:** editorial tipográfico de rejilla suiza. Tinta, granate y papel gris perla. Esquinas rectas, filetes de 2 px, numerales grandes.
- **Restricciones:** texto de 18 px o más con A−/A+ (100, 111, 122, 133 %), targets de 48 px o más, AA mínimo, sin build, usable por personas mayores.
- **Diferenciación:** se lee como un libro. Sin barra lateral ni barra inferior. El avance es un sendero vertical y los comentarios del mentor van al margen de cada parte del sermón.

## Tendencias tomadas y cómo se hacen sobrias
Fuentes: Tilda Education (estilos de diseño web) y Fuselab Creative (tendencias UI/UX 2026). Ver «Qué no pude leer».

| Tendencia | Fuente | Uso |
|---|---|---|
| Estilo suizo y editorial (rejilla, tipografía como protagonista) | Tilda | Rejilla de 12 columnas, titulares grandes, filetes. Sin ornamento |
| Minimalismo | Tilda | Un color de acento (granate), una sola acción principal por pantalla |
| Accesibilidad como base | Fuselab | Contraste AAA casi en todo, foco de 3 px, A−/A+, reduced-motion |
| Comportamiento consistente en escritorio, teléfono y tableta | Fuselab | Mismas pestañas numeradas en escritorio y en el menú móvil (con la palabra «Menú») |
| Personalización por rol | Fuselab | Rótulo «Predicador laico», avance y avalistas por módulo |
| Biblioteca propia | saaspo, refero, mobbin | Patrón de migas, búsqueda, ayuda y cuenta donde se esperan; ritmo de pantallas de formación |

## Decisiones
- **Navegación:** pestañas de texto numeradas (01 a 04). En móvil, botón «Menú» con `<details>` nativo (sirve sin JavaScript). A−/A+ siempre visibles.
- **Avance:** número grande «2 de 7», regla de 7 marcas (sólido, rayado, punteado) y sendero vertical con la lección actual desplegada.
- **Lección:** lectura larga de 40 rem con notas al margen y tabla de contenido fija en escritorio. El guion del llamado va en 5 pasos numerados.
- **Evaluación:** una pregunta por pantalla, opciones grandes con letra A/B/C. La respuesta correcta lleva borde grueso e icono, la incorrecta borde punteado e icono. Sin cronómetro.
- **Mi púlpito:** documento con campos por sección, minutos editables, total en vivo y comentario del mentor junto a cada parte. Enviar pide confirmación (diálogo).
- **Color nunca solo:** todo estado lleva icono y palabra, y los bordes cambian de estilo.
- **Movimiento:** una entrada escalonada (450 ms, `transform` y `opacity`) y una barra de lectura. Se apagan con `prefers-reduced-motion`.
- **Íconos:** SVG en línea, sin emojis.
- **Sin enlaces rotos:** Mi cuenta, Guardar borrador, Lección anterior, Guardar y salir y la búsqueda muestran un aviso con «Cerrar».
- **Fuentes:** Literata y Libre Franklin (Google Fonts, requieren internet). Sin conexión: Georgia y Segoe UI o Verdana.

## Contraste (WCAG 2.x, calculado)
| Par | Razón | Nivel |
|---|---|---|
| Texto #14171A sobre papel #F1F1EE | 15.90 | AAA |
| Texto secundario #44494F sobre papel | 8.03 | AAA |
| Granate #7A1F2B sobre papel / blanco | 9.02 / 10.20 | AAA |
| Botón blanco sobre granate | 10.20 | AAA |
| Banda tinta: texto #F1F1EE / rosa #F2B8C0 / suave #C9CDD2 | 15.90 / 10.62 / 11.26 | AAA |
| Completo #1D5B3A sobre #E3F0E8 | 6.86 | AA |
| En curso #5E1621 sobre #F6E4E7 | 10.65 | AAA |
| Bloqueado #3F4449 sobre #E4E5E2 | 7.78 | AAA |
| En revisión #24476E sobre #E3EAF3 | 7.87 | AAA |
| Correcto #143F2B / Revisar #7A1F1F | 10.08 / 8.84 | AAA |
| Marcador de posición #5E6368 sobre blanco | 6.07 | AA |
| No texto: borde de campo #6B6F73 sobre blanco / papel | 5.06 / 4.48 | AA (mínimo 3) |
| A−/A+ desactivado #565B60 sobre #E4E5E2 | 5.42 | AA |

## Verificado
- Estructura HTML con un script propio: etiquetas balanceadas, sin ids duplicados, sin enlaces ni anclas rotos, íconos existentes, un solo `h1`, sin saltos de encabezado, sin emojis, todos los campos con etiqueta.
- Sintaxis de `app.js` (`node --check`).
- Capturas en Edge sin interfaz (escritorio 1280 px y 390 px) de las 4 pantallas.
- Contrastes calculados con script.

## No verificado
- Interacciones con clic (A−/A+, cuestionario, diálogo, tiempo total) en un navegador real: solo se revisó el código.
- Validador oficial de HTML (no se pudo instalar `html-validate` por error de red). Lectores de pantalla, zoom al 200 %, tabletas, texto en A+ máximo.
- Fuentes web sin conexión.

## Qué no pude leer
Las dos URL de tendencias fallaron al abrirlas (error de certificado). Usé solo los resúmenes de búsqueda: de Fuselab, accesibilidad como base, personalización por rol y coherencia entre dispositivos; de Tilda, la lista de estilos (minimalismo, brutalismo, constructivismo, suizo, editorial, dibujado a mano, retro, flat, bento). No leí las descripciones completas de cada estilo.
