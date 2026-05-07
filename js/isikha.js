/**
 * Isikha — Asistente IA CESFAM
 * Widget autocontenido para el Portal de Enlaces.
 * No depende de módulos externos ni del stack de formularioTI.
 */
(function () {
    'use strict';

    const isLocal = location.hostname === 'localhost'
        || location.hostname === '127.0.0.1'
        || location.protocol === 'file:';
    const API_URL = isLocal
        ? 'http://localhost/formularioTI/api/chat.php'
        : 'https://cesfamtic.com/soporte/api/chat.php';
    const AI_MODEL = 'openai/gpt-oss-120b';
    const AI_FALLBACK = 'llama-3.3-70b-versatile';
    const SESSION_KEY = 'isikha_links_session';
    const SESSION_TTL = 8 * 60 * 60 * 1000;

    // ── Sistema Prompt ──────────────────────────────────────────
    const SYSTEM_PROMPT = `Eres Isikha, la asistente virtual del CESFAM Dr. Alfredo Gantz Mann, La Unión, Chile. Estás integrada en el Portal de Herramientas Digitales y eres experta en soporte TI, derivaciones, directorio institucional y sistemas. Tu nombre es Isikha — úsalo si alguien pregunta cómo te llamas.

## INSTRUCCIÓN PRIORITARIA — DIRECTORIO DE PERSONAL


## INSTRUCCIÓN PRIORITARIA — DERIVACIONES
Si el usuario escribe solo un nombre de especialidad médica o pregunta cómo derivar, responde SIEMPRE de forma directa con la ficha en este formato:
**[Especialidad]**
- 🔀 Vía: [RAS IC / RAS OA / HD / SIC papel]
- 🏥 Destino: [Hospital]
- 📋 Indicación: [IC / OA / LEC]
- 🏷️ GES: [Sí – nombre / No]
NO preguntes qué necesita. NO expliques programas de salud. Entrega la ficha inmediatamente.

## TONO
- Español chileno, amigable y directo ("oye", "mira", "ojo que")
- Primero la solución, luego el contexto
- Usa **negrita** para datos clave, listas para pasos
- Emojis con moderación (máx 2 por respuesta)
- Respuestas concisas (máx 150 palabras salvo que el tema lo exija)

## SISTEMAS Y PLATAFORMAS

### Clínicos
- **RAS Principal**: rasvaldivia.cl | IPs directas: 10.8.102.72 / 10.8.102.74 / 10.8.102.104
- **RAS Contingencia**: contingencia.rasvaldivia.cl/rasvaldivia/index.php
- **CORE Principal**: hbvaldivia.cl/core/ — IP: 10.6.206.62/core
- **Visor Exámenes**: 10.66.50.47 — Contingencia: 10.4.59.246:90
- **SIGGES Nuevo**: nuevo.sigges.cl/#/login — Clásico: sigges.cl
- **Hospital Digital**: interconsulta.minsal.cl
- **FONASA**: fonasa.cl — Front Integrado: frontintegrado.fonasa.cl
- **DART (Teleoftalmología)**: teleoftalmologia.minsal.cl
- **Prescripción Receta MINSAL**: prescripcion-receta.minsal.cl
- **Epivigila**: epivigila.minsal.cl
- **Imed (Licencias Médicas)**: licencia.cl
- **Chile Crece Contigo**: srdm.crececontigo.gob.cl

### Soporte y Administración
- **Portal de Herramientas**: cesfamlu.github.io/links
- **Mesa de Ayuda TI**: cesfamtic.com/soporte/
- **BloqueApp**: cesfamtic.com/BloqueAPP/login.html
- **BOT SOME**: bot.desamlu.cl/login.php
- **Intranet SMC**: intranetlaunion.smc.cl/login.aspx
- **Datos de Derivación**: cesfamtic.com/derivaciones/
- **TEAMS CESFAM**: cesfamtic.com/cesfamteams
- **DESAMLU**: desamlu.cl
- **Correo institucional**: informacionescesfamlaunion@gmail.cl
- **Correo SOME**: some@munilaunion.cl

## DIRECTORIO TELEFÓNICO

### CESFAM P. Hurtado (Prefijo directo: 64-2346XXX)
- Dirección: Anexo 532 / 642346132 | Secretaria: 530 | OIRS: 550
- Farmacia: 528 | Vacunatorio: 537 | Toma de Muestra: 531
- SOME Central: 529 | SOME Sector Azul: 546 | SOME Sector Verde: 522 | SOME Sector Amarillo: 542
- Sala IRA: 541 | Sala ERA: 551 | Estadística: 545 | GES: 552
- Soporte y Comunicaciones (TI): 525 / 642346125

### Consultorio La Unión (Prefijo: 472XXX)
- Secretaria: 310 | SOME: 313 | Farmacia: 314 | Box Médico: 316

### DESAM
- Jefe Departamento: 752 / 207752 | Secretaria: 334 | Finanzas: 753

### SAR y CECOSF
- SAR: 502 / 325002 | CECOSF Los Lagos: 211 / 472211 | CECOSF Irene Daiber: 307 / 472307

## DERIVACIONES DETALLADAS

### Hospital Base Valdivia (RAS IC, No GES salvo indicación)
- **Broncopulmonar adulto/infantil**: RAS IC → HBV | No GES (GES si Asma bronquial ≥15 años)
- **Cardiología adulto**: HD (Hospital Digital / telemedicina) → HBV | No GES
- **Cirugía digestiva/oncológica/vascular/maxilofacial**: RAS IC → HBV | No GES
- **Endocrinología**: RAS IC → HBV | No GES
- **Fisiatría**: RAS IC → HBV | No GES
- **Gastroenterología**: RAS IC → HBV | No GES (GES si cáncer colorrectal: SIC papel)
- **Geriatría**: HD (Hospital Digital) → HBV | No GES
- **Hematología**: RAS IC → HBV | No GES
- **Nefrología (no GES)**: RAS IC → HBV | No GES
- **Nefrología ERC (GES)**: HD + notificación GES + SIC papel "Prevención Secundaria ERC"
- **Neurocirugía**: RAS IC → HBV | No GES
- **Neurología**: RAS IC → HBV según Guía APS/UNACESS | No GES
- **Oncología**: RAS IC → HBV | No GES (GES si cáncer cervicouterino/mama/gástrico: SIC papel)
- **Otorrino**: RAS IC → HBV | No GES
- **Patología mamaria**: RAS IC → HBV | No GES
- **Psiquiatría**: RAS IC → HBV | No GES (GES si depresión refractaria: SIC papel)
- **Reumatología**: HD (Hospital Digital) → HBV | (GES Artritis Reumatoide: SIC papel)
- **Traumatología infantil (0-14 años)**: RAS IC → HBV | No GES

### Hospital La Unión (RAS IC, No GES salvo indicación)
- **Cirugía adulto/infantil**: RAS IC → H. La Unión | No GES
- **Ginecología adulto (≥15 años)**: RAS IC → H. La Unión | No GES
- **Medicina Interna adulto**: RAS IC → H. La Unión | No GES
- **Pediatría secundaria**: RAS IC → H. La Unión | No GES
- **Traumatología adulto (≥15 años)**: RAS IC → H. La Unión | No GES
- **Urología adulto**: RAS IC → H. La Unión | No GES
- **Cardiología adulto (alternativa)**: RAS IC → H. La Unión | No GES
- **Colelitiasis (35-50 años) GES**: SIC papel → H. La Unión

### Hospital Digital / Telemedicina
- **Dermatología**: HD → Hospital Digital | No GES
- **Diabetes Mellitus tipo 2 mal compensada**: HD → Hospital Digital | No GES
- **Geriatría**: HD → Hospital Digital | No GES
- **Patología Oral / TTM**: HD → Hospital Digital | No GES
- **Reumatología (telemedicina)**: HD → Hospital Digital | No GES
- **Hipertensión descompensada**: HD → Hospital Digital | No GES
- **Neurología (cefalea/epilepsia)**: HD → Hospital Digital | No GES
- **Cardiología (telemedicina)**: HD → Hospital Digital | No GES

### Procedimientos CESFAM La Unión (RAS LEC)
- Cirugía Menor, Biopsia piel/mucosa, Onicectomía, Extirpación lesiones benignas
- Mamografía, Ecotomografía mamaria, Fondo de ojo DM GES

### Procedimientos Hospital La Unión (OA)
- Eco abdominal/ginecológica/transvaginal (≥15 años), Endoscopía digestiva alta (≥15 años), Test de Esfuerzo

### Procedimientos Hospital Base Valdivia (OA)
- Eco abdominal (0-14 años), Eco partes blandas/renal/tiroidea, Endoscopía alta (0-14 años), Radiología, Colonoscopía

### Oftalmología
- Menores 15 años: JUNAEB vía papel
- 15-64 años vicio refracción: RAS IC → UAPO La Unión
- ≥65 años refracción o cataratas (GES): SIC papel → HBV
- DART Teleoftalmología: teleoftalmologia.minsal.cl

### Derivaciones especiales
- **Hipoacusia ≥65 años (GES)**: Lista Espera Oficina GES → H. Valdivia
- **Alzheimer/Demencias (GES 85)**: Formulario notificación → Oficina GES
- **Ayudas técnicas ≥65 años (GES)**: Notificación GES + receta

## EQUIPO TI Y CONTACTOS CLAVE
- **Andrés Fierro** (Apoyo Informático) — soporte hardware, equipos, periféricos
- **Mauricio Inzunza** (Técnico en Informática) — soporte sistemas, redes, software
- **Matías Muñoz** (Ingeniero en Informática) — soporte sistemas, desarrollo, infraestructura
- **Javier Vega Álvarez** — Jefe SOME (Ing. Informática). Primera persona ante dudas de RAS, interconsultas o SOME.
- **Wladimir Pinto Poblete** (Wladi) — Colaborador SOME.
- **Paula Peñaloza Corriales** — Directora CESFAM
- **Alexis Lespinasse Monsalves** — Jefe DESAM
- **Angélica Monserrat Bartch** — Enfermera Coordinadora Sector Blanco
- **Claudia Toledo** — Matrón, Jefa Sector Azul
- **Lesly Cifuentes** — Enfermera, Jefa Sector Verde
- **Andrea Herrera** — Nutricionista, Jefa Sector Amarillo
- **María Alejandra Guarda** — Enfermera, Coordinadora CECOSF Dr. Daiber
- **Aracely Ormachea** — Trabajadora Social, Coordinadora CECOSF Los Lagos

## DIRECTORIO GENERAL DE FUNCIONARIOS
Aburto Hilda: Auxiliar | Agoni Denisse: Nutricionista | Agüero Miguel: Auxiliar | Aichele Alejandra: Matrón | Alvarez Giovanna: TENS | Alvarez Edith: Psicóloga | Andler Alvaro: Administrativo | Andrade Katherine: Matrón | Aravena Sergio: Kinesiólogo | Araya Viviana: Técnico Odontología | Arias Gerardo: Nutricionista | Arias Patricia: Médico Cirujano | Arriagada Robin: Conductor | Arriagada Luis: Auxiliar | Arroyo Jorge: Administrativo | Arrue Yolanda: Auxiliar | Asencio Maria: TENS | Asenjo Fabiola: Médico Cirujano | Astudillo Carla: Cirujano Dentista | Aucal Alicia: Educadora Diferencial | Azocar Luis: TENS | Azocar Walter: Psicólogo | Baez Vanessa: TENS | Bahamonde Giselle: Matrón | Barichivich Flor: Administrativo | Barrera Marita: TENS | Barria Daniela: TENS | Barria Pablo: Tecnólogo Médico | Barria Andrea: TENS | Barria Claudia: Auxiliar | Barria Tereza: TENS | Barrientos Francisca: TENS | Barrientos Marjorie: Enfermera | Bartch Angélica Monserrat: Enfermera Coordinadora Sector Blanco | Bastidas Felipe: Enfermero | Bastidas Denisse: Administrativo | Bertin Constanza: Enfermera | Briones Carla: Técnico Administrativo | Burgos Esteban: Auxiliar | Burgos Pamela: TENS | Burgos Gerardo: Kinesiólogo | Burgos Jacqueline: Técnico Odontología | Burgos Felipe: Kinesiólogo | Burgos Javier: Técnico Administrativo | Burgos Sara: Técnico de Salud | Burgos Cristian: Médico Cirujano | Burgos Ana: Técnico Odontología | Burgos Joan: Técnico Imagenología | Cabezas Marion: Administrativo | Calderon Genesis: Cirujano Dentista | Calisto Maria: TENS | Caman Marjorie: TENS | Carcaman Ana: TENS | Carcamo Patricia: TENS | Cardenas Tamara: Administrativo | Cardenas Werner: Médico Cirujano | Cardenas Susana: TENS | Cardenas Lilian: Ingeniero Comercial | Cardenas Susan: Otros Técnicos | Cardenas Maritza: TENS | Cardenas Pamela: TENS | Cares Gerson: TENS | Cares Jessica: Ingeniero en Administración | Carrasco Lucia: Enfermera | Carrasco Reinaldo: Auxiliar | Carrasco Disnarda: Administrativo | Carrasco Evelyn: Enfermera | Carrillo Isabel: Técnico Odontología | Casanova Eitel: Administrativo | Casanova Constanza: Nutricionista | Castillo Juan: Químico Farmacéutico | Castro Eda: Administrativo | Castro Maria: Asistente Social | Castro Dayana: Enfermera | Catrileo Alex: Otros Técnicos | Chacon Jocelyn: TENS | Chacon Waleska: TENS | Chacon Ester: Auxiliar | Chia Ligia: Médico Cirujano | Cifuentes Catalina: Técnico Imagenología | Cifuentes Marcela: Ing. Administración | Cifuentes Lesly: Enfermera Jefa Sector Verde | Colilef Francisco: Kinesiólogo | Colilef Mario: Médico Cirujano | Comigual Carmen: TENS | Concha Natalia: Matrón | Contreras Evelyn: Educadora Diferencial | Contreras Maria: Administrativo | Cordero Carlos: Psicólogo | Cordero Tomas: Técnico Administrativo | Corona Eduardo: Tecnólogo Médico | Cortes Francisca: Médico Cirujano | Del Rio Ana: Matrón | Del Rio Karla: Cirujano Dentista | Delgado Javier: Químico Farmacéutico | Delgado Claudia: Enfermera | Delgado Makarena: Prof. Ed. Física | Delgado Fabiola: Contador Auditor | Delgado Milena: Enfermera | Diaz Monica: Otros Técnicos | Diaz Valeria: Auxiliar | Diaz Cecilia: TENS | Diaz Erica: Terapeuta Ocupacional | Diaz Rosa: Técnico Administrativo | Diaz Alexandra: Médico Cirujano | Dorner Arlette: Técnico Administrativo | Elgueta Maria: Kinesiólogo | Espinoza Mirsia: Administrativo | Espinoza Jaqueline: TENS | Espinoza Susana: Auxiliar | Espinoza Javiera: Enfermera | Faundez Mercedes: TENS | Fernandez Pablo: Médico Cirujano | Fernandez Luis: Conductor | Fernandez Leonardo: TENS | Fernandez Ulises: TENS | Fernandez Eduardo: Psicólogo | Fierro Amado (Andrés): Apoyo Informático | Fierro Ignacio: Médico Cirujano | Figueroa Javier: Cirujano Dentista | Flores Mireya: Cirujano Dentista | Flores Marjorie: Enfermera | Foitzick Giselle: Fonoaudióloga | Fontanilla Ana: Técnico Administrativo | Fritz Ingrid: Enfermera | Fuchslocher Tomas: Cirujano Dentista | Fuentealba Karla: Técnico Podología | Furniel Juan (padre): Conductor | Furniel Juan (hijo): Auxiliar | Gajardo Miguel: Técnico Electricidad | Gallardo Camila: Enfermera | Gallardo Claudio: Asistente Social | Garcia Mirtha: Enfermera | Garnica Alejandra: Técnico Administrativo | Gatica Rodrigo: Conductor | Gomez Mariluz: Kinesiólogo | Gonzalez Alison: Técnico Odontología | Guarda Joselyn: TENS | Guarda Daniela: Cirujano Dentista | Guarda Maria (Alejandra): Enfermera Coordinadora CECOSF Dr. Daiber | Habit Katherine: Asistente Social | Harbuch Andrea: Administrativo | Hernandez Oriana: TENS | Hernandez Evelyn: Matrón | Hernandez Maria: Nutricionista | Herrera Constanza: Enfermera | Herrera Andrea: Nutricionista Jefa Sector Amarillo | Hidalgo Victor: Conductor | Holguin Luis: Cirujano Dentista | Huaiquil Carola: Nutricionista | Huentrutripai Juan: Conductor | Huentrutripai Sebastian: Conductor | Huenulef Manuel: Auxiliar | Igor Adelaida: TENS | Inzunza Luis Mauricio: Técnico en Informática | Inzunza Paulina: Terapeuta Ocupacional | Jaime Ana: Cirujano Dentista | Jaramillo Joaquin: Mantención | Jimenez Jocelin: Auxiliar | Kauffmann Greischell: Asistente Social | Kauffmann Marjorie: Técnico Podología | Knabe Julio: Cirujano Dentista | Lagos Valentina: Médico Cirujano | Lara Camila: Nutricionista | Lara Carla: TENS | Lastra Jose: Médico Cirujano | Leiva Cristian: Enfermero | Leiva Carolina: TENS | Lemonao Ninoska: Matrón | Lespinasse Alexis: Ingeniero Comercial, Jefe DESAM | Loncomilla Veronica: Asistente Social | Lopetegui Iris: Técnico Paramédico | Loyola Eduard: Conductor | Mancilla Daniella: Kinesiólogo | Mancilla Alicia: Técnico Odontología | Manriquez Karina: TENS | Manriquez Ximena: Ing. Administración Pública | Mansilla Esteban: TENS | Manzano Marco: TENS | Mardones Solange: Técnico Administrativo | Marquez David: Auxiliar | Martinez Maria: Técnico Odontología | Mascareña Pablo: Médico Cirujano | Matamala Camila: Kinesiólogo | Mautz Emilio: Auxiliar | Medina Judith: TENS | Medina Paola: Matrón | Melo Sergio: Auxiliar | Mena Alejandra: Técnico Odontología | Mendez Jocelyn: Enfermera | Mendez Nelson: Tecnólogo Médico | Meneses Gonzalo: Auxiliar | Meza Denisse: TENS | Meza Karen: TENS | Milanca Maria: Técnico Odontología | Milanca Gladys: Auxiliar | Millar Maria: TENS | Miranda Daniel: Ingeniero Administración | Molina Alvaro: Auxiliar | Molina Lucinda: Administrativo | Molinery Catalina: TENS | Montecinos Gabriel: Técnico Odontología | Montesinos Daniela: Administrativo | Mora Mauricio: Químico Farmacéutico | Mora Barbara: Médico Cirujano | Moreira Paulina: TENS | Moris Ceferino: Conductor | Mundaca Felipe: Auxiliar | Mundaca Pamela: Técnico Odontología | Muñoz Pilar: Asistente Social | Muñoz Matias: Ingeniero en Informática | Muñoz Veronica: Administrativo | Muñoz Ana: TENS | Nahuelpan Claudio: Auxiliar | Navarrete Daniela: Cirujano Dentista | Navarrete Romina: Asistente Social | Navarro Belen: Cirujano Dentista | Navarro Helbio: Técnico Administrativo | Navarro Angelica: Administrativo | Naveda John: Médico Cirujano | Neira Alicia: TENS | Neira Sergio: TENS | Obando Maria: Enfermera | Ojeda Monica: Auxiliar | Ojeda Boris: TENS | Ojeda Mabel: Enfermera | Ondrel Nelson: Administrativo | Ormachea Aracely: Trabajadora Social Coordinadora CECOSF Los Lagos | Palacios Sergio: TENS | Pangue Gloria: Técnico Administrativo | Paredes Mayra: Enfermera | Paredes Constanza: Técnico Imagenología | Paredes Marjorie: TENS | Peñaloza Paula: Enfermera, Directora CESFAM | Peralta Analia: TENS | Peralta Victor: Ing. Administración | Peralta Pablo: Conductor | Perez Veronica: TENS | Perez Catalina: Médico Cirujano | Peters Macarena: Matrón | Pinto Wladimir (Wladi): Colaborador SOME | Pitripan Luis: Conductor | Poblete Juan: TENS | Poblete Katherine: Administrador Público | Poffalt Graciela: Terapeuta Ocupacional | Porras Nery: Enfermera | Prieto Jovita: Administrativo | Puchi Jessica (N): Técnico Administrativo | Puchi Jessica (M): TENS | Quezada Teresa: Técnico Odontología | Quezada Rosa: TENS | Ramirez Pamela: Matrón | Reyes Ana: TENS | Reyes Mercedes: Auxiliar | Reyes Baleska: TENS | Reyes Sebastian: Administrativo | Reyes Carolina: TENS | Reyes Camila: TENS | Reyes Carmen: Químico Farmacéutico | Riquelme Ingrid: TENS | Risco Solange: Matrón | Rivas Patricio: Enfermero | Rivera Edith: Otros Técnicos | Rivera Victor: Contador Auditor | Rivera Carlos: Kinesiólogo | Rivera Romina: Asistente Social | Riveros Sergio: Médico Cirujano | Rocha Camila: TENS | Rodriguez Luis: Conductor | Roldan Javiera: Abogada | Roman Hector: Médico Cirujano | Rubio Ingrid: Asistente Social | Ruiz Cristian: Psicopedagogo | Saldivia Constanza: TENS | Salinas Susana: Técnico Administrativo | Sandoval Tamar: Administrativo | Sanzana Gloria: TENS | Silva Marlys: TENS | Silva Ernesto: Administrativo | Silva Nicolas: Administrativo | Silva Claudia: Asistente Social | Simpertigue Stefano: Médico Cirujano | Sobarzo Solange: Técnico Odontología | Sobarzo Luis: Auxiliar | Solis Cecilia: TENS | Solis Enid: Auxiliar | Solis Marcela: Auxiliar | Solis Berta: Técnico Administrativo | Soto Andrea: TENS | Soto Fabriciano: TENS | Soto Franco: TENS | Swart Nathalie: Nutricionista | Tadre Constanza: Técnico Administrativo | Taylor Mercedes: TENS | Toledo Claudia: Matrón Jefa Sector Azul | Toledo Carolina: Técnico Podología | Tranamil Juan: TENS | Ulloa Erwin: Auxiliar | Uribe Melany: Cirujano Dentista | Uribe Karen: Contador Auditor | Uribe Maritza: Administrativo | Uribe Cecilia: Administrativo | Uribe Pablo: Ingeniero Constructor | Valerio Yoselyn: Técnico Odontología | Vallejos Constanza: Cirujano Dentista | Vargas Andrea: Administrativo | Vargas Herbert: Conductor | Vargas Marcia: Asistente Social | Vasquez Natalia: TENS | Vasquez Vanessa: Terapeuta Ocupacional | Vega Javier: Ingeniero en Informática, Jefe SOME | Vegas Victor: Conductor | Velasquez Katherine (B): Técnico Odontología | Velasquez Mariana: Técnico Administrativo | Velasquez Katherine (A): Kinesiólogo | Vera Alejandro: Cirujano Dentista | Vera Paula: Kinesiólogo | Vidal Nicole: Matrón | Zumelzu Armin: Psicólogo

## PROTOCOLOS TI
- **Red/Internet**: cable → reiniciar → IP directa RAS → reportar si >5min
- **Impresoras**: encendida → papel/tóner → predeterminada → apagar/encender → reportar con modelo
- **Contraseñas**: Windows/RAS=TI, SIGGES="Recuperar contraseña", nunca compartir
- **PC Lento**: cerrar apps → reiniciar → Win+R→%temp% → reportar si recurrente

## RESTRICCIONES
- No accedes a datos de pacientes ni sistemas en tiempo real
- No cambias contraseñas remotamente
- No inventes URLs, IPs, anexos ni información que no esté aquí`;

    // ── Persistencia de sesión ───────────────────────────────────
    let conversationHistory = [];

    function saveSession() {
        try {
            localStorage.setItem(SESSION_KEY, JSON.stringify({
                history: conversationHistory.slice(-16),
                ts: Date.now()
            }));
        } catch {}
    }

    function loadSession() {
        try {
            const raw = localStorage.getItem(SESSION_KEY);
            if (!raw) return null;
            const { history, ts } = JSON.parse(raw);
            if (Date.now() - ts > SESSION_TTL) { localStorage.removeItem(SESSION_KEY); return null; }
            return Array.isArray(history) && history.length >= 2 ? history : null;
        } catch { return null; }
    }

    // ── Inyectar CSS ─────────────────────────────────────────────
    const CSS = `
    #isikha-fab {
        position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 9000;
        width: 96px; height: 96px; border-radius: 50%; border: none; cursor: pointer;
        background: linear-gradient(135deg, #0066cc, #7c3aed);
        color: #fff; display: flex; align-items: center; justify-content: center;
        box-shadow: 0 4px 24px rgba(0,102,204,.5); transition: transform .2s, box-shadow .2s;
    }
    #isikha-fab:hover { transform: scale(1.08); box-shadow: 0 6px 32px rgba(0,102,204,.6); }
    #isikha-fab svg { width: 38px; height: 38px; }
    #isikha-fab .fab-badge {
        position: absolute; top: 6px; right: 6px; width: 10px; height: 10px;
        background: #10b981; border-radius: 50%; border: 2px solid #fff;
    }
    #isikha-fab .fab-badge.hidden { display: none; }

    #isikha-window {
        position: fixed; bottom: 5.5rem; right: 1.5rem; z-index: 9001;
        width: 340px; max-height: 520px; border-radius: 16px; overflow: hidden;
        display: flex; flex-direction: column;
        background: var(--color-surface, #fff);
        border: 1px solid var(--color-border, #e2e8f0);
        box-shadow: 0 8px 40px rgba(0,0,0,.18);
        transform: scale(.92) translateY(12px); opacity: 0;
        pointer-events: none; transition: transform .22s ease, opacity .22s ease;
    }
    #isikha-window.open {
        transform: scale(1) translateY(0); opacity: 1; pointer-events: all;
    }
    @media (max-width: 480px) {
        #isikha-window { width: calc(100vw - 2rem); right: 1rem; bottom: 5rem; }
    }

    .isikha-header {
        background: linear-gradient(135deg, #003d82, #6d28d9);
        color: #fff; padding: .75rem 1rem;
        display: flex; align-items: center; gap: .6rem;
    }
    .isikha-avatar {
        width: 36px; height: 36px; border-radius: 50%;
        background: rgba(255,255,255,.2);
        display: flex; align-items: center; justify-content: center;
        font-size: 1rem; overflow: hidden; flex-shrink: 0;
    }
    .isikha-header-info { flex: 1; }
    .isikha-header-name { font-weight: 700; font-size: .9rem; }
    .isikha-header-status { font-size: .72rem; opacity: .85; }
    .isikha-close {
        background: none; border: none; color: #fff; cursor: pointer;
        opacity: .7; padding: .2rem; border-radius: 6px; transition: opacity .15s;
    }
    .isikha-close:hover { opacity: 1; }
    .isikha-close svg { width: 18px; height: 18px; }

    .isikha-msgs {
        flex: 1; overflow-y: auto; padding: .75rem;
        display: flex; flex-direction: column; gap: .5rem;
        background: var(--color-bg, #f8fafc);
    }
    .isikha-msg {
        max-width: 85%; padding: .55rem .8rem; border-radius: 12px;
        font-size: .82rem; line-height: 1.45;
        animation: msgIn .18s ease;
    }
    @keyframes msgIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
    .isikha-msg.bot {
        background: var(--color-surface, #fff);
        border: 1px solid var(--color-border, #e2e8f0);
        color: var(--color-text, #1e293b);
        border-bottom-left-radius: 4px; align-self: flex-start;
    }
    .isikha-msg.user {
        background: linear-gradient(135deg, #0066cc, #7c3aed);
        color: #fff; border-bottom-right-radius: 4px; align-self: flex-end;
    }
    .isikha-typing {
        display: flex; gap: 4px; padding: .5rem .75rem;
        background: var(--color-surface, #fff);
        border: 1px solid var(--color-border, #e2e8f0);
        border-radius: 12px; border-bottom-left-radius: 4px;
        align-self: flex-start; width: fit-content;
    }
    .isikha-typing span {
        width: 6px; height: 6px; border-radius: 50%;
        background: #94a3b8; animation: typing .9s infinite;
    }
    .isikha-typing span:nth-child(2) { animation-delay: .15s; }
    .isikha-typing span:nth-child(3) { animation-delay: .3s; }
    @keyframes typing { 0%,60%,100% { transform: none; opacity: .4; } 30% { transform: translateY(-5px); opacity: 1; } }

    .isikha-quick-replies {
        display: flex; flex-wrap: wrap; gap: .35rem;
        padding: .5rem .75rem 0;
        background: var(--color-bg, #f8fafc);
    }
    .isikha-qr-btn {
        padding: .28rem .7rem; border-radius: 20px; font-size: .72rem; cursor: pointer;
        background: var(--color-surface, #fff);
        border: 1px solid var(--color-border, #e2e8f0);
        color: #0066cc; font-weight: 500; transition: all .15s;
        white-space: nowrap;
    }
    .isikha-qr-btn:hover { background: #0066cc; color: #fff; border-color: #0066cc; }

    .isikha-input-area {
        display: flex; gap: .4rem; padding: .6rem .75rem;
        background: var(--color-surface, #fff);
        border-top: 1px solid var(--color-border, #e2e8f0);
    }
    .isikha-input {
        flex: 1; padding: .45rem .7rem; border-radius: 20px; font-size: .82rem;
        border: 1px solid var(--color-border, #e2e8f0);
        background: var(--color-bg, #f8fafc);
        color: var(--color-text, #1e293b); outline: none;
        transition: border-color .15s;
    }
    .isikha-input:focus { border-color: #0066cc; }
    .isikha-send {
        width: 34px; height: 34px; border-radius: 50%; border: none; cursor: pointer;
        background: linear-gradient(135deg, #0066cc, #7c3aed); color: #fff;
        display: flex; align-items: center; justify-content: center;
        transition: transform .15s; flex-shrink: 0;
    }
    .isikha-send:hover { transform: scale(1.1); }
    .isikha-send svg { width: 16px; height: 16px; }

    .isikha-action-btns {
        display: flex; gap: .3rem; flex-wrap: wrap; margin-top: .4rem;
    }
    .isikha-action-btn {
        padding: .2rem .55rem; border-radius: 20px; font-size: .68rem;
        background: #e6f2ff; color: #0066cc;
        text-decoration: none; border: 1px solid #c0d9f5;
        font-weight: 500; transition: all .15s; white-space: nowrap;
    }
    .isikha-action-btn:hover { background: #0066cc; color: #fff; }

    [data-theme="dark"] #isikha-window {
        background: #1e293b; border-color: #334155;
    }
    [data-theme="dark"] .isikha-msgs { background: #0f172a; }
    [data-theme="dark"] .isikha-msg.bot {
        background: #1e293b; border-color: #334155; color: #e2e8f0;
    }
    [data-theme="dark"] .isikha-input-area { background: #1e293b; border-color: #334155; }
    [data-theme="dark"] .isikha-input { background: #0f172a; color: #e2e8f0; border-color: #334155; }
    [data-theme="dark"] .isikha-quick-replies { background: #0f172a; }
    [data-theme="dark"] .isikha-qr-btn { background: #1e293b; border-color: #334155; color: #60a5fa; }
    [data-theme="dark"] .isikha-typing { background: #1e293b; border-color: #334155; }
    [data-theme="dark"] .isikha-action-btn { background: #1e3a5f; color: #60a5fa; border-color: #2d5a9e; }
    `;

    const styleEl = document.createElement('style');
    styleEl.textContent = CSS;
    document.head.appendChild(styleEl);

    // ── Inyectar HTML ────────────────────────────────────────────
    const HTML = `
    <button id="isikha-fab" aria-label="Abrir Isikha, asistente IA">
        <img src="img/isi.png" alt="Isikha"
             style="width:88px;height:88px;border-radius:50%;object-fit:cover;"
             onerror="this.style.display='none';this.nextElementSibling.style.display='block'">
        <svg style="display:none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
        </svg>
        <span class="fab-badge" id="isikha-badge"></span>
    </button>

    <div id="isikha-window" role="dialog" aria-modal="true" aria-label="Isikha, asistente TI">
        <div class="isikha-header">
            <div class="isikha-avatar">
            <img src="img/isi.png" alt="Isikha"
                 style="width:32px;height:32px;border-radius:50%;object-fit:cover;"
                 onerror="this.style.display='none'">
        </div>
            <div class="isikha-header-info">
                <div class="isikha-header-name">Isikha · Asistente TI</div>
                <div class="isikha-header-status">● En línea</div>
            </div>
            <button class="isikha-close" id="isikha-close" aria-label="Cerrar">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
        </div>
        <div class="isikha-msgs" id="isikha-msgs"></div>
        <div class="isikha-quick-replies" id="isikha-qr"></div>
        <div class="isikha-input-area">
            <input class="isikha-input" id="isikha-input" type="text"
                   placeholder="Escribe tu consulta..." autocomplete="off" maxlength="500">
            <button class="isikha-send" id="isikha-send" aria-label="Enviar">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                </svg>
            </button>
        </div>
    </div>`;

    const wrapper = document.createElement('div');
    wrapper.innerHTML = HTML;
    document.body.appendChild(wrapper);

    // ── Referencias DOM ──────────────────────────────────────────
    const fab       = document.getElementById('isikha-fab');
    const win       = document.getElementById('isikha-window');
    const msgs      = document.getElementById('isikha-msgs');
    const qr        = document.getElementById('isikha-qr');
    const input     = document.getElementById('isikha-input');
    const sendBtn   = document.getElementById('isikha-send');
    const closeBtn  = document.getElementById('isikha-close');
    const badge     = document.getElementById('isikha-badge');

    let isOpen = false;
    let firstOpen = true;

    // ── Helpers ──────────────────────────────────────────────────
    function sanitize(str) {
        const d = document.createElement('div');
        d.textContent = str;
        return d.innerHTML;
    }

    function renderText(text) {
        return sanitize(text)
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');
    }

    function injectLinks(el, text) {
        const actions = [];
        const t = text.toLowerCase();
        if (/rasvaldivia\.cl|10\.8\.102\./.test(t))
            actions.push({ label: '🌐 Abrir RAS', url: 'http://rasvaldivia.cl' });
        if (/interconsulta\.minsal\.cl|hospital digital/.test(t))
            actions.push({ label: '🏥 Hospital Digital', url: 'https://interconsulta.minsal.cl' });
        if (/sigges\.cl/.test(t))
            actions.push({ label: '📋 SIGGES', url: 'https://nuevo.sigges.cl/#/login' });
        if (/bot\.desamlu\.cl/.test(t))
            actions.push({ label: '🤖 BOT SOME', url: 'https://bot.desamlu.cl/login.php' });
        if (/cesfamtic\.com\/soporte|mesa de ayuda/i.test(t))
            actions.push({ label: '🛠️ Soporte TI', url: 'https://cesfamtic.com/soporte/' });
        if (actions.length === 0) return;
        const wrap = document.createElement('div');
        wrap.className = 'isikha-action-btns';
        actions.forEach(({ label, url }) => {
            const a = document.createElement('a');
            a.href = url; a.target = '_blank'; a.rel = 'noopener';
            a.textContent = label; a.className = 'isikha-action-btn';
            wrap.appendChild(a);
        });
        el.appendChild(wrap);
    }

    function addMsg(text, sender, typewriter = false) {
        const el = document.createElement('div');
        el.className = `isikha-msg ${sender}`;

        if (sender === 'bot' && typewriter && text.length > 60) {
            el.innerHTML = '';
            msgs.appendChild(el);
            msgs.scrollTop = msgs.scrollHeight;
            let i = 0;
            const speed = Math.max(6, Math.min(18, 900 / text.length));
            const tick = setInterval(() => {
                i = Math.min(i + 4, text.length);
                el.innerHTML = renderText(text.slice(0, i));
                msgs.scrollTop = msgs.scrollHeight;
                if (i >= text.length) { clearInterval(tick); injectLinks(el, text); }
            }, speed);
            return el;
        }

        el.innerHTML = renderText(text);
        msgs.appendChild(el);
        msgs.scrollTop = msgs.scrollHeight;
        if (sender === 'bot') injectLinks(el, text);
        return el;
    }

    function showTyping() {
        removeTyping();
        const el = document.createElement('div');
        el.className = 'isikha-typing'; el.id = 'isikha-typing';
        el.innerHTML = '<span></span><span></span><span></span>';
        msgs.appendChild(el);
        msgs.scrollTop = msgs.scrollHeight;
    }

    function removeTyping() {
        document.getElementById('isikha-typing')?.remove();
    }

    function setQR(replies) {
        qr.innerHTML = '';
        (replies || []).forEach(text => {
            const btn = document.createElement('button');
            btn.className = 'isikha-qr-btn';
            btn.textContent = text;
            btn.addEventListener('click', () => handleInput(text));
            qr.appendChild(btn);
        });
    }

    // ── IA ───────────────────────────────────────────────────────
    async function askAI(model = AI_MODEL) {
        const messages = [
            { role: 'system', content: SYSTEM_PROMPT },
            ...conversationHistory.slice(-12)
        ];
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ model, messages, temperature: 0.5, max_tokens: 600 })
        });
        if (!res.ok) {
            if (model === AI_MODEL) return askAI(AI_FALLBACK); // fallback automático
            throw new Error(`HTTP ${res.status}`);
        }
        const data = await res.json();
        return data.choices?.[0]?.message?.content || '';
    }

    async function streamAI(onChunk, onDone, onError, model = AI_MODEL) {
        const messages = [
            { role: 'system', content: SYSTEM_PROMPT },
            ...conversationHistory.slice(-12)
        ];
        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ model, messages, temperature: 0.5, max_tokens: 600, stream: true })
            });
            if (!res.ok) {
                if (model === AI_MODEL) { streamAI(onChunk, onDone, onError, AI_FALLBACK); return; }
                throw new Error(`HTTP ${res.status}`);
            }
            const reader = res.body.getReader();
            const dec = new TextDecoder();
            let full = '', buf = '';
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                buf += dec.decode(value, { stream: true });
                const lines = buf.split('\n');
                buf = lines.pop() || '';
                for (const line of lines) {
                    const t = line.trim();
                    if (!t.startsWith('data: ')) continue;
                    const d = t.slice(6);
                    if (d === '[DONE]') continue;
                    try {
                        const delta = JSON.parse(d).choices?.[0]?.delta?.content;
                        if (delta) { full += delta; onChunk(delta); }
                    } catch {}
                }
            }
            onDone(full);
        } catch (err) {
            if (model === AI_MODEL) { streamAI(onChunk, onDone, onError, AI_FALLBACK); return; }
            if (onError) onError(err);
        }
    }

    // ── Handler principal ────────────────────────────────────────
    function handleInput(text) {
        text = text.trim();
        if (!text) return;
        addMsg(text, 'user');
        input.value = '';
        qr.innerHTML = '';

        // Saludos cortos
        if (text.length <= 30 && /^(hola|buenas|hey|buen[oa]s?)[!.,\s]*$/i.test(text)) {
            showTyping();
            setTimeout(() => {
                removeTyping();
                addMsg('¡Hola! 👋 Soy **Isikha**, tu asistente del CESFAM. ¿En qué puedo ayudarte?', 'bot');
                setQR(['RAS', 'SIGGES', 'Derivaciones', 'Directorio', 'Soporte TI']);
            }, 500);
            return;
        }

        // Agradecimientos
        if (text.length <= 40 && /^(gracias|perfecto|genial|excelente|ok)[!.,\s]*$/i.test(text)) {
            showTyping();
            setTimeout(() => {
                removeTyping();
                addMsg('¡De nada! 😊 Si necesitas algo más, aquí estoy.', 'bot');
                setQR(['Otra consulta', 'Soporte TI']);
            }, 400);
            return;
        }

        // Nueva consulta
        if (/nueva\s*consulta/i.test(text)) {
            conversationHistory.length = 0;
            localStorage.removeItem(SESSION_KEY);
            addMsg('Perfecto, empecemos de nuevo. ¿En qué puedo ayudarte?', 'bot');
            setQR(['RAS', 'SIGGES', 'Derivaciones', 'Directorio', 'Soporte TI']);
            return;
        }

        // IA via streaming
        conversationHistory.push({ role: 'user', content: text });

        removeTyping();
        const msgEl = document.createElement('div');
        msgEl.className = 'isikha-msg bot';
        msgs.appendChild(msgEl);
        msgs.scrollTop = msgs.scrollHeight;

        let fullText = '';

        streamAI(
            (chunk) => {
                fullText += chunk;
                msgEl.innerHTML = renderText(fullText);
                msgs.scrollTop = msgs.scrollHeight;
            },
            (completed) => {
                if (!completed || !completed.trim()) {
                    msgEl.remove();
                    // fallback no-stream
                    showTyping();
                    askAI().then(response => {
                        removeTyping();
                        conversationHistory.push({ role: 'assistant', content: response });
                        addMsg(response, 'bot', true);
                        saveSession();
                        setQR(['Otra consulta', 'Soporte TI', 'Derivaciones']);
                    }).catch(() => {
                        removeTyping();
                        addMsg('No pude conectar con la IA. Intenta desde **cesfamtic.com/soporte/** o llama al equipo TI: Andrés, Mauricio o Matías.', 'bot');
                        setQR(['Soporte TI']);
                    });
                    return;
                }
                conversationHistory.push({ role: 'assistant', content: completed });
                injectLinks(msgEl, completed);
                saveSession();
                setQR(['Otra consulta', 'Soporte TI', 'Derivaciones']);
            },
            () => {
                msgEl.remove();
                addMsg('Sin conexión con la IA en este momento. Visita **cesfamtic.com/soporte/** para reportar un incidente.', 'bot');
                setQR(['Soporte TI']);
            }
        );
    }

    // ── Toggle ───────────────────────────────────────────────────
    fab.addEventListener('click', () => {
        isOpen = !isOpen;
        win.classList.toggle('open', isOpen);
        badge.classList.add('hidden');

        if (isOpen && firstOpen) {
            firstOpen = false;
            const saved = loadSession();
            setTimeout(() => {
                if (saved) {
                    conversationHistory.push(...saved);
                    const topics = saved.filter(m => m.role === 'user').slice(-2)
                        .map(m => m.content.slice(0, 50)).join(', ');
                    addMsg(`👋 Bienvenido de nuevo. Antes hablamos de: _"${topics}"_\n\n¿Continuamos o tienes una nueva consulta?`, 'bot');
                    setQR(['Continuar', 'Nueva consulta']);
                } else {
                    addMsg('¡Hola! 👋 Soy **Isikha**, tu asistente del CESFAM.\n\nPuedo ayudarte con sistemas, derivaciones y directorio. ¿Qué necesitas?', 'bot');
                    setQR(['RAS', 'SIGGES', 'Derivaciones', 'Directorio', 'Soporte TI']);
                }
            }, 350);
        }

        if (isOpen) input.focus();
    });

    closeBtn.addEventListener('click', () => {
        isOpen = false;
        win.classList.remove('open');
    });

    sendBtn.addEventListener('click', () => handleInput(input.value));
    input.addEventListener('keydown', e => {
        if (e.key === 'Enter') { e.preventDefault(); handleInput(input.value); }
    });

    // Badge al cargar (indica que hay novedad)
    setTimeout(() => { if (!isOpen) badge.classList.remove('hidden'); }, 2000);

})();
