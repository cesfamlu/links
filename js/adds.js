// ==== DATA ARRAY ====
const data = {
    municipalidad: [
        ["Asesor Jurídico alcalde", "7135", "64 2 527135"],["Administración, Vehículos y Caminos", "7000", "64 2 527000"],["Administración, Vehículos, Secretaría y Obras Menores", "7111", "64 2 527111"],["Administración, Vehículos, Prevencionista", "", "472239"],["Administración, Seguridad Pública", "", "322033"],["Administración, Dpto. Aseo y Ornato", "7102", "64 2 527102"],["Administración, Dpto. Aseo Parque Municipal", "", "472297"],["Administración, Unidad Académica", "", "472366"],["Administración, Oficina de Comunicaciones", "", "324387"],["Secretaria Municipal", "7139", "64 2 527139"],["Secretaría Municipal, Secretaria", "7120", "64 2 527120"],["Secretaría Municipal, Central Telefónica", "", "322441"],["Secretaría Municipal, Oficina de Concejales", "7114", "64 2 527114"],["Secretaría Municipal, Oficina de Partes", "7141", "64 2 527141"],["Secretaría Municipal, Transparencia Municipal", "7144", "64 2 527144"],["Salón Consistorial", "", "322031"],["Portería", "", "472376"],["Dirección de Control, directora", "384", "64 2 201384"],["Dirección de Control administrativo", "421", "64 2 200421"],["Dirección de Control, Informática", "983", "64 2 524983"],["Dirección de Control, fiscalizador", "580", "64 2 200580"],["Cultura y Turismo, Dirección", "Sin Anexo", "64 2 346116"],["Cultura y Turismo, Secretaría", "", "346117/346118"],["Cultura y Turismo, Biblioteca", "", "472215"],["Cultura y Turismo, Turismo", "", "9 9958 1816"],["Cultura y Turismo, Pueblos Originarios", "", "9 4743 2447"],["Estadio Carlos Vogel", "", "472296"],["Dirección de Obras Municipales, Director", "7138", "64 2 527138"],["Dirección de Obras Municipales, Secretaría", "7138", "64 2 527138"],["Fomento Productivo", "Sin Anexo", "64 2 346116"],["Jefa Dto. Social.", "266", "472266"],["Dideco, Dirección", "271", "422271"],["Dideco, Secretaría", "270", "472270"],["Dideco, OMIL", "267 - 268", "472340"],["Dideco, Programa Jefas de Hogar - Oficina Mujer", "246", "472246"],["Dideco, Organizaciones Comunitarias", "281", "472281"],["Dideco, OPD", "276", "472276"],["Dideco, Senda Previene", "204-390", "472204"],["Dideco, Oficina del Deporte", "306", "472306"],["Dideco, Gimnasio Municipal", "205", "472205"],["Dideco Desarrollo Rural", "386", "472386"],["Dideco, Prodesal", "214", "472214"],["Dideco, PDTI", "388", "472388"],["Dideco, Programas Sociales, Jefa", "224", "472224"],["Dideco, Programas Familias", "232-233", "472232"],["Oficina de la Juventud", "Sin Anexo", "99527388"],["Finanzas, Director", "351", "472350"],["Finanzas, Adquisiciones", "355-395", "472355"],["Finanzas, Rentas y patentes", "265", "472265"],["Finanzas, Inspección", "262", "472262"],["Finanzas, Personal", "350 - 352", "472233/472352"],["Finanzas, Tesorería Jefa", "353", "472353"],["Finanzas, Tesorería Cajeras", "354", "472354"],["Finanzas, Contabilidad e Inventario", "356", "472356"],["Finanzas, Cementerio Municipal", "120", "322384"],["Finanzas, Bodega Municipal", "337", "472337"],["Finanzas, Bodega Camilo Henriquez", "371", "472298/324362"],["Secretario", "", "9 8973 7374"],["Secplan, Dirección", "286", "472286"],["Secplan, Secretaría", "458", "472358"],["Secplan, Asesor Urbanista", "247", "472247"],["Secplan, Vivienda", "241", "472236"],["Secplan, Inversiones", "671", "324671"],["Secplan, profesionales", "202", "472202"],["Secplan, ITO", "263", "472263"],["Secplan, Compras", "221", "472221"],["Secplan, Medio Ambiente", "245", "472245"]
    ],
    salud: [
        ["Jefe Departamento de Salud", "752", "207752"],["Secretaria", "334", "472334"],["Finanzas Jefa", "208", "322553"],["Finanzas", "753", "207753"],["Finanzas", "336", "472336"],["Personal", "335", "472335"],["Constructor Civil", "448", "322048"],["Adquisiciones", "449", "472449"],["Adquisiciones", "323", "322323"],["Farmacia Comunitaria", "472", "207754"],["CESFAM P. Hurtado: UAPO Externo", "520", "642346120"],["CESFAM P. Hurtado: Asistente Social Sector Azul", "521", "642346121"],["CESFAM P. Hurtado: SOME Sector Verde", "522", "642346122"],["CESFAM P. Hurtado: CCR", "523", "642346123"],["CESFAM P. Hurtado: Sala TIC", "524", "642346124"],["CESFAM P. Hurtado: Sala Soporte y Comunicaciones", "525", "642346125"],["CESFAM P. Hurtado: Jefe Unidades Transversales", "526", "642346126"],["CESFAM P. Hurtado: Oficina Multiproposito Sector Transversal", "527", "642346127"],["CESFAM P. Hurtado: Farmacia", "528", "642346128"],["CESFAM P. Hurtado: Some adm", "529", "642346129"],["CESFAM P. Hurtado: Secretaria", "530", "642346130"],["CESFAM P. Hurtado: Toma de Muestra", "531", "642346131"],["CESFAM P. Hurtado: Dirección", "532", "642346132"],["CESFAM P. Hurtado: Oficina Vinculación y Promoción", "533", "642346133"],["CESFAM P. Hurtado: Some Transversal", "634", "642346134"],["CESFAM P. Hurtado: Bodega Dental", "535", "642346135"],["CESFAM P. Hurtado: Asistente Social Sector Verde", "536", "642346136"],["CESFAM P. Hurtado: Vacunatorio", "537", "642346137"],["CESFAM P. Hurtado: Asistente Social Sector Amarillo", "538", "642346138"],["CESFAM P. Hurtado: Esterilización", "539", "642346139"],["CESFAM P. Hurtado: Calificador de Derecho", "540", "642346140"],["CESFAM P. Hurtado: Sala IRA", "541", "642346141"],["CESFAM P. Hurtado: SOME Sector Amarillo", "542", "642346142"],["CESFAM P. Hurtado: JEFE SOME Sector Amarillo", "543", "642346143"],["CESFAM P. Hurtado: Electrocardiograma", "544", "642346144"],["CESFAM P. Hurtado: Estadística", "545", "642346145"],["CESFAM P. Hurtado: SOME Sector Azul", "546", "642346146"],["CESFAM P. Hurtado: Oficina Enfermera Coordinadora Transversales", "547", "642346147"],["CESFAM P. Hurtado: Entrega de Leche", "548", "642346148"],["CESFAM P. Hurtado: Epidemiologia", "549", "642346149"],["CESFAM P. Hurtado: OIRS", "550", "642346150"],["CESFAM P. Hurtado: Sala ERA", "551", "642346151"],["CESFAM P. Hurtado: GES", "552", "642346152"],["Clínica Dental Escolar: Escuela 1", "393", "472393"],["Clínica Dental Escolar: Escuela 2", "491", "472391"],["Clínica Dental Escolar: Escuela 4", "389", "472389"],["Clínica Dental Escolar: Escuela Radimadi", "392", "472392"],["Clínica Dental Escolar: Escuela El Maitén", "383", "472383"],["Clínica Dental Escolar: Liceo RAAC", "394", "472394"],["CECOSF Los Lagos (Some, Farmacia, Leche)", "211-212", "472211-472212"],["CECOSF Irene Daiber", "307", "472307"],["Consultorio La Unión: Farmacia", "314", "472314"],["Consultorio La Unión: S.O.M.E.", "313", "472313"],["Consultorio La Unión: Secretaria", "310", "472310"],["Consultorio La Unión: Box Medico", "316", "472316"],["Consultorio La Unión: Curaciones", "343", "472343"],["Consultorio La Unión: Nutricionista", "322", "472322"],["Consultorio La Unión: Entrega de Leche", "321", "472321"],["Consultorio La Unión: SOME Salud Mental", "255", "470255"],["Consultorio La Unión: Nutricionista Vida Sana", "312", "472312"],["SAR", "502", "325002"]
    ],
    daem: [
        ["Recursos Humanos", "607", "472363"],["Secretaria Dirección", "601", "472361"],["Secretario Finanzas", "604", "472365"],["Secretaria Recursos Humanos", "608", "472362"],["Remuneraciones", "609", "472249"],["Licencias Médicas", "610", "472364"],["Oficina de Partes", "611", "472360"],["Evaluación Docente", "612", "322012"],["Unidad Académica", "613", "322019"],["Inventario", "605", "472371"],["Secretaria", "614", "472372"],["Coord. Acad. Básica", "615", "322617"],["Coord. Acad. Básica", "616", "472370"],["JUNAEB", "617", "472218"],["Encargada de Pagos", "618", "472380"],["Sala de Reuniones 1 piso", "619", "472217"],["Extraescolar/comunicaciones", "620", "322002"],["Adquisiciones", "621", "472367"],["Compras", "622", "472379"],["Planificación/infraestructura", "623", "472201"],["Secretaria", "624", "472373"],["Transporte", "625", "472368"],["Bodega", "626", "321928"],["Escuela N° 1 La Unión", "140", "322723"],["Colegio Cultura y Difusión Art.", "Sin Anexo", "570320"],["Liceo Rector Andrade Coloma", "133", "322437"],["Escuela Aldea Campesina", "132/628", "321098"],["Escuela Pdte. Jorge Alessandri", "138/269", "322623"],["Escuela N°2 La Unión", "136", "322372"],["Escuela Radimadi", "139", "322721"],["Escuela El Maitén", "345", "472345"],["Escuela Diferencial Villa San José", "137", "322392"],["Escuela Especial de Lenguaje Municipal", "Sin Anexo", "472302"]
    ]
};

