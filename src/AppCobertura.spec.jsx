import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { productosIniciales } from "./data/catalogo";
import App from "./App";

describe("flujos principales de App", () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it("muestra la vista de acceso denegado", () => {
    render(
      <MemoryRouter initialEntries={["/sin-acceso"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: "Acceso Denegado" })).toBeInTheDocument();
  });

  it("recupera datos guardados y permite quitar un producto desde el carrito", async () => {
    const usuario = userEvent.setup();
    const producto = { ...productosIniciales[0], codigo: "GUARDADO" };
    localStorage.setItem("productos", JSON.stringify([producto]));
    localStorage.setItem("carrito", JSON.stringify([{ codigo: "GUARDADO", cantidad: 2 }]));

    render(
      <MemoryRouter initialEntries={["/carrito"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Amoxibay 250mg")).toBeInTheDocument();
    await usuario.click(screen.getByRole("button", { name: "Quitar" }));

    expect(await screen.findByText("Tu carrito está vacío.")).toBeInTheDocument();
    await waitFor(() => {
      expect(JSON.parse(localStorage.getItem("carrito"))).toEqual([]);
    });
  });

  it("no permite agregar más unidades que las disponibles", async () => {
    const usuario = userEvent.setup();
    const producto = {
      codigo: "STOCK1",
      categoria: "Vacunas",
      nombre: "Vacuna de prueba",
      especie: "Perro",
      stock: 1,
      stockCritico: 0,
      precio: 1000,
      imagen: "/img/rabies.jpg",
    };
    localStorage.setItem("productos", JSON.stringify([producto]));
    localStorage.setItem("carrito", JSON.stringify([{ codigo: "STOCK1", cantidad: 1 }]));

    render(
      <MemoryRouter initialEntries={["/catalogo"]}>
        <App />
      </MemoryRouter>
    );

    await usuario.click(await screen.findByRole("button", { name: "Añadir" }));

    expect(screen.getByRole("link", { name: /carrito/i })).toHaveTextContent("1");
    expect(JSON.parse(localStorage.getItem("carrito"))).toEqual([
      { codigo: "STOCK1", cantidad: 1 },
    ]);
  });

  it("no guarda un producto cuando su código ya existe", async () => {
    const usuario = userEvent.setup();
    sessionStorage.setItem(
      "usuario_actual",
      JSON.stringify({ id: "1", nombre: "Administrador", correo: "admin@demo.com", rol: "ADMIN" })
    );

    render(
      <MemoryRouter initialEntries={["/admin/productos"]}>
        <App />
      </MemoryRouter>
    );

    await usuario.type(screen.getByLabelText("Código"), "ME001");
    await usuario.type(screen.getByLabelText("Nombre"), "Producto duplicado");
    await usuario.selectOptions(screen.getByLabelText("Categoría"), "Vacunas");
    await usuario.type(screen.getByLabelText("Precio"), "1000");
    await usuario.type(screen.getByLabelText("Stock"), "4");
    await usuario.click(screen.getByRole("button", { name: "Guardar" }));

    expect(screen.getByText("Productos (22)")).toBeInTheDocument();
    expect(screen.queryByText("Producto duplicado")).not.toBeInTheDocument();
  });
});
