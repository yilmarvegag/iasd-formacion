# Notas de diseño · Voz y Misión (refinamiento)

Se conserva la identidad: azul marino, dorado, crema, títulos serif, barra lateral en escritorio y barra inferior en móvil, las mismas 4 pantallas. Todos los datos son ficticios.

## Dirección
- **Propósito:** formar predicadores laicos; meta: saber hacer el llamado al bautismo tras un estudio.
- **Tono:** editorial sobrio. Menos "app", más libro de estudio.
- **Modo:** controlado (sistema por encima de la sorpresa).
- **Qué lo hace reconocible:** filetes dorados finos, numerales serif en los módulos, versículo con número, capitular en la lectura.

## Decisiones y por qué
| Decisión | Por qué |
|---|---|
| Texto base 18 px, interlineado 1.65 a 1.75, medida de lectura ~65 caracteres | Lectores mayores |
| **A− / A+** en la barra superior (4 niveles: 18, 20, 22, 24 px de cuerpo), preferencia guardada en `localStorage` | Control del usuario; todo el diseño usa `rem` y escala completo |
| Atkinson Hyperlegible (texto) + Fraunces (títulos); respaldo Verdana y Georgia | Atkinson se diseñó para distinguir letras parecidas (muy útil con baja visión). Se descartó Inter. Atkinson dibuja el cero tachado: es intencional |
| Barra superior: buscador, A−/A+, Ayuda, Mi cuenta | Ley de Jakob: están donde se esperan |
| Migas de pan en todas las pantallas | Saber dónde estoy y volver |
| Una acción principal por pantalla: Inicio "Continuar donde me quedé"; Lección "Siguiente: cuestionario"; Cuestionario "Responder"; Púlpito "Enviar a mi mentor" | Cero sobrecarga. Lo demás es secundario (contorno) |
| Estados siempre con ícono + palabra (Completo, En curso, Bloqueado, En revisión, Hecho, Hoy, Pendiente) y borde en las etiquetas | El color nunca es la única señal (WCAG 1.4.1) |
| Módulos como lista de filas con numeral serif, no como tarjetas | Menos ruido; filetes finos |
| Íconos: set SVG de trazo uniforme (1.75), inyectado desde `app.js` como *sprite* | Un solo lugar para mantener. Siempre llevan texto al lado |
| Cuestionario: se quitó el cronómetro y se muestra "sin límite de tiempo" | El tiempo limitado angustia y es barrera para mayores (WCAG 2.2.1) |
| "Quiz" pasa a "Cuestionario" | Lenguaje sin jerga |
| Enviar al mentor pide confirmación (diálogo) y hay "Guardar borrador" / "Guardar y salir" | Control y libertad; prevención de errores |
| Bloque "¿Necesitas ayuda?" con mentor y correo `luis.bello@example.org` en cada pantalla (también enlazado desde "Ayuda") | Ayuda y documentación |
| Targets ≥ 48 px (`--target: 3rem`) y barra móvil de 64 px | Accesibilidad táctil |
| Foco visible de 3 px (azul sobre claro, dorado sobre oscuro), enlace "Saltar al contenido", `prefers-reduced-motion` | Teclado y movimiento |
| Un solo momento de movimiento: entrada escalonada de secciones (400 ms, `transform`/`opacity`) | Solemne, sin microanimaciones sueltas |
| Se quitó la píldora flotante de navegación de la maqueta | Duplicaba la navegación real y ensuciaba la barra superior |

## Coherencia de datos entre pantallas
- Ruta: **2 de 7 módulos completos** (1 y 2). Módulo 3 en curso (**1 de 4 lecciones completas**, estás en la lección 2). Módulos 4 a 7 **bloqueados**. Antes, Inicio decía que el 4 estaba "Disponible" y Evaluación decía que se desbloqueaba al aprobar al mentor; ahora ambos dicen lo mismo.
- Cuestionarios: módulo 1 = 82, módulo 2 = 90, promedio **86**; 2 aprobados y 1 práctica en revisión. Antes había 85 y 90 para el mismo cuestionario.
- La pantalla 3 es ahora el **cuestionario de repaso de la lección 2** (antes mezclaba un quiz del módulo 3 con la lección 2 de 4).
- Predicaciones: 2 realizadas (28 mar, 12 abr) y 1 próxima (20 may); retroalimentación "ayer", igual en Inicio y Púlpito.
- Mentores: Pr. Luis Bello en la ruta; Pr. Camilo Paba avala el módulo 6.
- **OneVoice** se muestra como "título provisional" con "contenido por confirmar". No se inventó contenido oficial.

## Enlaces a pantallas que no existen
No hay enlaces rotos. Lo que no tiene pantalla (módulos 1, 2 y 4 a 7, Mentores, Recursos, lección anterior, video, búsqueda, Mi cuenta, PDF, cronómetro) funciona así: los módulos son filas sin enlace y con una nota visible; el resto son botones que muestran un aviso con "Cerrar" explicando que no forma parte de la maqueta.

