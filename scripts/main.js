// ===== SISTEMA DE CARGA DE COMPONENTES =====
class ComponentLoader {
    constructor() {
        this.loadedComponents = new Set();
        this.loadedSections = new Set();
    }

    async loadComponent(componentName, targetSelector) {
        if (this.loadedComponents.has(componentName)) return;
        
        try {
            const response = await fetch(`components/${componentName}.html`);
            const html = await response.text();
            const target = document.querySelector(targetSelector);
            if (target) {
                target.innerHTML = html;
                this.loadedComponents.add(componentName);
            }
        } catch (error) {
            console.error(`Error loading component ${componentName}:`, error);
        }
    }

    async loadSection(sectionName, targetSelector) {
        try {
            const response = await fetch(`sections/${sectionName}.html`);
            const html = await response.text();
            const target = document.querySelector(targetSelector);
            if (target) {
                target.innerHTML = html;
                this.loadedSections.add(sectionName);
            }
        } catch (error) {
            console.error(`Error loading section ${sectionName}:`, error);
            throw error;
        }
    }
}

// ===== INICIALIZACIÓN =====
const componentLoader = new ComponentLoader();

document.addEventListener('DOMContentLoaded', async () => {
    // Cargar componentes principales
    await componentLoader.loadComponent('header', '#header-container');
    await componentLoader.loadComponent('footer', '#footer-container');
    await componentLoader.loadComponent('modals', '#modals-container');
    
    // Cargar sección inicial
    await componentLoader.loadSection('hero', '#content-container');
    
    // Inicializar Feather Icons
    if (typeof feather !== 'undefined') {
        feather.replace();
    }

    // Inicializar funcionalidades
    initializeNavigation();
    initializeData();
    initializeFormHandlers();
});

// ===== NAVEGACIÓN =====
function initializeNavigation() {
    // Esperar a que el header se cargue antes de agregar event listeners
    setTimeout(() => {
        const navLinks = document.querySelectorAll('header nav a');
        
        navLinks.forEach(link => {
            link.addEventListener('click', async function(event) {
                const href = this.getAttribute('href');
                if (href && href.startsWith('#')) {
                    event.preventDefault();
                    const targetId = href.substring(1);
                    await handleLinkClick(event, targetId);
                }
            });
        });
    }, 200);
}

window.handleLinkClick = async function(event, targetId, subject = '') {
    if (event && typeof event.preventDefault === 'function') { 
        event.preventDefault(); 
    }
    
    // Mostrar loading
    const contentContainer = document.querySelector('#content-container');
    if (contentContainer) {
        contentContainer.innerHTML = '<div style="text-align: center; padding: 2rem; color: #ccc;">Cargando...</div>';
    }
    
    try {
        // Cargar la sección correspondiente
        let sectionFile = targetId;
        if (targetId === 'inicio') sectionFile = 'hero';
        
        await componentLoader.loadSection(sectionFile, '#content-container');
        
        // Actualizar navegación activa
        updateActiveNavigation(targetId);
        
        // Scroll suave
        scrollToTop();
        
        // Inicializar funcionalidades específicas de la sección
        await initializeSectionSpecific(targetId);
        
        // Manejar prellenado de contacto
        if (targetId === 'contacto' && subject) {
            handleContactPrefill(subject);
        }
        
        // Inicializar Feather Icons después de cargar contenido
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
        
    } catch (error) {
        console.error('Error loading section:', error);
        if (contentContainer) {
            contentContainer.innerHTML = '<div style="text-align: center; padding: 2rem; color: #f44336;">Error al cargar la sección. Por favor, intenta de nuevo.</div>';
        }
    }
}

function updateActiveNavigation(targetId) {
    const navLinks = document.querySelectorAll('header nav a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.toggle('activo', href && href.substring(1) === targetId);
    });
}

function scrollToTop() {
    const headerOffset = document.querySelector('header nav')?.offsetHeight || 70;
    window.scrollTo({ 
        top: headerOffset, 
        behavior: 'smooth' 
    });
}

// ===== INICIALIZACIÓN DE SECCIONES ESPECÍFICAS =====
async function initializeSectionSpecific(sectionId) {
    switch(sectionId) {
        case 'inicio':
        case 'hero':
            await initializeHero();
            break;
        case 'servicios':
            await initializeServicios();
            break;
        case 'catalogo':
            await initializeCatalogo();
            break;
        case 'cotizador':
            await initializeCotizador();
            break;
        case 'contacto':
            await initializeContacto();
            break;
    }
}

