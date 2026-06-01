'use strict';

/* ==============================================
   CESFAM La Unión — Portal de Herramientas Digitales
   Application Logic · v2.0 · Mayo 2026
   ============================================== */

// ── Utilities ──
const $ = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => [...p.querySelectorAll(s)];

// Escape HTML to prevent XSS when injecting dynamic data via innerHTML.
function escapeHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Normalize text for accent/case-insensitive search.
function normalize(str) {
  return String(str || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();
}

// ══════════════════════════════════════════════
//  SVG ICONS (Lucide-style, 24×24 viewBox)
// ══════════════════════════════════════════════
const ICONS = {
  // ─ Tool Icons ─
  clipboard:    '<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M9 12h6m-6 4h6"/>',
  shield:       '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  flask:        '<path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/>',
  fileSearch:   '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><circle cx="11.5" cy="14.5" r="2.5"/><path d="M13.3 16.3 15 18"/>',
  monitor:      '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8m-4-4v4"/><path d="M7 13l2.5-3L12 13l2.5-3L17 13"/>',
  landmark:     '<path d="M3 22h18M6 18v4M10 18v4M14 18v4M18 18v4M4 18h16M12 2l8 8H4z"/>',
  fileText:     '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>',
  eye:          '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
  shoppingBag:  '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
  packageIcon:  '<path d="m16.5 9.4-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.27 6.96 12 12.01l8.73-5.05M12 22.08V12"/>',
  heartPulse:   '<path d="M19.5 12.572 12 20l-7.5-7.428A5 5 0 0 1 12 6.006a5 5 0 0 1 7.5 6.572"/><path d="M5 12h2l2 3 4-6 2 3h2"/>',
  smile:        '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>',
  brain:        '<path d="M12 2C9 2 6.5 4 6 7c-1.5.5-3 2-3 4 0 1.5 1 3 2 3.5-.5 1.5 0 3 1 4 1.5 1.5 3 2 5 2h2c2 0 3.5-.5 5-2 1-1 1.5-2.5 1-4 1-.5 2-2 2-3.5 0-2-1.5-3.5-3-4-.5-3-3-5-6-5z"/><path d="M12 2v20"/>',
  activity:     '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
  pill:         '<path d="m10.5 1.5-8.03 8.03a5.68 5.68 0 0 0 8.03 8.03l8.03-8.03a5.68 5.68 0 0 0-8.03-8.03z"/><path d="m7.5 10.5 5-5"/>',
  scanIcon:     '<path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/><rect x="7" y="7" width="10" height="10" rx="1"/>',
  building2:    '<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4m-4 4h4m-4 4h4"/>',
  globe:        '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  send:         '<path d="m22 2-7 20-4-9-9-4Z"/><path d="m22 2-11 11"/>',
  bookOpen:     '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  mapFlag:      '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>',
  calendarX:    '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M10 14l4 4M14 14l-4 4"/>',
  messageBot:   '<path d="M12 2a2 2 0 0 1 2 2v1h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-4l-3 3-3-3H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3V4a2 2 0 0 1 2-2z"/><path d="M8 10h.01M12 10h.01M16 10h.01"/>',
  headphones:   '<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>',

  // ─ Nav Icons ─
  sparkles:     '<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>',
  phone:        '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>',
  lifeBuoy:     '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><path d="M4.93 4.93l4.24 4.24m5.66 5.66l4.24 4.24M4.93 19.07l4.24-4.24m5.66-5.66l4.24-4.24"/>',

  // ─ UI Icons ─
  search:       '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>',
  chevronDown:  '<polyline points="6 9 12 15 18 9"/>',
  externalLink: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"/>',
  arrowRight:   '<path d="M5 12h14M12 5l7 7-7 7"/>',
  alertTri:     '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4M12 17h.01"/>',
  x:            '<path d="M18 6 6 18M6 6l12 12"/>',
  sun:          '<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>',
  moon:         '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
  searchX:      '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35M13.5 8.5l-5 5M8.5 8.5l5 5"/>',
  facebook:     '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
  youtube:      '<path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>',
  instagram:    '<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>',
  wrench:       '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  mail:         '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  mapPin:       '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
};

function icon(name, size = 24) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ''}</svg>`;
}

// ══════════════════════════════════════════════
//  CATEGORY CONFIG
// ══════════════════════════════════════════════
const CATEGORIES = {
  clinico: { label: 'Clínico', tagClass: 'card-tag--clinico', iconClass: 'card-icon--clinico' },
  admin:   { label: 'CESFAM',  tagClass: 'card-tag--admin',   iconClass: 'card-icon--admin' },
  support: { label: 'Soporte', tagClass: 'card-tag--support', iconClass: 'card-icon--support' },
};

// ══════════════════════════════════════════════
//  TOOLS DATA MODEL
//  Loaded at runtime from data/tools.json (see loadTools()).
//  The inline array below is the fallback used when the fetch fails
//  (e.g. opened via file://) so the portal always renders.
// ══════════════════════════════════════════════
let TOOLS = [
  // ─── CLÍNICO (16) ───
  {
    id: 'ras', title: 'RAS', icon: 'clipboard',
    desc: 'Registro de Atenciones de Salud',
    category: 'clinico', badge: null, highlight: false,
    type: 'multi',
    links: [
      { label: 'Principal', url: 'https://www.rasvaldivia.cl' },
      { label: 'Contingencia', url: 'https://contingencia.rasvaldivia.cl/rasvaldivia/index.php' },
      { label: 'RAS IP 1', url: 'http://10.8.102.72' },
      { label: 'RAS IP 2', url: 'http://10.8.102.74' },
      { label: 'RAS IP 3', url: 'http://10.8.102.104' },
    ]
  },
  {
    id: 'sigges', title: 'SIGGES', icon: 'shield',
    desc: 'Gestión de Garantías en Salud',
    category: 'clinico', badge: null, highlight: false,
    type: 'multi',
    links: [
      { label: 'Nuevo SIGGES', url: 'https://nuevo.sigges.cl/#/login' },
      { label: 'SIGGES', url: 'https://www.sigges.cl' },
    ]
  },
  {
    id: 'core', title: 'CORE', icon: 'flask',
    desc: 'Gestión de exámenes médicos',
    category: 'clinico', badge: null, highlight: false,
    type: 'multi',
    links: [
      { label: 'CORE Principal', url: 'https://www.hbvaldivia.cl/core/' },
      { label: 'CORE IP', url: 'https://10.6.206.62/core' },
    ]
  },
  {
    id: 'visor', title: 'Visor de Exámenes', icon: 'fileSearch',
    desc: 'Resultados de laboratorio',
    category: 'clinico', badge: null, highlight: false,
    type: 'multi',
    links: [
      { label: 'Exámenes Principal', url: 'http://10.66.50.47/' },
      { label: 'Exámenes Contingencia', url: 'http://10.4.59.246:90/' },
    ]
  },
  {
    id: 'hospital-digital', title: 'Hospital Digital', icon: 'monitor',
    desc: 'Interconsultas y telemedicina',
    category: 'clinico', badge: null, highlight: false,
    type: 'single', url: 'https://interconsulta.minsal.cl/'
  },
  {
    id: 'fonasa', title: 'FONASA', icon: 'landmark',
    desc: 'Fondo Nacional de Salud',
    category: 'clinico', badge: null, highlight: false,
    type: 'multi',
    links: [
      { label: 'FONASA', url: 'https://fonasa.cl' },
      { label: 'Front Integrado', url: 'https://frontintegrado.fonasa.cl/FrontIntegradoLogin/#!/login' },
    ]
  },
  {
    id: 'imed', title: 'Imed', icon: 'fileText',
    desc: 'Licencias médicas electrónicas',
    category: 'clinico', badge: null, highlight: false,
    type: 'single', url: 'https://www.licencia.cl'
  },
  {
    id: 'dart', title: 'DART', icon: 'eye',
    desc: 'Teleoftalmología y retinopatía',
    category: 'clinico', badge: null, highlight: false,
    type: 'single', url: 'https://teleoftalmologia.minsal.cl/es/login'
  },
  {
    id: 'desam-compras', title: 'DESAM Compras', icon: 'shoppingBag',
    desc: 'Compras DESAM',
    category: 'clinico', badge: null, highlight: false,
    type: 'single', url: 'https://compras.desamlu.cl/login.php'
  },
  {
    id: 'desam-bodega', title: 'DESAM Bodega', icon: 'packageIcon',
    desc: 'Bodega CESFAM',
    category: 'clinico', badge: null, highlight: false,
    type: 'single', url: 'https://bodega.desamlu.cl/login.php'
  },
  {
    id: 'survih', title: 'SURVIH MINSAL', icon: 'heartPulse',
    desc: 'Sistema de registro único de VIH',
    category: 'clinico', badge: 'NUEVO', highlight: false,
    type: 'single', url: 'https://survih.minsal.cl/Login.aspx'
  },
  {
    id: 'chile-crece', title: 'Chile Crece Contigo', icon: 'smile',
    desc: 'Desarrollo infantil temprano',
    category: 'clinico', badge: null, highlight: false,
    type: 'single', url: 'https://srdm.crececontigo.gob.cl/login'
  },
  {
    id: 'centro-integral', title: 'Centro Integral', icon: 'brain',
    desc: 'Atención integral de salud mental',
    category: 'clinico', badge: null, highlight: false,
    type: 'single', url: 'https://tinyurl.com/centro-integral'
  },
  {
    id: 'epivigilia', title: 'Epivigilia', icon: 'activity',
    desc: 'Vigilancia epidemiológica MINSAL',
    category: 'clinico', badge: null, highlight: false,
    type: 'single', url: 'https://epivigila.minsal.cl/'
  },
  {
    id: 'prescripcion', title: 'Prescripción MINSAL', icon: 'pill',
    desc: 'Plataforma Prescripción de receta MINSAL',
    category: 'clinico', badge: 'NUEVO', highlight: false,
    type: 'single', url: 'https://prescripcion-receta.minsal.cl/auth/login'
  },
  {
    id: 'isis-view', title: 'Isis View', icon: 'scanIcon',
    desc: 'Visor de imágenes médicas y radiología',
    category: 'clinico', badge: null, highlight: false,
    type: 'single', url: 'http://10.6.67.166'
  },

  // ─── ADMIN / CESFAM (5) ───
  {
    id: 'desamlu', title: 'DESAMLU', icon: 'building2',
    desc: 'Plataforma Departamento de salud municipal',
    category: 'admin', badge: null, highlight: false,
    type: 'single', url: 'https://desamlu.cl/'
  },
  {
    id: 'intranet-smc', title: 'Intranet', icon: 'globe',
    desc: 'Red interna de comunicación institucional SMC',
    category: 'admin', badge: null, highlight: false,
    type: 'single', url: 'https://intranetlaunion.smc.cl/login.aspx'
  },
  {
    id: 'derivacion', title: 'Datos de Derivación', icon: 'send',
    desc: 'Datos útiles de derivación',
    category: 'admin', badge: 'NUEVO', highlight: false,
    type: 'single', url: 'https://cesfamtic.com/derivar/'
  },
  {
    id: 'biblioteca', title: 'Biblioteca CESFAM', icon: 'bookOpen',
    desc: 'Repositorio en Google Drive',
    category: 'admin', badge: 'NUEVO', highlight: false,
    type: 'single', url: 'https://drive.google.com/drive/folders/1bpBIxsCke_ICx_e3T2d7iy3wWngUABLl?usp=sharing'
  },
  {
    id: 'muni', title: 'Muni La Unión', icon: 'mapFlag',
    desc: 'Portal de información y trámites municipal',
    category: 'admin', badge: null, highlight: false,
    type: 'single', url: 'https://www.munilaunioninfo.com'
  },

  // ─── SOPORTE (3) ───
  {
    id: 'bloqueapp', title: 'BloqueApp', icon: 'calendarX',
    desc: 'Gestión para bloqueos de agenda',
    category: 'support', badge: 'NUEVO', highlight: true,
    type: 'single', url: 'https://bloqueapp-f3a22.web.app/'
  },
  {
    id: 'bot-some', title: 'BOT SOME', icon: 'messageBot',
    desc: 'Apoyo a agentes SOME',
    category: 'support', badge: 'NUEVO', highlight: false,
    type: 'single', url: 'https://bot.desamlu.cl/login.php'
  },
  {
    id: 'isatec', title: 'Isatec', icon: 'headphones',
    desc: 'Portal de clientes Isatec para soporte técnico',
    category: 'support', badge: null, highlight: false,
    type: 'single', url: 'https://clientes.isatec.cl'
  },
];

// ══════════════════════════════════════════════
//  STATE
// ══════════════════════════════════════════════
let activeFilter = 'all';
let searchQuery = '';
let searchTimeout = null;

// ══════════════════════════════════════════════
//  CLOCK
// ══════════════════════════════════════════════
function initClock() {
  const dateEl = $('#clock-date');
  const timeEl = $('#clock-time');
  if (!dateEl || !timeEl) return;

  function update() {
    const now = new Date();
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

    const day = days[now.getDay()];
    const d = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    dateEl.textContent = `${day} ${d} de ${month} ${year}`;

    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    timeEl.textContent = `${h}:${m}:${s}`;
  }

  update();
  let timer = setInterval(update, 1000);

  // Pause ticking when the tab is hidden to save CPU/battery.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearInterval(timer);
      timer = null;
    } else if (!timer) {
      update();
      timer = setInterval(update, 1000);
    }
  });
}

// ══════════════════════════════════════════════
//  THEME MANAGER
// ══════════════════════════════════════════════
function initTheme() {
  const toggle = $('#theme-toggle');
  if (!toggle) return;

  // Read saved preference or system preference
  const saved = localStorage.getItem('cesfam-theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  // Update toggle icon
  updateThemeIcon();

  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('cesfam-theme', next);
    updateThemeIcon();
  });

  // Listen for system changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('cesfam-theme')) {
      document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      updateThemeIcon();
    }
  });
}

function updateThemeIcon() {
  const thumb = $('.toggle-thumb');
  if (!thumb) return;
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  thumb.innerHTML = isDark ? icon('moon', 12) : icon('sun', 12);
}

// ══════════════════════════════════════════════
//  CARD RENDERING
// ══════════════════════════════════════════════
function renderCards() {
  const grid = $('#card-grid');
  if (!grid) return;

  grid.innerHTML = '';

  TOOLS.forEach((tool, index) => {
    const card = createCard(tool, index);
    grid.appendChild(card);
  });

  // Trigger stagger animations via Intersection Observer
  initScrollAnimations();
}

function createCard(tool, index) {
  const cat = CATEGORIES[tool.category];
  const el = document.createElement('article');
  el.className = `card${tool.highlight ? ' card--highlight' : ''}`;
  el.dataset.id = tool.id;
  el.dataset.category = tool.category;
  el.dataset.keywords = buildKeywords(tool);
  el.style.animationDelay = `${index * 50}ms`;

  let actionsHTML = '';

  if (tool.type === 'single') {
    actionsHTML = `
      <a href="${escapeHtml(tool.url)}" target="_blank" rel="noopener" class="card-link-btn">
        Acceder ${icon('externalLink', 14)}
      </a>`;
  } else {
    const count = tool.links.length;
    const subId = `sublinks-${escapeHtml(tool.id)}`;
    actionsHTML = `
      <button class="card-sublinks-toggle" data-target="${subId}"
              aria-expanded="false" aria-controls="${subId}">
        <span>Ver ${count} accesos</span>
        ${icon('chevronDown', 16)}
      </button>
      <div class="card-sublinks" id="${subId}" role="region">
        <div class="card-sublinks-list">
          ${tool.links.map(l => `
            <a href="${escapeHtml(l.url)}" target="_blank" rel="noopener" class="card-sublink">
              <span>${escapeHtml(l.label)}</span>
              ${icon('arrowRight', 14)}
            </a>
          `).join('')}
        </div>
      </div>`;
  }

  el.innerHTML = `
    <div class="card-header">
      <div class="card-icon ${cat.iconClass}">
        ${icon(tool.icon, 20)}
      </div>
      <div class="card-info">
        <div class="card-title-row">
          <h3 class="card-title">${escapeHtml(tool.title)}</h3>
          ${tool.badge ? `<span class="card-badge">${escapeHtml(tool.badge)}</span>` : ''}
        </div>
        <p class="card-desc">${escapeHtml(tool.desc)}</p>
        <span class="card-tag ${cat.tagClass}">${escapeHtml(cat.label)}</span>
      </div>
    </div>
    <div class="card-actions">
      ${actionsHTML}
    </div>
  `;

  // Attach sub-links toggle handler
  const toggleBtn = el.querySelector('.card-sublinks-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const targetId = toggleBtn.dataset.target;
      const sublinks = $(`#${targetId}`);
      const isExpanded = toggleBtn.classList.contains('expanded');

      toggleBtn.classList.toggle('expanded');
      sublinks.classList.toggle('expanded');
      toggleBtn.setAttribute('aria-expanded', !isExpanded);
    });
  }

  return el;
}

