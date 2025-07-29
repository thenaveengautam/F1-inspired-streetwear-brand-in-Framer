const categories = ["Tees", "Jackets", "Caps", "Accessories", "Limited"];
const products = [
    { id: 1, name: "Pole Position Tee", category: "Tees", price: "$49" },
    { id: 2, name: "Turbo Tee", category: "Tees", price: "$59" }
];
let cart = [];

function navigate(page, data) {
    if (page === 'home') return renderHome();
    if (page === 'category') return renderCategory();
    if (page === 'product') return renderProduct(data);
    if (page === 'cart') return renderCart();
    if (page === 'login') return renderAuth('login');
    if (page === 'signup') return renderAuth('signup');
    if (page === 'forgot') return renderAuth('forgot');
}

function renderHome() {
    document.getElementById('app').innerHTML = `
        <div class="hero">
          <h1>F1 Streetwear</h1>
          <button class="btn" onclick="navigate('category')">View All</button>
        </div>
        <div class="container grid">
          ${categories.map((cat, i) => `<div class="card" onclick="${i === 0 ? `navigate('category')` : ``}">${cat}</div>`).join('')}
        </div>
      `;
}

function renderCategory() {
    document.getElementById('app').innerHTML = `
        <div class="container">
          <h2>Tees</h2>
          <div class="grid">
            ${products.map(p => `
              <div class="card" onclick="navigate('product', ${p.id})">
                <p>${p.name}</p>
                <p>${p.price}</p>
              </div>`).join('')}
          </div>
        </div>
      `;
}

function renderProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    document.getElementById('app').innerHTML = `
        <div class="container">
          <input type="text" placeholder="Search..." oninput="filterProducts(this.value)" />
          <div id="product-list" class="grid">
            ${products.map(p => `<div class="card"><p>${p.name}</p><p>${p.price}</p></div>`).join('')}
          </div>
          <hr>
          <h2>${product.name}</h2>
          <p>${product.price}</p>
          <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
      `;
}

function filterProducts(query) {
    const list = document.getElementById('product-list');
    const results = products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
    if (results.length === 0) {
        list.innerHTML = '<p>No items match your search.</p>';
        return;
    }
    list.innerHTML = results.map(p => `<div class="card"><p>${p.name}</p><p>${p.price}</p></div>`).join('');
}

function addToCart(id) {
    const found = cart.find(item => item.id === id);
    if (found) found.qty += 1;
    else cart.push({ id, qty: 1 });
    alert("Item added to cart");
}

function renderCart() {
    const items = cart.map(item => {
        const prod = products.find(p => p.id === item.id);
        return `<div class="card">
          <p>${prod.name}</p>
          <p>Qty: <button onclick="updateQty(${item.id}, -1)">-</button> ${item.qty} <button onclick="updateQty(${item.id}, 1)">+</button></p>
        </div>`;
    }).join('');
    const subtotal = cart.reduce((sum, item) => sum + item.qty * 49, 0);
    document.getElementById('app').innerHTML = `
        <div class="container">
          <h2>Your Cart</h2>
          ${items}
          <p>Subtotal: $${subtotal}</p>
          <button class="btn">Checkout</button>
        </div>
      `;
}

function updateQty(id, change) {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.qty = Math.max(1, item.qty + change);
    renderCart();
}

function renderAuth(mode) {
    document.getElementById('app').innerHTML = `
        <div class="container auth">
          <h2>${mode === 'login' ? 'Login' : mode === 'signup' ? 'Sign Up' : 'Forgot Password'}</h2>
          <input type="email" placeholder="Email">
          ${mode !== 'forgot' ? '<input type="password" placeholder="Password">' : `
            <button>Send OTP</button>
            <input placeholder="Enter OTP">
            <input placeholder="New Password">
          `}
          <button class="btn">Continue</button>
        </div>
      `;
}

navigate('home');