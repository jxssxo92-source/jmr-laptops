let cart = JSON.parse(localStorage.getItem("cart")) || [];

const summaryItems = document.getElementById("summaryItems");
const summaryTotal = document.getElementById("summaryTotal");

function loadSummary() {
    summaryItems.innerHTML = "";

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;

        summaryItems.innerHTML += `
            <div class="checkout-summary-item">
                <span>${item.name} × ${item.quantity}</span>
                <span>£${item.price * item.quantity}</span>
            </div>
        `;
    });

    summaryTotal.textContent = "£" + total;
}

loadSummary();

// Save order to history
function saveOrder() {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    const newOrder = {
        id: orders.length + 1,
        date: new Date().toLocaleDateString(),
        items: cart,
        total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    };

    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));
}

// Submit order
document.getElementById("submitOrder").onclick = () => {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    saveOrder();

    alert("Order placed successfully!");

    localStorage.removeItem("cart");
    window.location = "order-history.html";
};
