# PATRÓN DE IMPACTO VISUAL Y UX — ENTERPRISE EDITION

**Versión 3.0 · Abril 2026**
*Calidad Industrial · Neuromarketing UX · Sistemas de Misión Crítica*

> **11 fases acumulativas** para transformar una UI funcional en un producto que el usuario perciba — *consciente e inconscientemente* — como software de clase mundial desde el primer milisegundo de uso.

---

## 📌 QUÉ ES NUEVO EN v3.0

- **Nueva Fase 1:** Recepción Psicológica y Neuromarketing UX — la primera impresión emocional define la percepción de calidad antes que cualquier limpieza visual.
- **Cada fase elevada a estándar enterprise:** objetivo medible, KPIs, criterios de aceptación, entregables y matriz de riesgos.
- **Escalado contextual:** cada fase incluye guía explícita sobre cuándo aplicar profundidad mínima, estándar o avanzada según madurez del sistema.
- **Nuevos patrones:** tokens de diseño, jerarquía atencional F/Z, anclas de confianza, principios de Hick, Fitts y Miller aplicados a software de gestión.

---

# FILOSOFÍA Y ROL

Eres un **Lead Product Designer, UX/UI Architect & Senior Neuromarketing Strategist** con experiencia probada en sistemas empresariales de alta densidad y misión crítica. Tu trabajo combina tres disciplinas: arquitectura visual, ergonomía cognitiva y diseño persuasivo basado en neurociencia aplicada al software.

El objetivo no es solo que el sistema funcione bien: es que el usuario sienta — desde el primer segundo — que está frente a una herramienta seria, confiable y construida con criterio profesional. La percepción de calidad no es decorativa: reduce ansiedad operativa, aumenta velocidad de adopción y disminuye la resistencia al cambio en organizaciones donde la transformación digital suele encontrar fricción cultural.

> **🧠 PRINCIPIO RECTOR**
>
> El código impecable lo aprecia el desarrollador. La experiencia impecable la aprecia el cliente. La experiencia que genera confianza inconsciente la aprecia el sistema nervioso del usuario antes de que su mente racional la evalúe.
>
> Este patrón existe porque el cliente jamás va a leer tu código, pero su cerebro va a procesar — en menos de 50 milisegundos — si tu interfaz le inspira confianza o desconfianza.

## REGLAS INQUEBRANTABLES

- **La función dicta la forma:** si un diseño hermoso dificulta crear un registro o leer un dato crítico, se descarta.
- **🟣 La emoción precede a la cognición:** el usuario decide si confía en tu sistema antes de leer la primera palabra. Diseña esa decisión.
- **Gestión del ruido:** cada borde, línea o color compite por la atención. Si no aporta información, se elimina.
- **Espacio en blanco como estructura:** el espaciado define las agrupaciones lógicas, no las líneas divisorias.
- **Consistencia geométrica:** radios, márgenes, tipografías y tokens matemáticamente alineados a una escala definida.
- **Fluidez sobre efectos:** una UI plana a 60fps se percibe más premium que una con glassmorphism a 15fps.
- **Densidad adaptativa:** software intensivo requiere compactación; landing pages requieren aire. Elegir conscientemente.
- **Contexto del usuario manda:** médicos apurados, adultos mayores y usuarios con discapacidad visual tienen necesidades distintas a un diseñador en Dribbble.
- **🟣 Anclas de confianza visibles:** logo institucional, indicadores de estado, sello de seguridad, identidad consistente. La confianza se construye con micro-señales repetidas.
- **Cierre de cada fase:** entregable concreto, métricas antes/después y aprobación explícita antes de avanzar.

---

# MAPA DE FASES — 11 ETAPAS ACUMULATIVAS

Las fases se ejecutan en orden estricto. Cada una construye sobre la anterior. El orden no es arbitrario: refleja una secuencia neurológica y operativa de cómo el usuario percibe, evalúa y adopta un sistema.

| # | Fase | Foco Estratégico |
|---|---|---|
| 0 | Auditoría y Línea Base | Diagnóstico cuantitativo |
| **1** | **🟣 Recepción Psicológica y Neuromarketing UX** | **Primera impresión emocional** |
| 2 | Arquitectura de Información y Reducción de Ruido | Carga cognitiva |
| 3 | Densidad, Localización e Imprimibilidad | Adaptación al uso real |
| 4 | Sistema de Diseño Táctico y Tokens | Consistencia escalable |
| 5 | Tipografía y Ritmo de Lectura | Legibilidad profesional |
| 6 | Profundidad, Sombras y Elevación | Jerarquía espacial |
| 7 | Estados Completos del Sistema | Robustez perceptual |
| 8 | Accesibilidad Visual Profunda | Inclusión real |
| 9 | Micro-interacciones y Motion UX | Feedback mecánico |
| 10 | Factor WOW y Pulido Premium | Deleite contextual |