// --- Función de Debounce ---
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}


function insertCards(container, entries, labels) {
    container.innerHTML = "";
    entries.forEach(rowData => {
        const card = document.createElement("div");
        card.className = "card-fila";

        card.dataset.unidad = rowData[0] || '';
        card.dataset.anexo = rowData[1] || '';
        card.dataset.telefono = rowData[2] || '';

        const unidad = document.createElement("div");
        unidad.className = "card-label unidad";
        unidad.innerHTML = `<span class="label">${labels[0]}</span> <span class="valor"><i class="material-icons">business</i>${rowData[0] || ''}</span>`;
        card.appendChild(unidad);

        const anexo = document.createElement("div");
        anexo.className = "card-label anexo";
        anexo.innerHTML = `<span class="label">${labels[1]}</span> <span class="valor">${rowData[1] || ''}</span>`;
        card.appendChild(anexo);

        const telefono = document.createElement("div");
        telefono.className = "card-label telefono";
        if (rowData[2]) {
            const telLink = rowData[2].replace(/[^\d+]/g, "");
            telefono.innerHTML = `<span class="label">${labels[2]}</span> <span class="valor"><a href="tel:${telLink}"><i class="material-icons">phone</i>${rowData[2]}</a></span>`;
        } else {
            telefono.innerHTML = `<span class="label">${labels[2]}</span> <span class="valor"></span>`;
        }
        card.appendChild(telefono);

        container.appendChild(card);
    });
}


