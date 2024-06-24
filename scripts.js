let cart = [];
let total = 0;

function addToCart(name, price) {
  cart.push({name, price});
  updateCart();
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

  document.getElementById('total').innerText = `Total: $${total}`;
}

function clearCart() {
  cart = [];
  updateCart();
}

function placeOrder() {
  const name = prompt("Por favor, ingrese su nombre:");
  const deliveryOption = prompt("Especifique: '1. Domicilio', '2. Recoger' o '3. En el lugar':");
  let address = '';
  if (deliveryOption.toLowerCase() === '1. domicilio') {
    address = prompt("Por favor, ingrese su dirección:");
  }
  const paymentMethod = prompt("Método de pago: '1. Bancolombia' o '2. Efectivo':");
  let paymentDetails = '';
  if (paymentMethod.toLowerCase() === '1. bancolombia') {
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
