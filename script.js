(function() {
  document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('sliderTrack');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;

    function updateSlider(index) {
      const slideCount = track.children.length;
      if (index < 0) index = slideCount - 1;
      if (index >= slideCount) index = 0;

      track.style.transform = `translateX(-${index * 100}%)`;
      
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
      currentIndex = index;
    }

    document.getElementById('nextBtn').addEventListener('click', () => updateSlider(currentIndex + 1));
    document.getElementById('prevBtn').addEventListener('click', () => updateSlider(currentIndex - 1));

    // Ajuste automático al cambiar tamaño de pantalla
    window.addEventListener('resize', () => {
      track.style.transition = 'none';
      updateSlider(currentIndex);
      setTimeout(() => { track.style.transition = 'transform 0.7s ease'; }, 50);
    });

    setInterval(() => updateSlider(currentIndex + 1), 6000);
  });
})();