function renderCollapsibleData() {
    insertCards(document.querySelector('.tbody-municipalidad'), data.municipalidad, ['Unidad', 'Anexo(s)', 'Teléfono']);
    insertCards(document.querySelector('.tbody-salud'), data.salud, ['Unidad', 'Anexo(s)', 'Teléfono']);
    insertCards(document.querySelector('.tbody-daem'), data.daem, ['Unidad', 'Anexo(s)', 'Teléfono']);
}


function performSearch() {
    const searchInput = document.getElementById("search");
    const filter = searchInput.value.toLowerCase().trim();
    const collapsibleItems = document.querySelectorAll(".collapsible > li");
    const collapsible = M.Collapsible.getInstance(document.querySelector('.collapsible'));

    collapsibleItems.forEach((item, index) => {
        const container = item.querySelector(".tbody-municipalidad, .tbody-salud, .tbody-daem");
        if (!container) return;

        let sectionHasVisibleCards = false;
        container.querySelectorAll(".card-fila").forEach(card => {
            const cardText = (card.dataset.unidad + card.dataset.anexo + card.dataset.telefono).toLowerCase();
            const isMatch = cardText.includes(filter);
            
            card.style.display = isMatch ? "" : "none";
            if(isMatch) sectionHasVisibleCards = true;
        });

        if (sectionHasVisibleCards || filter === "") {
            item.style.display = "";
            if (filter !== "" && sectionHasVisibleCards && !item.classList.contains('active')) {
                 collapsible.open(index);
            }
        } else {
            item.style.display = "none";
        }
    });
}

