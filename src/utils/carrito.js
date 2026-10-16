export function agregarAlCarrito(carrito, producto) {
  const yaExiste = carrito.some((item) => item.codigo === producto.codigo);

  if (yaExiste) {
    return carrito.map((item) =>
      item.codigo === producto.codigo
        ? { ...item, cantidad: item.cantidad + 1 }
        : item
    );
  }

  return [...carrito, { codigo: producto.codigo, cantidad: 1 }];
}

export function quitarDelCarrito(carrito, codigo) {
  return carrito.filter((item) => item.codigo !== codigo);
}

export function calcularTotal(carrito, productos) {
  let total = 0;

  for (const item of carrito) {
    const producto = productos.find((p) => p.codigo === item.codigo);
    if (producto) {
      total = total + producto.precio * item.cantidad;
    }
  }

  return total;
}

export function contarUnidades(carrito) {
  let unidades = 0;

  for (const item of carrito) {
    unidades = unidades + item.cantidad;
  }

  return unidades;
}
