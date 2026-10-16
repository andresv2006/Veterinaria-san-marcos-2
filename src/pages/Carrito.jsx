import { Link } from "react-router-dom";
import { calcularTotal } from "../utils/carrito";
import { formatearPrecio } from "../utils/precio";

function Carrito({ carrito, productos, onQuitar, onVaciar }) {
  const total = calcularTotal(carrito, productos);

  if (carrito.length === 0) {
    return (
      <main className="container py-4">
        <h1>Carrito</h1>
        <p>Tu carrito está vacío.</p>
        <Link to="/catalogo">Ir al catálogo</Link>
      </main>
    );
  }

  return (
    <main className="container py-4">
      <h1>Carrito</h1>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {carrito.map((item) => {
              const producto = productos.find((p) => p.codigo === item.codigo);
              return (
                <tr key={item.codigo}>
                  <td>{producto.nombre}</td>
                  <td>{formatearPrecio(producto.precio)}</td>
                  <td>{item.cantidad}</td>
                  <td>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => onQuitar(item.codigo)}
                    >
                      Quitar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="fs-4">Total: <strong>{formatearPrecio(total)}</strong></p>
      <button className="btn btn-outline-secondary" onClick={onVaciar}>
        Vaciar carrito
      </button>
    </main>
  );
}

export default Carrito;
