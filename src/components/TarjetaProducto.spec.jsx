import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import TarjetaProducto from "./TarjetaProducto";

describe("TarjetaProducto", () => {
  const producto = { codigo: "ME004", nombre: "Nexgard", categoria: "Antiparasitarios", precio: 9500, stock: 60 };

  it("1. muestra el nombre y el precio recibidos por props", () => {
    render(<MemoryRouter><TarjetaProducto producto={producto} /></MemoryRouter>);
    expect(screen.getByText("Nexgard")).toBeInTheDocument();
    expect(screen.getByText("$9.500")).toBeInTheDocument();
  });

  it("2. muestra aviso cuando quedan pocas unidades", () => {
    const pocoStock = { ...producto, stock: 3 };
    render(<MemoryRouter><TarjetaProducto producto={pocoStock} /></MemoryRouter>);
    expect(screen.getByText(/últimas unidades/i)).toBeInTheDocument();
  });

  it("3. deshabilita el botón cuando no hay stock", () => {
    const sinStock = { ...producto, stock: 0 };
    render(<MemoryRouter><TarjetaProducto producto={sinStock} /></MemoryRouter>);
    expect(screen.getByRole("button", { name: /añadir/i })).toBeDisabled();
  });

  it("4. ejecuta onAgregar al presionar el botón", async () => {
    const usuario = userEvent.setup();
    const onAgregar = vi.fn();
    render(
      <MemoryRouter>
        <TarjetaProducto producto={producto} onAgregar={onAgregar} />
      </MemoryRouter>
    );

    await usuario.click(screen.getByRole("button", { name: /añadir/i }));

    expect(onAgregar).toHaveBeenCalledWith(producto);
  });
});
