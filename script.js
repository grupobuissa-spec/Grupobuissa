document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('sliderTrack');
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    let index = 0;

    function moveSlider() {
        track.style.transform = `translateX(-${index * 100}%)`;
    }

    nextBtn.addEventListener('click', () => {
        index = (index + 1) % slides.length;
        moveSlider();
    });

    prevBtn.addEventListener('click', () => {
        index = (index - 1 + slides.length) % slides.length;
        moveSlider();
    });

    // Auto-reproducción suave
    let auto = setInterval(() => nextBtn.click(), 6000);

    // Pausar auto-reproducción si el usuario interactúa
    [nextBtn, prevBtn].forEach(btn => {
        btn.addEventListener('mousedown', () => clearInterval(auto));
    });
});