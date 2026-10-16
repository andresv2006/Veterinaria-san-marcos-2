import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Navegacion from "./Navegacion";
import * as ContextoSesion from "../context/ContextoSesion";

describe("Navegación principal", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("muestra las páginas públicas, el acceso y la cantidad del carrito", () => {
    vi.spyOn(ContextoSesion, "useSesion").mockReturnValue({
      usuario: null,
      salir: vi.fn()
    });

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Navegacion cantidadCarrito={3} />
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: /inicio/i })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: /catálogo/i })).toHaveAttribute("href", "/catalogo");
    expect(screen.getByRole("link", { name: /carrito/i })).toHaveTextContent("3");
    expect(screen.getByRole("link", { name: /iniciar sesión/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /registrarse/i })).toBeInTheDocument();
  });

  it("muestra las opciones de administrador y cierra la sesión", () => {
    const salir = vi.fn();
    vi.spyOn(ContextoSesion, "useSesion").mockReturnValue({
      usuario: { nombre: "Ana", rol: "ADMIN" },
      salir
    });

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Navegacion cantidadCarrito={0} />} />
          <Route path="/login" element={<h1>Inicio de sesión</h1>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: /panel admin/i })).toHaveAttribute("href", "/admin");
    expect(screen.getByRole("link", { name: /administración productos/i })).toHaveAttribute("href", "/admin/productos");
    expect(screen.getByRole("navigation")).toHaveTextContent(/Hola, Ana/);

    fireEvent.click(screen.getByRole("button", { name: /cerrar sesión/i }));

    expect(salir).toHaveBeenCalledOnce();
    expect(screen.getByRole("heading", { name: "Inicio de sesión" })).toBeInTheDocument();
  });
});
