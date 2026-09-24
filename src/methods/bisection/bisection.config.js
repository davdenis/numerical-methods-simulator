import { bisection } from "./bisection";

export const bisectionConfig = {
  id: "bisection",
  name: "Bisection",
  functionParam: "f",
  badge: "Interval [a, b]",
  formula: "p_n = \\frac{a_n + b_n}{2}",
  description: "Finds a root by repeatedly dividing an interval in half.",
  defaultExpression: "x^2 - 2",
  defaultParams: {
    a: 0,
    b: 2,
    tol: 1e-6,
    maxIterations: 50,
  },

  validateParams: (params) => {
    if (params.a >= params.b) {
      throw new Error("Invalid interval: a must be less than b.");
    }
    if (params.tol <= 0) {
      throw new Error("Tolerance must be a positive number.");
    }
    if (params.maxIterations <= 0) {
      throw new Error("Maximum iterations must be a positive integer.");
    }
  },

  run: (params) =>
    bisection(params.f, params.a, params.b, params.tol, params.maxIterations),

  getCoords: (iteration) => ({
    x: iteration.p,
    y: iteration.FP,
  }),
};
