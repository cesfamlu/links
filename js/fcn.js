/* ============================================================
   CESFAM LA UNIÓN — fcn.js v4.0
   ============================================================ */
(function () {
    'use strict';

    /* ----------------------------------------------------------
       Referencias DOM
       ---------------------------------------------------------- */
    const cardsContainer    = document.getElementById('cardsContainer');
    const skeletonGrid      = document.getElementById('skeletonGrid');
    const cards             = Array.from(cardsContainer.querySelectorAll('.card'));
    const searchInput       = document.getElementById('searchInput');
    const clearSearchBtn    = document.getElementById('clearSearch');
    const itemsCountEl      = document.getElementById('itemsCount');
    const noResultsEl       = document.getElementById('noResults');
    const filterButtons     = Array.from(document.querySelectorAll('.filter-btn'));
    const toggleAllBtn      = document.getElementById('toggleAllLinks');
    const toggleAllText     = document.getElementById('toggleAllText');
    const currentDateTimeEl = document.getElementById('currentDateTime');
    const yearEl            = document.getElementById('year');
    const toastEl           = document.getElementById('toast');
    const toastMessageEl    = document.getElementById('toastMessage');
    const toastCloseBtn     = document.getElementById('toastClose');
    const themeToggleBtn    = document.getElementById('themeToggle');
    const htmlEl            = document.documentElement;

    /* ----------------------------------------------------------
       Estado
       ---------------------------------------------------------- */
    let currentFilter   = 'all';
    let linksExpanded   = false;
    let skeletonDone    = false;   // bloquea applyStagger hasta que el skeleton salga

    /* ----------------------------------------------------------
       Dark mode
       ---------------------------------------------------------- */
    const THEME_KEY = 'cesfam-theme';

    function applyTheme(theme) {
        htmlEl.setAttribute('data-theme', theme);
        localStorage.setItem(THEME_KEY, theme);
    }

    function initTheme() {
        // Default siempre light — solo restaura si el usuario cambió manualmente
        const saved = localStorage.getItem(THEME_KEY);
        applyTheme(saved === 'dark' ? 'dark' : 'light');
    }

    function toggleTheme() {
        const current = htmlEl.getAttribute('data-theme');
        applyTheme(current === 'dark' ? 'light' : 'dark');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }

    initTheme();

    /* ----------------------------------------------------------
       Fecha y hora
       ---------------------------------------------------------- */
    function formatDate(date) {
        return new Intl.DateTimeFormat('es-CL', {
            dateStyle: 'full',
            timeStyle: 'short',
        }).format(date);
    }

    function updateDateTime() {
        const now = new Date();
        if (currentDateTimeEl) currentDateTimeEl.textContent = formatDate(now);
        if (yearEl)            yearEl.textContent = now.getFullYear();
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);

    /* ----------------------------------------------------------
       Skeleton loader — Fase 3
       ---------------------------------------------------------- */
    function initSkeleton(onReady) {
        if (!skeletonGrid) {
            // Sin skeleton: ejecuta el callback inmediatamente
            onReady?.();
            return;
        }

        // Oculta el contenedor real ANTES de que arranque ninguna animación
        cardsContainer.classList.add('is-loading');

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const delay = reducedMotion ? 0 : 550;

        setTimeout(() => {
            // 1. Anima la salida del skeleton
            skeletonGrid.classList.add('is-hiding');

            // 2. Tras la animación de salida, lo retira del DOM
            skeletonGrid.addEventListener('animationend', () => {
                skeletonGrid.hidden = true;
            }, { once: true });

            // 3. Revela el contenedor real
            cardsContainer.classList.remove('is-loading');

            // 4. Re-dispara el stagger en el momento exacto de la revelación
            //    → garantiza que TODAS las cards animan desde cero, ya visibles
            onReady?.();
        }, delay);
    }

    /* ----------------------------------------------------------
       Toast — Fase 3: variantes
       ---------------------------------------------------------- */
    let toastTimer = null;

    /**
     * @param {string} message  - Texto del toast
     * @param {'success'|'error'|'warning'|'info'} type - Variante visual
     * @param {number} duration - Duración en ms (default 2600)
     */
    function showToast(message, type = 'success', duration = 2600) {
        if (!toastEl || !toastMessageEl) return;
        clearTimeout(toastTimer);
        toastMessageEl.textContent = message;
        toastEl.setAttribute('data-type', type);
        toastEl.classList.remove('hidden');
        toastTimer = setTimeout(() => toastEl.classList.add('hidden'), duration);
    }

    function hideToast() {
        clearTimeout(toastTimer);
        toastEl.classList.add('hidden');
    }

    if (toastCloseBtn) {
        toastCloseBtn.addEventListener('click', hideToast);
    }

    /* ----------------------------------------------------------
       Chips con contadores — Fase 2
       ---------------------------------------------------------- */
    function buildCategoryCounters() {
        // Cuenta cuántas cards hay por categoría
        const counts = { all: cards.length };
        cards.forEach(card => {
            const cat = card.getAttribute('data-category');
            counts[cat] = (counts[cat] || 0) + 1;
        });

        // Inyecta el chip <span class="filter-count"> en cada botón
        filterButtons.forEach(btn => {
            const filter = btn.getAttribute('data-filter');
            const n = counts[filter] ?? 0;
            // Evita duplicar si ya existe
            let chip = btn.querySelector('.filter-count');
            if (!chip) {
                chip = document.createElement('span');
                chip.className = 'filter-count';
                btn.appendChild(chip);
            }
            chip.textContent = n;
        });
    }

    /* ----------------------------------------------------------
       Stagger animation — Fase 2
       ---------------------------------------------------------- */
    function applyStagger(visibleCards) {
        // No-op durante la fase de skeleton para evitar animaciones prematuras
        if (!skeletonDone) return;

        visibleCards.forEach((card, index) => {
            // Cancela la animación en curso para poder re-dispararla
            card.style.animation = 'none';
            // Fuerza reflow para que el navegador registre el reset
            void card.offsetWidth;
            // Restaura la animación CSS con delay escalonado (40 ms por card)
            card.style.animation      = '';
            card.style.animationDelay = `${index * 40}ms`;
        });
    }

    /* ----------------------------------------------------------
       Búsqueda y filtros
       ---------------------------------------------------------- */
    function normalizeText(text) {
        return (text || '')
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');   // elimina tildes para búsqueda sin acentos
    }

    function getCardSearchText(card) {
        const title       = card.querySelector('.card-title')?.textContent       || '';
        const description = card.querySelector('.card-description')?.textContent || '';
        const keywords    = card.getAttribute('data-keywords')                   || '';
        return `${title} ${description} ${keywords}`;
    }

    function applyFilters() {
        const query = normalizeText(searchInput.value);
        const visibleCards = [];

        cards.forEach(card => {
            const category      = card.getAttribute('data-category');
            const matchCategory = currentFilter === 'all' || currentFilter === category;
            const matchQuery    = query.length === 0 ||
                                  normalizeText(getCardSearchText(card)).includes(query);
            const visible       = matchCategory && matchQuery;

            card.style.display = visible ? '' : 'none';
            if (visible) visibleCards.push(card);
        });

        // Actualiza contador de resultados
        const count = visibleCards.length;
        itemsCountEl.textContent = `${count} resultado${count === 1 ? '' : 's'}`;
        noResultsEl.classList.toggle('hidden', count > 0);
        clearSearchBtn.classList.toggle('hidden', searchInput.value.length === 0);

        // Dispara animación escalonada solo en los visibles
        applyStagger(visibleCards);
    }

    function setFilter(filter) {
        currentFilter = filter;
        filterButtons.forEach(btn =>
            btn.classList.toggle('active', btn.getAttribute('data-filter') === filter)
        );
        applyFilters();
    }

    /* ----------------------------------------------------------
       Sublinks
       ---------------------------------------------------------- */
    function toggleSublinks(targetId, expand) {
        const el = document.getElementById(targetId);
        if (!el) return;
        el.classList.toggle('hidden', !expand);
    }

    function toggleAllSublinks(expand) {
        document.querySelectorAll('.sublinks').forEach(el =>
            el.classList.toggle('hidden', !expand)
        );
        document.querySelectorAll('.btn-primary[data-target]').forEach(btn =>
            btn.setAttribute('aria-expanded', String(expand))
        );
        linksExpanded = expand;
        toggleAllText.textContent = expand ? 'Ocultar Enlaces' : 'Mostrar Enlaces';
    }

    /* ----------------------------------------------------------
       Event listeners
       ---------------------------------------------------------- */
    searchInput.addEventListener('input', applyFilters);

    clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        applyFilters();
        showToast('Búsqueda limpiada', 'info');
    });

    filterButtons.forEach(btn =>
        btn.addEventListener('click', () => setFilter(btn.getAttribute('data-filter')))
    );

    cardsContainer.addEventListener('click', (event) => {
        const btn = event.target.closest('.btn-primary[data-target]');
        if (!btn) return;
        const targetId = btn.getAttribute('data-target');
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        toggleSublinks(targetId, !expanded);
        btn.setAttribute('aria-expanded', String(!expanded));
    });

    toggleAllBtn.addEventListener('click', () => {
        toggleAllSublinks(!linksExpanded);
    });

    /* ----------------------------------------------------------
       Init — orden crítico:
       1. initSkeleton oculta el contenedor PRIMERO
       2. buildCategoryCounters + setFilter configuran estado (sin animar)
       3. El callback de initSkeleton revela + dispara el stagger
       ---------------------------------------------------------- */
    initSkeleton(() => {
        // El skeleton ya salió: desbloqueamos el stagger y lo disparamos
        skeletonDone = true;
        const visible = cards.filter(c => c.style.display !== 'none');
        applyStagger(visible);
    });

    buildCategoryCounters();
    setFilter('all');
})();
