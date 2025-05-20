document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');

    mobileMenuBtn.addEventListener('click', function() {
        mainNav.classList.toggle('active');
    });

    // Cart count
    updateCartCount();

    // Load featured products
    loadFeaturedProducts();

    // Functions
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        document.getElementById('cart-count').textContent = cart.length;
    }

    function loadFeaturedProducts() {
        const products = [
            {
                id: 1,
                name: 'Wireless Headphones',
                price: 99.99,
                image: 'images/headphones.jpg'
            },
            {
                id: 2,
                name: 'Smart Watch',
                price: 199.99,
                image: 'images/smartwatch.jpg'
            },
            {
                id: 3,
                name: 'Bluetooth Speaker',
                price: 79.99,
                image: 'images/speaker.jpg'
            },
            {
                id: 4,
                name: 'Phone Charger',
                price: 29.99,
                image: 'images/charger.jpg'
            }
        ];

        const productsGrid = document.getElementById('featured-products');
        productsGrid.innerHTML = '';

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-img">
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            `;
            productsGrid.appendChild(productCard);
        });

        // Add event listeners to cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                addToCart(productId);
            });
        });
    }

    function addToCart(productId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Check if product already in cart
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id: productId, quantity: 1 });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        
        // Show notification
        alert('Product added to cart!');
    }
});
