import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

// Contexto y Seguridad
import { ProveedorSesion } from "./context/ContextoSesion";
import { RutaProtegida } from "./components/RutaProtegida";

// Componentes Generales
import Cabecera from "./components/Cabecera";
import Navegacion from "./components/Navegacion";
import PiePagina from "./components/PiePagina";

// Datos y Utilidades del Catálogo / Carrito
import { productosIniciales } from "./data/catalogo";
import { agregarAlCarrito, contarUnidades, quitarDelCarrito } from "./utils/carrito";
import { guardarCarrito, guardarProductos } from "./utils/persistencia";

// Páginas Generales y del Catálogo
import AdminProductoDetalle from "./pages/admin/AdminProductoDetalle";
import AdminProductos from "./pages/admin/AdminProductos";
import Carrito from "./pages/Carrito";
import Catalogo from "./pages/Catalogo";
import Contacto from "./pages/Contacto";
import DetalleNoticia from "./pages/DetalleNoticia";
import DetalleProducto from "./pages/DetalleProducto";
import Inicio from "./pages/Inicio";
import Multimedia from "./pages/Multimedia";
import NoEncontrada from "./pages/NoEncontrada";
import Nosotros from "./pages/Nosotros";
import Noticias from "./pages/Noticias";

// Páginas del Módulo de Autenticación
import { Login } from "./pages/Login";
import { Registro } from "./pages/Registro";
import { PanelAdministrador } from "./pages/PanelAdministrador";

const SinAcceso = () => (
  <div className="container py-4">
    <div className="alert alert-danger text-center my-4" role="alert">
      <h4>Acceso Denegado</h4>
      <p>No tienes los permisos de Administrador necesarios para ver esta sección.</p>
    </div>
  </div>
);

export default function App() {
  const [productos, setProductos] = useState(() => {
    const guardados = localStorage.getItem("productos");
    return guardados ? JSON.parse(guardados) : productosIniciales;
  });

  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem("carrito");
    return guardado ? JSON.parse(guardado) : [];
  });

  useEffect(() => {
    guardarProductos(productos);
  }, [productos]);

  useEffect(() => {
    guardarCarrito(carrito);
  }, [carrito]);

  function agregar(producto) {
    const item = carrito.find((registro) => registro.codigo === producto.codigo);
    if (item && item.cantidad >= producto.stock) return;

    setCarrito(agregarAlCarrito(carrito, producto));
  }

  function guardarProducto(producto) {
    const existe = productos.some((item) => item.codigo === producto.codigo);
    if (existe) return;

    setProductos([...productos, producto]);
  }

  function eliminarProducto(codigo) {
    setProductos(productos.filter((producto) => producto.codigo !== codigo));
    setCarrito(quitarDelCarrito(carrito, codigo));
  }

  return (
    <ProveedorSesion>
      <Cabecera />
      <Navegacion cantidadCarrito={contarUnidades(carrito)} />

      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<Inicio />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/noticias" element={<Noticias />} />
        <Route path="/noticias/:id" element={<DetalleNoticia />} />
        <Route path="/multimedia" element={<Multimedia />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/catalogo" element={<Catalogo productos={productos} onAgregar={agregar} />} />
        <Route path="/productos/:codigo" element={<DetalleProducto productos={productos} onAgregar={agregar} />} />
        <Route
          path="/carrito"
          element={
            <Carrito
              carrito={carrito}
              productos={productos}
              onQuitar={(codigo) => setCarrito(quitarDelCarrito(carrito, codigo))}
              onVaciar={() => setCarrito([])}
            />
          }
        />

        {/* Rutas de Autenticación */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/sin-acceso" element={<SinAcceso />} />

        {/* Rutas Protegidas Exclusivas para Administradores */}
        <Route element={<RutaProtegida rolesPermitidos={["ADMIN"]} />}>
          <Route path="/admin" element={<PanelAdministrador />} />
          <Route
            path="/admin/productos"
            element={<AdminProductos productos={productos} onGuardar={guardarProducto} onEliminar={eliminarProducto} />}
          />
          <Route path="/admin/productos/:codigo" element={<AdminProductoDetalle productos={productos} />} />
        </Route>

        <Route path="*" element={<NoEncontrada />} />
      </Routes>

      <PiePagina />
    </ProveedorSesion>
  );
}