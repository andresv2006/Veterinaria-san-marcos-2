import { Link } from "react-router-dom";
import { formatearPrecio } from "../utils/precio";

function TarjetaProducto({ producto, onAgregar }) {
  return (
    <article className="card h-100">
      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="card-img-top imagen-producto"
      />
      <div className="card-body">
        <p className="badge bg-success">{producto.categoria}</p>
        <h2 className="h5">{producto.nombre}</h2>
        <p className="fw-bold">{formatearPrecio(producto.precio)}</p>
        <p>Stock: {producto.stock}</p>
        {producto.stock > 0 && producto.stock <= 5 && (
          <p className="text-danger fw-bold">¡Últimas unidades!</p>
        )}
        {producto.stock === 0 && (
          <p className="text-danger fw-bold">Sin stock</p>
        )}
        <Link className="btn btn-outline-success me-2" to={`/productos/${producto.codigo}`}>
          Ver detalle
        </Link>
        <button
          className="btn btn-success"
          onClick={() => onAgregar(producto)}
          disabled={producto.stock === 0}
        >
          Añadir
        </button>
      </div>
    </article>
  );
}

export default TarjetaProducto;
