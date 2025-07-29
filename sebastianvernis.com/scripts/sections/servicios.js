// ===== INICIALIZACIÓN DE LA SECCIÓN SERVICIOS =====
function initializeServiciosSection() {
    renderizarServicios();
}

function renderizarServicios() {
    const serviciosContenedor = document.getElementById('servicios-lista');
    if (!serviciosContenedor) return;

    // Datos de servicios
    const serviciosData = [
        {
            titulo: "Diseño de Landing Page Optimizada",
            categoria: "Diseño y Desarrollo Web",
            enfoque: "Conversión / Específico",
            descripcion: "Landing pages enfocadas en la conversión, con diseño moderno, video animado y carrusel de beneficios."
        },
        {
            titulo: "Desarrollo de APIs Personalizadas",
            categoria: "Diseño y Desarrollo Web",
            enfoque: "Integración / Técnico",
            descripcion: "Automatiza y conecta tus plataformas digitales con APIs personalizadas, adaptadas a tu negocio."
        },
        {
            titulo: "E-commerce Básico (Tienda Online Sencilla)",
            categoria: "E-commerce y Pagos",
            enfoque: "E-commerce Inicial / Sencillo",
            descripcion: "Tienda online con catálogo, carrito de compras y proceso de pago simple. Ideal para emprendedores."
        },
        {
            titulo: "Integración de Pasarelas de Pago (Stripe, PayPal)",
            categoria: "E-commerce y Pagos",
            enfoque: "E-commerce Avanzado / Seguridad",
            descripcion: "Integramos las principales pasarelas de pago en tu sitio o tienda online para que cobres de forma segura."
        },
        {
            titulo: "Gestión de APIs para Cobros Digitales",
            categoria: "E-commerce y Pagos",
            enfoque: "Finanzas Digitales / Especializado",
            descripcion: "Gestionamos y optimizamos la integración de APIs de pago para que tus cobros sean eficientes y seguros."
        },
        {
            titulo: "Creación Básica de Perfiles en Redes Sociales",
            categoria: "Marketing Digital",
            enfoque: "Lanzamiento Rápido / Básico",
            descripcion: "Creamos tus perfiles profesionales en Instagram, Facebook, TikTok y más, con diseño atractivo y checklist visual."
        },
        {
            titulo: "SEO Local para Negocios Físicos",
            categoria: "Marketing Digital",
            enfoque: "Visibilidad Local / Geográfico",
            descripcion: "Haz que los clientes cercanos te descubran fácilmente en Google y Maps. Mejoramos tu visibilidad local."
        },
        {
            titulo: "Campañas de Publicidad en Redes (Ads)",
            categoria: "Marketing Digital",
            enfoque: "Publicidad Pagada / Crecimiento",
            descripcion: "Campañas de anuncios segmentados en Facebook e Instagram para aumentar tu alcance y ventas."
        },
        {
            titulo: "Mantenimiento Web y Soporte Técnico",
            categoria: "Servicios Técnicos y Consultoría",
            enfoque: "Seguridad / Confianza",
            descripcion: "Mantenemos tu sitio actualizado, seguro y optimizado, para que te enfoques en tu negocio."
        },
        {
            titulo: "Consultoría Estratégica Digital (Completa)",
            categoria: "Servicios Técnicos y Consultoría",
            enfoque: "Estrategia Global / Asesoramiento",
            descripcion: "Te acompañamos en todo el proceso: análisis, estrategia, implementación y medición de resultados."
        }
    ];

    serviciosContenedor.innerHTML = '';

    // Agrupar servicios por categoría
    const serviciosPorCategoria = serviciosData.reduce((acc, servicio) => {
        const categoria = servicio.categoria || 'Otros';
        if (!acc[categoria]) acc[categoria] = [];
        acc[categoria].push(servicio);
        return acc;
    }, {});

    // Renderizar por categorías
    for (const categoriaNombre in serviciosPorCategoria) {
        const categoriaDiv = document.createElement('div');
        categoriaDiv.className = 'categoria-servicios-container';

        const tituloCategoria = document.createElement('h2');
        tituloCategoria.className = 'categoria-servicios-titulo';
        tituloCategoria.textContent = categoriaNombre;
        categoriaDiv.appendChild(tituloCategoria);

        const listaServiciosDiv = document.createElement('div');
        listaServiciosDiv.className = 'servicios-lista-categoria';

        serviciosPorCategoria[categoriaNombre].forEach(servicio => {
            const card = document.createElement('div');
            card.className = 'servicio-card';

            // Obtener multimedia
            const mediaKey = window.multimediaMap && window.multimediaMap[servicio.titulo];
            const mediaSrc = window.multimediaData && window.multimediaData[mediaKey];

            let mediaElement = '<span>Sin Contenido</span>';
            if (mediaSrc) {
                if (mediaSrc.endsWith('.mp4')) {
                    mediaElement = `<video autoplay loop muted playsinline src="${mediaSrc}"></video>`;
                } else if (mediaSrc.endsWith('.png')) {
                    mediaElement = `<img src="${mediaSrc}" alt="${servicio.titulo}">`;
                }
            }

            card.innerHTML = `
                <div class="servicio-media">${mediaElement}</div>
                <h3>${servicio.titulo}</h3>
                <span class="enfoque">${servicio.enfoque}</span>
                <p>${servicio.descripcion}</p>
            `;

            listaServiciosDiv.appendChild(card);
        });

        categoriaDiv.appendChild(listaServiciosDiv);
        serviciosContenedor.appendChild(categoriaDiv);
    }
}

// Ejecutar inicialización
initializeServiciosSection();