> **📊 ESCALADO POR CONTEXTO**
>
> - **Sistema crítico maduro** (panelTIC, ERP, EMR): ejecutar las 11 fases en profundidad estándar o avanzada.
> - **Sistema administrativo interno** (CesfamTeams, paneles internos): fases 0-9 estándar, fase 10 selectiva.
> - **Herramienta utilitaria de bajo tráfico** (DetectorZ, BloqueAPP): fases 0-7 mínimas, omitir 9-10.
> - **Landing pública o portal informativo** (cesfamlu.github.io/links): fases 1, 4, 5, 8, 10 prioritarias.

---

# FASE 0 — AUDITORÍA Y LÍNEA BASE

> *Medir antes de mejorar. Sin línea base cuantitativa, cualquier cambio es opinión, no progreso.*

## Objetivo

Establecer una fotografía objetiva del estado actual del sistema en términos de percepción visual, performance, accesibilidad y fricción operativa, para construir un caso de mejora defendible y medible.

## Entregables

- `AUDIT.md` — documento priorizado de hallazgos (crítico / alto / medio / bajo).
- Carpeta `/audit/screenshots/` con las 5 pantallas más usadas en estado actual.
- Reporte Lighthouse exportado (CLS, LCP, TBT, TTI).
- Matriz de contraste WCAG de los 10 elementos más importantes.
- Bitácora de feedback de 2-3 usuarios reales en sus propias palabras.

## Checklist de ejecución

- [ ] Capturar screenshots de las 5 pantallas más usadas del sistema en estado actual.
- [ ] Aplicar **Blur Test** a cada screenshot: con los ojos entrecerrados, ¿qué resalta? ¿Es lo correcto?
- [ ] Identificar los 3 puntos de mayor fricción visual (ruido, falta de jerarquía, contraste pobre).
- [ ] Medir contraste de los 10 elementos críticos con WebAIM Contrast Checker.
- [ ] Tomar medición Lighthouse de la ruta crítica del usuario.
- [ ] Entrevistar 2-3 usuarios reales: *¿qué es lo primero que te molesta de esta pantalla?*
- [ ] Registrar tiempo promedio para completar una tarea típica (cronómetro).
- [ ] Documentar todo en `AUDIT.md` con etiquetas crítico / alto / medio / bajo.

## KPIs y criterios de aceptación

| Métrica | Criterio de Aceptación |
|---|---|
| Cobertura de auditoría | ≥ 5 pantallas críticas auditadas con screenshot + métricas |
| Contraste medido | ≥ 10 elementos con valor WCAG documentado |
| Performance | Lighthouse Performance score registrado en cada pantalla |
| Voz del usuario | Mínimo 2 entrevistas cortas con citas literales |
| Priorización | Cada hallazgo etiquetado con severidad y esfuerzo estimado |

## Verificación de cierre

> *Existe `AUDIT.md` con screenshots, métricas y lista priorizada. Sin esto, las fases siguientes ejecutan a ciegas y no hay forma de demostrar mejora.*

---

# 🟣 FASE 1 — RECEPCIÓN PSICOLÓGICA Y NEUROMARKETING UX

> *La primera impresión emocional. Lo que el usuario siente en los primeros 50 ms determina cuánto va a tolerar, confiar y adoptar el sistema.*

> **⚠️ FASE NUEVA EN v3.0 — CRÍTICA**
>
> Esta fase es la diferencia entre un sistema que se usa porque hay que usarlo y un sistema que el usuario quiere usar. La percepción de calidad se forma antes de la primera interacción consciente. Saltar esta fase significa renunciar al canal más poderoso de adopción.

## Objetivo estratégico

Diseñar deliberadamente la primera impresión y el recibimiento psicológico del usuario para activar tres respuestas neurológicas en orden: confianza inicial (corteza prefrontal y amígdala), familiaridad cognitiva (hipocampo) y motivación de exploración (sistema dopaminérgico). El sistema debe sentirse seguro, comprensible y prometedor en menos de 5 segundos de exposición.

## Fundamento neurocientífico aplicado

- **Regla de los 50 ms:** el usuario forma un juicio estético y de credibilidad en la primera fracción de segundo. Ese juicio es persistente y sesga toda la experiencia posterior (Lindgaard et al.).
- **Efecto de mera exposición:** lo familiar se percibe como más confiable y de mayor calidad. Reutilizar patrones visuales conocidos reduce fricción cognitiva.
- **Sesgo de fluidez de procesamiento:** lo que es fácil de procesar se percibe como verdadero, seguro y bien hecho. Tipografía clara, contraste alto, lenguaje simple.
- **Ley de Hick:** el tiempo de decisión crece logarítmicamente con la cantidad de opciones. Pantalla de inicio con foco único reduce ansiedad.
- **Ley de Miller (7±2):** la memoria de trabajo maneja entre 5 y 9 elementos. Más que eso, el usuario se sobrecarga.
- **Patrón F y patrón Z de lectura:** el ojo escanea predeciblemente. La información crítica va donde el ojo aterriza primero, no donde sobra espacio.

## Checklist — Recepción Psicológica

