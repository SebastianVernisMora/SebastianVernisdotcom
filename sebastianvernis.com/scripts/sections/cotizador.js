// ===== INICIALIZACIÓN DE LA SECCIÓN COTIZADOR UNIFICADO =====
function initializeCotizadorSection() {
    initializeCotizadorData();
    renderProducts();
    initializeCotizadorHandlers();
    updateCartAndUI();
}

// ===== DATOS DEL COTIZADOR UNIFICADO =====
function initializeCotizadorData() {
    // Productos técnicos modulares (del cotizador original)
    const productosModulares = [
        { id: 'web-base', name: 'Sitio Web Profesional', description: 'El activo central de su estrategia. Incluye diseño a medida, SEO inicial y hosting por 1 año.', priceOneTime: 8500, priceMonthly: 0, dependencies: [], category: 'Fundación Digital' },
        { id: 'maintenance', name: 'Mantenimiento y Acompañamiento', description: 'Gestión de redes (FB, IG, LI, GMB), 2 artículos/mes y soporte.', priceOneTime: 0, priceMonthly: 2200, dependencies: ['web-base'], category: 'Fundación Digital' },
        { id: 'chatbot', name: 'Chatbot de Ventas', description: 'Cualifica leads 24/7 de forma automática en su sitio web.', priceOneTime: 1800, priceMonthly: 0, dependencies: ['web-base'], category: 'Módulo de Captación Avanzada' },
        { id: 'scheduler', name: 'Agendador de Citas', description: 'Permite reservas directas sin fricción, integrado a su calendario.', priceOneTime: 500, priceMonthly: 0, dependencies: ['web-base'], category: 'Módulo de Captación Avanzada' },
        { id: 'lead-magnet', name: 'Lead Magnet', description: 'Sistema para capturar correos a cambio de guías o recursos de alto valor.', priceOneTime: 800, priceMonthly: 0, dependencies: ['web-base'], category: 'Módulo de Captación Avanzada' },
        { id: 'project-config', name: 'Configurador de Proyectos', description: 'Herramienta para que sus clientes armen su propio paquete de servicios.', priceOneTime: 3800, priceMonthly: 0, dependencies: ['web-base'], category: 'Módulo de Captación Avanzada' },
        { id: 'intranet', name: 'Intranet Corporativa', description: 'Un ecosistema privado y seguro para la comunicación y gestión de su equipo.', priceOneTime: 11000, priceMonthly: 500, dependencies: ['web-base'], category: 'Módulo de Operación y Eficiencia' },
        { id: 'crm', name: 'Integración con CRM', description: 'Centraliza y automatiza el seguimiento de clientes para un flujo de ventas optimizado.', priceOneTime: 6000, priceMonthly: 0, dependencies: ['web-base'], category: 'Módulo de Operación y Eficiencia' },
        { id: 'referral', name: 'Sistema de Referidos', description: 'Digitaliza y potencia el "boca a boca" para generar nuevos clientes.', priceOneTime: 5000, priceMonthly: 0, dependencies: ['web-base'], category: 'Módulo de Operación y Eficiencia' },
        { id: 'ai-writer', name: 'Redactor de Contenidos IA', description: 'Asistente de IA para generar borradores de blogs, redes sociales y correos.', priceOneTime: 2300, priceMonthly: 300, dependencies: ['web-base'], category: 'Módulo de Inteligencia de Negocios (IA)' },
        { id: 'ai-search', name: 'Buscador Inteligente', description: 'Permite a los usuarios buscar información dentro de toda su base de datos de contenido.', priceOneTime: 4000, priceMonthly: 0, dependencies: ['web-base'], category: 'Módulo de Inteligencia de Negocios (IA)' },
        { id: 'ai-analyst', name: 'Analista de Mercado IA', description: 'Herramienta que busca y resume tendencias, noticias y datos relevantes de su industria.', priceOneTime: 6300, priceMonthly: 0, dependencies: ['web-base'], category: 'Módulo de Inteligencia de Negocios (IA)' },
        { id: 'ai-email', name: 'Secuencias de Email IA', description: 'Crea y gestiona campañas de email marketing para "nutrir" a los leads automáticamente.', priceOneTime: 4500, priceMonthly: 0, dependencies: ['web-base'], category: 'Módulo de Inteligencia de Negocios (IA)' }
    ];

    // Productos empaquetados (de la tienda original)
    const productosEmpaquetados = [
        { id: "tienda-asesoria", name: "Sesión de Asesoría Estratégica (1hr)", description: "Consultoría enfocada para despejar dudas y trazar un plan de acción digital.", priceOneTime: 1200, priceMonthly: 0, dependencies: [], category: 'Servicios de Consultoría', mediaKey: 'img_tienda_asesoria' },
        { id: "tienda-landingpage", name: "Paquete Landing Page Impacto", description: "Diseño y desarrollo de una landing page optimizada para conversiones.", priceOneTime: 7500, priceMonthly: 0, dependencies: [], category: 'Servicios de Consultoría', mediaKey: 'img_tienda_landing' },
        { id: "tienda-ecommerce", name: "Paquete E-commerce Emprendedor", description: "Tu tienda online básica lista para vender (hasta 20 productos).", priceOneTime: 18000, priceMonthly: 0, dependencies: [], category: 'Servicios de Consultoría', mediaKey: 'img_tienda_ecommerce' },
        { id: "tienda-redes-sociales", name: "Kit Inicio en Redes Sociales", description: "Creación y optimización de perfiles en 2 plataformas sociales clave.", priceOneTime: 3500, priceMonthly: 0, dependencies: [], category: 'Servicios de Consultoría', mediaKey: 'img_tienda_redes' },
        { id: "tienda-mantenimiento", name: "Mantenimiento Web Esencial", description: "Actualizaciones, seguridad, backups y soporte básico para tu web.", priceOneTime: 0, priceMonthly: 2000, dependencies: [], category: 'Servicios de Consultoría', mediaKey: 'img_tienda_mantenimiento' },
        { id: "tienda-seo-audit", name: "Auditoría SEO Completa", description: "Análisis exhaustivo de tu sitio web para identificar oportunidades de mejora en buscadores.", priceOneTime: 4800, priceMonthly: 0, dependencies: [], category: 'Servicios de Consultoría', mediaKey: 'img_tienda_seo' },
        { id: "tienda-branding", name: "Paquete de Branding Digital Inicial", description: "Creación de logo, paleta de colores y guía de estilo básica para tu marca.", priceOneTime: 9500, priceMonthly: 0, dependencies: [], category: 'Servicios de Consultoría', mediaKey: 'img_tienda_branding' },
        { id: "tienda-social-media", name: "Gestión de Redes Sociales (Básico)", description: "Planificación y publicación de contenido para una red social (12 posts/mes).", priceOneTime: 0, priceMonthly: 8000, dependencies: [], category: 'Servicios de Consultoría', mediaKey: 'img_tienda_gestion_redes' },
        { id: "tienda-cyber-analisis", name: "Análisis de Vulnerabilidades Web", description: "Identificamos y reportamos las brechas de seguridad en tu sitio web antes de que sean explotadas.", priceOneTime: 6999, priceMonthly: 0, dependencies: [], category: 'Servicios de Ciberseguridad', mediaKey: 'img_tienda_vulnerabilidades' },
        { id: "tienda-cyber-hardening", name: "Paquete de Hardening para CMS", description: "Reforzamos la seguridad de tu WordPress/Joomla, implementando las mejores prácticas de protección.", priceOneTime: 5500, priceMonthly: 0, dependencies: [], category: 'Servicios de Ciberseguridad', mediaKey: 'img_tienda_hardening' },
        { id: "tienda-cyber-consultoria", name: "Consultoría de Ciberseguridad (1hr)", description: "Una sesión personalizada para evaluar tu postura de seguridad y crear un plan de acción a tu medida.", priceOneTime: 1600, priceMonthly: 0, dependencies: [], category: 'Servicios de Ciberseguridad', mediaKey: 'img_tienda_consultoria_cyber' }
    ];

    // Combinar todos los productos
    window.cotizadorProducts = [...productosModulares, ...productosEmpaquetados];
    window.cotizadorCart = [];

    // Mapeo de multimedia para productos de tienda
    window.tiendaMultimediaMap = {
        'img_tienda_asesoria': 'img_tienda_asesoria',
        'img_tienda_landing': 'img_tienda_landing',
        'img_tienda_ecommerce': 'img_tienda_ecommerce',
        'img_tienda_redes': 'img_tienda_redes',
        'img_tienda_mantenimiento': 'img_tienda_mantenimiento',
        'img_tienda_seo': 'img_tienda_seo',
        'img_tienda_branding': 'img_tienda_branding',
        'img_tienda_gestion_redes': 'img_tienda_gestion_redes',
        'img_tienda_vulnerabilidades': 'img_tienda_vulnerabilidades',
        'img_tienda_hardening': 'img_tienda_hardening',
        'img_tienda_consultoria_cyber': 'img_tienda_consultoria_cyber'
    };
}

