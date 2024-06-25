let cart = [];
let total = 0;

function toggleSection(sectionId) {
  const sections = document.querySelectorAll('.menu-section');
  sections.forEach(section => {
    if (section.id === sectionId) {
      section.style.display = section.style.display === 'none' ? 'block' : 'none';
    } else {
      section.style.display = 'none';
    }
  });
}

function changeQuantity(id, delta) {
  const input = document.getElementById(id);
  let value = parseInt(input.value) + delta;
  if (value < 0) value = 0;
  if (value > 50) value = 50;
  input.value = value;
}

function addToCart(name, price, quantityId) {
  const quantity = document.getElementById(quantityId).value;
  if (quantity > 0) {
    for (let i = 0; i < quantity; i++) {
      cart.push({ name, price });
    }
    updateCart();
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';
  total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    cartItems.innerHTML += `
      <div class="cart-item">
        <span>${item.name}</span>
        <span>$${item.price}</span>
        <button class="btn-primary" onclick="removeFromCart(${index})">Quitar</button>
      </div>
    `;
  });

  document.getElementById('cart-total').innerText = `Total: $${total}`;
}

function clearCart() {
  cart = [];
  updateCart();
}

function placeOrder() {
  const name = prompt("Por favor, ingrese su nombre:");
  const deliveryOption = prompt("Especifique: 'Domicilio', 'Recoger' o 'En el lugar':");
  let address = '';
  if (deliveryOption.toLowerCase() === 'domicilio') {
    address = prompt("Por favor, ingrese su dirección:");
  }
  const paymentMethod = prompt("Método de pago: 'Bancolombia' o 'Efectivo':");
  let paymentDetails = '';
  if (paymentMethod.toLowerCase() === 'bancolombia') {
    paymentDetails = "Haga el depósito a la cuenta de Bancolombia Ahorro a la Mano: 03186687044.";
  }

  let orderDetails = `Pedido de ${name}\nOpción de entrega: ${deliveryOption}\n`;
  if (address) {
    orderDetails += `Dirección: ${address}\n`;
  }
  orderDetails += `Método de pago: ${paymentMethod}\n${paymentDetails}\nTotal: $${total}\nProductos:\n`;

  cart.forEach(item => {
    orderDetails += `- ${item.name}: $${item.price}\n`;
  });

  const whatsappUrl = `https://wa.me/3186687044?text=${encodeURIComponent(orderDetails)}`;
  window.location.href = whatsappUrl;
}