function buildKeywords(tool) {
  const parts = [tool.title, tool.desc, tool.id, tool.category];
  if (tool.type === 'multi') {
    tool.links.forEach(l => parts.push(l.label));
  }
  return normalize(parts.join(' '));
}

// Token-based matching: every token in the query must appear somewhere in keywords.
function matchesQuery(keywords, query) {
  if (!query) return true;
  const tokens = query.split(/\s+/).filter(Boolean);
  return tokens.every(t => keywords.includes(t));
}

// ══════════════════════════════════════════════
//  SEARCH ENGINE
// ══════════════════════════════════════════════
function initSearch() {
  const input = $('#search-input');
  const dropdown = $('#search-dropdown');
  if (!input || !dropdown) return;

  // Debounced search
  input.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      searchQuery = normalize(input.value);
      applyFilters();
      updateDropdown(searchQuery);
    }, 200);
  });

  // Close dropdown on click outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-bar')) {
      dropdown.classList.remove('active');
    }
  });

  // Close dropdown on Escape
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdown.classList.remove('active');
      input.blur();
    }
  });

  // Focus shows dropdown if there's a query
  input.addEventListener('focus', () => {
    if (searchQuery.length >= 2) {
      updateDropdown(searchQuery);
    }
  });

  // Global "/" shortcut to focus the search (ignored while typing in a field).
  document.addEventListener('keydown', (e) => {
    if (e.key !== '/' || e.ctrlKey || e.metaKey || e.altKey) return;
    const tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable) return;
    e.preventDefault();
    input.focus();
    input.select();
  });

  // First-load "attract" pulse — only once per browser.
  const container = input.closest('.header-search-container');
  if (container && !localStorage.getItem('cesfam-search-seen')) {
    container.classList.add('attract');
    setTimeout(() => container.classList.remove('attract'), 1800);
    localStorage.setItem('cesfam-search-seen', '1');
  }
}

