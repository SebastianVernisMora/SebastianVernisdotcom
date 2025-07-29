// ===== INICIALIZACIÓN DE LA SECCIÓN HERO =====
function initializeHeroSection() {
    renderizarSobreMi();
    renderizarProceso();
}

function renderizarSobreMi() {
    const sobreMiMedia = document.getElementById('sobre-mi-media');
    if (sobreMiMedia && window.multimediaData && window.multimediaData.img_sobre_mi) {
        sobreMiMedia.innerHTML = `<img src="${window.multimediaData.img_sobre_mi}" alt="Foto de Sebastian Vernis">`;
    }
}

function renderizarProceso() {
    const procesoContenedor = document.getElementById('proceso-pasos-container');
  
    // Definimos los pasos en un array
    const procesoData = [
      { icono: "💬", titulo: "1. Descubrimiento", texto: "Escuchamos tus ideas, analizamos tus necesidades y definimos juntos los objetivos del proyecto." },
      { icono: "🎨", titulo: "2. Diseño y Estrategia", texto: "Creamos un plan detallado y un diseño visual atractivo y funcional centrado en el usuario." },
      { icono: "💻", titulo: "3. Desarrollo", texto: "Construimos tu solución digital utilizando las tecnologías más adecuadas y eficientes." },
      { icono: "🚀", titulo: "4. Lanzamiento y Optimización", texto: "Implementamos, probamos exhaustivamente y lanzamos tu proyecto. Luego, optimizamos." }
    ];
  
    if (procesoContenedor) {
      procesoContenedor.innerHTML = procesoData
        .map(paso => `
          <div class="proceso-paso">
            <div class="paso-icono">${paso.icono}</div>
            <h3>${paso.titulo}</h3>
            <p>${paso.texto}</p>
          </div>
        `)
        .join('');
    }
  }
  


// Ejecutar inicialización
initializeHeroSection();