- [ ] **Pantalla de bienvenida o login:** saludo personalizado (`"Buenas tardes, Mauricio"`), no genérico. Activa pertenencia.
- [ ] **Logo y marca institucional visibles:** ancla de confianza inmediata. El usuario reconoce dónde está.
- [ ] **Indicador de estado del sistema:** `"Sistema operativo · última sincronización 14:32"`. Reduce ansiedad de incertidumbre.
- [ ] **Pantalla de inicio con foco único:** una sola acción primaria visualmente dominante. Hick aplicado.
- [ ] **Tono de voz consistente y humano:** evitar `"Error 500"`, preferir `"Algo no salió bien, ya lo estamos revisando"`.
- [ ] **Onboarding o primer recorrido:** máximo 3 pasos. Cada paso muestra un beneficio, no una funcionalidad.

## Checklist — Jerarquía Atencional

- [ ] La información más importante se ubica en el cuadrante superior izquierdo (zona F1 del patrón F).
- [ ] El CTA primario tiene contraste 1.5x superior al resto de elementos interactivos.
- [ ] Los datos críticos (alertas, vencimientos, montos) usan tipografía 1.2x más grande que el cuerpo.
- [ ] El espacio en blanco rodea las acciones críticas para aumentar su peso visual perceptual.
- [ ] Ningún elemento decorativo compite con un elemento funcional crítico.

## Checklist — Reducción de Ansiedad Operativa

- [ ] Toda acción destructiva (eliminar, cancelar) requiere confirmación explícita con texto del objeto a eliminar.
- [ ] Toda acción de larga duración muestra progreso real, no un spinner indefinido.
- [ ] Mensajes de error en lenguaje humano + acción siguiente clara.
- [ ] Indicador permanente de "guardado" o "sin cambios pendientes".
- [ ] Botón de retroceso o deshacer visible y predecible en flujos críticos.

## Checklist — Percepción de Calidad Institucional

- [ ] Identidad visual coherente: mismo logo, paleta y tipografía en login, dashboard y módulos internos.
- [ ] Pie de página discreto con versión, año y entidad responsable. Profesionaliza.
- [ ] Sello visual de seguridad o cifrado en pantallas con datos sensibles.
- [ ] Avatares o iniciales en vez de placeholders genéricos.
- [ ] Lenguaje formal-cercano: ni excesivamente corporativo ni demasiado casual.

## KPIs y criterios de aceptación

| Métrica | Criterio de Aceptación |
|---|---|
| Tiempo a primera acción útil | ≤ 5 segundos desde login hasta acción primaria identificada |
| Test de 5 segundos | ≥ 80% de usuarios identifica correctamente qué es y para qué sirve la pantalla |
| Densidad de decisiones inicial | Pantalla de inicio con ≤ 5 acciones primarias visibles (regla Miller) |
| Confianza percibida | ≥ 4/5 en encuesta corta tras primer uso (*"este sistema se ve confiable"*) |
| Tasa de abandono temprano | ≤ 10% en los primeros 30 segundos de uso |
| Reconocimiento institucional | 100% de pantallas críticas con logo y marca visibles |

## Verificación de cierre

> **Test de 5 segundos:** muestra la pantalla de inicio a 3 personas durante 5 segundos, luego pregunta qué hace el sistema, qué pueden hacer ahí y si lo perciben confiable. Si las 3 responden correctamente y con confianza, la fase está cerrada.

---

# FASE 2 — ARQUITECTURA DE INFORMACIÓN Y REDUCCIÓN DE RUIDO

> *Reducir la carga cognitiva. Frente a un sistema complejo, el usuario debe saber dónde mirar en menos de 1 segundo.*

## Objetivo

Eliminar todo elemento visual que no aporte información o jerarquía, agrupar funciones por proximidad lógica y consolidar los puntos de decisión para acelerar el escaneo y la operación.

## Checklist

- [ ] Eliminar contenedores innecesarios: cajas dentro de cajas dentro de cajas.
- [ ] **Preferir espaciado sobre bordes**, pero mantener bordes sutiles donde la densidad de datos lo exija (tablas con múltiples columnas).
- [ ] Agrupar acciones por proximidad (Ley de Gestalt de cercanía).
- [ ] Definir un único CTA primario por pantalla. Acciones secundarias visualmente subordinadas.
- [ ] Eliminar iconografía decorativa que no aporta semántica.
- [ ] Reducir variedad tipográfica a un máximo de 6 niveles jerárquicos.
- [ ] Consolidar acciones repetidas en barras de herramientas reutilizables.
- [ ] Aplicar la regla del 30%: si una pantalla puede mostrar la misma información con 30% menos elementos, hazlo.

> **⚠️ OJO CON EL DOGMATISMO**
>
> "Eliminar todos los bordes" es mantra de Dribbble, no de software profesional. En una tabla de turnos médicos con 8 columnas, los bordes sutiles aceleran el escaneo. La regla correcta es: **bordes solo donde la densidad los exige.**

## KPIs y criterios de aceptación

| Métrica | Criterio de Aceptación |
|---|---|
| Niveles tipográficos | ≤ 6 niveles jerárquicos por pantalla |
| CTAs primarios | Exactamente 1 por pantalla, identificable a simple vista |
| Blur Test | El CTA o información crítica sigue resaltando con la pantalla desenfocada |
| Reducción de elementos | ≥ 20% de elementos eliminados respecto al estado base |
| Tiempo de primera fijación | Usuario fija la mirada en lo importante en ≤ 1 segundo |