function updateDropdown(query) {
  const dropdown = $('#search-dropdown');
  if (!dropdown) return;

  if (query.length < 2) {
    dropdown.classList.remove('active');
    dropdown.innerHTML = '';
    return;
  }

  const matches = TOOLS.filter(t => matchesQuery(buildKeywords(t), query)).slice(0, 8);

  if (matches.length === 0) {
    dropdown.classList.remove('active');
    dropdown.innerHTML = '';
    return;
  }

  dropdown.innerHTML = matches.map(t => {
    const cat = CATEGORIES[t.category];
    const highlightedTitle = highlightMatch(t.title, query);
    return `
      <div class="search-result" data-id="${escapeHtml(t.id)}">
        <div class="search-result-icon ${cat.iconClass}">
          ${icon(t.icon, 18)}
        </div>
        <div class="search-result-info">
          <div class="search-result-title">${highlightedTitle}</div>
          <div class="search-result-desc">${escapeHtml(t.desc)}</div>
        </div>
        <span class="search-result-tag ${cat.tagClass}">${escapeHtml(cat.label)}</span>
      </div>
    `;
  }).join('');

  dropdown.classList.add('active');

  // Click handlers for results
  $$('.search-result', dropdown).forEach(result => {
    result.addEventListener('click', () => {
      const cardId = result.dataset.id;
      scrollToCard(cardId);
      dropdown.classList.remove('active');
    });
  });
}

