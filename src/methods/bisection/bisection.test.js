import { describe, test, expect } from "vitest";
import { bisection } from "./bisection.js";

describe("bisection", () => {
  test("Converge a la raiz de x² - 2", () => {
    const resultado = bisection((x) => x * x - 2, 0, 2, 1e-6, 100);
    const raiz = resultado.at(-1).p;

    expect(raiz).toBeCloseTo(Math.sqrt(2), 5);
  });
  test("Lanza error si f(a) y f(b) no tienen signos opuestos", () => {
    expect(() => bisection((x) => x * x - 2, 0, 1, 1e-6, 100)).toThrow(
      "f(a) y f(b) deben tener signos opuestos.",
    );
  });
  test("Visualiza las iteraciones correctamente", () => {
    const resultado = bisection((x) => x * x - 2, 0, 2, 1e-6, 100);
    const iteraciones = resultado.map((iteracion) => ({
      n: iteracion.n,
      p: iteracion.p,
      FP: iteracion.FP,
      err: iteracion.err,
    }));

    expect(iteraciones).toMatchSnapshot();
  });
  test("Visualizacion de las iteraciones", () => {
    const resultado = bisection((x) => x * x - 2, 0, 2, 1e-6, 100);
    console.table(resultado);
  });
});
