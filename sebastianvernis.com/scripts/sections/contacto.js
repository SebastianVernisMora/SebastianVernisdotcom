// ===== INICIALIZACIÓN DE LA SECCIÓN CONTACTO =====
function initializeContactoSection() {
    initializeContactForm();
}

function initializeContactForm() {
    const contactForm = document.getElementById('profilingForm');
    const statusMessage = document.getElementById('form-status-message');

    if (!contactForm) return;

    contactForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        // Validación básica
        const nombre = document.getElementById('contactNombre').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const mensaje = document.getElementById('contactMensaje').value.trim();
        const terminos = document.getElementById('contactTerminos').checked;
        
        if (!nombre || !email || !mensaje || !terminos) {
            showFormMessage('Por favor, completa todos los campos obligatorios y acepta los términos.', 'error');
            return;
        }

        // Validación de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage('Por favor, ingresa un correo electrónico válido.', 'error');
            return;
        }

        // Enviar a la API PHP
        try {
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            
            const response = await fetch('api/contacto.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.success) {
                showFormMessage('¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.', 'success');
                contactForm.reset();
            } else {
                throw new Error(result.error || 'Error al enviar el mensaje');
            }
        } catch (error) {
            console.error('Error:', error);
            showFormMessage('Error al enviar el mensaje. Por favor, intenta de nuevo.', 'error');
        }
        
        // Limpiar mensaje después de 5 segundos
        setTimeout(() => {
            statusMessage.textContent = '';
            statusMessage.className = '';
        }, 5000);
    });

    function showFormMessage(message, type) {
        if (!statusMessage) return;
        
        statusMessage.textContent = message;
        statusMessage.className = type === 'error' ? 'error' : 'success';
    }
}

// Ejecutar inicialización
initializeContactoSection();