## Contraste calculado (WCAG 2.x, luminancia relativa)
| Par | Texto | Fondo | Razón | Requisito | Resultado |
|---|---|---|---|---|---|
| Texto principal sobre crema | #1B2433 | #FAF6EE | 14.47:1 | 4.5:1 | AAA |
| Texto principal sobre blanco | #1B2433 | #FFFFFF | 15.59:1 | 4.5:1 | AAA |
| Texto secundario sobre crema | #475069 | #FAF6EE | 7.44:1 | 4.5:1 | AAA |
| Texto secundario sobre blanco | #475069 | #FFFFFF | 8.02:1 | 4.5:1 | AAA |
| Títulos marino sobre crema | #14284B | #FAF6EE | 13.58:1 | 4.5:1 | AAA |
| Enlace #1F3A68 sobre crema | #1F3A68 | #FAF6EE | 10.46:1 | 4.5:1 | AAA |
| Eyebrow dorado oscuro sobre crema | #6F4E0C | #FAF6EE | 7.03:1 | 4.5:1 | AAA |
| Eyebrow dorado oscuro / n.º de versículo sobre blanco | #6F4E0C | #FFFFFF | 7.58:1 | 4.5:1 | AAA |
| Botón principal | #FFFFFF | #14284B | 14.64:1 | 4.5:1 | AAA |
| Botón principal (hover) | #FFFFFF | #1F3A68 | 11.27:1 | 4.5:1 | AAA |
| Botón dorado (hero) | #14284B | #C8963E | 5.50:1 | 4.5:1 | AA |
| Barra lateral: enlaces | #D5DDEC | #14284B | 10.72:1 | 4.5:1 | AAA |
| Barra lateral: activo | #FFFFFF | #1F3A68 | 11.27:1 | 4.5:1 | AAA |
| Barra lateral: usuario | #B9C5DE | #14284B | 8.44:1 | 4.5:1 | AAA |
| Dorado sobre marino (rótulos) | #C8963E | #14284B | 5.50:1 | 4.5:1 | AA |
| Hero: texto | #D5DDEC | #14284B | 10.72:1 | 4.5:1 | AAA |
| Hero: meta | #B9C5DE | #14284B | 8.44:1 | 4.5:1 | AAA |
| Etiqueta Completo | #1B5E3F | #E1F0E8 | 6.56:1 | 4.5:1 | AA |
| Etiqueta En curso | #5F4208 | #F3E4C4 | 7.36:1 | 4.5:1 | AAA |
| Etiqueta Bloqueado | #3A4558 | #E9ECF2 | 8.17:1 | 4.5:1 | AAA |
| Etiqueta En revisión | #1F3A68 | #E4EAF5 | 9.33:1 | 4.5:1 | AAA |
| Módulo bloqueado: título | #3A4558 | #F3EFE5 | 8.42:1 | 4.5:1 | AAA |
| Módulo bloqueado: nota | #475069 | #F3EFE5 | 6.98:1 | 4.5:1 | AA |
| Retroalimentación correcta (texto) | #143F2B | #E1F0E8 | 10.04:1 | 4.5:1 | AAA |
| Retroalimentación correcta (palabra) | #1B5E3F | #E1F0E8 | 6.56:1 | 4.5:1 | AA |
| Retroalimentación a revisar (texto) | #5E1A24 | #FBECEE | 11.12:1 | 4.5:1 | AAA |
| Retroalimentación a revisar (palabra) | #8F2634 | #FBECEE | 7.35:1 | 4.5:1 | AAA |
| Botón desactivado (texto) | #5B6577 | #E9ECF2 | 4.97:1 | 4.5:1 | AA |
| A−/A+ desactivado (texto, exento por estar inactivo) | #6A7285 | #E9ECF2 | 4.07:1 | 3:1 | AA |
| Marcador de posición | #5F6677 | #FFFFFF | 5.75:1 | 4.5:1 | AA |
| Pestañas móviles inactivas | #475069 | #FFFFFF | 8.02:1 | 4.5:1 | AAA |
| Pestaña móvil activa | #14284B | #FFFFFF | 14.64:1 | 4.5:1 | AAA |
| Aviso (toast) | #FFFFFF | #14284B | 14.64:1 | 4.5:1 | AAA |
| Chip de duración | #475069 | #FFFFFF | 8.02:1 | 4.5:1 | AAA |
| No texto: borde de campos sobre blanco | #7B7461 | #FFFFFF | 4.65:1 | 3:1 | AA |
| No texto: borde de campos sobre crema | #7B7461 | #FAF6EE | 4.32:1 | 3:1 | AA |
| No texto: foco azul sobre crema | #1F3A68 | #FAF6EE | 10.46:1 | 3:1 | AAA |
| No texto: foco dorado sobre marino | #C8963E | #14284B | 5.50:1 | 3:1 | AA |
| No texto: progreso marino sobre pista | #14284B | #E3DAC5 | 10.52:1 | 3:1 | AAA |
| No texto: progreso dorado sobre pista del hero | #C8963E | #374866 | 3.46:1 | 3:1 | AA |

El dorado puro `#C8963E` se usa solo sobre marino o como filete decorativo. Sobre fondo claro, el texto dorado usa `#6F4E0C`.

## Qué se verificó y qué no
**Verificado**
- HTML válido con `html-validate` (reglas recomendadas): 0 errores tras corregir.
- Enlaces entre las 4 pantallas y anclas (`#ruta`, `#ayuda`, `#retro`, `#retroalimentacion`): ninguno roto. Todos los íconos usados existen en el *sprite*.
- Contrastes: calculados con script (tabla de arriba).
- A− / A+: probado el código en Node con un DOM simulado (sube de 100 % a 137.5 %, se desactiva en los extremos y guarda la preferencia). No lo probé con clics en un navegador real.
- Capturas en Edge sin interfaz: escritorio 1280 px y móvil 390 px de ancho (Inicio, Lección, Cuestionario). Se corrigió el buscador (el ícono tapaba el texto).

**No verificado**
- Aspecto de las pantallas con el texto en A+ máximo, y captura final de Púlpito y de las pantallas tras los últimos ajustes.
- Lectores de pantalla reales, zoom al 200 % y navegación completa con teclado.
- Diálogo de confirmación y avisos en navegador (solo revisados en código).
- Tabletas (768 a 1024 px).
- Fuentes web: **requieren internet** (Google Fonts). Sin conexión se usan Verdana y Georgia, con otra métrica.
