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
            // 1. Revela el contenedor real primero
            cardsContainer.classList.remove('is-loading');

            // 2. Dispara el callback (count-up + stagger) inmediatamente
            onReady?.();

            // 3. Anima la salida del skeleton encima
            skeletonGrid.classList.add('is-hiding');

            // 4. Retira el skeleton del DOM al terminar — con fallback por si
            //    animationend no dispara (reduced-motion, display:none, etc.)
            const ANIM_DURATION = 450;
            let removed = false;
            const removeSkeleton = () => {
                if (removed) return;
                removed = true;
                skeletonGrid.hidden = true;
            };
            skeletonGrid.addEventListener('animationend', removeSkeleton, { once: true });
            setTimeout(removeSkeleton, ANIM_DURATION + 50);
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
       Detail Drawer — Fase 6
       ---------------------------------------------------------- */
    const drawerOverlay   = document.getElementById('drawerOverlay');
    const detailDrawer    = document.getElementById('detailDrawer');
    const drawerClose     = document.getElementById('drawerClose');
    const drawerIcon      = document.getElementById('drawerIcon');
    const drawerCategory  = document.getElementById('drawerCategory');
    const drawerTitleEl   = document.getElementById('drawerTitle');
    const drawerDesc      = document.getElementById('drawerDescription');
    const drawerLinksList = document.getElementById('drawerLinksList');
    const drawerLinksLabel= document.getElementById('drawerLinksSectionLabel');
    const drawerLinksSection = document.getElementById('drawerLinksSection');
    const drawerInfoCat   = document.getElementById('drawerInfoCategory');
    const drawerInfoKw    = document.getElementById('drawerInfoKeywords');
    const drawerCopyBtn   = document.getElementById('drawerCopyBtn');
    const drawerCopyLabel = document.getElementById('drawerCopyLabel');
    const drawerOpenBtn   = document.getElementById('drawerOpenBtn');

    // Mapa legible de categoría
    const CATEGORY_LABELS = { clinical: 'Clínico', admin: 'CESFAM', support: 'Soporte' };

    let drawerPrimaryUrl = '';
    let copyResetTimer   = null;

    function openDrawer(card) {
        const title       = card.querySelector('.card-title')?.textContent?.trim()    || '';
        const description = card.querySelector('.card-description')?.textContent?.trim() || '';
        const category    = card.getAttribute('data-category')  || '';
        const keywords    = card.getAttribute('data-keywords')  || '';
        const iconEl      = card.querySelector('.card-icon');

        // Clonar el icono al drawer
        drawerIcon.className = `drawer-icon`;
        if (iconEl) {
            drawerIcon.innerHTML = iconEl.innerHTML;
            // Propagar clases de color
            const colorClass = Array.from(iconEl.classList).find(c => c !== 'card-icon');
            if (colorClass) drawerIcon.classList.add(colorClass);
        }

        // Textos
        drawerCategory.textContent = CATEGORY_LABELS[category] || category;
        drawerTitleEl.textContent  = title;
        drawerDesc.textContent     = description;
        drawerInfoCat.textContent  = CATEGORY_LABELS[category] || category;

        // Keywords → chips
        const kwList = keywords.split(' ').filter(Boolean);
        if (kwList.length) {
            const kw = document.createElement('div');
            kw.className = 'drawer-keywords';
            kwList.forEach(k => {
                const chip = document.createElement('span');
                chip.className = 'drawer-keyword-chip';
                chip.textContent = k;
                kw.appendChild(chip);
            });
            drawerInfoKw.innerHTML = '';
            drawerInfoKw.appendChild(kw);
        } else {
            drawerInfoKw.textContent = '—';
        }

        // Recopila enlaces: sublinks o botón directo
        const sublinkAnchors = Array.from(card.querySelectorAll('.sublink-item'));
        const directAnchor   = card.querySelector('a.btn-primary.btn-direct');
        const allLinks = sublinkAnchors.length
            ? sublinkAnchors.map(a => ({ name: a.textContent.replace('›', '').trim(), href: a.href }))
            : directAnchor ? [{ name: 'Acceso principal', href: directAnchor.href }] : [];

        // Primer enlace = principal para copiar/abrir
        drawerPrimaryUrl = allLinks[0]?.href || '';

        // Render lista de links
        drawerLinksList.innerHTML = '';
        if (allLinks.length) {
            const sublinkLabel = card.querySelector('.sublinks-label')?.textContent?.trim();
            drawerLinksLabel.textContent = sublinkLabel || 'Accesos directos';
            drawerLinksSection.style.display = '';

            allLinks.forEach((link, i) => {
                const url = new URL(link.href, location.href);
                const li  = document.createElement('li');
                li.innerHTML = `
                    <a class="drawer-link-item" href="${link.href}" target="_blank" rel="noopener">
                        <span class="drawer-link-num">${i + 1}</span>
                        <span class="drawer-link-name">${link.name}</span>
                        <span class="drawer-link-url">${url.hostname}</span>
                        <svg class="drawer-link-ext" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                        </svg>
                    </a>`;
                drawerLinksList.appendChild(li);
            });
        } else {
            drawerLinksSection.style.display = 'none';
        }

        // Botón abrir
        drawerOpenBtn.href = drawerPrimaryUrl || '#';

        // Botón copiar
        drawerCopyLabel.textContent = 'Copiar enlace principal';
        drawerCopyBtn.classList.remove('copied');

        // Abre el drawer
        drawerOverlay.classList.add('is-open');
        drawerOverlay.setAttribute('aria-hidden', 'false');
        detailDrawer.classList.add('is-open');
        detailDrawer.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        // Focus al botón de cierre (accesibilidad)
        setTimeout(() => drawerClose.focus(), 350);
    }

    function closeDrawer() {
        drawerOverlay.classList.remove('is-open');
        drawerOverlay.setAttribute('aria-hidden', 'true');
        detailDrawer.classList.remove('is-open');
        detailDrawer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    // Inyecta botón "Ver detalles" en cada card
    function injectDetailButtons() {
        cards.forEach(card => {
            const footer = card.querySelector('.card-footer');
            if (!footer) return;
            const btn = document.createElement('button');
            btn.className   = 'btn-detail';
            btn.type        = 'button';
            btn.setAttribute('data-action', 'open-drawer');
            btn.innerHTML = `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg> Ver detalles`;
            footer.appendChild(btn);
        });
    }

    // Copiar al portapapeles
    drawerCopyBtn?.addEventListener('click', () => {
        if (!drawerPrimaryUrl) return;
        clearTimeout(copyResetTimer);
        navigator.clipboard.writeText(drawerPrimaryUrl).then(() => {
            drawerCopyLabel.textContent = '¡Copiado!';
            drawerCopyBtn.classList.add('copied');
            showToast('Enlace copiado al portapapeles', 'success');
            copyResetTimer = setTimeout(() => {
                drawerCopyLabel.textContent = 'Copiar enlace principal';
                drawerCopyBtn.classList.remove('copied');
            }, 2500);
        }).catch(() => showToast('No se pudo copiar', 'error'));
    });

    // Cierre
    drawerClose?.addEventListener('click', closeDrawer);
    drawerOverlay?.addEventListener('click', closeDrawer);

    // ESC para cerrar
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && detailDrawer.classList.contains('is-open')) closeDrawer();
    });

    // Delegación: click en btn-detail dentro de cualquier card
    cardsContainer.addEventListener('click', e => {
        const btn = e.target.closest('[data-action="open-drawer"]');
        if (!btn) return;
        e.stopPropagation();
        const card = btn.closest('.card');
        if (card) openDrawer(card);
    });

    /* ----------------------------------------------------------
       Dashboard de métricas — Fase 4
       ---------------------------------------------------------- */
    const metricCards = Array.from(document.querySelectorAll('.metric-card'));

    // Anima un número de 0 → target en ~600 ms
    function animateCount(el, target) {
        if (!el || target === 0) { if (el) el.textContent = 0; return; }
        const duration = 600;
        const steps    = 20;
        const interval = duration / steps;
        let   current  = 0;

        const timer = setInterval(() => {
            current++;
            const progress = current / steps;
            const eased    = 1 - Math.pow(1 - progress, 3);  // ease-out cúbico
            el.textContent = Math.round(eased * target);
            if (current >= steps) {
                clearInterval(timer);
                el.textContent = target; // garantiza el valor exacto al final
            }
        }, interval);
    }

    function buildMetrics() {
        const total = cards.length;
        const counts = {};
        cards.forEach(c => {
            const cat = c.getAttribute('data-category');
            counts[cat] = (counts[cat] || 0) + 1;
        });

        // Referencia a valores y barras
        const refs = [
            { valEl: document.getElementById('metricAll'),      fillEl: document.getElementById('fillAll'),      n: total,              pct: 100 },
            { valEl: document.getElementById('metricClinical'), fillEl: document.getElementById('fillClinical'), n: counts.clinical||0, pct: Math.round((counts.clinical||0) / total * 100) },
            { valEl: document.getElementById('metricAdmin'),    fillEl: document.getElementById('fillAdmin'),    n: counts.admin||0,    pct: Math.round((counts.admin||0)    / total * 100) },
            { valEl: document.getElementById('metricSupport'),  fillEl: document.getElementById('fillSupport'),  n: counts.support||0,  pct: Math.round((counts.support||0)  / total * 100) },
        ];

        // Guarda los datos para animar después del skeleton
        return refs;
    }

    function animateMetrics(refs) {
        refs.forEach(({ valEl, fillEl, n, pct }) => {
            if (valEl) animateCount(valEl, n);
            // Un pequeño delay para que la barra arranque justo después del número
            if (fillEl) setTimeout(() => fillEl.style.setProperty('--fill-pct', pct + '%'), 80);
        });
    }

    function highlightMetric(filter) {
        metricCards.forEach(card => {
            const matches = card.getAttribute('data-metric') === filter;
            card.classList.toggle('is-active', matches);
            card.setAttribute('aria-pressed', String(matches));
        });
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
        highlightMetric(filter);
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
       Seguridad — Fase 8: noopener en todos los links externos
       ---------------------------------------------------------- */
    function patchExternalLinks() {
        document.querySelectorAll('a[target="_blank"]').forEach(a => {
            const rel = new Set((a.rel || '').split(' ').filter(Boolean));
            rel.add('noopener');
            rel.add('noreferrer');
            a.rel = Array.from(rel).join(' ');
        });
    }

    /* ----------------------------------------------------------
       Init — orden crítico:
       1. buildMetrics prepara datos (sin animar todavía)
       2. initSkeleton oculta el contenedor PRIMERO
       3. buildCategoryCounters + setFilter configuran estado sin animar
       4. Callback del skeleton revela todo y dispara animaciones juntas
       ---------------------------------------------------------- */
    const metricRefs = buildMetrics();

    initSkeleton(() => {
        skeletonDone = true;
        // Cards — stagger de aparición
        const visible = cards.filter(c => c.style.display !== 'none');
        applyStagger(visible);
        // Dashboard — count-up + barras de progreso
        animateMetrics(metricRefs);
    });

    buildCategoryCounters();
    injectDetailButtons();
    patchExternalLinks();
    setFilter('all');

    // Las metric cards también actúan como filtros
    metricCards.forEach(card => {
        card.addEventListener('click', () => setFilter(card.getAttribute('data-metric')));
    });
})();
