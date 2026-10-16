import React from "react";
import { Routes, Route } from "react-router-dom";

// Contexto y Seguridad
import { ProveedorSesion } from "./context/ContextoSesion";
import { RutaProtegida } from "./components/RutaProtegida";

// Componentes
import Cabecera from "./components/Cabecera";
import Navegacion from "./components/Navegacion";
import PiePagina from "./components/PiePagina";
import Bienvenida from "./components/Bienvenida";
import NoticiasDestacadas from "./components/NoticiasDestacadas";

// Páginas
import { Login } from "./pages/Login";
import { Registro } from "./pages/Registro";
import { PanelAdministrador } from "./pages/PanelAdministrador";

const Inicio = () => (
  <>
    <Bienvenida />
    <NoticiasDestacadas />
  </>
);

const SinAcceso = () => (
  <div className="alert alert-danger my-4 text-center" role="alert">
    <h4>Acceso Denegado</h4>
    <p>No tienes los permisos de Administrador necesarios para ver esta sección.</p>
  </div>
);

export default function App() {
  return (
    /* El ProveedorSesion DEBE envolver a Navegacion */
    <ProveedorSesion>
      <Cabecera />
      <Navegacion /> 

      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/sin-acceso" element={<SinAcceso />} />

          <Route element={<RutaProtegida rolesPermitidos={["ADMIN"]} />}>
            <Route path="/admin" element={<PanelAdministrador />} />
          </Route>
        </Routes>
      </main>

      <PiePagina />
    </ProveedorSesion>
  );
}