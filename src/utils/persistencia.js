export function guardarCarrito(carrito) {
  localStorage.setItem(
    "carrito",
    JSON.stringify(carrito)
  );
}

export function guardarProductos(productos) {
  localStorage.setItem(
    "productos",
    JSON.stringify(productos)
  );
}
