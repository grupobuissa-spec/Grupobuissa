let currentSlideIndex = 1;
showSlides(currentSlideIndex);

function nextSlide() {
  showSlides(currentSlideIndex += 1);
}

function prevSlide() {
  showSlides(currentSlideIndex -= 1);
}

function currentSlide(n) {
  showSlides(currentSlideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("banner");
  let dots = document.getElementsByClassName("dot");

  if (n > slides.length) {currentSlideIndex = 1}    
  if (n < 1) {currentSlideIndex = slides.length}
  
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  
  slides[currentSlideIndex-1].style.display = "block";  
  dots[currentSlideIndex-1].className += " active";
}

// Reproducción automática (opcional)
// setInterval(nextSlide, 5000); // Cambiar cada 5 segundos