// ===== RENDERIZADO DE PRODUCTOS =====
function renderProducts() {
    const productGrid = document.getElementById('product-grid');
    if (!productGrid) return;

    productGrid.innerHTML = '';
    let currentCategory = '';

    window.cotizadorProducts.forEach(product => {
        if(product.category !== currentCategory) {
            currentCategory = product.category;
            const categoryHeader = document.createElement('h2');
            categoryHeader.className = 'col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 text-2xl font-bold text-white border-b-4 border-purple-500 pb-2 mt-8 mb-2 text-left';
            categoryHeader.textContent = currentCategory;
            productGrid.appendChild(categoryHeader);
        }

        const card = document.createElement('div');
        card.className = 'bg-gray-800 rounded-lg p-6 flex flex-col justify-between transition-all duration-200 hover:bg-gray-700';
        card.id = `product-${product.id}`;

        const priceMonthlyHTML = product.priceMonthly > 0 ? `<span class="text-gray-400 text-sm">+ $${product.priceMonthly.toLocaleString('es-MX')}/mes</span>` : '';
        const priceOnetimeHTML = product.priceOneTime > 0 ? `$${product.priceOneTime.toLocaleString('es-MX')}` : '';

        // Agregar imagen si es producto de tienda
        let imageHTML = '';
        if (product.mediaKey && window.multimediaData && window.multimediaData[product.mediaKey]) {
            const mediaSrc = window.multimediaData[product.mediaKey];
            if (mediaSrc.endsWith('.mp4')) {
                imageHTML = `<video autoplay loop muted playsinline src="${mediaSrc}" class="w-full h-32 object-cover rounded-lg mb-4"></video>`;
            } else if (mediaSrc.endsWith('.png')) {
                imageHTML = `<img src="${mediaSrc}" alt="${product.name}" class="w-full h-32 object-cover rounded-lg mb-4">`;
            }
        }
        
        card.innerHTML = `
            <div>
                ${imageHTML}
                <h3 class="text-lg font-bold text-white">${product.name}</h3>
                <p class="text-sm text-gray-300 mt-2 mb-4">${product.description}</p>
            </div>
            <div class="mt-4">
                <p class="text-xl font-bold mb-4 text-white">${priceOnetimeHTML} ${priceMonthlyHTML}</p>
                <button class="w-full py-2 px-4 rounded-lg font-semibold transition-colors" data-id="${product.id}">Añadir al Proyecto</button>
                <p class="dependency-notice mt-2 h-4 text-xs text-yellow-400"></p>
            </div>
        `;
        productGrid.appendChild(card);
    });
}

