let cart = [];
let total = 0;

function addToCart(name, price, quantityId) {
  const quantity = document.getElementById(quantityId).value;
  if (quantity > 0) {
    cart.push({name, price, quantity: parseInt(quantity)});
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
    total += item.price * item.quantity;
    cartItems.innerHTML += `
      <div class="cart-item">
        <span>${item.name}</span>
        <span>$${item.price * item.quantity}</span>
        <span>${item.quantity}</span>
        <button class="btn-primary" onclick="removeFromCart(${index})">Quitar</button>
      </div>
    `;
  });

  document.getElementById('cart-total').innerText = `Total: $${total.toFixed(2)}`;
}

function placeOrder() {
  const name = prompt("Por favor, ingrese su nombre:");
  if (!name) {
    alert("Por favor ingrese su nombre para continuar con el pedido.");
    return;
  }

  const deliveryOption = prompt("Especifique: 'Domicilio', 'Recoger' o 'En el lugar':");
  let address = '';
  if (deliveryOption && deliveryOption.toLowerCase() === 'domicilio') {
    address = prompt("Por favor, ingrese su dirección:");
    if (!address) {
      alert("Por favor ingrese su dirección para el pedido a domicilio.");
      return;
    }
  }

  const paymentMethod = prompt("Método de pago: 'Bancolombia' o 'Efectivo':");
  if (!paymentMethod) {
    alert("Por favor seleccione un método de pago para continuar.");
    return;
  }

  let paymentDetails = '';
  if (paymentMethod.toLowerCase() === 'bancolombia') {
    paymentDetails = "Haga el depósito a la cuenta de Bancolombia Ahorro a la Mano: 03186687044.";
  }

  let orderDetails = `Pedido de ${name}\nOpción de entrega: ${deliveryOption}\n`;
  if (address) {
    orderDetails += `Dirección: ${address}\n`;
  }
  orderDetails += `Método de pago: ${paymentMethod}\n${paymentDetails}\nTotal: $${total.toFixed(2)}\nProductos:\n`;

  cart.forEach(item => {
    orderDetails += `- ${item.name}: $${(item.price * item.quantity).toFixed(2)} x ${item.quantity}\n`;
  });

  const whatsappUrl = `https://api.whatsapp.com/send?phone=573186687044&text=${encodeURIComponent(orderDetails)}`;
  window.open(whatsappUrl, '_blank'); // Abre el enlace en una nueva pestaña
}

function clearCart() {
  cart = [];
  updateCart();
}
