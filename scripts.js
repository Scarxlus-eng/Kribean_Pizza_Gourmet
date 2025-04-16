// Mostrar y ocultar secciones dinámicamente
function showSection(sectionId) {
  // Ocultar todas las secciones
  const sections = document.querySelectorAll('section');
  sections.forEach(section => section.classList.add('hidden'));

  // Mostrar la sección seleccionada
  const sectionToShow = document.getElementById(sectionId);
  sectionToShow.classList.remove('hidden');
}

// Lógica del carrito
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
  const whatsappNumber = "+573186687044";
  const message = `Hola, me gustaría ordenar lo siguiente: ${orderDetails}. Total: $${total.toFixed(2)}`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  window.open(whatsappUrl, '_blank');
}