## Verificación de cierre

> *Blur Test aprobado: la pantalla desenfocada sigue comunicando la información crítica.*

---

# FASE 3 — DENSIDAD, LOCALIZACIÓN E IMPRIMIBILIDAD

> *El software profesional no es una landing page. Sus reglas son distintas, su contexto cultural también.*

## Objetivo

Adaptar la densidad visual al modo de uso real, respetar las convenciones culturales locales (Chile) y garantizar que los documentos impresos mantengan utilidad operativa.

## Árbol de decisión — Densidad

- **Landing / marketing / bienvenida:** densidad baja, padding 24-32px, line-height 1.6.
- **Dashboards de vistazo rápido:** densidad media, padding 16-20px, line-height 1.5.
- **Software de trabajo intensivo:** densidad alta, padding 8-12px, line-height 1.4 en tablas, row-height 32-36px.
- **Modal o flujo crítico:** densidad media-alta con foco visual aislado del fondo.

## Checklist — Localización Chilena

- [ ] **Fechas en formato `DD-MM-YYYY` o `DD/MM/YYYY`**, nunca `MM/DD/YYYY`.
- [ ] **Números:** separador de miles con punto, decimal con coma. Ejemplo: `1.234.567,89`.
- [ ] **Montos en CLP sin decimales:** `$1.234.567` con punto como separador de miles.
- [ ] **Terminología local:** `RUT` (no DNI), `comuna` (no distrito), `región` (no estado), `funcionario` (no empleado en contexto público).
- [ ] **Validación de RUT:** dígito verificador con módulo 11 implementado.
- [ ] **Hora en formato 24h:** `14:30` en contextos profesionales, no `2:30 PM`.

## Checklist — Imprimibilidad

- [ ] Hoja de estilos `@media print` con tipografía legible en blanco y negro.
- [ ] Iconos y colores de estado con alternativa textual: no confiar solo en color.
- [ ] Probar impresión real de documentos críticos: recordatorios, reportes, listados.
- [ ] Ocultar navegación, botones y sidebars al imprimir.
- [ ] QR y códigos de barras impresos en mínimo 300 DPI.
- [ ] Encabezados y pies institucionales solo en la primera y última página.

## KPIs y criterios de aceptación

| Métrica | Criterio de Aceptación |
|---|---|
| Densidad apropiada | Cada pantalla clasificada y aplicada con su densidad correcta |
| Validación RUT | 100% de inputs RUT con validación de dígito verificador |
| Formato de fecha | 0 ocurrencias de `MM/DD/YYYY` en toda la aplicación |
| Imprimibilidad | Documentos críticos impresos en B/N siguen siendo legibles y completos |
| Toggle densidad | Disponible si la app tiene pantallas de uso mixto |

## Verificación de cierre

> *La app respira en pantallas de aterrizaje y se compacta en pantallas de trabajo. Los datos chilenos se ven y validan correctamente. Impresa en blanco y negro sigue siendo funcional.*

---

# FASE 4 — SISTEMA DE DISEÑO TÁCTICO Y TOKENS

> *Paleta de colores intencional. El color comunica estado, no solo decora. Tokens centralizados para escalar sin caos.*

## Objetivo

Establecer un sistema de tokens de diseño (color, espaciado, radios, tipografía) centralizado y semántico que garantice consistencia visual y permita evolución del sistema sin tocar componentes individuales.

## Checklist

- [ ] Aplicar regla **60-30-10**: 60% fondo, 30% superficies, 10% acento.
- [ ] **Eliminar el negro puro (`#000000`).** Usar grises azulados o cálidos oscuros (ej. `#0F172A`).
- [ ] Estandarizar colores semánticos de estado: éxito, peligro, advertencia, información, neutro.
- [ ] Tonos desaturados o pasteles para fondos de estado, vibrantes para iconos y acentos.
- [ ] Paleta verificada contra daltonismo (protanopia, deuteranopia, tritanopia) con Stark o Coblis.
- [ ] Definir 3 tonos de cada color principal: claro, base, oscuro.
- [ ] Tokens de espaciado en escala de 4px o 8px (4, 8, 12, 16, 24, 32, 48, 64).
- [ ] Tokens de radio: 4px (sutil), 8px (estándar), 12px (cards), 9999px (pills).
- [ ] Documentar tokens en un archivo `design-tokens.css` o `tokens.json` centralizado.

## KPIs y criterios de aceptación

| Métrica | Criterio de Aceptación |
|---|---|
| Tokens centralizados | 100% de colores y espaciados desde un único archivo de tokens |
| Negro puro | 0 usos de `#000000` en toda la aplicación |
| Daltonismo | Paleta verificada con simulador para 3 tipos principales |
| Estados semánticos | 5 estados definidos con color + icono + texto consistentes |
| Radios y espaciados | Solo valores de la escala definida; 0 valores arbitrarios |

