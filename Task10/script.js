
document.addEventListener("DOMContentLoaded", async () => {
    const productContainer = document.getElementById("products");
    const cartBtn = document.getElementById("cart-btn");
    const ordersBtn = document.getElementById("orders-btn");
    const cartModal = document.getElementById("cart-modal");
    const ordersModal = document.getElementById("orders-modal");
    const closeCart = document.getElementById("close-cart");
    const closeOrders = document.getElementById("close-orders");
    const cartItemsList = document.getElementById("cart-items");
    const ordersList = document.getElementById("orders-list");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");
    const categoryFilter = document.getElementById("category-filter");
    const searchInput = document.getElementById("search");
    const checkoutBtn = document.getElementById("checkout-btn");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    let products = [];

    async function fetchProducts() {
        const response = await fetch("https://dummyjson.com/products?limit=150&skip=50");
        const data = await response.json();
        products = data.products;
        displayProducts(products);
        populateCategories(products);
    }

    function displayProducts(Products) {
        productContainer.innerHTML = Products.map(product => `
            <div class="product">
                <img src="${product.thumbnail}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>$${product.price}</p>
                <button class="btn" onclick="addToCart(${product.id}, '${product.title}', ${product.price})">Add to Cart</button>
            </div>
        `).join('');
    }

    function populateCategories(products) {
        const categories = [...new Set(products.map(p => p.category))];
        categoryFilter.innerHTML = `<option value="">All Categories</option>` +
            categories.map(cat => `<option value="${cat}">${cat}</option>`).join('');
    }

    window.addToCart = (id, title, price) => {
        const existingItem = cart.find(item => item.id === id);
        existingItem ? existingItem.quantity++ : cart.push({ id, title, price, quantity: 1 });
        updateCart();
    };

    window.removeFromCart = (index) => {
        cart.splice(index, 1);
        updateCart();
    };

    function updateCart() {
        cartItemsList.innerHTML = cart.map((item, index) => `
            <li>${item.title} - $${item.price} x ${item.quantity} 
                <button class="btn" onclick="removeFromCart(${index})">Remove</button>
            </li>
        `).join('');
        cartTotal.textContent = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    checkoutBtn.addEventListener("click", () => {
        if (cart.length === 0) return alert("Cart is empty!");
        orders.push(...cart);
        cart = [];
        updateCart();
        updateOrders();
        alert("Order placed successfully!");
        localStorage.setItem("orders", JSON.stringify(orders));
        localStorage.setItem("cart", JSON.stringify(cart));
        cartModal.style.display = "none";
    });

    function updateOrders() {
        ordersList.innerHTML = orders.map(item => `<li>${item.title} - $${item.price} x ${item.quantity} = ${item.price*item.quantity}</li>`).join('');
    }

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        displayProducts(products.filter(p => p.title.toLowerCase().includes(query)));
    });

    categoryFilter.addEventListener("change", () => {
        const category = categoryFilter.value;
        displayProducts(category ? products.filter(p => p.category === category) : products);
    });

    cartBtn.addEventListener("click", () => cartModal.style.display = "block");
    ordersBtn.addEventListener("click", () => ordersModal.style.display = "block");
    closeCart.addEventListener("click", () => cartModal.style.display = "none");
    closeOrders.addEventListener("click", () => ordersModal.style.display = "none");

    fetchProducts();
    updateCart();
    updateOrders();
});