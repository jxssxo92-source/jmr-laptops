// Load orders from localStorage
let orders = JSON.parse(localStorage.getItem("orders")) || [];

const timeline = document.getElementById("orderTimeline");

if (orders.length === 0) {
    timeline.innerHTML = `<p style="color:#cfd8e3; text-align:center;">You have no past orders.</p>`;
} else {
    orders.forEach(order => {
        let itemsHTML = "";

        order.items.forEach(item => {
            itemsHTML += `
                <div>${item.name} × ${item.quantity} — £${item.price * item.quantity}</div>
            `;
        });

        timeline.innerHTML += `
            <div class="order-entry">
                <div class="order-box">
                    <div class="order-header">
                        <span>Order #${order.id}</span>
                        <span>${order.date}</span>
                    </div>

                    <div class="order-items">${itemsHTML}</div>

                    <div class="order-total">Total: £${order.total}</div>
                </div>
            </div>
        `;
    });
}