// --- GESTIÓN DE TEMA ---
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
    
    const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    updateThemeIcons();
}

function updateThemeIcons() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    const icon = isDarkMode ? 'brightness_4' : 'brightness_7';
    document.querySelectorAll('#toggleTheme i, #toggleThemeMobile i').forEach(el => el.textContent = icon);
}

function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
   
    document.body.classList.remove('dark-mode', 'light-mode');

    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    } else if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    } else if (prefersDark) {
         document.body.classList.add('dark-mode');
    } else {
        document.body.classList.add('light-mode'); 
    }
    updateThemeIcons();
}

// --- BOTÓN IR ARRIBA ---
function scrollToTop(event) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleScrollToTopButton() {
    const scrollButton = document.querySelector('.btn-floating');
    if (scrollButton) {
        scrollButton.style.display = (window.pageYOffset > 300) ? 'block' : 'none';
    }
}
function exportTableToExcel() {
    const wb = XLSX.utils.book_new();
    const ws_data = [['Unidad', 'Anexo(s)', 'Teléfono']];
    let hasData = false;

    document.querySelectorAll(".collapsible > li").forEach(item => {
        if (item.style.display === 'none') return;

        const sectionHeader = item.querySelector(".collapsible-header").textContent.replace(/.*(city|hospital|school).*/i, "").trim();
        const cards = item.querySelectorAll(".card-fila");
        const sectionRows = [];

        cards.forEach(card => {
            if (card.style.display !== 'none') {
                hasData = true;
                sectionRows.push([
                    card.dataset.unidad,
                    card.dataset.anexo,
                    card.dataset.telefono
                ]);
            }
        });
        
        if (sectionRows.length > 0) {
            ws_data.push([sectionHeader.toUpperCase()]);
            ws_data.push(...sectionRows);
            ws_data.push([]);
        }
    });

    if (!hasData) {
        M.toast({html: 'No hay datos visibles para exportar.'});
        return;
    }
    
    ws_data.pop();

    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    XLSX.utils.book_append_sheet(wb, ws, "Teléfonos");
    XLSX.writeFile(wb, "telefonos_municipales.xlsx");
}

function exportTableToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const bodyRows = [];
    let hasData = false;

    document.querySelectorAll(".collapsible > li").forEach(item => {
        if (item.style.display === 'none') return;

        const sectionHeader = item.querySelector(".collapsible-header").textContent.replace(/.*(city|hospital|school).*/i, "").trim();
        const cards = item.querySelectorAll(".card-fila");
        const sectionRowsData = [];

        cards.forEach(card => {
            if (card.style.display !== 'none') {
                hasData = true;
                sectionRowsData.push([
                    card.dataset.unidad,
                    card.dataset.anexo,
                    card.dataset.telefono
                ]);
            }
        });

        if (sectionRowsData.length > 0) {
            bodyRows.push([{ content: sectionHeader.toUpperCase(), colSpan: 3, styles: { fontStyle: 'bold', halign: 'center', fillColor: [220, 220, 220] } }]);
            bodyRows.push(...sectionRowsData);
        }
    });

    if (!hasData) {
        M.toast({html: 'No hay datos visibles para exportar.'});
        return;
    }

    doc.setFontSize(18);
    doc.text("Listado de Teléfonos Municipales", 14, 22);

    doc.autoTable({
        head: [['Unidad', 'Anexo(s)', 'Teléfono']],
        body: bodyRows,
        startY: 30,
        theme: 'grid',
        headStyles: { fillColor: [106, 90, 205] },
        styles: { cellPadding: 2, fontSize: 8 },
    });

    doc.save("telefonos_municipales.pdf");
}

// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
    applySavedTheme();
    renderCollapsibleData();
    M.AutoInit();
    
    const searchInput = document.getElementById("search");
    const toggleThemeDesktop = document.getElementById("toggleTheme");
    const toggleThemeMobile = document.getElementById("toggleThemeMobile");
    const scrollTopButton = document.querySelector('.btn-floating');

    const debouncedSearch = debounce(performSearch, 300);
    if (searchInput) {
        searchInput.addEventListener('input', debouncedSearch);
    }
    
    if (toggleThemeDesktop) toggleThemeDesktop.addEventListener('click', toggleTheme);
    if (toggleThemeMobile) toggleThemeMobile.addEventListener('click', toggleTheme);
    
    if (scrollTopButton) {
        scrollTopButton.style.display = 'none';
        window.addEventListener('scroll', toggleScrollToTopButton);
    }
});