function highlightMatch(text, query) {
  const safe = escapeHtml(text);
  if (!query) return safe;
  // Use the first token, normalize-aware: match the original text by case/accent-insensitive position.
  const token = query.split(/\s+/).filter(Boolean)[0];
  if (!token) return safe;
  const normText = normalize(text);
  const idx = normText.indexOf(token);
  if (idx < 0) return safe;
  // Map normalized index back to original (NFD strips marks but preserves base char positions for our latin alphabet).
  const before = escapeHtml(text.slice(0, idx));
  const match  = escapeHtml(text.slice(idx, idx + token.length));
  const after  = escapeHtml(text.slice(idx + token.length));
  return `${before}<mark>${match}</mark>${after}`;
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function scrollToCard(cardId) {
  const card = $(`.card[data-id="${cardId}"]`);
  if (!card) return;

  // Show card if hidden by filter
  card.classList.remove('hidden-filter');

  card.scrollIntoView({ behavior: 'smooth', block: 'center' });

  // Highlight briefly
  card.classList.add('search-highlight');
  setTimeout(() => card.classList.remove('search-highlight'), 2000);
}

// ══════════════════════════════════════════════
//  CATEGORY FILTERS
// ══════════════════════════════════════════════
function initFilters() {
  const pills = $$('.filter-pill');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      // Update active state
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      activeFilter = pill.dataset.filter;
      applyFilters();
    });
  });
}

