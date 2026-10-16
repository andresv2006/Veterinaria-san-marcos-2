import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { productosIniciales } from "../data/catalogo";
import DetalleProducto from "./DetalleProducto";

function mostrarDetalle(codigo) {
  render(
    <MemoryRouter initialEntries={[`/productos/${codigo}`]}>
      <Routes>
        <Route path="/productos/:codigo" element={<DetalleProducto productos={productosIniciales} />} />
      </Routes>
    </MemoryRouter>
  );
}

describe("DetalleProducto", () => {
  it("9. lee el código de la URL y muestra el producto o un aviso si no existe", () => {
    mostrarDetalle("ME016");
    expect(screen.getByRole("heading", { name: "Vetmedin 2.5mg" })).toBeInTheDocument();

    mostrarDetalle("NOEXISTE");
    expect(screen.getByText("El producto solicitado no existe.")).toBeInTheDocument();
  });
});
