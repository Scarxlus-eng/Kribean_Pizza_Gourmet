function toggleSection(sectionId) {
  const section = document.getElementById(sectionId);
  const arrow = document.getElementById(`arrow-${sectionId}`);

  if (section.classList.contains('hide')) {
    section.classList.remove('hide');
    section.classList.add('show');
    arrow.innerHTML = '▲'; // Cambia la flecha a arriba
  } else {
    section.classList.remove('show');
    section.classList.add('hide');
    arrow.innerHTML = '▼'; // Cambia la flecha a abajo
  }
}

function addToCart(name, price) {
  // Implementa la lógica para añadir al carrito
}

function clearCart() {
  // Implementa la lógica para limpiar el carrito
}

function placeOrder() {
  // Implementa la lógica para realizar el pedido
}
