function mostrarCarrito() {
  const lista = document.getElementById('lista-carrito');
  const totalSpan = document.getElementById('total-carrito');
  const totalProductosSpan = document.getElementById('total-productos');
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  localStorage.setItem('carrito', JSON.stringify(carrito));
  console.log("Carrito actualizado:", carrito);

  lista.innerHTML = '';
  let totalPrecio = 0;
  let totalItems = 0;

  if (carrito.length === 0) {
    lista.innerHTML = '<p>No hay productos en el carrito.</p>';
    totalSpan.textContent = '0';
    totalProductosSpan.textContent = '0';
    return;
  }

  carrito.forEach(item => {
    const div = document.createElement('div');
    div.className = 'item-carrito';
    div.innerHTML = `
      <div>
        <h4>${item.nombre}</h4>
        <p>Cantidad: ${item.cantidad}</p>
        <p>Precio: $${item.precio}</p>
      </div>
      <button onclick="eliminarItem('${item.id}')">Eliminar</button>
    `;
    lista.appendChild(div);

    totalPrecio += item.precio * item.cantidad;
    totalItems += item.cantidad;
  });

  totalSpan.textContent = totalPrecio.toLocaleString();
  totalProductosSpan.textContent = totalItems;
}

function eliminarItem(id) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito = carrito.filter(item => item.id !== id);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  mostrarCarrito();
}

function vaciarCarrito() {
  localStorage.removeItem('carrito');
  mostrarCarrito();
}

document.addEventListener('DOMContentLoaded', mostrarCarrito);