// ===== MANEJADORES DE EVENTOS =====
function initializeCotizadorHandlers() {
    const productGrid = document.getElementById('product-grid');
    const cartItemsContainer = document.getElementById('cart-items');
    const generateContractBtn = document.getElementById('generate-contract-btn');
    const leadModalOverlay = document.getElementById('lead-modal-overlay');
    const closeLeadModalBtn = document.getElementById('close-lead-modal-btn');
    const leadForm = document.getElementById('lead-form');
    const successModalOverlay = document.getElementById('success-modal-overlay');
    const closeSuccessModalBtn = document.getElementById('close-success-modal-btn');
    const irPortalBtn = document.getElementById('ir-portal-btn');

    if (productGrid) {
        productGrid.addEventListener('click', e => {
            if (e.target.tagName === 'BUTTON') {
                handleProductToggle(e.target.dataset.id);
            }
        });
    }
    
    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('click', e => {
            if (e.target.tagName === 'BUTTON') {
                handleProductToggle(e.target.dataset.id);
            }
        });
    }
    
    if (generateContractBtn) {
        generateContractBtn.addEventListener('click', () => {
            if (leadModalOverlay) {
                leadModalOverlay.classList.remove('hidden');
            }
        });
    }
    
    if (closeLeadModalBtn && leadModalOverlay) {
        closeLeadModalBtn.addEventListener('click', () => {
            leadModalOverlay.classList.add('hidden');
        });
    }
    
    if (closeSuccessModalBtn && successModalOverlay) {
        closeSuccessModalBtn.addEventListener('click', () => {
            successModalOverlay.classList.add('hidden');
        });
    }

    if (irPortalBtn) {
        irPortalBtn.addEventListener('click', () => {
            window.open('portal.html', '_blank');
        });
    }

    if (leadForm) {
        leadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLeadFormSubmit(this);
        });
    }
}

// ===== LÓGICA DEL CARRITO =====
function handleProductToggle(productId) {
    const product = window.cotizadorProducts.find(p => p.id === productId);
    if (!product) return;

    if (window.cotizadorCart.includes(productId)) {
        // Remover producto y dependientes
        const productsToRemove = [productId, ...window.cotizadorProducts.filter(p => p.dependencies.includes(productId) && window.cotizadorCart.includes(p.id)).map(p => p.id)];
        window.cotizadorCart = window.cotizadorCart.filter(id => !productsToRemove.includes(id));
    } else {
        // Agregar producto
        window.cotizadorCart.push(productId);
    }
    
    updateCartAndUI();
}

