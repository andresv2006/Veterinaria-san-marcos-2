import { Link, useParams } from "react-router-dom";
import { formatearPrecio } from "../../utils/precio";

function AdminProductoDetalle({ productos }) {
  const { codigo } = useParams();
  const producto = productos.find((item) => item.codigo === codigo);

  if (!producto) {
    return (
      <main className="container py-4">
        <p>El producto solicitado no existe.</p>
        <Link to="/admin/productos">Volver</Link>
      </main>
    );
  }

  return (
    <main className="container py-4">
      <h1>{producto.nombre}</h1>
      {producto.stock <= producto.stockCritico && (
        <p className="alert alert-danger">Alerta: el producto está en stock crítico.</p>
      )}
      <p>Código: {producto.codigo}</p>
      <p>Categoría: {producto.categoria}</p>
      <p>Precio: {formatearPrecio(producto.precio)}</p>
      <p>Stock: {producto.stock}</p>
      <p>Stock crítico: {producto.stockCritico}</p>
      <Link to="/admin/productos">Volver</Link>
    </main>
  );
}

export default AdminProductoDetalle;