function applyFilters() {
  const cards = $$('.card');
  let visibleCount = 0;

  cards.forEach(card => {
    const matchesCategory = activeFilter === 'all' || card.dataset.category === activeFilter;
    const matchesSearch = matchesQuery(card.dataset.keywords, searchQuery);
    const visible = matchesCategory && matchesSearch;

    card.classList.toggle('hidden-filter', !visible);
    if (visible) visibleCount++;
  });

  // Show/hide no-results message
  const noResults = $('#no-results');
  if (noResults) {
    noResults.classList.toggle('visible', visibleCount === 0);
  }
}

// ══════════════════════════════════════════════
//  CONTINGENCY BANNER
// ══════════════════════════════════════════════
function initBanner() {
  const banner = $('#contingency-banner');
  const closeBtn = $('#banner-close');
  if (!banner || !closeBtn) return;

  // Check if already dismissed this session
  if (sessionStorage.getItem('cesfam-banner-dismissed')) {
    banner.classList.add('hidden');
    return;
  }

  closeBtn.addEventListener('click', () => {
    banner.classList.add('hidden');
    sessionStorage.setItem('cesfam-banner-dismissed', 'true');
  });
}

// ══════════════════════════════════════════════
//  SCROLL ANIMATIONS (Intersection Observer)
// ══════════════════════════════════════════════
function initScrollAnimations() {
  // Check for reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const cards = $$('.card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  cards.forEach(card => observer.observe(card));
}

