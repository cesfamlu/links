        document.addEventListener('DOMContentLoaded', function() {
            var sidenavElems = document.querySelectorAll('#mobile-nav-menu');
            M.Sidenav.init(sidenavElems);

            const menuContainer = document.getElementById("menu");
            const mainToggleButton = document.querySelector(".container.content-wrapper > .button"); 
            const labelSpan = document.getElementById("menu-label");
            const iconSpan = document.getElementById("menu-icon");

            if (menuContainer && mainToggleButton) {
                const menuState = localStorage.getItem("menuOpen") === "true";
                if (menuState) {
                    menuContainer.style.transition = 'none'; 
                    menuContainer.classList.add("open");
                    void menuContainer.offsetWidth; 
                    menuContainer.style.transition = ''; 

                    if (labelSpan && iconSpan) {
                        labelSpan.textContent = "Ocultar Enlaces"; 
                        iconSpan.classList.add("rotate");
                    } else {
                        mainToggleButton.textContent = "Ocultar Enlaces"; 
                    }
                } else {
                    if (labelSpan && iconSpan) {
                        labelSpan.textContent = "Mostrar Links"; 
                        iconSpan.classList.remove("rotate");
                    } else if (mainToggleButton) {
                         mainToggleButton.textContent = "Mostrar Enlaces";
                    }
                }

                mainToggleButton.addEventListener("click", function() {
                    const isOpen = menuContainer.classList.toggle("open");
                    if (labelSpan && iconSpan) {
                        labelSpan.textContent = isOpen ? "Ocultar Enlaces" : "Mostrar Enlaces";
                        iconSpan.classList.toggle("rotate", isOpen);
                    } else {
                        mainToggleButton.textContent = isOpen ? "Ocultar Enlaces" : "Mostrar Enlaces";
                    }
                    localStorage.setItem("menuOpen", isOpen);

                    if (isOpen) {
                        setTimeout(() => {
                            
                            const menuRect = menuContainer.getBoundingClientRect();
                            const buttonRect = mainToggleButton.getBoundingClientRect();
                            
                            if (menuRect.top < buttonRect.bottom || menuRect.bottom > window.innerHeight) {
                                menuContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                            }
                        }, 100); 
                    }
                });
            }

            const openSubMenuId = localStorage.getItem("subMenuOpen");
            if (openSubMenuId) {
                const subMenuToOpen = document.getElementById(openSubMenuId);
                const parentAnchorButton = document.querySelector(`a[onclick*="toggleSubLinks(event, '${openSubMenuId}'"]`);
                
                if (subMenuToOpen && parentAnchorButton) {
                    subMenuToOpen.style.transition = 'none';
                    subMenuToOpen.classList.add("open");
                    void subMenuToOpen.offsetWidth;
                    subMenuToOpen.style.transition = '';

                    const iconInButton = parentAnchorButton.querySelector(".toggle-icon");
                    if (iconInButton) {
                        iconInButton.classList.add("rotate");
                    }
                }
            }

            const themeToggleBtn = document.getElementById('theme-toggle-btn');
            const themeToggleBtnMobile = document.getElementById('theme-toggle-btn-mobile');
            const body = document.body;
            const lsTheme = localStorage.getItem('theme');
            const headerLogo = document.getElementById('header-logo'); 

            function applyTheme(theme) {
                const mainToggleIconEl = themeToggleBtn ? themeToggleBtn.querySelector('i.material-icons') : null;
                const mobileToggleIconEl = themeToggleBtnMobile ? themeToggleBtnMobile.querySelector('i.material-icons') : null;
                
                let tooltipInstance = null;
                if (themeToggleBtn) {
                    tooltipInstance = M.Tooltip.getInstance(themeToggleBtn);
                }

                if (theme === 'light-mode') {
                    body.classList.add('light-mode');
                    if (mainToggleIconEl) mainToggleIconEl.textContent = 'brightness_4'; 
                    if (mobileToggleIconEl) mobileToggleIconEl.textContent = 'brightness_4';
                    if (tooltipInstance && tooltipInstance.tooltipEl) {
                         tooltipInstance.tooltipEl.textContent = 'Cambiar a Tema Oscuro';
                    } else if (themeToggleBtn) { 
                        themeToggleBtn.dataset.tooltip = 'Cambiar a Tema Oscuro';
                    }
                    if (headerLogo) headerLogo.src = 'img/2.png'; 
                } else { 
                    body.classList.remove('light-mode');
                    if (mainToggleIconEl) mainToggleIconEl.textContent = 'brightness_7'; 
                    if (mobileToggleIconEl) mobileToggleIconEl.textContent = 'brightness_7';
                     if (tooltipInstance && tooltipInstance.tooltipEl) {
                         tooltipInstance.tooltipEl.textContent = 'Cambiar a Tema Claro';
                    } else if (themeToggleBtn) {
                        themeToggleBtn.dataset.tooltip = 'Cambiar a Tema Claro';
                    }
                    if (headerLogo) headerLogo.src = 'img/1.png'; 
                }
            }

            if (lsTheme) {
                applyTheme(lsTheme);
            } else {
                applyTheme('dark-mode'); 
            }

            function handleThemeToggle(event) {
                event.preventDefault();
                let newTheme = body.classList.contains('light-mode') ? 'dark-mode' : 'light-mode';
                localStorage.setItem('theme', newTheme);
                applyTheme(newTheme);
            }

            if (themeToggleBtn) {
                themeToggleBtn.addEventListener('click', handleThemeToggle);
            }
            if (themeToggleBtnMobile) {
                themeToggleBtnMobile.addEventListener('click', handleThemeToggle);
            }
            
            var tooltippedElems = document.querySelectorAll('.tooltipped');
            if (tooltippedElems.length > 0) { 
                M.Tooltip.init(tooltippedElems);
            }
        });

        function toggleSubLinks(event, id, clickedButtonElement) {
            if (event) {
                event.preventDefault();
            }

            const subLinksContainer = document.getElementById(id);
            if (!subLinksContainer) return;

            const allSubLinksContainers = document.querySelectorAll("#menu .sub-links");
            const isCurrentlyOpen = subLinksContainer.classList.contains("open");

            allSubLinksContainers.forEach((container) => {
                if (container !== subLinksContainer && container.classList.contains("open")) {
                    container.classList.remove("open");
                    const otherButton = document.querySelector(`a[onclick*="'${container.id}'"]`);
                    if (otherButton) {
                        const otherIcon = otherButton.querySelector(".toggle-icon");
                        if (otherIcon) otherIcon.classList.remove("rotate");
                    }
                }
            });

            const currentIcon = clickedButtonElement ? clickedButtonElement.querySelector(".toggle-icon") : null;
            if (isCurrentlyOpen) {
                subLinksContainer.classList.remove("open");
                if (currentIcon) currentIcon.classList.remove("rotate");
                if (localStorage.getItem("subMenuOpen") === id) {
                    localStorage.removeItem("subMenuOpen");
                }
            } else {
                subLinksContainer.classList.add("open");
                if (currentIcon) currentIcon.classList.add("rotate");
                localStorage.setItem("subMenuOpen", id);
                 setTimeout(() => {
                    
                    const subMenuRect = subLinksContainer.getBoundingClientRect();
                    const parentButtonRect = clickedButtonElement.getBoundingClientRect();
                    if (subMenuRect.top < parentButtonRect.bottom || subMenuRect.bottom > window.innerHeight) {
                         clickedButtonElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    } else if (subLinksContainer.offsetHeight > window.innerHeight - parentButtonRect.bottom) {
                  
                        clickedButtonElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }

                }, 50); 
            }
        }