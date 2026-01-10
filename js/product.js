// =========================
// GET PRODUCT ID FROM URL
// =========================

const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get("id"));

const products = [
    { id: 1, name: "Dell XPS 13", specs: "Intel i7, 16GB RAM, 512GB SSD", price: 950, image: "images/dell.jpg" },
    { id: 2, name: "MacBook Pro 14\"", specs: "M1 Pro, 16GB RAM, 512GB SSD", price: 1800, image: "images/mac.jpg" },
    { id: 3, name: "HP Spectre x360", specs: "Intel i5, 8GB RAM, 256GB SSD", price: 850, image: "images/hp.jpg" }
];

const product = products.find(p => p.id === productId);

// =========================
// LOAD PRODUCT DETAILS
// =========================

document.getElementById("product-image").src = product.image;
document.getElementById("product-name").textContent = product.name;
document.getElementById("product-specs").textContent = product.specs;
document.getElementById("product-price").textContent = "£" + product.price;

// =========================
// CART SYSTEM (same as script.js)
// =========================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cartCount").textContent = count;
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

const cartBtn = document.getElementById("cartBtn");
const cartPanel = document.getElementById("cartPanel");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");

cartBtn.onclick = () => {
    cartPanel.classList.add("active");
    cartOverlay.classList.add("active");
    loadCartPanel();
};

closeCart.onclick = () => {
    cartPanel.classList.remove("active");
    cartOverlay.classList.remove("active");
};

cartOverlay.onclick = closeCart;

function loadCartPanel() {
    const container = document.getElementById("cartItems");
    const totalEl = document.getElementById("cartTotal");

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
// BUY NOW POPUP
// =========================

const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");
const modalCancel = document.getElementById("modalCancel");
const buyNowBtn = document.getElementById("buyNowBtn");

buyNowBtn.onclick = () => {
    modalOverlay.style.display = "flex";
};

modalClose.onclick = () => {
    modalOverlay.style.display = "none";
};

modalCancel.onclick = () => {
    modalOverlay.style.display = "none";
};

// Add to cart button
document.getElementById("addToCartBtn").onclick = () => {
    addToCart(product);
};

updateCartCount();
