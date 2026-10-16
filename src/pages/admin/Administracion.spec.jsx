import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest"; // Si usas Jest, cambia 'vitest' por 'jest'
import App from "../../App";
import * as ContextoSesion from "../../context/ContextoSesion";

describe("Administración de productos", () => {
  beforeEach(() => {
    localStorage.clear();

    // Mockear la respuesta del contexto de sesión para que el usuario siempre figure autenticado como ADMIN
    vi.spyOn(ContextoSesion, "useSesion").mockReturnValue({
      usuario: {
        nombre: "Administrador",
        correo: "admin@veterinaria.cl",
        rol: "ADMIN"
      },
      ingresar: vi.fn().mockResolvedValue({
        nombre: "Administrador",
        correo: "admin@veterinaria.cl",
        rol: "ADMIN"
      }),
      cerrarSesion: vi.fn(),
      registrar: vi.fn()
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("10. valida, crea, muestra y elimina un producto", async () => {
    const usuario = userEvent.setup();

    // Renderizar App directamente en la ruta protegida de administración
    render(
      <MemoryRouter initialEntries={["/admin/productos"]}>
        <App />
      </MemoryRouter>
    );

    // 1. Probar la validación de campos requeridos al guardar
    const botonGuardar = await screen.findByRole("button", { name: "Guardar" });
    await usuario.click(botonGuardar);
    expect(await screen.findByText("Nombre obligatorio")).toBeInTheDocument();

    // 2. Rellenar formulario y crear el producto
    await usuario.type(screen.getByLabelText("Código"), "me100");
    await usuario.type(screen.getByLabelText("Nombre"), "Vacuna de prueba");
    await usuario.selectOptions(screen.getByLabelText("Categoría"), "Vacunas");
    await usuario.type(screen.getByLabelText("Precio"), "5000");
    await usuario.type(screen.getByLabelText("Stock"), "8");
    await usuario.click(screen.getByRole("button", { name: "Guardar" }));

    expect(await screen.findByText("Productos (23)")).toBeInTheDocument();

    // 3. Ver detalle del producto recién creado
    const botonesVer = screen.getAllByRole("link", { name: "Ver" });
    await usuario.click(botonesVer[botonesVer.length - 1]);
    expect(await screen.findByRole("heading", { name: "Vacuna de prueba" })).toBeInTheDocument();

    // 4. Volver a la lista y eliminarlo
    await usuario.click(screen.getByRole("link", { name: "Volver" }));
    const botonesEliminar = await screen.findAllByRole("button", { name: "Eliminar" });
    await usuario.click(botonesEliminar[botonesEliminar.length - 1]);

    expect(await screen.findByText("Productos (22)")).toBeInTheDocument();
  });
});