document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.catalogo-books-carousel');
    const prevButton = document.querySelector('.catalogo-carousel-button.prev');
    const nextButton = document.querySelector('.catalogo-carousel-button.next');
    
    const cardWidth = 320; // ancho de la tarjeta + gap
    
    nextButton.addEventListener('click', () => {
        carousel.scrollBy({
            left: cardWidth,
            behavior: 'smooth'
        });
    });
    
    prevButton.addEventListener('click', () => {
        carousel.scrollBy({
            left: -cardWidth,
            behavior: 'smooth'
        });
    });
}); 