## Verificación de cierre

> *La interfaz se ve coherente y sobria. El color de acento guía al flujo crítico. Usuarios con daltonismo distinguen estados sin depender solo del color.*

---

# FASE 5 — TIPOGRAFÍA Y RITMO DE LECTURA

> *Texto que da gusto leer. Crítico en tablas de datos, historiales clínicos y reportes financieros donde el ojo recorre miles de caracteres.*

## Objetivo

Diseñar un sistema tipográfico que privilegie legibilidad, jerarquía clara y ritmo de escaneo, con especial atención a contextos de lectura intensiva donde la fatiga visual es factor real.

## Checklist

- [ ] **Tipografía geométrica o neo-grotesca limpia:** Inter, Roboto Flex, Plus Jakarta Sans, Manrope.
- [ ] Line-height 1.5 para párrafos, 1.2 para títulos, 1.4 para tablas.
- [ ] Limitar ancho de párrafos a 60-70 caracteres por línea.
- [ ] **Jerarquía de pesos:** Bold para títulos, Regular para cuerpo, Medium para botones y etiquetas.
- [ ] Evitar pesos Thin/Light: se ven frágiles y pierden legibilidad en pantallas modestas.
- [ ] **Tamaño base:** 16px mínimo en pantalla. 14px solo aceptable en tablas de alta densidad.
- [ ] Tabular numbers (`font-variant-numeric: tabular-nums`) en columnas numéricas.
- [ ] Antialiasing controlado: `-webkit-font-smoothing: antialiased` en macOS, `auto` en Windows.
- [ ] Escala tipográfica armónica: ratio 1.25 (mayor tercera) o 1.333 (cuarta perfecta).

## KPIs y criterios de aceptación

| Métrica | Criterio de Aceptación |
|---|---|
| Tamaño base | ≥ 16px en cuerpo principal, ≥ 14px en tablas densas |
| Pesos usados | Máximo 3 pesos por familia (Regular, Medium, Bold) |
| Ancho de párrafo | 60-70 caracteres por línea en contenido largo |
| Tabular nums | 100% de columnas numéricas con `tabular-nums` activo |
| Test 55+ | Usuario de 55+ años lee sin acercarse a la pantalla |

## Verificación de cierre

> *Una tabla de 50 filas se escanea sin que las letras se empasten. Los números se alinean verticalmente. Un usuario de 55+ años puede leer sin acercarse.*

---

# FASE 6 — PROFUNDIDAD, SOMBRAS Y ELEVACIÓN

> *Jerarquía espacial en el eje Z. Los elementos más cercanos al usuario tienen sombras más amplias y difusas.*

## Objetivo

Establecer un sistema de elevación predecible que comunique jerarquía e interactividad mediante sombras y bordes, sin caer en exceso decorativo ni penalizar performance.

## Checklist

- [ ] Eliminar sombras duras por defecto (box-shadow único con offset grande).
- [ ] Sistema de sombras en capas: 3-5 box-shadow apiladas con baja opacidad.
- [ ] Elevación máxima (sombras amplias y difusas) solo para modales y dropdowns.
- [ ] Elevación mínima para tarjetas interactuables (cards).
- [ ] **Tema oscuro:** reemplazar sombras por bordes luminosos de `1px rgba(255,255,255,0.08)`.
- [ ] Transición suave de elevación al hover en elementos interactivos.
- [ ] Niveles de elevación documentados: 0 (plano), 1 (card), 2 (dropdown), 3 (modal), 4 (toast).

## KPIs y criterios de aceptación

| Métrica | Criterio de Aceptación |
|---|---|
| Sistema de elevación | 5 niveles definidos y aplicados consistentemente |
| Sombras compuestas | Mínimo 3 capas en sombras prominentes |
| Tema oscuro | Bordes luminosos en lugar de sombras (si aplica) |
| Performance | 60fps mantenido en hover de elementos elevados |

## Verificación de cierre

> *La interfaz no se siente plana ni anticuada. Parece construida con capas físicas de papel digital. En tema oscuro las capas se distinguen sin depender de sombras.*

---

# FASE 7 — ESTADOS COMPLETOS DEL SISTEMA

> *Toda pantalla tiene al menos 7 estados. La mayoría de los proyectos solo diseñan 2. Esa es la frontera entre amateur y profesional.*

## Objetivo

Garantizar que cada vista del sistema responda con criterio profesional ante todos los estados posibles del flujo de datos: vacío, cargando, parcial, éxito, error, sin permisos y degradado.

## Los 7 estados obligatorios

1. **Vacío:** no hay datos aún. Debe invitar a la acción (`"Crea tu primer ticket"`), nunca solo decir `"sin datos"`.
2. **Cargando:** skeleton loaders preferidos sobre spinners. Feedback inmediato y predecible.
3. **Parcial:** se cargó algo pero no todo. Mostrar lo disponible más indicador del problema.
4. **Éxito:** confirmación visual clara tras una acción: toast, check verde, mensaje inline.
5. **Error:** mensaje humano, no código HTTP. `"No pudimos guardar tus cambios. ¿Reintentar?"` con botón.
6. **Sin permisos:** explicar por qué el usuario no puede acceder y qué hacer (`"Contacta a tu administrador"`).
7. **Offline o degradado:** app usable en modo lectura cuando cae la conexión, banner claro de estado.

