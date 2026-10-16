export async function obtenerNombres(servicio) {
  const productos = await servicio.listar();
  return productos.map((producto) => producto.nombre);
}
