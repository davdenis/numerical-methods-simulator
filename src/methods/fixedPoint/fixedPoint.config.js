import { fixedPoint } from "./fixedPoint";

export const fixedPointConfig = {
  id: "fixedPoint",
  name: "Fixed Point",
  functionParam: "g",
  badge: "Iteration x = g(x)",
  formula: "p_n = g(p_{n-1})",
  description:
    "Transforms f(x)=0 into x=g(x) and approximates by iterating from an initial seed p₀.",
  defaultExpression: "\\frac{x + \\frac{2}{x}}{2}",
  defaultParams: {
    p0: 1.5,
    tol: 1e-6,
    maxIterations: 50,
  },

  validateParams: (params) => {
    if (params.tol <= 0) {
      throw new Error("Tolerance must be a positive number.");
    }
    if (params.maxIterations <= 0) {
      throw new Error("Maximum iterations must be a positive integer.");
    }
  },

  run: (params) =>
    fixedPoint(params.g, params.p0, params.tol, params.maxIterations),

  getCoords: (iteration) => ({ x: iteration.p, y: iteration.p }),
};
