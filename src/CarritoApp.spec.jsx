import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

describe("App", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("6. añadir dos veces suma la cantidad sin duplicar y vaciar deja el carrito vacío", async () => {
    const usuario = userEvent.setup();
    
    render(
      <MemoryRouter initialEntries={["/catalogo"]}>
        <App />
      </MemoryRouter>
    );

    // Seleccionar botones de añadir en el catálogo
    const botones = await screen.findAllByRole("button", { name: "Añadir" });
    await usuario.click(botones[0]);
    await usuario.click(botones[0]);

    // Verificar el contador del badge en la navegación
    expect(screen.getByRole("link", { name: /carrito/i })).toHaveTextContent("2");
    expect(JSON.parse(localStorage.getItem("carrito"))).toEqual([
      { codigo: "ME001", cantidad: 2 }
    ]);

    // Navegar al carrito
    await usuario.click(screen.getByRole("link", { name: /carrito/i }));

    // Buscar y presionar el botón de vaciar
    const botonVaciar = await screen.findByRole("button", { name: "Vaciar carrito" });
    await usuario.click(botonVaciar);

    expect(await screen.findByText("Tu carrito está vacío.")).toBeInTheDocument();
  });
});