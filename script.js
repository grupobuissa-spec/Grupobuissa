document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('sliderTrack');
    const slides = document.querySelectorAll('.banner');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    let index = 0;

    function updateSlider() {
        track.style.transform = `translateX(-${index * 100}%)`;
    }

    function nextSlide() {
        index = (index + 1) % slides.length;
        updateSlider();
    }

    function prevSlide() {
        index = (index - 1 + slides.length) % slides.length;
        updateSlider();
    }

    // Botones
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Auto-reproducción cada 6 segundos
    setInterval(nextSlide, 6000);
});