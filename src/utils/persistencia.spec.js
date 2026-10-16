import { vi } from "vitest";
import { guardarCarrito, guardarProductos } from "./persistencia";

describe("persistencia", () => {
  it("8. guarda el carrito y los productos serializados en localStorage", () => {
    const espia = vi.spyOn(Storage.prototype, "setItem");
    const carrito = [{ codigo: "ME004", cantidad: 2 }];
    const productos = [{ codigo: "ME004", nombre: "Nexgard" }];

    guardarCarrito(carrito);
    guardarProductos(productos);

    expect(espia).toHaveBeenCalledWith("carrito", JSON.stringify(carrito));
    expect(espia).toHaveBeenCalledWith("productos", JSON.stringify(productos));

    espia.mockRestore();
  });
});