// ══════════════════════════════════════════════
//  INITIALIZATION
// ══════════════════════════════════════════════
async function loadTools() {
  try {
    const res = await fetch('data/tools.json', { cache: 'no-cache' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (Array.isArray(data) && data.length) TOOLS = data;
  } catch (err) {
    console.warn('[portal] No se pudo cargar data/tools.json, usando fallback inline.', err);
  }
}

// ══════════════════════════════════════════════
//  COMMAND PALETTE (Ctrl+K / Cmd+K)
// ══════════════════════════════════════════════
const cmdk = {
  el: null, input: null, list: null,
  items: [],   // flat list of {tool, link?} entries currently rendered
  selected: 0,

  open() {
    if (!this.el) return;
    this.el.hidden = false;
    this.input.value = '';
    this.render('');
    setTimeout(() => this.input.focus(), 0);
    document.body.style.overflow = 'hidden';
  },

  close() {
    if (!this.el) return;
    this.el.hidden = true;
    document.body.style.overflow = '';
  },

  toggle() { this.el.hidden ? this.open() : this.close(); },

  render(query) {
    const q = normalize(query);
    const matched = q
      ? TOOLS.filter(t => matchesQuery(buildKeywords(t), q))
      : TOOLS.slice();

    // Flatten: each tool becomes one entry; multi-link tools expand into sublinks too.
    const entries = [];
    matched.forEach(t => {
      if (t.type === 'single') {
        entries.push({ tool: t, url: t.url, label: t.title, sub: t.desc });
      } else {
        entries.push({ tool: t, url: t.links[0].url, label: t.title, sub: t.desc, group: true });
        t.links.forEach(l => {
          entries.push({ tool: t, url: l.url, label: `${t.title} · ${l.label}`, sub: l.url, isSubLink: true });
        });
      }
    });

    this.items = entries;
    this.selected = 0;

    if (!entries.length) {
      this.list.innerHTML = `<div class="cmdk-empty">Sin resultados para "${escapeHtml(query)}"</div>`;
      return;
    }

    // Group by category for non-query view, flat list when filtering.
    let html = '';
    if (!q) {
      const groups = { clinico: [], admin: [], support: [] };
      entries.forEach((e, i) => { if (!e.isSubLink) groups[e.tool.category].push({ e, i }); });
      Object.entries(groups).forEach(([cat, list]) => {
        if (!list.length) return;
        html += `<div class="cmdk-group-label">${escapeHtml(CATEGORIES[cat].label)}</div>`;
        list.forEach(({ e, i }) => { html += this.itemHTML(e, i, q); });
      });
    } else {
      entries.forEach((e, i) => { html += this.itemHTML(e, i, q); });
    }

    this.list.innerHTML = html;
    this.highlight();

    // Wire clicks
    $$('.cmdk-item', this.list).forEach(el => {
      el.addEventListener('mouseenter', () => {
        this.selected = Number(el.dataset.idx);
        this.highlight();
      });
      el.addEventListener('click', () => this.openSelected());
    });
  },

  itemHTML(e, idx, q) {
    const cat = CATEGORIES[e.tool.category];
    const title = q ? highlightMatch(e.label, q) : escapeHtml(e.label);
    return `
      <div class="cmdk-item" role="option" data-idx="${idx}" id="cmdk-item-${idx}">
        <div class="cmdk-item-icon ${cat.iconClass}">${icon(e.tool.icon, 16)}</div>
        <div class="cmdk-item-body">
          <div class="cmdk-item-title">${title}</div>
          <div class="cmdk-item-desc">${escapeHtml(e.sub || '')}</div>
        </div>
        <span class="cmdk-item-tag ${cat.tagClass}">${escapeHtml(cat.label)}</span>
      </div>`;
  },

  highlight() {
    const els = $$('.cmdk-item', this.list);
    els.forEach((el, i) => el.setAttribute('aria-selected', i === this.selected ? 'true' : 'false'));
    const active = els[this.selected];
    if (active) {
      active.scrollIntoView({ block: 'nearest' });
      this.input.setAttribute('aria-activedescendant', active.id);
    }
  },

  move(delta) {
    if (!this.items.length) return;
    this.selected = (this.selected + delta + this.items.length) % this.items.length;
    this.highlight();
  },

  openSelected() {
    const entry = this.items[this.selected];
    if (!entry) return;
    window.open(entry.url, '_blank', 'noopener');
    this.close();
  },
};

function initCmdK() {
  cmdk.el    = $('#cmdk');
  cmdk.input = $('#cmdk-input');
  cmdk.list  = $('#cmdk-list');
  if (!cmdk.el) return;

  // Open with Ctrl+K / Cmd+K from anywhere.
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault();
      cmdk.toggle();
    }
  });

  // Backdrop click closes.
  cmdk.el.querySelectorAll('[data-cmdk-close]').forEach(el => {
    el.addEventListener('click', () => cmdk.close());
  });

  // Input events.
  cmdk.input.addEventListener('input', () => cmdk.render(cmdk.input.value));
  cmdk.input.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'Escape':    e.preventDefault(); cmdk.close(); break;
      case 'ArrowDown': e.preventDefault(); cmdk.move(1); break;
      case 'ArrowUp':   e.preventDefault(); cmdk.move(-1); break;
      case 'Enter':     e.preventDefault(); cmdk.openSelected(); break;
      case 'Home':      e.preventDefault(); cmdk.selected = 0; cmdk.highlight(); break;
      case 'End':       e.preventDefault(); cmdk.selected = cmdk.items.length - 1; cmdk.highlight(); break;
    }
  });
}

async function init() {
  initClock();
  initTheme();
  initBanner();
  await loadTools();
  renderCards();
  initSearch();
  initFilters();
  initCmdK();
}

document.addEventListener('DOMContentLoaded', init);
