/* -----------------------------------------------------------
   GRUPO BUISSA - HERO SLIDER SCRIPT (Optimizado para WPO y UX)
   ----------------------------------------------------------- */

// Usamos una función IIFE para encapsular el código y mejorar WPO
(function() {
  document.addEventListener('DOMContentLoaded', initSlider);

  function initSlider() {
    const track = document.getElementById('sliderTrack');
    const slides = Array.from(track.children);
    const dotsContainer = document.getElementById('dotsContainer');
    const dots = Array.from(dotsContainer.children);
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentIndex = 0;
    const slideCount = slides.length;
    let autoPlayInterval;
    const intervalTime = 6500; // Tiempo agradable para lectura y UX

    // Función principal optimizada para mover el slider
    function updateSlider(index) {
      if (index < 0) index = slideCount - 1;
      if (index >= slideCount) index = 0;

      // Desplazamiento eficiente usando translateX (método WPO recomendado)
      track.style.transform = `translateX(-${index * 100}%)`;

      // Actualización de clases activas para estilos y accesibilidad
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
        // SEO/Accesibilidad: Indicar punto activo
        dot.setAttribute('aria-selected', i === index);
      });

      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
        // SEO/Accesibilidad: Ocultar slides no activos a lectores
        slide.setAttribute('aria-hidden', i !== index);
      });

      currentIndex = index;
    }

    // Funciones de navegación
    function showNext() { updateSlider(currentIndex + 1); }
    function showPrev() { updateSlider(currentIndex - 1); }

    // --- EVENT LISTENERS (UX e Interacciones) ---

    nextBtn.addEventListener('click', () => { showNext(); resetAutoPlay(); });
    prevBtn.addEventListener('click', () => { showPrev(); resetAutoPlay(); });

    // Delegación de eventos para eficiencia en dots
    dotsContainer.addEventListener('click', e => {
      const targetDot = e.target.closest('.dot');
      if (!targetDot) return;
      const targetIndex = parseInt(targetDot.getAttribute('data-index'));
      updateSlider(targetIndex);
      resetAutoPlay();
    });

    // SEO/Accesibilidad: Navegación con teclado
    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    });

    // --- GESTIÓN AUTO-PLAY (UX Profesional) ---

    function startAutoPlay() {
      stopAutoPlay(); // Evitar duplicados
      autoPlayInterval = setInterval(showNext, intervalTime);
    }

    function stopAutoPlay() { clearInterval(autoPlayInterval); }

    function resetAutoPlay() {
      stopAutoPlay();
      // Pequeña pausa antes de reiniciar para no interrumpir lectura
      setTimeout(startAutoPlay, 3000); 
    }

    // Pausar al hover (UX e-commerce)
    track.parentElement.addEventListener('mouseenter', stopAutoPlay);
    track.parentElement.addEventListener('mouseleave', startAutoPlay);

    // --- INICIALIZACIÓN ---
    updateSlider(currentIndex);
    startAutoPlay();
  }
})();