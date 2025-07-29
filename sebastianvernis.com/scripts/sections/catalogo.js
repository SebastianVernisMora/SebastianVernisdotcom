// ===== INICIALIZACIÓN DE LA SECCIÓN CATÁLOGO =====
function initializeCatalogoSection() {
    renderizarCatalogo();
    initializeModalHandlers();
}

function renderizarCatalogo() {
    const catalogoLista = document.getElementById('catalogo-lista');
    if (!catalogoLista) return;

    // Datos de proyectos
    const projectsData = [
        {
            id: 'novatech',
            title: 'Novatech',
            description: 'Sitio corporativo para una empresa de tecnología, con un diseño moderno y un sistema de e-commerce simulado.',
            image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1470&auto=format&fit=crop',
            details: {
                gallery: [
                    'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1470&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1470&auto=format&fit=crop'
                ],
                text: 'Novatech es una demo de un sitio web corporativo para una empresa de tecnología. Presenta un diseño limpio y profesional, optimizado para móviles. Incluye un catálogo de productos y una pasarela de pago simulada completa, demostrando la capacidad de integración de un e-commerce robusto.',
                features: ['Diseño Corporativo', 'E-commerce Simulado', 'Optimizado para Móvil']
            }
        },
        {
            id: 'hogar-ideal',
            title: 'Hogar Ideal',
            description: 'Plataforma de bienes raíces con un diseño elegante, catálogo de propiedades y un mapa interactivo de análisis de mercado.',
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1470&auto=format&fit=crop',
            details: {
                gallery: [
                    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1470&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1470&auto=format&fit=crop'
                ],
                text: 'Hogar Ideal es una demo de un portal inmobiliario. Su diseño limpio y luminoso inspira confianza. La funcionalidad clave es un mapa interactivo para el análisis de mercado de rentas, además de un sistema de reserva de citas con pasarela de pago simulada.',
                features: ['Mapa Interactivo (Leaflet)', 'Reserva de Citas', 'Diseño Elegante']
            }
        },
        {
            id: 'manos-que-ayudan',
            title: 'Manos que Ayudan',
            description: 'Sitio para una ONG con un diseño cálido y humano. Incluye un proceso de registro de voluntarios y donaciones en línea.',
            image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=1470&auto=format&fit=crop',
            details: {
                gallery: [
                    'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=1470&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1617796159339-3a3a47016a64?q=80&w=1470&auto=format&fit=crop'
                ],
                text: 'Este proyecto demuestra un sitio web para una Organización No Gubernamental. El diseño busca inspirar confianza y acción. Incluye un formulario de donación con pasarela de pago y un proceso de registro para voluntarios de varios pasos.',
                features: ['Formulario de Donación', 'Registro de Voluntarios', 'Diseño Inspirador']
            }
        },
        {
            id: 'soluciones-expertas',
            title: 'Soluciones Expertas',
            description: 'Web para una firma legal, con un diseño sobrio y una herramienta interactiva para consultar la Constitución.',
            image: 'https://images.unsplash.com/photo-1589216532372-1c2a36790049?q=80&w=1470&auto=format&fit=crop',
            details: {
                gallery: [
                    'https://images.unsplash.com/photo-1589216532372-1c2a36790049?q=80&w=1470&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1556156155-ad7f547fc138?q=80&w=1470&auto=format&fit=crop'
                ],
                text: 'Una demo para un despacho de abogados que proyecta autoridad y confianza. Su característica más destacada es una herramienta de "Constitución Interactiva" con un buscador funcional, además de perfiles de abogados con agendamiento de citas directo.',
                features: ['Herramienta Interactiva', 'Perfiles de Equipo', 'Diseño Corporativo']
            }
        },
        {
            id: 'celebraciones-unicas',
            title: 'Celebraciones Únicas',
            description: 'Sitio para una empresa de planificación de eventos, con un diseño elegante y un cotizador interactivo.',
            image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd51622?q=80&w=1470&auto=format&fit=crop',
            details: {
                gallery: [
                    'https://images.unsplash.com/photo-1511795409834-ef04bbd51622?q=80&w=1470&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1523438885209-e88507f1a308?q=80&w=1374&auto=format&fit=crop'
                ],
                text: 'Este sitio para planificadores de eventos destaca por su diseño sofisticado y cálido. La funcionalidad principal es un cotizador interactivo que permite a los usuarios calcular costos estimados para sus eventos, ya sea eligiendo un paquete o personalizando los servicios.',
                features: ['Cotizador Interactivo', 'Diseño Elegante', 'Galería de Eventos']
            }
        },
        {
            id: 'tu-proximo-nivel',
            title: 'Tu Próximo Nivel',
            description: 'Plataforma educativa para una academia de idiomas, con un portal de alumnos funcional y sistema de pago.',
            image: 'https://images.unsplash.com/photo-1533745848184-3db07256e166?q=80&w=1470&auto=format&fit=crop',
            details: {
                gallery: [
                    'https://images.unsplash.com/photo-1533745848184-3db07256e166?q=80&w=1470&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1470&auto=format&fit=crop'
                ],
                text: 'Demo de un sitio para una academia de idiomas. Su característica principal es un "Portal de Alumnos" con inicio de sesión (usuario: Alumno, pass: Alumno123) que permite ver horarios, descargar materiales y simular el pago de mensualidades.',
                features: ['Portal de Alumnos Simulado', 'Inscripción a Cursos', 'Diseño Moderno']
            }
        },
        {
            id: 'sabores-del-alma',
            title: 'Sabores del Alma',
            description: 'Sitio web para un restaurante de cocina fusión, con un diseño artístico y un sistema de reservas con pago.',
            image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1374&auto=format&fit=crop',
            details: {
                gallery: [
                    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1470&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1552529599-87e33b52a593?q=80&w=1374&auto=format&fit=crop'
                ],
                text: 'Un sitio web para un restaurante de alta cocina que fusiona la gastronomía mexicana y oriental. El diseño oscuro y elegante crea una atmósfera íntima. La funcionalidad clave es un sistema de reservas que permite al cliente garantizar su mesa con un pago en línea.',
                features: ['Diseño Atmosférico', 'Menú Digital', 'Reservas con Pago']
            }
        },
        {
            id: 'hecho-con-amor',
            title: 'Hecho con Amor Boutique',
            description: 'E-commerce para una boutique de moda, con un diseño cálido y un proceso de compra completo y simulado.',
            image: 'https://images.unsplash.com/photo-1551803091-e3e4a644252d?q=80&w=1374&auto=format&fit=crop',
            details: {
                gallery: [
                    'https://images.unsplash.com/photo-1551803091-e3e4a644252d?q=80&w=1374&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?q=80&w=1374&auto=format&fit=crop'
                ],
                text: 'Demo de una tienda en línea para una boutique. Presenta un diseño femenino y artesanal. La funcionalidad principal es un carrito de compras completo, desde añadir productos hasta una pasarela de pago simulada, incluyendo la aplicación de cupones de descuento.',
                features: ['E-commerce Completo', 'Aplicación de Cupones', 'Diseño Cálido']
            }
        },
        {
            id: 'oasis-de-paz',
            title: 'Oasis de Paz',
            description: 'Página para un centro de bienestar, con un diseño minimalista y un sistema de reservas con opción de pago en línea.',
            image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1520&auto=format&fit=crop',
            details: {
                gallery: [
                    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1520&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1506126613408-4e64a386f56d?q=80&w=1470&auto=format&fit=crop'
                ],
                text: 'Un sitio web para un centro de bienestar que transmite calma y serenidad. Su sistema de reservas es flexible, permitiendo al cliente agendar una cita y elegir entre pagar en el establecimiento o realizar el pago en línea a través de una pasarela simulada.',
                features: ['Diseño Minimalista', 'Reservas Flexibles', 'Pasarela de Pago']
            }
        },
        {
            id: 'lienzo-digital',
            title: 'Lienzo Digital',
            description: 'Plataforma para artistas con tienda, filtros de búsqueda, y compra de obras de arte y servicios creativos.',
            image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1470&auto=format&fit=crop',
            details: {
                gallery: [
                    'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1470&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1501139138456-029a061e44b1?q=80&w=1374&auto=format&fit=crop'
                ],
                text: 'Una plataforma para artistas que funciona como galería y tienda. La funcionalidad clave es un portafolio con filtros dinámicos por categoría. Incluye un carrito de compras completo para la venta de obras y un sistema de reserva para servicios creativos.',
                features: ['Filtros de Portafolio', 'E-commerce de Arte', 'Reserva de Servicios']
            }
        }
    ];

    catalogoLista.innerHTML = '';

    projectsData.forEach(project => {
        const card = document.createElement('div');
        card.className = 'bg-[#212121] rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition duration-300 group text-left';
        card.innerHTML = `
            <div class="overflow-hidden h-56">
                <img src="${project.image}" alt="Imagen de ${project.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
            </div>
            <div class="p-6">
                <h3 class="text-xl font-bold mb-2 text-white">${project.title}</h3>
                <p class="text-gray-400 text-sm mb-4">${project.description}</p>
                <button class="view-project-btn button-style text-sm !bg-[#9c27b0] hover:!bg-[#7b1fa2]" data-project-id="${project.id}">Ver Proyecto</button>
            </div>
        `;
        catalogoLista.appendChild(card);
    });

    // Guardar datos para uso en modal
    window.catalogoProjectsData = projectsData;
}

