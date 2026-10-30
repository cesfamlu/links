/*
 * Test de velocidad flotante.
 * Mide ping, bajada y subida contra los servidores públicos de Cloudflare
 * (speed.cloudflare.com). Solo corre cuando el usuario aprieta "Iniciar".
 */
(function () {
  'use strict';

  const SERVER = 'https://speed.cloudflare.com';
  const PING_SAMPLES = 6;
  const DOWN = { streams: 4, maxBytes: 30e6, maxMs: 8000 };
  const UP = { workers: 3, chunk: 2e6, maxBytes: 15e6, maxMs: 8000 };

  const root = document.createElement('section');
  root.className = 'speed-widget';
  root.setAttribute('aria-label', 'Test de velocidad');
  root.innerHTML = `
    <div class="speed-widget__panel" id="speed-panel" hidden>
      <div class="speed-widget__head">
        <span class="speed-widget__title">Test de velocidad</span>
        <button class="speed-widget__close" type="button" aria-label="Cerrar">×</button>
      </div>
      <div class="speed-widget__metrics">
        <div class="speed-widget__metric" data-metric="ping">
          <span class="speed-widget__label">Ping</span>
          <span class="speed-widget__value">—</span>
          <span class="speed-widget__unit">ms</span>
        </div>
        <div class="speed-widget__metric" data-metric="down">
          <span class="speed-widget__label">Bajada</span>
          <span class="speed-widget__value">—</span>
          <span class="speed-widget__unit">Mbps</span>
        </div>
        <div class="speed-widget__metric" data-metric="up">
          <span class="speed-widget__label">Subida</span>
          <span class="speed-widget__value">—</span>
          <span class="speed-widget__unit">Mbps</span>
        </div>
      </div>
      <div class="speed-widget__bar"><span></span></div>
      <p class="speed-widget__status" aria-live="polite">Mide la conexión de este equipo.</p>
      <button class="speed-widget__run" type="button">Iniciar</button>
      <p class="speed-widget__note">Servidor: Cloudflare · usa hasta ~45 MB</p>
    </div>
    <button class="speed-widget__toggle" type="button" aria-expanded="false" aria-controls="speed-panel"
      title="Medir la velocidad de internet de este equipo">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4.5 17a8.5 8.5 0 1 1 15 0"/><path d="m12 14 4-5"/><circle cx="12" cy="14" r="1.6"/>
      </svg>
      <span class="speed-widget__toggle-text">
        <span class="speed-widget__toggle-kicker">Internet</span>
        Test de velocidad
      </span>
    </button>`;
  document.body.appendChild(root);

  const panel = root.querySelector('.speed-widget__panel');
  const toggle = root.querySelector('.speed-widget__toggle');
  const close = root.querySelector('.speed-widget__close');
  const run = root.querySelector('.speed-widget__run');
  const status = root.querySelector('.speed-widget__status');
  const bar = root.querySelector('.speed-widget__bar span');
  const metric = (name) => root.querySelector(`[data-metric="${name}"]`);
  let running = false;

  function setOpen(open) {
    panel.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    place();
  }

  function show(name, value, digits) {
    const el = metric(name);
    el.querySelector('.speed-widget__value').textContent =
      value == null ? '—' : value.toFixed(digits);
  }

  function setActive(name) {
    root.querySelectorAll('.speed-widget__metric').forEach((el) => {
      el.classList.toggle('is-active', el.dataset.metric === name);
    });
  }

  function progress(fraction) {
    bar.style.width = `${Math.round(Math.min(1, Math.max(0, fraction)) * 100)}%`;
  }

  const mbps = (bytes, ms) => (bytes * 8) / (ms / 1000) / 1e6;
  const url = (path) => `${SERVER}${path}${path.includes('?') ? '&' : '?'}r=${Math.random()}`;

  async function measurePing() {
    await fetch(url('/__down?bytes=0'), { cache: 'no-store' });
    const samples = [];
    for (let i = 0; i < PING_SAMPLES; i++) {
      const t = performance.now();
      await fetch(url('/__down?bytes=0'), { cache: 'no-store' });
      samples.push(performance.now() - t);
      progress((i + 1) / PING_SAMPLES / 3);
    }
    samples.sort((a, b) => a - b);
    return samples[Math.floor(samples.length / 2)];
  }

  async function measureDownload() {
    const ctrl = new AbortController();
    const perStream = Math.ceil(DOWN.maxBytes / DOWN.streams);
    let bytes = 0;
    let start = 0;

    const stream = async () => {
      const res = await fetch(url(`/__down?bytes=${perStream}`), { cache: 'no-store', signal: ctrl.signal });
      const reader = res.body.getReader();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) return;
        if (!start) start = performance.now();
        bytes += value.byteLength;
        const elapsed = performance.now() - start;
        show('down', mbps(bytes, elapsed || 1), 1);
        progress(1 / 3 + Math.max(bytes / DOWN.maxBytes, elapsed / DOWN.maxMs) / 3);
        if (elapsed > DOWN.maxMs) ctrl.abort();
      }
    };

    try {
      await Promise.all(Array.from({ length: DOWN.streams }, stream));
    } catch (err) {
      if (err.name !== 'AbortError') throw err;
    }
    return mbps(bytes, performance.now() - start);
  }

  async function measureUpload() {
    const body = new Uint8Array(UP.chunk);
    const start = performance.now();
    let bytes = 0;

    const worker = async () => {
      while (bytes < UP.maxBytes && performance.now() - start < UP.maxMs) {
        await fetch(url('/__up'), { method: 'POST', body, cache: 'no-store' });
        bytes += UP.chunk;
        const elapsed = performance.now() - start;
        show('up', mbps(bytes, elapsed), 1);
        progress(2 / 3 + Math.max(bytes / UP.maxBytes, elapsed / UP.maxMs) / 3);
      }
    };

    await Promise.all(Array.from({ length: UP.workers }, worker));
    return mbps(bytes, performance.now() - start);
  }

  function verdict(down) {
    if (down >= 50) return ['Conexión buena.', 'is-good'];
    if (down >= 10) return ['Conexión regular.', 'is-fair'];
    return ['Conexión lenta.', 'is-slow'];
  }

  async function runTest() {
    if (running) return;
    running = true;
    run.disabled = true;
    run.textContent = 'Midiendo…';
    status.className = 'speed-widget__status';
    ['ping', 'down', 'up'].forEach((name) => show(name, null));
    progress(0);

    try {
      setActive('ping');
      status.textContent = 'Midiendo ping…';
      show('ping', await measurePing(), 0);

      setActive('down');
      status.textContent = 'Midiendo bajada…';
      const down = await measureDownload();
      show('down', down, 1);

      setActive('up');
      status.textContent = 'Midiendo subida…';
      show('up', await measureUpload(), 1);

      const [text, cls] = verdict(down);
      status.textContent = text;
      status.classList.add(cls);
      progress(1);
    } catch (_) {
      status.textContent = 'No se pudo conectar con el servidor de prueba.';
      status.classList.add('is-slow');
      progress(0);
    } finally {
      setActive(null);
      running = false;
      run.disabled = false;
      run.textContent = 'Repetir';
    }
  }

  // Se ubica abajo a la izquierda y se corre hacia arriba si choca con el visor de cupos.
  function place() {
    const gap = window.innerWidth <= 480 ? 12 : 20;
    root.style.bottom = `${gap}px`;
    const cupos = document.getElementById('cupos-widget');
    if (!cupos) return;
    const a = cupos.getBoundingClientRect();
    const b = root.getBoundingClientRect();
    const overlaps = a.width && a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
    if (overlaps) root.style.bottom = `${window.innerHeight - a.top + 10}px`;
  }

  toggle.addEventListener('click', () => setOpen(panel.hidden));
  close.addEventListener('click', () => setOpen(false));
  run.addEventListener('click', runTest);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !panel.hidden) setOpen(false);
  });
  window.addEventListener('resize', place);

  const cupos = document.getElementById('cupos-widget');
  if (cupos) {
    new MutationObserver(place).observe(cupos, { attributes: true, subtree: true });
  }
  place();
})();
