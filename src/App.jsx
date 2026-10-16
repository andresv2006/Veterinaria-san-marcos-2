import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Cabecera from "./components/Cabecera";
import Navegacion from "./components/Navegacion";
import PiePagina from "./components/PiePagina";
import { productosIniciales } from "./data/catalogo";
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
import { agregarAlCarrito, contarUnidades, quitarDelCarrito } from "./utils/carrito";
import { guardarCarrito, guardarProductos } from "./utils/persistencia";

function App() {
  const [productos] = useState(() => {
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

  return (
    <>
      <Cabecera />
      <Navegacion cantidadCarrito={contarUnidades(carrito)} />
      <Routes>
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
        <Route path="*" element={<NoEncontrada />} />
      </Routes>
      <PiePagina />
    </>
  );
}

export default App;
