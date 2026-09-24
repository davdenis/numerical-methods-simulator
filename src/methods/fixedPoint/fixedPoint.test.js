import { describe, test, expect } from "vitest";
import { fixedPoint } from "./fixedPoint.js";

describe("fixedPoint", () => {
  test("Converge a la raiz de x = (x + 2/x)/2 (sqrt(2))", () => {
    const g = (x) => (x + 2 / x) / 2;
    const resultado = fixedPoint(g, 1.5, 1e-6, 50);
    const raiz = resultado.at(-1).p;

    expect(raiz).toBeCloseTo(Math.sqrt(2), 5);
  });

  test("Genera historial de iteraciones con error descendente", () => {
    const g = (x) => (x + 2 / x) / 2;
    const resultado = fixedPoint(g, 1.5, 1e-6, 50);

    expect(resultado.length).toBeGreaterThan(1);
    expect(resultado.at(-1).err).toBeLessThan(1e-6);
  });
});
