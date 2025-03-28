let cart = [];

document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.books-carousel');
    const cards = document.querySelectorAll('.book-card');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    
    let currentIndex = 0;
    const cardsToShow = 4; 
    const totalCards = cards.length;
    
   
    function updateCarousel() {
        
        currentIndex = Math.min(currentIndex, totalCards - cardsToShow);
        
        cards.forEach((card, index) => {
            if (index >= currentIndex && index < currentIndex + cardsToShow) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex >= totalCards - cardsToShow;
    }
    
    
    nextButton.addEventListener('click', () => {
        if (currentIndex < totalCards - cardsToShow) {
            currentIndex++;
            updateCarousel();
        }
    });
    
    
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
    
    
    updateCarousel();

    // Mostrar/ocultar panel del carrito
    const cartButton = document.getElementById('cart-button');
    const cartPanel = document.getElementById('cart-panel');
    
    cartButton.addEventListener('click', () => {
        cartPanel.classList.toggle('active');
    });

    // Agregar listeners a todos los botones "Agregar al carrito"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const bookCard = e.target.closest('.book-card');
            const book = {
                title: bookCard.querySelector('h3').textContent,
                price: parseFloat(bookCard.querySelector('.price').textContent.replace('$', '')),
                quantity: 1
            };
            
            addToCart(book);
            updateCartDisplay();
        });
    });
});

function addToCart(book) {
    const existingItem = cart.find(item => item.title === book.title);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(book);
    }
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    
    // Actualizar contador
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    
    // Actualizar items
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <span>${item.title} (${item.quantity})</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');
    
    // Actualizar total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}
