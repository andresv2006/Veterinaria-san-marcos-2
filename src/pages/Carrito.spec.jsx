import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import { productosIniciales } from "../data/catalogo";
import Carrito from "./Carrito";

describe("Carrito", () => {
  it("7. muestra el total y permite quitar un producto", async () => {
    const usuario = userEvent.setup();
    const onQuitar = vi.fn();
    const carrito = [
      { codigo: "ME004", cantidad: 2 },
      { codigo: "ME007", cantidad: 1 }
    ];
    render(
      <MemoryRouter>
        <Carrito carrito={carrito} productos={productosIniciales} onQuitar={onQuitar} />
      </MemoryRouter>
    );

    expect(screen.getByText("$22.200")).toBeInTheDocument();

    await usuario.click(screen.getAllByRole("button", { name: "Quitar" })[0]);

    expect(onQuitar).toHaveBeenCalledWith("ME004");
  });
});
