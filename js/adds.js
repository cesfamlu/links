
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

const tbodyMunicipalidad = document.querySelector(".tbody-municipalidad");
const tbodySalud = document.querySelector(".tbody-salud");
const tbodyDaem = document.querySelector(".tbody-daem");


const searchInput = document.getElementById("search");
const toggleThemeButtonDesktop = document.getElementById("toggleTheme");
const toggleThemeButtonMobile = document.getElementById("toggleThemeMobile");


function debounce(func, wait) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}


function insertRows(tbodyElement, entries) {
    tbodyElement.innerHTML = ""; 
    entries.forEach(rowData => {
        const tr = document.createElement("tr");
        rowData.forEach((cellContent, index) => {
            const td = document.createElement("td");
            const cleanContent = cellContent || "";
            td.setAttribute("data-text", cleanContent); 

            if (index === 0) {
                td.innerHTML = `<i class="material-icons left">business</i>${cleanContent}`;
            } else if (index === 2 && cleanContent) {
                const telLink = cleanContent.replace(/[\s-/]/g, "");
                td.innerHTML = `<a href="tel:${telLink}"><i class="material-icons left">phone</i>${cleanContent}</a>`;
            } else {
                td.textContent = cleanContent;
            }
            tr.appendChild(td);
        });
        tbodyElement.appendChild(tr);
    });
}


function renderCollapsibleData() {
    insertRows(tbodyMunicipalidad, data.municipalidad);
    insertRows(tbodySalud, data.salud);
    insertRows(tbodyDaem, data.daem);
    

    
    observeRows();
}


const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("reveal");
    });
}, { threshold: 0.1 });

function observeRows() {
  
    const allTableRows = document.querySelectorAll(".collapsible-body table.telefonos-section tbody tr");


    allTableRows.forEach(row => observer.unobserve(row));

    allTableRows.forEach(row => observer.observe(row));
}

function toggleTheme() {
    document.body.classList.toggle("dark-mode");
    document.body.classList.toggle("light-mode");
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    updateMobileThemeButton();
}

function updateMobileThemeButton() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    if (toggleThemeButtonMobile) {
        if (isDarkMode) {
            toggleThemeButtonMobile.classList.remove('orange', 'lighten-2');
            toggleThemeButtonMobile.classList.add('purple', 'darken-2');
            toggleThemeButtonMobile.style.color = 'white';
        } else {
            toggleThemeButtonMobile.classList.remove('purple', 'darken-2');
            toggleThemeButtonMobile.classList.add('orange', 'lighten-2');
            toggleThemeButtonMobile.style.color = '#333'; 
        }
    }
}



function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
    } else {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
    }
    updateMobileThemeButton(); 
}


function performSearch() {
  const filter = searchInput.value.toLowerCase().trim();
  document.querySelectorAll(".collapsible li").forEach(item => {
    const tbody = item.querySelector("tbody");
    if (!tbody) return;

    let sectionMatch = false; 

    tbody.querySelectorAll("tr").forEach(row => {
      let rowMatch = false; 
      row.querySelectorAll("td").forEach(cell => {
        const text = cell.getAttribute("data-text").toLowerCase();
        let content = cell.getAttribute("data-text"); 

       
         cell.querySelectorAll('.highlight').forEach(span => {
             const parent = span.parentNode;
            
             parent.replaceChild(document.createTextNode(span.textContent), span);
             parent.normalize(); 
         });


        if (filter !== "" && text.includes(filter)) {
          rowMatch = true;
          sectionMatch = true; 
          const regex = new RegExp(`(${filter.replace(/[-\/\\^$*+?.()|[\]{}]/g,'\\$&')})`, "gi");
          content = cell.getAttribute("data-text").replace(regex, '<span class="highlight">$1</span>');
        } else {
           
             content = cell.getAttribute("data-text");
        }


        
        if (cell.querySelector("a")) {
          const tel = cell.getAttribute("data-text").replace(/[\s-/]/g, "");
          
          const phoneIconHTML = cell.querySelector('a i.material-icons.left') ? '<i class="material-icons left">phone</i>' : '';
          cell.innerHTML = `<a href="tel:${tel}">${phoneIconHTML}${content}</a>`;
        }
        
        else if (cell.querySelector("i.material-icons.left")) { 
          
          cell.innerHTML = `<i class="material-icons left">business</i>${content}`;
        }
      
        else {
           
           cell.innerHTML = content; 
        }
      });


      row.style.display = (rowMatch || filter === "") ? "" : "none";
    });


  if (filter === "" || sectionMatch) {
  item.style.display = "";


  if (filter !== "" && sectionMatch) {
    item.classList.add("active");
  }

  else if (filter === "") {
    item.classList.remove("active");
  }
} else {
      
  item.style.display = "none";
  item.classList.remove("active");
}

  });
}


const debouncedSearch = debounce(performSearch, 250); // 250ms de retraso

searchInput.addEventListener("input", debouncedSearch);



