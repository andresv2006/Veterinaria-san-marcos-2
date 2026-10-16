import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import AdminProductoDetalle from "./AdminProductoDetalle";

function mostrarProducto(codigo, productos) {
  return render(
    <MemoryRouter initialEntries={[`/admin/productos/${codigo}`]}>
      <Routes>
        <Route
          path="/admin/productos/:codigo"
          element={<AdminProductoDetalle productos={productos} />}
        />
      </Routes>
    </MemoryRouter>
  );
}

describe("Detalle administrativo del producto", () => {
  it("muestra el aviso cuando el código no existe", () => {
    mostrarProducto("NO-EXISTE", []);

    expect(screen.getByText("El producto solicitado no existe.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Volver" })).toHaveAttribute(
      "href",
      "/admin/productos"
    );
  });

  it("muestra la alerta si el stock llega al nivel crítico", () => {
    mostrarProducto("ME-CRITICO", [
      {
        codigo: "ME-CRITICO",
        nombre: "Producto de prueba",
        categoria: "Vacunas",
        precio: 1000,
        stock: 3,
        stockCritico: 3
      }
    ]);

    expect(screen.getByText(/Alerta: el producto está en stock crítico/i)).toBeInTheDocument();
  });
});
