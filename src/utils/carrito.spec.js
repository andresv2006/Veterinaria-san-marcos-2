import { agregarAlCarrito, calcularTotal, contarUnidades, quitarDelCarrito } from "./carrito";

describe("utilidades del carrito", () => {
  it("agrega una línea nueva e incrementa solo el producto repetido", () => {
    const carrito = [
      { codigo: "A", cantidad: 1 },
      { codigo: "B", cantidad: 3 },
    ];

    expect(agregarAlCarrito(carrito, { codigo: "A" })).toEqual([
      { codigo: "A", cantidad: 2 },
      { codigo: "B", cantidad: 3 },
    ]);
    expect(agregarAlCarrito(carrito, { codigo: "C" })).toEqual([
      ...carrito,
      { codigo: "C", cantidad: 1 },
    ]);
  });

  it("quita el código solicitado y conserva los demás", () => {
    const carrito = [
      { codigo: "A", cantidad: 1 },
      { codigo: "B", cantidad: 2 },
    ];

    expect(quitarDelCarrito(carrito, "A")).toEqual([{ codigo: "B", cantidad: 2 }]);
    expect(quitarDelCarrito(carrito, "C")).toEqual(carrito);
  });

  it("calcula el total de productos encontrados y suma sus unidades", () => {
    const carrito = [
      { codigo: "A", cantidad: 2 },
      { codigo: "NO-EXISTE", cantidad: 4 },
    ];
    const productos = [{ codigo: "A", precio: 500 }];

    expect(calcularTotal(carrito, productos)).toBe(1000);
    expect(contarUnidades(carrito)).toBe(6);
  });
});
