import { Route, Routes } from "react-router-dom";
import Cabecera from "./components/Cabecera";
import Navegacion from "./components/Navegacion";
import PiePagina from "./components/PiePagina";
import Contacto from "./pages/Contacto";
import DetalleNoticia from "./pages/DetalleNoticia";
import Inicio from "./pages/Inicio";
import Multimedia from "./pages/Multimedia";
import NoEncontrada from "./pages/NoEncontrada";
import Nosotros from "./pages/Nosotros";
import Noticias from "./pages/Noticias";

function App() {
  return (
    <>
      <Cabecera />
      <Navegacion />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/noticias" element={<Noticias />} />
        <Route path="/noticias/:id" element={<DetalleNoticia />} />
        <Route path="/multimedia" element={<Multimedia />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="*" element={<NoEncontrada />} />
      </Routes>
      <PiePagina />
    </>
  );
}

export default App;
