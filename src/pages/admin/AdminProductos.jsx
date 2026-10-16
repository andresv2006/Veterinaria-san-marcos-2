import { Link } from "react-router-dom";
import FormularioProducto from "./FormularioProducto";
import { formatearPrecio } from "../../utils/precio";

function AdminProductos({ productos, onGuardar, onEliminar }) {
  return (
    <main className="container py-4">
      <h1>Administración de productos</h1>

      <div className="row g-4">
        <div className="col-12 col-lg-4">
          <h2 className="h4">Nuevo producto</h2>
          <FormularioProducto onGuardar={onGuardar} />
        </div>

        <div className="col-12 col-lg-8">
          <h2 className="h4">Productos ({productos.length})</h2>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto) => (
                  <tr key={producto.codigo}>
                    <td>{producto.codigo}</td>
                    <td>{producto.nombre}</td>
                    <td>{formatearPrecio(producto.precio)}</td>
                    <td>
                      {producto.stock}
                      {producto.stock <= producto.stockCritico && (
                        <span className="badge bg-danger ms-2">Stock crítico</span>
                      )}
                    </td>
                    <td>
                      <Link className="btn btn-sm btn-outline-secondary me-2" to={`/admin/productos/${producto.codigo}`}>
                        Ver
                      </Link>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => onEliminar(producto.codigo)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminProductos;
