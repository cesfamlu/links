(function() {
    const d = document;
    const cardsContainer = d.getElementById('cardsContainer');
    const cards = Array.from(cardsContainer.querySelectorAll('.card'));
    const searchInput = d.getElementById('searchInput');
    const clearSearch = d.getElementById('clearSearch');
    const itemsCount = d.getElementById('itemsCount');
    const noResults = d.getElementById('noResults');
    const filterButtons = Array.from(d.querySelectorAll('.filter-btn'));
    const toggleAllLinksBtn = d.getElementById('toggleAllLinks');
    const toggleAllText = d.getElementById('toggleAllText');
    const currentDateTime = d.getElementById('currentDateTime');
    const yearSpan = d.getElementById('year');
    const toast = d.getElementById('toast');
    const toastMessage = d.getElementById('toastMessage');

    // Header action buttons (now simple links, no handlers needed)

    let currentFilter = 'all';
    let linksExpanded = false;

    function formatEsDate(date) {
        return new Intl.DateTimeFormat('es-CL', { dateStyle: 'full', timeStyle: 'short' }).format(date);
    }

    function updateDateTime() {
        const now = new Date();
        if (currentDateTime) currentDateTime.textContent = formatEsDate(now);
        if (yearSpan) yearSpan.textContent = now.getFullYear();
    }

    function showToast(message) {
        if (!toast || !toastMessage) return;
        toastMessage.textContent = message;
        toast.classList.remove('hidden');
        setTimeout(() => toast.classList.add('hidden'), 1800);
    }

    function normalize(text) {
        return (text || '').toLowerCase();
    }

    function getCardTextTargets(card) {
        const title = card.querySelector('.card-title')?.textContent || '';
        const description = card.querySelector('.card-description')?.textContent || '';
        const keywords = card.getAttribute('data-keywords') || '';
        return `${title} ${description} ${keywords}`;
    }

    function applyFilters() {
        const query = normalize(searchInput.value);
        let visibleCount = 0;

        cards.forEach(card => {
            const category = card.getAttribute('data-category');
            const matchesCategory = currentFilter === 'all' || currentFilter === category;
            const matchesQuery = query.length === 0 || normalize(getCardTextTargets(card)).includes(query);
            const shouldShow = matchesCategory && matchesQuery;
            card.style.display = shouldShow ? '' : 'none';
            if (shouldShow) visibleCount += 1;
        });

        itemsCount.textContent = `${visibleCount} resultado${visibleCount === 1 ? '' : 's'}`;
        noResults.classList.toggle('hidden', visibleCount !== 0);
        clearSearch.classList.toggle('hidden', !(searchInput.value && searchInput.value.length > 0));
    }

    function setFilter(filter) {
        currentFilter = filter;
        filterButtons.forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-filter') === filter));
        applyFilters();
    }

    function toggleSublinksById(id, expanded) {
        const el = d.getElementById(id);
        if (!el) return;
        el.classList.toggle('hidden', !expanded);
    }

    function toggleAllSublinks(expand) {
        const allSublinks = Array.from(d.querySelectorAll('.sublinks'));
        allSublinks.forEach(el => el.classList.toggle('hidden', !expand));
        const allToggles = Array.from(d.querySelectorAll('.btn-primary[data-target]'));
        allToggles.forEach(btn => btn.setAttribute('aria-expanded', String(expand)));
        linksExpanded = expand;
        toggleAllText.textContent = expand ? 'Ocultar Enlaces' : 'Mostrar Enlaces';
    }

    // Listeners
    searchInput.addEventListener('input', applyFilters);
    clearSearch.addEventListener('click', () => {
        searchInput.value = '';
        applyFilters();
        showToast('Búsqueda limpiada');
    });

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => setFilter(btn.getAttribute('data-filter')));
    });

    cardsContainer.addEventListener('click', (e) => {
        const target = e.target.closest('.btn-primary[data-target]');
        if (!target) return;
        const id = target.getAttribute('data-target');
        const expanded = target.getAttribute('aria-expanded') === 'true';
        toggleSublinksById(id, !expanded);
        target.setAttribute('aria-expanded', String(!expanded));
    });

    toggleAllLinksBtn.addEventListener('click', () => {
        toggleAllSublinks(!linksExpanded);
    });

    // Header buttons actions
    // Links navegan por sí solos; sin JS

    // Logo load/error diagnostics
    const siteLogo = d.getElementById('siteLogo');
    if (siteLogo) {
        siteLogo.addEventListener('load', () => {
            // Imagen cargó correctamente
        });
        siteLogo.addEventListener('error', () => {
            showToast('No se pudo cargar logo.png. Verifica nombre y ruta.');
        });
    }

    // Init
    setFilter('all');
    updateDateTime();
    setInterval(updateDateTime, 1000);
})();


