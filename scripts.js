// Mostrar y ocultar categorías
function showCategory(category) {
  const allCategories = document.querySelectorAll('.menu-items');
  allCategories.forEach(cat => cat.classList.add('hidden'));

  const selectedCategory = document.getElementById(category);
  selectedCategory.classList.remove('hidden');
}

// Carrito de compras
let cart = [];
let total = 0;

function addToCart(name, price) {
  cart.push({ name, price });
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';
  total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const cartItem = document.createElement('div');
    cartItem.innerHTML = `
      <span>${item.name} - $${item.price.toFixed(2)}</span>
      <button onclick="removeFromCart(${index})">Eliminar</button>
    `;
    cartItems.appendChild(cartItem);
  });

  document.getElementById('cart-total').innerText = `Total: $${total.toFixed(2)}`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function placeOrder() {
  if (cart.length === 0) {
    alert('El carrito está vacío');
    return;
  }

  const orderDetails = cart.map(item => item.name).join(', ');
  alert(`Pedido realizado: ${orderDetails}\nTotal: $${total.toFixed(2)}`);
}
