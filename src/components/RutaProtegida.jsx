// src/components/RutaProtegida.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSesion } from "../context/ContextoSesion";

export const RutaProtegida = ({ rolesPermitidos }) => {
  const { usuario } = useSesion();

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (rolesPermitidos && !rolesPermitidos.includes(usuario.rol)) {
    return <Navigate to="/sin-acceso" replace />;
  }

  return <Outlet />;
};