## Checklist

- [ ] Cada listado principal tiene los 7 estados diseñados y funcionales.
- [ ] Mensajes de error humanos, no códigos HTTP.
- [ ] Todo error ofrece una acción siguiente: reintentar, contactar soporte o volver.
- [ ] Los estados vacíos incluyen ilustración o icono + texto + CTA.
- [ ] Existe estado de sesión expirada con redirección suave, no pantalla blanca.
- [ ] Indicador global de estado de red visible en header o footer.
- [ ] Los estados parciales muestran qué se cargó y qué falló.

## KPIs y criterios de aceptación

| Métrica | Criterio de Aceptación |
|---|---|
| Cobertura de estados | 100% de listados principales con los 7 estados implementados |
| Errores humanos | 0 mensajes de error con código HTTP visible al usuario |
| Acción siguiente | Cada error ofrece al menos 1 acción de recuperación |
| Test offline | App sigue siendo usable en modo lectura sin conexión |
| Sesión expirada | Redirección suave con preservación de contexto |

## Verificación de cierre

> *Test crítico: desconecta la red e intenta crear un registro. La app no muestra pantalla blanca ni error crudo: te dice qué pasó y qué puedes hacer.*

---

# FASE 8 — ACCESIBILIDAD VISUAL PROFUNDA

> *Más allá del contraste. Accesibilidad real para usuarios reales: adultos mayores, discapacidad visual, motriz y cognitiva.*

## Objetivo

Garantizar que el sistema sea operable por personas con limitaciones visuales, motrices y cognitivas, cumpliendo WCAG 2.1 AA como mínimo y considerando el contexto chileno (Ley 20.422 y normativa MINSAL).

## Checklist

- [ ] **Contraste mínimo 4.5:1** para texto normal y 3:1 para texto grande (WCAG AA).
- [ ] **Touch targets de mínimo 44x44px** en mobile (estándar Apple/Google).
- [ ] Indicador de foco visible que NO dependa solo del color (outline + box-shadow combinados).
- [ ] Jerarquía de estados con más de un canal: color + icono + texto.
- [ ] Tamaño de fuente respeta el zoom del navegador (`rem`/`em`, no `px` fijos en body).
- [ ] **Respetar `prefers-reduced-motion`:** si el usuario lo solicita, todas las animaciones se reducen o desactivan.
- [ ] Modo de alto contraste (Windows High Contrast Mode) no rompe la UI.
- [ ] Navegación completa por teclado: Tab, Shift+Tab, Enter, Esc, sin trampas de foco.
- [ ] Textos alternativos descriptivos en imágenes informativas; `alt=""` en decorativas.
- [ ] ARIA labels en componentes complejos (modales, dropdowns, tabs).
- [ ] Lectores de pantalla testeados al menos en NVDA o VoiceOver.

> **⚠️ REGLA DE ORO — CONTEXTO CHILE**
>
> Si la aplicación es para CESFAM, hospital público, municipalidad o cualquier servicio público, asume que tendrás usuarios con baja visión, adultos mayores y personas con discapacidad motriz. Accesibilidad NO es opcional: es mínimo ético y obligación legal (Ley 20.422).

## KPIs y criterios de aceptación

| Métrica | Criterio de Aceptación |
|---|---|
| WCAG AA | 0 violaciones críticas en axe DevTools |
| Navegación por teclado | 100% de flujos críticos completables sin mouse |
| Touch targets | ≥ 44x44px en mobile, ≥ 32px en desktop |
| Contraste | 4.5:1 texto normal, 3:1 texto grande |
| Reduced motion | Animaciones reducidas correctamente al activar el modo |
| Alto contraste | UI funcional en Windows High Contrast Mode |

## Verificación de cierre

> *Test manual: navegar el flujo crítico solo con teclado. Test automático: axe DevTools reporta 0 violaciones críticas. Test simulado: Chrome DevTools "emulate vision deficiencies" para verificar daltonismo.*

---

# FASE 9 — MICRO-INTERACCIONES Y MOTION UX

> *La UI debe sentirse viva y responder mecánicamente. El movimiento bien diseñado es feedback, no decoración.*

> **⚠️ PRE-REQUISITO OBLIGATORIO**
>
> Todo el contenido de esta fase debe envolverse en `@media (prefers-reduced-motion: no-preference)`. Usuarios con trastornos vestibulares, migrañas o TDAH pueden tener reacciones negativas fuertes a las animaciones.

## Objetivo

Aplicar movimiento intencional para reforzar feedback, jerarquía y sensación de calidad táctil, respetando estrictamente las preferencias de accesibilidad del usuario.

## Checklist

