import { describe, test, expect } from "vitest";
import { createFunctionFromLatex } from "./mathParser.js";

describe("mathParser", () => {
  test("Parsea polinomios simples y potencias", () => {
    const fn = createFunctionFromLatex("x^2 - 2");
    expect(fn(2)).toBe(2);
    expect(fn(0)).toBe(-2);
  });

  test("Parsea funciones con prefijo f(x) = ...", () => {
    const fn = createFunctionFromLatex("f(x) = x^3 - 2x - 5");
    expect(fn(2)).toBe(-1);
  });

  test("Parsea funciones trigonometricas", () => {
    const fn = createFunctionFromLatex("\\cos(x) - x");
    expect(fn(0)).toBe(1);
  });

  test("Parsea fracciones anidadas", () => {
    const fn = createFunctionFromLatex("\\frac{x + \\frac{2}{x}}{2}");
    expect(fn(2)).toBe(1.5);
  });

  test("Parsea raices y exponenciales", () => {
    const fn = createFunctionFromLatex("e^x - 3x");
    expect(fn(0)).toBe(1);
  });
});