function updateCartAndUI() {
    renderCart();
    updateProductStates();
    updateTotals();
    
    const generateContractBtn = document.getElementById('generate-contract-btn');
    if (generateContractBtn) {
        generateContractBtn.disabled = window.cotizadorCart.length === 0;
    }
}

function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (!cartItemsContainer) return;

    if (window.cotizadorCart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-gray-500">El carrito está vacío.</p>';
    } else {
        cartItemsContainer.innerHTML = window.cotizadorCart.map(productId => {
            const product = window.cotizadorProducts.find(p => p.id === productId);
            return `<div class="flex justify-between items-center"><span>${product.name}</span><button class="text-red-400 hover:text-red-300 text-xs font-bold" data-id="${product.id}">X</button></div>`;
        }).join('');
    }
}

function updateProductStates() {
    window.cotizadorProducts.forEach(product => {
        const card = document.getElementById(`product-${product.id}`);
        if (!card) return;

        const button = card.querySelector('button');
        const notice = card.querySelector('.dependency-notice');
        const dependenciesMet = product.dependencies.every(depId => window.cotizadorCart.includes(depId));
        const isInCart = window.cotizadorCart.includes(product.id);

        if (isInCart) {
            button.textContent = 'Quitar del Proyecto';
            button.className = 'w-full py-2 px-4 rounded-lg font-semibold transition-colors bg-pink-600 hover:bg-pink-700 text-white';
            button.disabled = false;
            card.classList.remove('opacity-50');
            notice.textContent = '';
        } else {
            button.textContent = 'Añadir al Proyecto';
            button.className = 'w-full py-2 px-4 rounded-lg font-semibold transition-colors bg-purple-600 hover:bg-purple-700 text-white';
            
            if (dependenciesMet) {
                button.disabled = false;
                card.classList.remove('opacity-50');
                notice.textContent = '';
            } else {
                button.disabled = true;
                card.classList.add('opacity-50');
                const missingDeps = product.dependencies.filter(depId => !window.cotizadorCart.includes(depId)).map(depId => window.cotizadorProducts.find(p => p.id === depId).name);
                notice.textContent = `Requiere: ${missingDeps.join(', ')}`;
            }
        }
    });
}

function updateTotals() {
    const totalOnetimeEl = document.getElementById('total-onetime');
    const totalMonthlyEl = document.getElementById('total-monthly');
    
    if (!totalOnetimeEl || !totalMonthlyEl) return;

    const totalOnetime = window.cotizadorCart.reduce((sum, id) => sum + window.cotizadorProducts.find(p => p.id === id).priceOneTime, 0);
    const totalMonthly = window.cotizadorCart.reduce((sum, id) => sum + window.cotizadorProducts.find(p => p.id === id).priceMonthly, 0);
    
    totalOnetimeEl.textContent = `$${totalOnetime.toLocaleString('es-MX')}`;
    totalMonthlyEl.textContent = `$${totalMonthly.toLocaleString('es-MX')}/mes`;
}

// ===== MANEJO DEL FORMULARIO DE LEADS (ACTUALIZADO PARA PHP) =====
async function handleLeadFormSubmit(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Preparar datos para enviar al API
    const requestData = {
        clientName: data.name,
        clientEmail: data.email,
        clientPhone: data.phone,
        cart: window.cotizadorCart.map(id => window.cotizadorProducts.find(p => p.id === id))
    };

    try {
        // Mostrar loading
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Generando...';
        submitBtn.disabled = true;

        // Enviar a la API PHP
        const response = await fetch('api/cotizador.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData)
        });

        const result = await response.json();

        if (result.success) {
            // Mostrar modal de éxito
            const leadModalOverlay = document.getElementById('lead-modal-overlay');
            const successModalOverlay = document.getElementById('success-modal-overlay');
            const folioDisplay = document.getElementById('folio-display');

            if (leadModalOverlay) leadModalOverlay.classList.add('hidden');
            if (folioDisplay) folioDisplay.textContent = result.folio;
            if (successModalOverlay) successModalOverlay.classList.remove('hidden');

            // Limpiar carrito
            window.cotizadorCart = [];
            updateCartAndUI();
            form.reset();
        } else {
            throw new Error(result.error || 'Error al generar la cotización');
        }

    } catch (error) {
        console.error('Error:', error);
        alert('Error al generar la cotización: ' + error.message);
    } finally {
        // Restaurar botón
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

// Ejecutar inicialización
initializeCotizadorSection();
