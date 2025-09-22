tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                'inter': ['Inter', 'sans-serif']
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const linksData = [
        { name: "RAS", isGroup: true, icon: 'ph-first-aid-kit', sublinks: [
            { name: "RAS Principal", url: "https://www.rasvaldivia.cl" },
            { name: "RAS Contingencia", url: "https://contingencia.rasvaldivia.cl/rasvaldivia/index.php" },
            { name: "RAS IP 1", url: "http://10.8.102.72" },
            { name: "RAS IP 2", url: "http://10.8.102.74" },
            { name: "RAS IP 3", url: "#" }
        ]},
        { name: "CORE", isGroup: true, icon: 'ph-heartbeat', sublinks: [
            { name: "CORE Principal", url: "https://www.hbvaldivia.cl/core/" },
            { name: "CORE IP", url: "https://10.6.206.62/core" }
        ]},
        { name: "Examenes", isGroup: true, icon: 'ph-test-tube', sublinks: [
            { name: "Exámenes", url: "http://10.66.50.47/" },
            { name: "Exámenes Contingencia", url: "http://10.4.59.246:90/" }
        ]},
        { name: "Muni La Union", url: "https://www.munilaunioninfo.com", icon: 'ph-buildings' },
        { name: "DESAMLU", url: "https://desamlu.cl/", icon: 'ph-hospital' },
        { name: "Intranet", url: "https://intranetlaunion.smc.cl/login.aspx", icon: 'ph-identification-card' },
        { name: "Isatec", url: "https://clientes.isatec.cl", icon: 'ph-headset' },
        { name: "Isis View", url: "http://10.6.67.166", icon: 'ph-eye' },
        { name: "Imed", url: "https://www.licencia.cl", icon: 'ph-file-text' },
        { name: "Centro Integral", url: "https://tinyurl.com/centro-integral", icon: 'ph-users-three' },
        { name: "SIGGES 🆕", isGroup: true, icon: 'ph-folder-simple-plus', sublinks: [
            { name: "Nuevo SIGGES", url: "https://www.hbvaldivia.cl/core/" },
            { name: "SIGGES", url: "https://10.6.206.62/core" }
        ]},
        { name: "Dart", url: "https://teleoftalmologia.minsal.cl/es/login", icon: 'ph-camera' },
        { name: "Hospital Digital", url: "https://interconsulta.minsal.cl/", icon: 'ph-monitor-play' },
        { name: "Crece Contigo", url: "https://srdm.crececontigo.gob.cl/login", icon: 'ph-baby' },
        { name: "FONASA 🆕", isGroup: true, icon: 'ph-coins', sublinks: [
            { name: "Front Integrado FONASA", url: "https://frontintegrado.fonasa.cl/FrontIntegradoLogin/#!/login" },
            { name: "FONASA", url: "https://fonasa.cl/sites/fonasa/prestadores/tramites/certificado-previsional" }
        ]}
    ];

    const linksContainer = document.getElementById('links-container');
    const searchInput = document.getElementById('searchInput');
    const noResultsMessage = document.getElementById('no-results');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const toggleAllLinksButton = document.getElementById('toggle-all-links');
    const toggleAllLinksIcon = document.getElementById('toggle-all-links-icon');
    const toggleAllLinksText = document.getElementById('toggle-all-links-text');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const favoritesBadge = document.getElementById('favorites-badge');

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    let allLinksVisible = true;

    function setupTheme() {
        const isDarkMode = localStorage.getItem('theme') === 'dark';
        document.documentElement.classList.toggle('dark', isDarkMode);
        themeIcon.className = isDarkMode ? 'ph-fill ph-moon text-xl' : 'ph-fill ph-sun text-xl';
    }

    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        themeIcon.className = isDark ? 'ph-fill ph-moon text-xl' : 'ph-fill ph-sun text-xl';
    });

    function updateFavoritesBadge() {
        const count = favorites.length;
        if (count > 0) {
            favoritesBadge.textContent = count;
            favoritesBadge.classList.remove('hidden');
        } else {
            favoritesBadge.classList.add('hidden');
        }
    }

    function saveFavorites() {
        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateFavoritesBadge();
    }

    function renderLinks() {
        linksContainer.innerHTML = '';
        linksData.forEach((item, index) => {
            const isFavorited = favorites.includes(item.url || item.name);
            const linkItemWrapper = document.createElement('div');
            linkItemWrapper.className = 'relative fade-in-item link-item bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:border-sky-500/50 hover:-translate-y-1';
            linkItemWrapper.style.setProperty('--stagger-index', index);
            linkItemWrapper.style.display = allLinksVisible ? 'block' : 'none';
            
            if (item.isGroup) {
                const linkCount = item.sublinks.length;
                linkItemWrapper.innerHTML = `
                    <a href="#" class="group-toggle flex justify-between items-center w-full p-4 font-bold text-gray-800 dark:text-white">
                        <span class="flex items-center gap-3">
                            <i class="${item.icon || 'ph ph-folder'} text-2xl text-sky-500"></i>
                            <span>${item.name}</span>
                            <span class="text-xs font-mono text-gray-400 dark:text-gray-500">[${linkCount}]</span>
                        </span>
                        <i class="ph ph-caret-down text-xl text-gray-400 transition-transform duration-300"></i>
                    </a>
                    <div class="sub-links border-t border-gray-200 dark:border-gray-700/50">
                        ${item.sublinks.map(sublink => `
                            <a href="${sublink.url}" target="_blank" rel="noopener noreferrer" class="sub-link-item block p-3 pl-12 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-200 text-sm">
                                ${sublink.name}
                            </a>
                        `).join('')}
                    </div>
                `;
                const mainLink = linkItemWrapper.querySelector('.group-toggle');
                const icon = mainLink.querySelector('.ph-caret-down');
                const subLinksContainer = linkItemWrapper.querySelector('.sub-links');
                mainLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (subLinksContainer.style.maxHeight) {
                        subLinksContainer.style.maxHeight = null;
                        icon.style.transform = 'rotate(0deg)';
                    } else {
                        subLinksContainer.style.maxHeight = subLinksContainer.scrollHeight + "px";
                        icon.style.transform = 'rotate(180deg)';
                        setTimeout(() => {
                            mainLink.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }, 300);
                    }
                });

            } else {
                linkItemWrapper.innerHTML = `
                    <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="single-link-item flex justify-between items-center p-4 font-bold text-gray-800 dark:text-white">
                        <span class="flex items-center gap-3">
                            <i class="${item.icon || 'ph ph-link-simple'} text-2xl text-sky-500"></i>
                            ${item.name}
                        </span>
                    </a>
                     <button class="star-favorite absolute top-3 right-3 text-gray-300 dark:text-gray-600 hover:text-yellow-400 transition-all duration-200 text-xl ${isFavorited ? 'favorited' : ''}">
                        <i class="ph-fill ph-star"></i>
                    </button>
                `;
            }

            const starButton = linkItemWrapper.querySelector('.star-favorite');
            if (starButton) {
                starButton.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const key = item.url || item.name;
                    if (favorites.includes(key)) {
                        favorites = favorites.filter(fav => fav !== key);
                        starButton.classList.remove('favorited');
                    } else {
                        favorites.push(key);
                        starButton.classList.add('favorited');
                    }
                    saveFavorites();
                });
            }

            linksContainer.appendChild(linkItemWrapper);
        });
    }

    function filterLinks() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const allLinks = linksContainer.querySelectorAll('.link-item');
        let visibleCount = 0;
        allLinks.forEach(item => {
            const itemText = item.textContent.toLowerCase();
            if (itemText.includes(searchTerm)) {
                if (allLinksVisible || searchTerm.length > 0) {
                    item.style.display = 'block';
                    visibleCount++;
                } else {
                     item.style.display = 'none';
                }
            } else {
                item.style.display = 'none';
            }
        });
        
        noResultsMessage.style.display = visibleCount === 0 && (allLinksVisible || searchTerm.length > 0) ? 'block' : 'none';
    }

    function toggleAllLinks() {
        allLinksVisible = !allLinksVisible;
        if (!allLinksVisible) {
            searchInput.value = '';
        }
        filterLinks();
    }

    setupTheme();
    renderLinks();
    updateFavoritesBadge();
    
    allLinksVisible = false;
    toggleAllLinksIcon.className = 'ph-fill ph-eye text-xl';
    toggleAllLinksText.textContent = 'Mostrar Todos los Enlaces';
    linksContainer.querySelectorAll('.link-item').forEach(item => item.style.display = 'none');

    searchInput.addEventListener('input', filterLinks);
    toggleAllLinksButton.addEventListener('click', toggleAllLinks);

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenuButton.classList.toggle('open');
    });

    window.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
    });
    document.getElementById('current-year').textContent = new Date().getFullYear();
});
