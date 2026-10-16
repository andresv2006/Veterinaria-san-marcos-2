import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import { servicioLogin } from "../services/servicioLogin";
import { ProveedorSesion } from "../context/ContextoSesion";
import { Login } from "../pages/Login";
import { RutaProtegida } from "../components/RutaProtegida";

describe("Pruebas del Módulo de Sesión y Autenticación", () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    vi.restoreAllMocks(); // Limpia los espías y mocks entre pruebas
  });

  // 1. Función 
  it("1. iniciarSesion devuelve el usuario si las credenciales son correctas", async () => {
    const usuario = await servicioLogin.iniciarSesion("admin@demo.com", "admin123");
    expect(usuario.correo).toBe("admin@demo.com");
    expect(usuario.rol).toBe("ADMIN");
  });

  // 2. Condicional / Error
  it("2. iniciarSesion lanza error si la contraseña es incorrecta", async () => {
    await expect(servicioLogin.iniciarSesion("admin@demo.com", "clave_erronea"))
      .rejects.toThrow("Credenciales inválidas");
  });

  // 3. Persistencia 
it("3. registrarUsuario guarda el arreglo serializado en localStorage", async () => {
  const espia = vi.spyOn(Storage.prototype, "setItem");

  await servicioLogin.registrarUsuario("Pedro", "pedro@demo.com", "123456", "Valparaíso", "Viña del Mar");

  expect(espia).toHaveBeenCalledWith(
    "usuarios_demo",
    expect.stringContaining("pedro@demo.com")
  );
  espia.mockRestore();
});

  // 4. Renderizado
  it("4. Formulario de Login muestra los elementos de entrada", () => {
    render(
      <MemoryRouter>
        <ProveedorSesion>
          <Login />
        </ProveedorSesion>
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: /iniciar sesión/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
  });

  // 5. Condicional UI
  it("5. Login muestra alerta si se envía el formulario vacío", async () => {
    render(
      <MemoryRouter>
        <ProveedorSesion>
          <Login />
        </ProveedorSesion>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /entrar/i }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Todos los campos son obligatorios");
  });

  // 6. Mock de Servicio Asíncrono
  it("6. Login llama al servicio simulado y redirige al usuario", async () => {
    const iniciarSesionMock = vi.spyOn(servicioLogin, "iniciarSesion").mockResolvedValue({
        id: "1",
        nombre: "Usuario Mock",
        correo: "mock@demo.com",
        rol: "USER"
    });

    render(
      <MemoryRouter initialEntries={["/login"]}>
        <ProveedorSesion>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<h2>Inicio de prueba</h2>} />
          </Routes>
        </ProveedorSesion>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
      target: { value: "mock@demo.com" }
    });
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: "123456" }
    });
    fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

    expect(await screen.findByText("Inicio de prueba")).toBeInTheDocument();
    expect(iniciarSesionMock).toHaveBeenCalledWith("mock@demo.com", "123456");
  });

  it("redirige al panel cuando inicia sesión una cuenta administradora", async () => {
    vi.spyOn(servicioLogin, "iniciarSesion").mockResolvedValue({
      id: "1",
      nombre: "Administradora",
      correo: "admin@demo.com",
      rol: "ADMIN"
    });

    render(
      <MemoryRouter initialEntries={["/login"]}>
        <ProveedorSesion>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<h2>Panel de prueba</h2>} />
          </Routes>
        </ProveedorSesion>
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
      target: { value: "admin@demo.com" }
    });
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: "clave123" }
    });
    fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

    expect(await screen.findByRole("heading", { name: "Panel de prueba" })).toBeInTheDocument();
  });

  it("muestra el error si el servicio rechaza las credenciales", async () => {
    vi.spyOn(servicioLogin, "iniciarSesion").mockRejectedValue(
      new Error("Credenciales de prueba inválidas")
    );

    render(
      <MemoryRouter>
        <ProveedorSesion>
          <Login />
        </ProveedorSesion>
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
      target: { value: "ana@demo.cl" }
    });
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: "incorrecta" }
    });
    fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Credenciales de prueba inválidas"
    );
  });

  // 7. Ruta Protegida (Usuario no autenticado)
  it("7. RutaProtegida bloquea el paso si no hay usuario autenticado", () => {
    render(
      <MemoryRouter initialEntries={["/admin"]}>
        <ProveedorSesion>
          <Routes>
            <Route path="/login" element={<h2>Pantalla Login</h2>} />
            <Route element={<RutaProtegida rolesPermitidos={["ADMIN"]} />}>
              <Route path="/admin" element={<h2>Panel Admin</h2>} />
            </Route>
          </Routes>
        </ProveedorSesion>
      </MemoryRouter>
    );

    expect(screen.getByText("Pantalla Login")).toBeInTheDocument();
  });

  // 8. Ruta Protegida por Rol
  it("8. RutaProtegida bloquea el paso si el usuario no tiene el rol requerido", () => {
    sessionStorage.setItem("usuario_actual", JSON.stringify({ nombre: "Juan", rol: "USER" }));

    render(
      <MemoryRouter initialEntries={["/admin"]}>
        <ProveedorSesion>
          <Routes>
            <Route path="/sin-acceso" element={<h2>Sin Acceso</h2>} />
            <Route element={<RutaProtegida rolesPermitidos={["ADMIN"]} />}>
              <Route path="/admin" element={<h2>Panel Admin</h2>} />
            </Route>
          </Routes>
        </ProveedorSesion>
      </MemoryRouter>
    );

    expect(screen.getByText("Sin Acceso")).toBeInTheDocument();
  });

  // 9. Estado Global
  it("9. ProveedorSesion mantiene el usuario autenticado en sessionStorage", async () => {
    await servicioLogin.iniciarSesion("admin@demo.com", "admin123");
    sessionStorage.setItem("usuario_actual", JSON.stringify({ nombre: "Admin", rol: "ADMIN" }));

    expect(JSON.parse(sessionStorage.getItem("usuario_actual")).rol).toBe("ADMIN");
  });

  // 10. Registro Duplicado / Caso límite
  it("10. registrarUsuario lanza error si el correo ya existe", async () => {
    await expect(servicioLogin.registrarUsuario("Admin Duplicado", "admin@demo.com", "123456"))
      .rejects.toThrow("El correo electrónico ya está registrado");
  });
});
