document.addEventListener('DOMContentLoaded', () => {
  // Carrusel horizontal
  const moverCarrusel = (direccion) => {
    const carrusel = document.querySelector('.productos');
    const anchoProducto = carrusel.querySelector('.producto').offsetWidth + 16;
    carrusel.scrollBy({ left: direccion * anchoProducto, behavior: 'smooth' });
  };
  window.moverCarrusel = moverCarrusel;

  // Función para actualizar el número del carrito en la barra de navegación
  const actualizarContadorCarrito = () => {
    const contador = document.getElementById('contador-carrito');
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    if (contador) {
      contador.textContent = totalItems;
    }
  };

  // Agregar productos al carrito con localStorage
  const botones = document.querySelectorAll('.agregar-carrito');

  botones.forEach((btn) => {
    btn.addEventListener('click', () => {
      const producto = btn.closest('.producto');
      const id = producto.dataset.id;
      const nombre = producto.dataset.nombre;
      const precio = parseFloat(producto.dataset.precio);

      const item = { id, nombre, precio, cantidad: 1 };

      let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
      const index = carrito.findIndex(p => p.id === id);

      if (index >= 0) {
        carrito[index].cantidad += 1;
      } else {
        carrito.push(item);
      }

      localStorage.setItem('carrito', JSON.stringify(carrito));
      console.log("Carrito actualizado:", carrito);
      alert(`${nombre} agregado al carrito 🛒`);
      actualizarContadorCarrito(); // Actualiza el número del carrito
    });
  });

  // Leer más / Mostrar menos
  document.querySelectorAll(".leer-mas").forEach(boton => {
    boton.addEventListener("click", () => {
      const articulo = boton.closest(".producto");
      const textoCorto = articulo.querySelector(".texto-corto");
      const textoCompleto = articulo.querySelector(".texto-completo");

      if (textoCompleto.classList.contains("oculto")) {
        textoCompleto.classList.remove("oculto");
        textoCorto.style.display = "none";
        boton.textContent = "Mostrar menos";
      } else {
        textoCompleto.classList.add("oculto");
        textoCorto.style.display = "inline";
        boton.textContent = "Leer más";
      }
    });
  });

  
  actualizarContadorCarrito();
});
