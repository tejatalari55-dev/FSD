const fruits = [
    { id: 1, name: "Juicy Apple", price: 1.99, icon: "🍎", color: "#ffcdd2", category: "Other", description: "Crispy, sweet, and perfect for a healthy snack! An apple a day keeps the doctor away! 🍎✨", funFact: "Apples are members of the rose family!" },
    { id: 2, name: "Tropical Banana", price: 0.99, icon: "🍌", color: "#fff9c4", category: "Tropical", description: "The ultimate energy booster! Naturally wrapped and ready to go. 🍌⚡", funFact: "Bananas are technically berries, but strawberries aren't!" },
    { id: 3, name: "Sweet Strawberry", price: 3.49, icon: "🍓", color: "#f8bbd0", category: "Berries", description: "Tiny, red, and bursting with sweetness! Perfect for desserts or just munching. 🍓🍰", funFact: "Strawberries are the only fruit with seeds on the outside!" },
    { id: 4, name: "Zesty Orange", price: 1.49, icon: "🍊", color: "#ffe0b2", category: "Citrus", description: "Packed with Vitamin C to keep you glowing and healthy! Super juicy. 🍊☀️", funFact: "Oranges were first grown in Southeast Asia!" },
    { id: 5, name: "Cool Watermelon", price: 4.99, icon: "🍉", color: "#c8e6c9", category: "Other", description: "The ultimate summer refresher! 92% water and 100% delicious. 🍉🌊", funFact: "Watermelons are both a fruit AND a vegetable!" },
    { id: 6, name: "Sun-kissed Mango", price: 2.99, icon: "🥭", color: "#ffecb3", category: "Tropical", description: "The king of fruits! Velvety smooth and intensely sweet. 🥭👑", funFact: "Mangoes were first cultivated in India over 5,000 years ago!" },
    { id: 7, name: "Royal Grapes", price: 3.99, icon: "🍇", color: "#e1bee7", category: "Other", description: "Elegant little globes of sweetness. Perfect for sharing! 🍇💎", funFact: "Grapes explode if you put them in the microwave!" },
    { id: 8, name: "Exotic Kiwi", price: 2.49, icon: "🥝", color: "#dcedc8", category: "Other", description: "Fuzzy on the outside, vibrant green and tangy on the inside! 🥝🥝", funFact: "Kiwis contain more Vitamin C than oranges!" },
    { id: 9, name: "Wild Blueberries", price: 4.29, icon: "🫐", color: "#c5cae9", category: "Berries", description: "Tiny powerhouses of antioxidants! Great for your brain. 🫐🧠", funFact: "Blueberries protect against memory loss!" },
    { id: 10, name: "Sweet Pineapple", price: 3.79, icon: "🍍", color: "#fff9c4", category: "Tropical", description: "Spiky on the outside, golden and sweet on the inside! 🍍🍍", funFact: "A pineapple can take up to 3 years to grow and mature!" },
    { id: 11, name: "Sour Lemon", price: 0.79, icon: "🍋", color: "#fff9c4", category: "Citrus", description: "Add a zing to your life! Perfect for lemonade or adding a kick to dishes. 🍋⚡", funFact: "Lemon trees can produce up to 600lbs of lemons a year!" },
    { id: 12, name: "Fuzzy Peach", price: 2.19, icon: "🍑", color: "#ffccbc", category: "Other", description: "Soft, fuzzy, and incredibly juicy. A true summer delight! 🍑🍑", funFact: "Peaches were once known as 'Persian apples'!" }
];

// App State
let cart = [];
let currentFilter = 'all';
let searchQuery = '';

// DOM Elements
const productGrid = document.getElementById('product-grid');
const cartCountElement = document.getElementById('cart-count');
const cartDrawer = document.getElementById('cart-drawer');
const drawerOverlay = document.getElementById('drawer-overlay');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotalPriceElement = document.getElementById('cart-total-price');
const searchInput = document.getElementById('search-input');
const filterBtns = document.querySelectorAll('.filter-btn');
const themeToggle = document.getElementById('theme-toggle');
const productModal = document.getElementById('product-modal');
const modalBody = document.getElementById('modal-body');

// 1. Theme Logic
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light-theme';
    document.body.className = savedTheme;
}

themeToggle.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('light-theme') ? 'dark-theme' : 'light-theme';
    document.body.className = newTheme;
    localStorage.setItem('theme', newTheme);
});

