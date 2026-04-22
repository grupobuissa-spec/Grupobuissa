/* -----------------------------------------------------------
   GRUPO BUISSA - HERO SLIDER SCRIPT (Optimizado para UX y Rendimiento)
   ----------------------------------------------------------- */

// Usamos una función IIFE para evitar contaminar el ámbito global y para WPO
(function() {
  // Esperamos a que el DOM esté listo
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
    const intervalTime = 6000; // 6 segundos es un tiempo más agradable para leer

    // Función principal para actualizar el slider
    function updateSlider(index) {
      // Validamos el índice para evitar errores
      if (index < 0) index = slideCount - 1;
      if (index >= slideCount) index = 0;

      // Desplazamiento usando translateX (método más eficiente para WPO)
      // Calculamos el desplazamiento basado en el índice actual
      track.style.transform = `translateX(-${index * 100}%)`;

      // Actualizamos clases activas para dots y slides (para accesibilidad y estilos)
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
        // Mejoramos accesibilidad indicando cuál es el dot seleccionado
        dot.setAttribute('aria-selected', i === index);
      });

      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
        // Ocultamos los slides no activos para lectores de pantalla
        slide.setAttribute('aria-hidden', i !== index);
      });

      currentIndex = index;
    }

    // Funciones de navegación (simples y claras)
    function showNext() {
      updateSlider(currentIndex + 1);
    }

    function showPrev() {
      updateSlider(currentIndex - 1);
    }

    // --- EVENT LISTENERS (Gestión de Interacciones) ---

    // Navegación con botones (flechas)
    nextBtn.addEventListener('click', () => {
      showNext();
      resetAutoPlay(); // Resetear temporizador al interactuar manualmente (buena UX)
    });

    prevBtn.addEventListener('click', () => {
      showPrev();
      resetAutoPlay(); // Resetear temporizador al interactuar manualmente
    });

    // Navegación con indicadores (dots)
    dotsContainer.addEventListener('click', e => {
      // Usamos delegación de eventos para mayor eficiencia
      const targetDot = e.target.closest('.dot');
      if (!targetDot) return; // Si no es un dot, ignoramos el clic
      
      const targetIndex = parseInt(targetDot.getAttribute('data-index'));
      updateSlider(targetIndex);
      resetAutoPlay(); // Resetear temporizador
    });

    // Soporte para navegación con teclado (Accesibilidad)
    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    });

    // --- GESTIÓN DE AUTO-PLAY (UX y Rendimiento) ---

    // Función para iniciar la reproducción automática
    function startAutoPlay() {
      // Limpiamos cualquier intervalo previo para evitar duplicados
      stopAutoPlay();
      autoPlayInterval = setInterval(showNext, intervalTime);
    }

    // Función para detener la reproducción automática
    function stopAutoPlay() {
      clearInterval(autoPlayInterval);
    }

    // Función para resetear el temporizador al interactuar
    function resetAutoPlay() {
      stopAutoPlay();
      // Esperamos un momento antes de reiniciar para no interrumpir al usuario
      setTimeout(startAutoPlay, 2000); 
    }

    // Pausar auto-play cuando el mouse está sobre el slider
    track.parentElement.addEventListener('mouseenter', stopAutoPlay);
    track.parentElement.addEventListener('mouseleave', startAutoPlay);

    // --- INICIALIZACIÓN ---
    updateSlider(currentIndex);
    startAutoPlay();
  }
})();