function initializeModalHandlers() {
    const catalogoLista = document.getElementById('catalogo-lista');
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContentBody = document.getElementById('modal-content-body');

    if (catalogoLista) {
        catalogoLista.addEventListener('click', e => {
            const button = e.target.closest('.view-project-btn');
            if (button) {
                openModal(button.dataset.projectId);
            }
        });
    }

    if (modal) {
        modal.addEventListener('click', e => {
            if (e.target.classList.contains('modal') || e.target.classList.contains('close-modal-btn')) {
                closeModal();
            }
        });
    }

    function openModal(projectId) {
        const project = window.catalogoProjectsData?.find(p => p.id === projectId);
        if (!project || !modal || !modalTitle || !modalContentBody) return;

        modalTitle.textContent = project.title;
        modalContentBody.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <img src="${project.details.gallery[0]}" alt="Imagen principal de ${project.title}" class="w-full h-auto object-cover rounded-lg shadow-md mb-4">
                    <div class="grid grid-cols-3 gap-2">
                        ${project.details.gallery.map(img => `<img src="${img}" class="h-20 w-full object-cover rounded-md cursor-pointer hover:opacity-75 transition">`).join('')}
                    </div>
                </div>
                <div class="text-gray-300">
                    <h4 class="font-bold text-lg mb-2 text-white">Descripción del Proyecto</h4>
                    <p class="mb-6">${project.details.text}</p>
                    <h4 class="font-bold text-lg mb-3 text-white">Características Clave</h4>
                    <div class="flex flex-wrap gap-2 mb-6">
                        ${project.details.features.map(feature => `<span class="bg-gray-700 text-gray-200 text-sm font-semibold px-3 py-1 rounded-full">${feature}</span>`).join('')}
                    </div>
                    <a href="proyectos_catalogo/${project.id}/index.html" target="_blank" class="button-style w-full text-center block !bg-[#e91e63] hover:!bg-[#c2185b]">Ver Demo en Vivo</a>
                </div>
            </div>
        `;

        if (typeof feather !== 'undefined') {
            feather.replace();
        }

        modal.classList.remove('hidden');
        setTimeout(() => modal.classList.remove('opacity-0', 'visibility-hidden'), 10);
    }

    function closeModal() {
        if (modal) {
            modal.classList.add('opacity-0', 'visibility-hidden');
            setTimeout(() => modal.classList.add('hidden'), 300);
        }
    }
}

// Ejecutar inicialización
initializeCatalogoSection();