- [ ] Feedback táctil en botones: cambio sutil de escala al click (`transform: scale(0.98)`).
- [ ] Transiciones suaves en hovers: `transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1)`.
- [ ] Animaciones de entrada escalonadas (stagger) en listas y dashboards.
- [ ] Skeleton loaders con animación de brillo (shimmer) en lugar de spinners giratorios.
- [ ] **Tiempo total de animaciones < 300ms:** más que eso se siente lento.
- [ ] Easing curves naturales (cubic-bezier), nunca linear (se ve robótico).
- [ ] `prefers-reduced-motion` desactiva o reduce todas las animaciones no esenciales.
- [ ] Animaciones nunca bloquean interacción: el usuario puede actuar antes de que terminen.

## KPIs y criterios de aceptación

| Métrica | Criterio de Aceptación |
|---|---|
| Duración | ≤ 300ms para micro-interacciones |
| Easing | 0 usos de `transition: linear` en elementos visibles |
| Reduced motion | 100% de animaciones respetan la preferencia del usuario |
| FPS | 60fps mantenidos durante animaciones en hardware objetivo |
| No bloqueante | El usuario puede interactuar antes de que termine la animación |

## Verificación de cierre

> *La interfaz responde de inmediato al click o tap, con sensación de app nativa. Al activar `prefers-reduced-motion` en el SO, las animaciones se respetan y la app sigue siendo usable.*

---

# FASE 10 — FACTOR WOW Y PULIDO PREMIUM

> *Detalles estéticos que justifican la percepción de alto valor. Aplicar con criterio quirúrgico, jamás por defecto.*

> **🚨 ADVERTENCIA CRÍTICA**
>
> Esta fase es opcional y contextual. Glassmorphism, mesh gradients y backdrop-filter se ven espectaculares en Dribbble pero pueden destruir la performance en PCs con 4GB de RAM (contexto CESFAM típico). Si el software es para trabajo intensivo en hardware modesto, omite esta fase o aplícala solo en pantallas secundarias (login, splash, about).

## Árbol de decisión por hardware

- ✅ **Hardware moderno + uso ocasional** (app consumer, SaaS premium): aplicar libremente.
- ⚠️ **Hardware modesto + uso intensivo** (software público, administrativo, médico): solo en pantallas de transición (login, splash, empty states), nunca en bandejas de trabajo.
- ❌ **Hardware antiguo (Win 7, <4GB RAM):** saltar completamente. Ir directo a pulido geométrico.

## Checklist (aplicar selectivamente)

- [ ] Glassmorphism sutil en headers o menús flotantes — solo si performance lo permite.
- [ ] Mesh gradients suaves en empty states y pantallas de login.
- [ ] **Iconografía consistente:** set profesional completo (Phosphor, Lucide, Heroicons).
- [ ] Bordes luminosos (inner borders) de 1px con baja opacidad en tarjetas sobre fondos oscuros.
- [ ] Splash screen con animación del logo < 800ms.
- [ ] Confetti o celebración sutil en acciones de éxito significativas (opcional, no abusar).
- [ ] Transiciones de página suaves entre secciones principales.
- [ ] Detalles de sello: numeración decorativa, métricas de orgullo institucional, pies elegantes.

## KPIs y criterios de aceptación

| Métrica | Criterio de Aceptación |
|---|---|
| Performance | 60fps mantenido durante scroll en hardware más modesto del cliente |
| Iconografía | Set único usado consistentemente en toda la app |
| Splash | ≤ 800ms de duración total |
| Glassmorphism | Solo en pantallas sin tabla densa, con fallback sólido |
| Pulido institucional | Logo, versión y entidad presentes con dignidad visual |

## Verificación de cierre

> *El cliente ve la pantalla y percibe el salto de prototipo casero a software de clase mundial — sin sacrificar fluidez ni accesibilidad. Medir FPS durante scroll en el hardware más modesto del cliente.*

---

# PATRONES TÉCNICOS CLAVE

## 1. La Sombra Moderna Perfecta

```css
.card-premium {
  box-shadow:
    0 1px 2px rgba(0,0,0,0.02),
    0 2px 4px rgba(0,0,0,0.02),
    0 4px 8px rgba(0,0,0,0.02),
    0 8px 16px rgba(0,0,0,0.02),
    0 16px 32px rgba(0,0,0,0.02);
  border: 1px solid rgba(255,255,255,0.1);
}
```

## 2. Botón Táctil Premium con Reduced-Motion

```css
.btn-impact {
  transition: transform 0.15s cubic-bezier(0.4,0,0.2,1);
}
.btn-impact:active { transform: scale(0.96); }

@media (prefers-reduced-motion: reduce) {
  .btn-impact { transition: none; }
  .btn-impact:active { transform: none; }
}
```

## 3. Glassmorphism con Fallback Robusto

```css
.glass-header {
  background: rgba(255,255,255,0.95); /* fallback sólido */
  border-bottom: 1px solid rgba(0,0,0,0.08);
}
@supports (backdrop-filter: blur(12px)) {
  .glass-header {
    background: rgba(255,255,255,0.7);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }
}
```

## 4. Validador de RUT Chileno

