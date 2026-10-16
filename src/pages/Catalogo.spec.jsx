import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { productosIniciales } from "../data/catalogo";
import Catalogo from "./Catalogo";

describe("Catalogo", () => {
  it("5. filtra los productos por categoría y por nombre", async () => {
    const usuario = userEvent.setup();
    render(<MemoryRouter><Catalogo productos={productosIniciales} /></MemoryRouter>);
    expect(screen.getByText("22 producto(s) encontrado(s)")).toBeInTheDocument();

    await usuario.selectOptions(screen.getByLabelText("Categoría"), "Vacunas");
    expect(screen.getByText("3 producto(s) encontrado(s)")).toBeInTheDocument();

    await usuario.type(screen.getByLabelText("Buscar por nombre"), "rabies");
    expect(screen.getByText("1 producto(s) encontrado(s)")).toBeInTheDocument();
    expect(screen.getByText("Nobivac Rabies")).toBeInTheDocument();
  });

  it("filtra también los servicios por categoría", async () => {
    const usuario = userEvent.setup();
    render(<MemoryRouter><Catalogo productos={productosIniciales} /></MemoryRouter>);

    await usuario.selectOptions(screen.getByLabelText("Categoría de servicio"), "Vacunación");

    expect(screen.getByText("Vacuna antirrábica canina")).toBeInTheDocument();
    expect(screen.queryByText("Consulta general")).not.toBeInTheDocument();
  });
});
