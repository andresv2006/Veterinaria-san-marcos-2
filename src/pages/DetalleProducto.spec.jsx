import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  it("avisa al carrito cuando se agrega un producto desde su detalle", async () => {
    const usuario = userEvent.setup();
    const onAgregar = vi.fn();

    render(
      <MemoryRouter initialEntries={["/productos/ME016"]}>
        <Routes>
          <Route
            path="/productos/:codigo"
            element={<DetalleProducto productos={productosIniciales} onAgregar={onAgregar} />}
          />
        </Routes>
      </MemoryRouter>
    );

    await usuario.click(screen.getByRole("button", { name: /añadir al carrito/i }));

    expect(onAgregar).toHaveBeenCalledWith(productosIniciales.find((producto) => producto.codigo === "ME016"));
  });
});
