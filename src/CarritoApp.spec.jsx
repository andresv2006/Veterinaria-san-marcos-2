import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

describe("App", () => {
  it("6. añadir dos veces suma la cantidad sin duplicar y vaciar deja el carrito vacío", async () => {
    const usuario = userEvent.setup();
    render(<MemoryRouter initialEntries={["/catalogo"]}><App /></MemoryRouter>);

    const botones = screen.getAllByRole("button", { name: "Añadir" });
    await usuario.click(botones[0]);
    await usuario.click(botones[0]);

    expect(screen.getByRole("link", { name: /carrito/i })).toHaveTextContent("2");
    expect(JSON.parse(localStorage.getItem("carrito"))).toEqual([
      { codigo: "ME001", cantidad: 2 }
    ]);

    await usuario.click(screen.getByRole("link", { name: /carrito/i }));
    await usuario.click(screen.getByRole("button", { name: "Vaciar carrito" }));

    expect(screen.getByText("Tu carrito está vacío.")).toBeInTheDocument();
  });
});
