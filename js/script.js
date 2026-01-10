// =========================
// PRODUCT LIST DATA
// =========================
const products = [
    { id: 1, name: "Dell XPS 13", specs: "Intel i7, 16GB RAM, 512GB SSD", price: 950, image: "images/dell.jpg" },
    { id: 2, name: "MacBook Pro 14\"", specs: "M1 Pro, 16GB RAM, 512GB SSD", price: 1800, image: "images/mac.jpg" },
    { id: 3, name: "HP Spectre x360", specs: "Intel i5, 8GB RAM, 256GB SSD", price: 850, image: "images/hp.jpg" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// =========================
// CART HELPERS
// =========================
function updateCartCount() {
    const badge = document.getElementById("cartCount");
    if (!badge) return;

    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = count;
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    loadCartPanel();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    loadCartPanel();
}

// =========================
// CART PANEL UI
// =========================
function loadCartPanel() {
    const container = document.getElementById("cartItems");
    const totalEl = document.getElementById("cartTotal");

    if (!container || !totalEl) return;

    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = `<p class="cart-empty">Your cart is empty.</p>`;
        totalEl.textContent = "£0";
        return;
    }

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;

        container.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <span>£${item.price} × ${item.quantity}</span>
                </div>
                <span class="cart-item-remove" onclick="removeFromCart(${item.id})">✖</span>
            </div>
        `;
    });

    totalEl.textContent = "£" + total;
}

// =========================
// INITIALIZE PAGE
// =========================
document.addEventListener("DOMContentLoaded", () => {
    // ----- Render products (only if productGrid exists) -----
    const grid = document.getElementById("productGrid");
    if (grid) {
        products.forEach(p => {
            grid.innerHTML += `
                <a class="product-card" href="product.html?id=${p.id}">
                    <img src="${p.image}" alt="${p.name}">
                    <h3>${p.name}</h3>
                    <p>${p.specs}</p>
                    <span class="price">£${p.price}</span>
                </a>
            `;
        });
    }

    // ----- Cart panel events (only if elements exist) -----
    const cartBtn = document.getElementById("cartBtn");
    const cartPanel = document.getElementById("cartPanel");
    const cartOverlay = document.getElementById("cartOverlay");
    const closeCart = document.getElementById("closeCart");

    if (cartBtn && cartPanel && cartOverlay && closeCart) {
        cartBtn.onclick = () => {
            cartPanel.classList.add("active");
            cartOverlay.classList.add("active");
            loadCartPanel();
        };

        closeCart.onclick = () => {
            cartPanel.classList.remove("active");
            cartOverlay.classList.remove("active");
        };

        cartOverlay.onclick = () => {
            cartPanel.classList.remove("active");
            cartOverlay.classList.remove("active");
        };
    }

    // Sync cart badge + panel on load
    updateCartCount();
    loadCartPanel();
});