// ===== DATOS BASE =====
function initializeData() {
    // Datos multimedia
    window.multimediaData = {
        "vid_landing_page": "Media/Landing%20Pages/Video_de_Landing_Page_Generado.mp4",
        "anim_api": "Media/Ciberseguridad/Video_Listo_CRM_ERP_App.mp4",
        "vid_ecommerce": "Media/Tienda/Tienda_Online_Video_Listo.mp4",
        "img_payment_gateways": "Media/Pagos/artbot_img_5_cyberpunk_Un_dise_o_gr_fico_profesional_.png",
        "anim_cobros": "Media/Pagos/Video_de_Flujo_de_Transacciones.mp4",
        "img_social_profiles": "Media/Redes%20Sociales/artbot_img_5_cyberpunk__Un_collage_din_mico_con_los_l.png",
        "img_seo_local": "Media/SEO/2%20(5).png",
        "img_ads": "Media/Redes%20Sociales/artbot_img_9_cyberpunk_Un_mockup_de_un_anuncio_de_Ins.png",
        "img_mantenimiento": "Media/Ciberseguridad/artbot_img_7_cyberpunk__Una_imagen_central_de_un_escu.png",
        "img_consultoria": "Media/Ciberseguridad/artbot_img_4_cyberpunk_Mano_organizando_bloques_de_co.png",
        "img_sobre_mi": "Media/AVATARES/logo%20(1).png",
        "logo": "Media/AVATARES/LOGO.png",
        "img_tienda_asesoria": "Media/Ciberseguridad/artbot_img_9_cyberpunk__Una_imagen_profesional_y_limp.png",
        "img_tienda_landing": "Media/Landing%20Pages/artbot_img_6_cyberpunk_Landing_page_elegante_y_modern.png",
        "img_tienda_ecommerce": "Media/Tienda/artbot_img_2_cyberpunk__Una_composici_n_de_varios_pro.png",
        "img_tienda_redes": "Media/Redes%20Sociales/artbot_img_3_cyberpunk__Un_dise_o_gr_fico_con_los_log.png",
        "img_tienda_mantenimiento": "Media/Ciberseguridad/artbot_img_9_cyberpunk_Escudo_protegiendo_un_sitio_we.png",
        "img_tienda_seo": "Media/Ciberseguridad/artbot_img_5_cyberpunk__Una_imagen_de_un_reporte_o_da.png",
        "img_tienda_branding": "Media/Landing%20Pages/artbot_img_6_cyberpunk__Un__moodboard__digital_que_mu.png",
        "img_tienda_gestion_redes": "Media/Redes%20Sociales/artbot_img_1_cyberpunk__Una_composici_n_visual_que_mu.png",
        "img_tienda_vulnerabilidades": "Media/Ciberseguridad/artbot_img_7_cyberpunk__Un__cono_de_un_sitio_web_prot.png",
        "img_tienda_hardening": "Media/Ciberseguridad/Video_Listo_Seguridad_Web.mp4",
        "img_tienda_consultoria_cyber": "Media/Ciberseguridad/artbot_img_9_cyberpunk__Una_imagen_de_una_persona_en_.png"
    };

    // Mapeo multimedia para servicios
    window.multimediaMap = {
        'Diseño de Landing Page Optimizada': 'vid_landing_page',
        'Desarrollo de APIs Personalizadas': 'anim_api',
        'E-commerce Básico (Tienda Online Sencilla)': 'vid_ecommerce',
        'Integración de Pasarelas de Pago (Stripe, PayPal)': 'img_payment_gateways',
        'Gestión de APIs para Cobros Digitales': 'anim_cobros',
        'Creación Básica de Perfiles en Redes Sociales': 'img_social_profiles',
        'SEO Local para Negocios Físicos': 'img_seo_local',
        'Campañas de Publicidad en Redes (Ads)': 'img_ads',
        'Mantenimiento Web y Soporte Técnico': 'img_mantenimiento',
        'Consultoría Estratégica Digital (Completa)': 'img_consultoria'
    };
}

// ===== MANEJADORES DE FORMULARIOS =====
function initializeFormHandlers() {
    // Se inicializarán cuando se carguen las secciones específicas
}

function handleContactPrefill(subject) {
    setTimeout(() => {
        const mensajeTextarea = document.getElementById('contactMensaje');
        const servicioSelect = document.getElementById('contactServicioInteres');
        
        if (mensajeTextarea && servicioSelect) {
            let prefilledMessage = `Hola, estoy interesado/a en el servicio: ${subject}.\n\n`;
            
            // Buscar coincidencia en el select
            let foundMatch = false;
            for(let i = 0; i < servicioSelect.options.length; i++){
                const optionText = servicioSelect.options[i].textContent.toLowerCase();
                const optionValue = servicioSelect.options[i].value.toLowerCase();
                const subjectClean = subject.toLowerCase().split('(')[0].trim();
                
                if(optionText.includes(subjectClean) || optionValue.includes(subjectClean.replace(/\s+/g, '_'))) {
                    servicioSelect.value = servicioSelect.options[i].value;
                    foundMatch = true;
                    break;
                }
            }
            
            if (!foundMatch) { 
                servicioSelect.value = "otro"; 
            }
            
            mensajeTextarea.value = prefilledMessage;
            mensajeTextarea.focus();
        }
    }, 100);
}

// ===== FUNCIONES DE INICIALIZACIÓN DE SECCIONES =====
// Estas se cargarán desde archivos separados
async function initializeHero() {
    // Cargar script específico del hero
    if (!window.heroInitialized) {
        await loadScript('scripts/sections/hero.js');
        window.heroInitialized = true;
    }
}

async function initializeServicios() {
    if (!window.serviciosInitialized) {
        await loadScript('scripts/sections/servicios.js');
        window.serviciosInitialized = true;
    }
}

async function initializeCatalogo() {
    if (!window.catalogoInitialized) {
        await loadScript('scripts/sections/catalogo.js');
        window.catalogoInitialized = true;
    }
}

async function initializeCotizador() {
    if (!window.cotizadorInitialized) {
        await loadScript('scripts/sections/cotizador.js');
        window.cotizadorInitialized = true;
    }
}

async function initializeContacto() {
    if (!window.contactoInitialized) {
        await loadScript('scripts/sections/contacto.js');
        window.contactoInitialized = true;
    }
}

// ===== UTILIDAD PARA CARGAR SCRIPTS =====
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}
