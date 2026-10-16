import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ProveedorSesion } from "../context/ContextoSesion";
import { Registro } from "./Registro";
import { servicioLogin } from "../services/servicioLogin";

const region = "Valparaíso";
const comuna = "Viña del Mar";

function renderRegistro() {
  return render(
    <MemoryRouter initialEntries={["/registro"]}>
      <ProveedorSesion>
        <Routes>
          <Route path="/registro" element={<Registro />} />
          <Route path="/" element={<h1>Registro completado</h1>} />
        </Routes>
      </ProveedorSesion>
    </MemoryRouter>
  );
}

async function completarFormulario(user, correo = "ana@demo.cl") {
  await user.type(screen.getByLabelText(/nombre completo/i), "Ana Pérez");
  await user.type(screen.getByLabelText(/correo electrónico/i), correo);
  await user.type(screen.getByLabelText(/contraseña/i), "clave123");
  await user.selectOptions(screen.getByLabelText(/región/i), region);
  await user.selectOptions(screen.getByLabelText(/comuna/i), comuna);
}

describe("Registro de usuario", () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    vi.restoreAllMocks();
  });

  it("activa las comunas disponibles al elegir una región", async () => {
    const user = userEvent.setup();
    renderRegistro();

    const selectorComuna = screen.getByLabelText(/comuna/i);
    expect(selectorComuna).toBeDisabled();

    await user.selectOptions(screen.getByLabelText(/región/i), region);

    expect(selectorComuna).toBeEnabled();
    expect(screen.getByRole("option", { name: comuna })).toBeInTheDocument();
  });

  it("muestra un error si se envía el formulario vacío", async () => {
    const user = userEvent.setup();
    renderRegistro();

    await user.click(screen.getByRole("button", { name: /registrarse/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Todos los campos (incluyendo región y comuna) son obligatorios"
    );
  });

  it("rechaza un correo con formato incorrecto", async () => {
    const user = userEvent.setup();
    const registro = vi.spyOn(servicioLogin, "registrarUsuario");
    renderRegistro();
    await completarFormulario(user, "correo-invalido");

    const formulario = screen.getByLabelText(/nombre completo/i).closest("form");
    fireEvent.submit(formulario);

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "El formato del correo electrónico no es válido"
    );
    expect(registro).not.toHaveBeenCalled();
  });

  it("registra los datos y vuelve a la página de inicio", async () => {
    const user = userEvent.setup();
    const registro = vi.spyOn(servicioLogin, "registrarUsuario").mockResolvedValue({
      id: "nuevo",
      nombre: "Ana Pérez",
      correo: "ana@demo.cl",
      rol: "USER"
    });
    renderRegistro();
    await completarFormulario(user);

    await user.click(screen.getByRole("button", { name: /registrarse/i }));

    expect(await screen.findByRole("heading", { name: "Registro completado" })).toBeInTheDocument();
    expect(registro).toHaveBeenCalledWith("Ana Pérez", "ana@demo.cl", "clave123", region, comuna);
  });

  it("muestra el error del servicio cuando el correo ya está registrado", async () => {
    const user = userEvent.setup();
    vi.spyOn(servicioLogin, "registrarUsuario").mockRejectedValue(
      new Error("El correo electrónico ya está registrado.")
    );
    renderRegistro();
    await completarFormulario(user);

    await user.click(screen.getByRole("button", { name: /registrarse/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "El correo electrónico ya está registrado."
    );
  });
});
