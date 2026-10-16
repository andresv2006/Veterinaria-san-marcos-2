import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProveedorSesion, useSesion } from "./ContextoSesion";
import { servicioLogin } from "../services/servicioLogin";

function SesionVisible() {
  const { usuario, salir } = useSesion();
  return (
    <>
      <p>{usuario ? usuario.nombre : "Sin sesión"}</p>
      <button onClick={salir}>Cerrar sesión de prueba</button>
    </>
  );
}

describe("Contexto de sesión", () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    vi.restoreAllMocks();
  });

  it("recupera y cierra la sesión desde el proveedor", async () => {
    const user = userEvent.setup();
    sessionStorage.setItem("usuario_actual", JSON.stringify({ nombre: "Ana", rol: "USER" }));
    const cerrarSesion = vi.spyOn(servicioLogin, "cerrarSesion");

    render(
      <ProveedorSesion>
        <SesionVisible />
      </ProveedorSesion>
    );

    expect(screen.getByText("Ana")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /cerrar sesión de prueba/i }));

    expect(cerrarSesion).toHaveBeenCalledOnce();
    expect(screen.getByText("Sin sesión")).toBeInTheDocument();
  });

  it("informa si useSesion se utiliza fuera del proveedor", () => {
    const errorOriginal = console.error;
    console.error = vi.fn();

    try {
      expect(() => render(<SesionVisible />)).toThrow(
        "useSesion debe usarse dentro de un ProveedorSesion"
      );
    } finally {
      console.error = errorOriginal;
    }
  });
});
