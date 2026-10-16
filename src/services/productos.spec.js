import { vi } from "vitest";
import { obtenerNombres } from "./productos";

it("11. (mock) obtiene los nombres entregados por el servicio", async () => {
  const servicio = {
    listar: vi.fn().mockResolvedValue([
      { codigo: "ME004", nombre: "Nexgard", stock: 60 }
    ])
  };

  const nombres = await obtenerNombres(servicio);

  expect(servicio.listar).toHaveBeenCalled();
  expect(nombres).toEqual(["Nexgard"]);
});
