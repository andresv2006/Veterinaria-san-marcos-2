import React, { createContext, useContext, useState } from "react";
import { servicioLogin } from "../services/servicioLogin";

const ContextoSesion = createContext();

export const ProveedorSesion = ({ children }) => {
  const [usuario, setUsuario] = useState(() => servicioLogin.obtenerUsuarioActual());

  const ingresar = async (correo, clave) => {
    const usuarioAutenticado = await servicioLogin.iniciarSesion(correo, clave);
    setUsuario(usuarioAutenticado);
    return usuarioAutenticado;
  };

  const registrar = async (nombre, correo, clave, region, comuna) => {
    const nuevoUsuario = await servicioLogin.registrarUsuario(nombre, correo, clave, region, comuna);
    setUsuario(nuevoUsuario);
    return nuevoUsuario;
  };

  const salir = () => {
    servicioLogin.cerrarSesion();
    setUsuario(null);
  };

  return (
    <ContextoSesion.Provider value={{ usuario, ingresar, registrar, salir }}>
      {children}
    </ContextoSesion.Provider>
  );
};

export const useSesion = () => {
  const context = useContext(ContextoSesion);
  if (!context) {
    throw new Error("useSesion debe usarse dentro de un ProveedorSesion");
  }
  return context;
};