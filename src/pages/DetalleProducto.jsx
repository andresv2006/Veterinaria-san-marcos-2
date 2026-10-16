import { Link, useParams } from "react-router-dom";
import { formatearPrecio } from "../utils/precio";

function DetalleProducto({ productos, onAgregar }) {
  const { codigo } = useParams();
  const producto = productos.find((item) => item.codigo === codigo);

  if (!producto) {
    return (
      <main className="container py-4">
        <p>El producto solicitado no existe.</p>
        <Link to="/catalogo">Volver al catálogo</Link>
      </main>
    );
  }

  return (
    <main className="container py-4">
      <div className="row g-4">
        <div className="col-12 col-md-5">
          <img src={producto.imagen} alt={producto.nombre} className="img-fluid" />
        </div>
        <div className="col-12 col-md-7">
          <h1>{producto.nombre}</h1>
          <p>{producto.descripcion}</p>
          <p>Categoría: {producto.categoria}</p>
          <p>Principio activo: {producto.principioActivo}</p>
          <p>Presentación: {producto.presentacion}</p>
          <p>Stock: {producto.stock}</p>
          <p className="fs-4 fw-bold">{formatearPrecio(producto.precio)}</p>
          <button
            className="btn btn-success me-2"
            onClick={() => onAgregar(producto)}
            disabled={producto.stock === 0}
          >
            Añadir al carrito
          </button>
          <Link to="/catalogo">Volver al catálogo</Link>
        </div>
      </div>
    </main>
  );
}

export default DetalleProducto;
