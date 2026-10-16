import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "../../App";

describe("Administración de productos", () => {
  it("10. valida, crea, muestra y elimina un producto", async () => {
    const usuario = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/admin/productos"]}>
        <App />
      </MemoryRouter>
    );

    await usuario.click(screen.getByRole("button", { name: "Guardar" }));
    expect(screen.getByText("Nombre obligatorio")).toBeInTheDocument();

    await usuario.type(screen.getByLabelText("Código"), "me100");
    await usuario.type(screen.getByLabelText("Nombre"), "Vacuna de prueba");
    await usuario.selectOptions(screen.getByLabelText("Categoría"), "Vacunas");
    await usuario.type(screen.getByLabelText("Precio"), "5000");
    await usuario.type(screen.getByLabelText("Stock"), "8");
    await usuario.click(screen.getByRole("button", { name: "Guardar" }));
    expect(screen.getByText("Productos (23)")).toBeInTheDocument();

    const botonesVer = screen.getAllByRole("link", { name: "Ver" });
    await usuario.click(botonesVer[botonesVer.length - 1]);
    expect(screen.getByRole("heading", { name: "Vacuna de prueba" })).toBeInTheDocument();

    await usuario.click(screen.getByRole("link", { name: "Volver" }));
    const botonesEliminar = screen.getAllByRole("button", { name: "Eliminar" });
    await usuario.click(botonesEliminar[botonesEliminar.length - 1]);
    expect(screen.getByText("Productos (22)")).toBeInTheDocument();
  });
});
