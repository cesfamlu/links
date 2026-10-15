/*
 * Controles locales del visor de cupos.
 * Las preferencias se guardan solamente en el navegador de cada visitante.
 */
(function () {
  'use strict';

  const KEY = 'cesfam-cupos-widget-preferences-v1';
  const root = document.getElementById('cupos-widget');
  const panel = document.getElementById('cupos-widget-panel');
  const controls = document.getElementById('cupos-widget-controls');
  const toggle = document.getElementById('cupos-widget-toggle');
  const position = document.getElementById('cupos-widget-position');
  const close = document.getElementById('cupos-widget-close');
  const restore = document.getElementById('cupos-widget-restore');

  if (!root || !panel || !controls || !toggle || !position || !close || !restore) return;

  const defaults = { position: 'bottom-right', hidden: false };
  let settings = readSettings();

  function readSettings() {
    try {
      return { ...defaults, ...JSON.parse(localStorage.getItem(KEY) || '{}') };
    } catch (_) {
      return { ...defaults };
    }
  }

  function saveSettings() {
    try { localStorage.setItem(KEY, JSON.stringify(settings)); } catch (_) { /* Preferencia opcional. */ }
  }

  function applySettings() {
    root.dataset.position = settings.position;
    root.classList.toggle('is-hidden', settings.hidden);
    position.value = settings.position;
    restore.hidden = !settings.hidden;
    toggle.setAttribute('aria-expanded', 'false');
    controls.hidden = true;
  }

  toggle.addEventListener('click', () => {
    const isOpen = !controls.hidden;
    controls.hidden = isOpen;
    toggle.setAttribute('aria-expanded', String(!isOpen));
  });

  position.addEventListener('change', () => {
    settings.position = position.value;
    saveSettings();
    applySettings();
  });

  close.addEventListener('click', () => {
    settings.hidden = true;
    saveSettings();
    applySettings();
  });

  restore.addEventListener('click', () => {
    settings.hidden = false;
    saveSettings();
    applySettings();
  });

  document.addEventListener('click', (event) => {
    if (!root.contains(event.target) && !controls.hidden) {
      controls.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  applySettings();
}());