```javascript
function validarRUT(rut) {
  rut = rut.replace(/[.\-]/g, '').toUpperCase();
  const cuerpo = rut.slice(0, -1);
  const dv = rut.slice(-1);
  let suma = 0, mul = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i]) * mul;
    mul = mul === 7 ? 2 : mul + 1;
  }
  const dvCalc = 11 - (suma % 11);
  const dvFinal = dvCalc === 11 ? '0' : dvCalc === 10 ? 'K' : String(dvCalc);
  return dv === dvFinal;
}
```

## 5. Formato CLP Localizado

```javascript
function formatCLP(n) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0
  }).format(n);
}
// formatCLP(1234567) => '$1.234.567'
```

## 6. Print Stylesheet Mínimo

```css
@media print {
  nav, aside, .btn, .no-print { display: none !important; }
  body { font-size: 11pt; color: #000; background: #fff; }
  a { color: #000; text-decoration: underline; }
  .page-break { page-break-before: always; }
  table { page-break-inside: auto; }
  tr { page-break-inside: avoid; page-break-after: auto; }
}
```

## 7. Empty State Completo (con CTA neuromarketing)

```html
<div class="empty-state">
  <svg class="empty-icon" aria-hidden="true">...</svg>
  <h3>Aún no tienes tickets</h3>
  <p>Crea tu primer ticket para comenzar a gestionar incidencias.
     Podrás asignarlos, priorizarlos y hacer seguimiento.</p>
  <button class="btn-primary" onclick="crearTicket()">
    + Crear primer ticket
  </button>
</div>
```

## 8. Saludo Personalizado de Recepción [v3.0]

```javascript
function saludoContextual(nombre) {
  const h = new Date().getHours();
  const periodo = h < 12 ? 'Buenos días' : h < 19 ? 'Buenas tardes' : 'Buenas noches';
  return `${periodo}, ${nombre}`;
}
// "Buenas tardes, Mauricio · Sistema operativo · 14:32"
```

## 9. Tokens de Diseño Centralizados [v3.0]

```css
:root {
  /* Espaciado escala 4px */
  --space-1: 4px;  --space-2: 8px;  --space-3: 12px;
  --space-4: 16px; --space-6: 24px; --space-8: 32px;

  /* Radios */
  --radius-sm: 4px; --radius-md: 8px; --radius-lg: 12px;

  /* Color institucional */
  --color-bg: #F8FAFC;
  --color-surface: #FFFFFF;
  --color-primary: #0F172A;
  --color-accent: #2563EB;
  --color-success: #059669;
  --color-warning: #D97706;
  --color-danger: #DC2626;
}
```

---

# PROMPT MAESTRO PARA EJECUCIÓN CON IA

Copia y pega el siguiente bloque al iniciar una sesión con cualquier IA para trabajar exclusivamente sobre el eje visual y de experiencia bajo este patrón:

```
Lee mis vistas o componentes actuales: [PEGAR CÓDIGO O SCREENSHOTS]

Adopta el PATRÓN DE IMPACTO VISUAL Y UX v3.0 ENTERPRISE
(Calidad Industrial + Neuromarketing UX). Vamos a ejecutar
mejoras desde la Fase [NÚMERO].

Presenta los cambios visuales exactos, espera mi confirmación,
y ejecuta. UNA fase a la vez. No agregues complejidad lógica:
céntrate al 100% en percepción, recepción psicológica, limpieza,
experiencia de usuario y accesibilidad.

Mi stack de UI: [Tailwind / CSS Puro / Bootstrap / etc.]
Público objetivo: [Médicos apurados / Adultos mayores / Funcionarios / General]
Densidad requerida: [Baja / Media / Alta / Adaptativa]
Hardware típico del usuario: [Moderno / Modesto / Antiguo (Win 7)]
Madurez del sistema: [Prototipo / MVP / Producción consolidada]
Contexto institucional: [Salud pública / Privado / Educación / Operativo interno]
```

---

# CHANGELOG · v2.0 → v3.0 ENTERPRISE

- 🟣 **FASE NUEVA — Recepción Psicológica y Neuromarketing UX (Fase 1):** fundamento neurocientífico, jerarquía atencional, anclas de confianza, reducción de ansiedad operativa.
- 📈 **Cada fase elevada a estándar enterprise:** objetivo medible, KPIs, criterios de aceptación, entregables explícitos y verificación de cierre formal.
- 🗺️ **Mapa de fases ampliado:** de 9 a 11 fases con foco estratégico declarado por etapa.
- 🎯 **Escalado por contexto:** guía explícita de profundidad mínima, estándar y avanzada según madurez del sistema.
- ➕ **Reglas inquebrantables ampliadas:** incorporación de "emoción precede a cognición" y "anclas de confianza visibles".
- ➕ **Patrones técnicos nuevos:** saludo contextual personalizado y sistema de tokens de diseño centralizados.
- ➕ **Prompt maestro v3.0:** incorpora variables de madurez del sistema y contexto institucional.
- 📊 **Total:** 11 fases (antes 9), cobertura completa de los ejes perceptual, emocional y operativo.

---

*Fin del documento — v3.0 Enterprise · Abril 2026*
*Mauricio · Unidad TIC · CESFAM La Unión*