// 2. Rendering Products
function renderProducts() {
    const filteredFruits = fruits.filter(fruit => {
        const matchesCategory = currentFilter === 'all' || fruit.category === currentFilter;
        const matchesSearch = fruit.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (filteredFruits.length === 0) {
        productGrid.innerHTML = `<div class="no-results">No fruits found for your search! 🍎❓</div>`;
        return;
    }

    productGrid.innerHTML = filteredFruits.map(fruit => `
        <div class="product-card glass" style="background-color: ${fruit.color}33" onclick="openProductModal(${fruit.id})">
            <span class="product-image">${fruit.icon}</span>
            <h3 class="product-name">${fruit.name}</h3>
            <p class="product-price">$${fruit.price.toFixed(2)}</p>
            <button class="add-btn" onclick="event.stopPropagation(); addToCart(${fruit.id})">Add to Bag!</button>
        </div>
    `).join('');
}

// 3. Cart Logic
function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<div class="empty-cart-msg">Your bag is empty! Fill it with colors! 🌈</div>`;
        cartTotalPriceElement.textContent = '$0.00';
        return;
    }

    cartItemsContainer.innerHTML = cart.map(item => {
        const fruit = fruits.find(f => f.id === item.id);
        return `
            <div class="cart-item glass">
                <span class="cart-item-icon">${fruit.icon}</span>
                <div class="cart-item-info">
                    <div class="cart-item-name">${fruit.name}</div>
                    <div class="cart-item-price">$${(fruit.price * item.quantity).toFixed(2)}</div>
                    <div class="cart-item-controls">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    const totalPrice = cart.reduce((sum, item) => {
        const fruit = fruits.find(f => f.id === item.id);
        return sum + (fruit.price * item.quantity);
    }, 0);
    cartTotalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
}

window.addToCart = function(id) {
    const fruit = fruits.find(f => f.id === id);
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: id, quantity: 1 });
    }
    updateCartUI();
    
    // Animation feedback
    const btn = document.getElementById('cart-summary-btn');
    btn.classList.add('pulse-animation');
    setTimeout(() => btn.classList.remove('pulse-animation'), 500);
    
    // Flying fruit effect
    createFlyingFruit(fruit.icon);
};

function createFlyingFruit(icon) {
    const flyer = document.createElement('div');
    flyer.className = 'flying-fruit-animation';
    flyer.textContent = icon;
    
    // Start at a random position near the middle-bottom or follow the click?
    // Let's just start at a fixed spot for simplicity or use mouse position if we had the event.
    // Since we don't have the event easily here (passed from onclick), let's just pop it from the center.
    flyer.style.left = '50%';
    flyer.style.top = '80%';
    flyer.style.opacity = '1';
    
    document.body.appendChild(flyer);
    
    // Animate to the cart icon
    const cartBtn = document.getElementById('cart-summary-btn');
    const rect = cartBtn.getBoundingClientRect();
    
    setTimeout(() => {
        flyer.style.left = (rect.left + rect.width / 2) + 'px';
        flyer.style.top = (rect.top + rect.height / 2) + 'px';
        flyer.style.transform = 'scale(0.2) rotate(360deg)';
        flyer.style.opacity = '0.5';
    }, 10);
    
    setTimeout(() => {
        flyer.remove();
    }, 800);
}

window.updateQuantity = function(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
    }
    updateCartUI();
};

// 4. Modal Logic
window.openProductModal = function(id) {
    const fruit = fruits.find(f => f.id === id);
    modalBody.innerHTML = `
        <span class="modal-icon bounce-animation">${fruit.icon}</span>
        <h2 class="section-title">${fruit.name}</h2>
        <p class="modal-desc" style="font-size: 1.2rem; margin-bottom: 15px;">${fruit.description}</p>
        <div class="fun-fact" style="background: var(--secondary-accent); padding: 15px; border-radius: 20px; margin-bottom: 25px; font-weight: 700;">
            Did you know? 🤔<br>${fruit.funFact}
        </div>
        <p class="product-price" style="font-size: 2rem;">$${fruit.price.toFixed(2)}</p>
        <button class="cta-button" onclick="addToCart(${fruit.id})">Add to Bag! 🛍️</button>
    `;
    productModal.classList.add('open');
};

function closeModal() {
    productModal.classList.remove('open');
}

// 5. Filtering & Search
searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderProducts();
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.category;
        renderProducts();
    });
});

// 6. Background Decorations
function createDecorations() {
    const container = document.getElementById('bg-decorations');
    const icons = ['🍎', '🍌', '🍓', '🍊', '🍉', '🍍', '🍇', '🥝'];
    for (let i = 0; i < 15; i++) {
        const icon = document.createElement('span');
        icon.className = 'floating-fruit';
        icon.textContent = icons[Math.floor(Math.random() * icons.length)];
        icon.style.left = Math.random() * 100 + 'vw';
        icon.style.top = Math.random() * 100 + 'vh';
        icon.style.animationDelay = Math.random() * 10 + 's';
        icon.style.animationDuration = (10 + Math.random() * 20) + 's';
        container.appendChild(icon);
    }
}

// 7. Drawer Logic
document.getElementById('cart-summary-btn').addEventListener('click', () => {
    cartDrawer.classList.add('open');
    drawerOverlay.classList.add('visible');
});

document.getElementById('close-drawer').addEventListener('click', closeDrawer);
drawerOverlay.addEventListener('click', closeDrawer);
document.getElementById('close-modal').addEventListener('click', closeModal);

function closeDrawer() {
    cartDrawer.classList.remove('open');
    drawerOverlay.classList.remove('visible');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    renderProducts();
    createDecorations();
    
    // Hero scroll
    document.querySelector('.cta-button').addEventListener('click', () => {
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    });
});