import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { PanelAdministrador } from "./PanelAdministrador";
import { servicioLogin } from "../services/servicioLogin";

describe("Panel de administración de usuarios", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("muestra usuarios, roles y ubicaciones disponibles", () => {
    vi.spyOn(servicioLogin, "obtenerTodosLosUsuarios").mockReturnValue([
      {
        id: "1",
        nombre: "Ana Pérez",
        correo: "ana@demo.cl",
        region: "Valparaíso",
        comuna: "Viña del Mar",
        rol: "ADMIN"
      },
      {
        id: "2",
        nombre: "Luis Soto",
        correo: "luis@demo.cl",
        rol: "USER"
      }
    ]);

    render(<PanelAdministrador />);

    const tabla = screen.getByRole("table");
    expect(within(tabla).getByText("Ana Pérez")).toBeInTheDocument();
    expect(within(tabla).getByText("ana@demo.cl")).toBeInTheDocument();
    expect(within(tabla).getByText("Viña del Mar")).toBeInTheDocument();
    expect(within(tabla).getByText("Luis Soto")).toBeInTheDocument();
    expect(within(tabla).getByText("luis@demo.cl")).toBeInTheDocument();
    expect(within(tabla).getAllByText("N/A")).toHaveLength(2);
    expect(within(tabla).getByText("ADMIN")).toBeInTheDocument();
    expect(within(tabla).getByText("USER")).toBeInTheDocument();
  });
});
