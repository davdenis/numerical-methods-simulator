import { bisection } from "../methods/bisection";
import { fixedPoint } from "../methods/fixedPoint";

export const METHODS = {
  bisection: {
    id: "bisection",
    name: "Bisección",
    badge: "Intervalo [a, b]",
    formula: "p_n = \\frac{a_n + b_n}{2}",
    description: "Encuadra la raíz dividiendo sucesivamente el intervalo donde f(a) y f(b) tienen signos opuestos.",
    defaultExpression: "x^2 - 2",
    defaultParams: {
      a: 0,
      b: 2,
      tol: 1e-6,
      maxIter: 50,
    },
    run: (params) =>
      bisection(params.f, params.a, params.b, params.tol, params.maxIter),
    getCoords: (iter) => ({ x: iter.p, y: iter.FP ?? 0 }),
  },
  fixedPoint: {
    id: "fixedPoint",
    name: "Punto Fijo",
    badge: "Iteración x = g(x)",
    formula: "p_n = g(p_{n-1})",
    description: "Transforma f(x)=0 en x=g(x) y aproxima iterando desde un punto semilla p₀.",
    defaultExpression: "\\frac{x + \\frac{2}{x}}{2}",
    defaultParams: {
      p0: 1.5,
      tol: 1e-6,
      maxIter: 50,
    },
    run: (params) =>
      fixedPoint(params.g, params.p0, params.tol, params.maxIter),
    getCoords: (iter) => ({ x: iter.p, y: iter.p }),
  },
};