function exportTableToExcel() {
    const wb = XLSX.utils.book_new();
    const ws_data = [];


    const headers = ['Unidad', 'Anexo(s)', 'Teléfono'];
    ws_data.push(headers);

    const collapsibleItems = document.querySelectorAll(".collapsible li");

    collapsibleItems.forEach(item => {

        const headerElement = item.querySelector(".collapsible-header");
        if (!headerElement) return;

        const sectionHeader = headerElement.textContent.replace(/location_city|local_hospital|school|business/g, "").trim(); 
        const tbody = item.querySelector("tbody");
        if (!tbody) return;

        const rowsToExport = tbody.querySelectorAll("tr");

        
         const sectionRowsData = [];
    rowsToExport.forEach(row => {
 if (row.style.display !== 'none') {
 const rowData = [];
 row.querySelectorAll("td").forEach(cell => rowData.push(cell.getAttribute("data-text")));
 sectionRowsData.push(rowData);
 }
});



        if (sectionRowsData.length > 0) {
             ws_data.push([sectionHeader.toUpperCase()]); 
             ws_data.push(...sectionRowsData); 
             ws_data.push([]); 
        }
    });

     if (ws_data.length <= 1) { // Si solo están los encabezados, no hay datos
        alert("No hay datos para exportar.");
        return;
    }

    // Eliminar la última fila vacía si existe
    if (ws_data.length > 0 && ws_data[ws_data.length - 1].length === 0) {
        ws_data.pop();
    }


    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    XLSX.utils.book_append_sheet(wb, ws, "Teléfonos");
    XLSX.writeFile(wb, "telefonos_municipales.xlsx");
}

async function exportTableToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const bodyRows = [];

    const collapsibleItems = document.querySelectorAll(".collapsible li");

     collapsibleItems.forEach(item => {
        // Obtener el nombre de la sección limpiando iconos y espacios extra
        const headerElement = item.querySelector(".collapsible-header");
        if (!headerElement) return; // Asegurarse de que el encabezado existe

        const sectionHeader = headerElement.textContent.replace(/location_city|local_hospital|school|business/g, "").trim(); // Limpiar iconos
        const tbody = item.querySelector("tbody");
        if (!tbody) return;

        const rowsToExport = tbody.querySelectorAll("tr");

        // Recopilar las filas visibles de esta sección
         const sectionRowsData = [];
         rowsToExport.forEach(row => {
             if (row.style.display !== 'none') {
                const rowData = [];
                row.querySelectorAll("td").forEach(cell => rowData.push(cell.getAttribute("data-text")));
                sectionRowsData.push(rowData);
            }
        });

        // Añadir el nombre de la sección y sus datos si hay filas visibles
        if (sectionRowsData.length > 0) {
             // Añadir el nombre de la sección como una fila con colspan
            bodyRows.push([{ content: sectionHeader.toUpperCase(), colSpan: 3, styles: { fontStyle: 'bold', halign: 'center', fillColor: [200, 200, 200] } }]);
             bodyRows.push(...sectionRowsData); // Añadir las filas de datos
        }
    });

    if (bodyRows.length === 0) {
        alert("No hay datos para exportar.");
        return;
    }

    doc.setFontSize(18);
    doc.text("Listado de Teléfonos Municipales", 14, 22);

    doc.autoTable({
        head: [['Unidad', 'Anexo(s)', 'Teléfono']],
        body: bodyRows,
        startY: 30,
        theme: 'grid',
        headStyles: { fillColor: [106, 27, 154] },
        styles: { cellPadding: 3, fontSize: 9 },
        // Añadir el hook para manejar las celdas con colspan (nombres de sección)
        didParseCell: function(data) {
            if (data.cell.raw.content && data.cell.raw.colSpan === 3) {
                 data.cell.styles.cellPadding = 5; // Ajustar padding para celdas de sección
             }
        }
    });

    doc.save("telefonos_municipales.pdf");
}


// === Inicialización ===
document.addEventListener('DOMContentLoaded', () => {
    // *** INICIALIZAR SIDENAV ***
    var sidenavElems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenavElems);

    // Aplicar tema guardado ANTES de renderizar para evitar FOUC
    applySavedTheme();

    // Renderizar datos en las nuevas secciones colapsables
    renderCollapsibleData();

    // *** INICIALIZAR COLLAPSIBLES ***
    // Inicializamos DESPUÉS de renderizar los datos para que Materialize los encuentre
    var collapsibleElems = document.querySelectorAll('.collapsible');
    // Si usas la clase 'expandable' en el HTML, el segundo argumento (options) no necesita {accordion: false}
    // Si quieres que solo se pueda abrir una a la vez, usa {accordion: true} (por defecto es true si no usas 'expandable')
    M.Collapsible.init(collapsibleElems, {}); // Inicializa los colapsables


    // *** AÑADIR LISTENER AL BOTÓN TEMA MÓVIL ***
    const mobileButton = document.getElementById('toggleThemeMobile');
    if (mobileButton) { // Verificar que exista
        mobileButton.addEventListener('click', toggleTheme);
    }

    const desktopButton = document.getElementById('toggleTheme');
if (desktopButton) {
  desktopButton.addEventListener('click', toggleTheme);
}

    // Opcional: Inicializar otros componentes Materialize si los usas
    // M.AutoInit(); // Inicializa automáticamente la mayoría de componentes si no los inicializas individualmente
});

// Hacer las funciones de exportación accesibles globalmente si son llamadas desde onclick en el HTML
window.exportTableToExcel = exportTableToExcel;
window.exportTableToPDF = exportTableToPDF;
