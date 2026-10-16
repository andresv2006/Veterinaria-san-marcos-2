import { formatearPrecio } from "./precio";

describe("formatearPrecio", () => {
  it("muestra gratis cuando el valor es cero", () => {
    expect(formatearPrecio(0)).toBe("Gratis");
  });

  it("formatea un precio en pesos chilenos", () => {
    expect(formatearPrecio(15000)).toBe("$15.000");
  });
});
