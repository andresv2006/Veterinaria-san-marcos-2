import { beforeEach, describe, expect, it } from "vitest";
import {
  esAdministrador,
  obtenerComunasPorRegion,
  servicioLogin
} from "./servicioLogin";

describe("Funciones del servicio de sesión", () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it("reconoce administradores y rechaza usuarios sin ese rol", () => {
    expect(esAdministrador({ rol: "ADMIN" })).toBe(true);
    expect(esAdministrador({ rol: "USER" })).toBe(false);
    expect(esAdministrador(null)).toBe(false);
  });

  it("devuelve las comunas de una región y una lista vacía si no existe", () => {
    expect(obtenerComunasPorRegion("Valparaíso")).toContain("Viña del Mar");
    expect(obtenerComunasPorRegion("Región inexistente")).toEqual([]);
  });

  it("lee los usuarios guardados y los entrega al panel administrador", () => {
    const usuarios = [{ id: "7", correo: "ana@demo.cl", rol: "USER" }];
    localStorage.setItem("usuarios_demo", JSON.stringify(usuarios));

    expect(servicioLogin.obtenerTodosLosUsuarios()).toEqual(usuarios);
  });

  it("elimina la sesión actual al cerrar sesión", () => {
    sessionStorage.setItem("usuario_actual", JSON.stringify({ id: "7" }));

    servicioLogin.cerrarSesion();

    expect(sessionStorage.getItem("usuario_actual")).toBeNull();
  });
});
