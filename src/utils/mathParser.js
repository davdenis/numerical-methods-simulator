export function createFunctionFromLatex(latex) {
  if (!latex || typeof latex !== "string") {
    throw new Error("No valid LaTeX string provided.");
  }

  let s = latex.trim();

  // Quitar prefijo de función como f(x) =, y =, g(x) =
  s = s.replace(/^[a-zA-Z](\([a-zA-Z]\))?\s*=\s*/, "");

  // Reemplazar delimitadores y constantes LaTeX
  s = s.replace(/\\left\(/g, "(").replace(/\\right\)/g, ")");
  s = s.replace(/\\left\[/g, "(").replace(/\\right\]/g, ")");
  s = s.replace(/\\cdot/g, "*").replace(/\\times/g, "*");
  s = s.replace(/\\pi\b/g, "Math.PI");

  // Fracciones anidadas \frac{A}{B}
  while (/\\frac\{([^{}]+)\}\{([^{}]+)\}/.test(s)) {
    s = s.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, "(($1)/($2))");
  }

  // Raíces cuadradas \sqrt{A}
  while (/\\sqrt\{([^{}]+)\}/.test(s)) {
    s = s.replace(/\\sqrt\{([^{}]+)\}/g, "Math.sqrt($1)");
  }

  // Funciones trig / exp / log
  s = s.replace(/\\sin\b/g, "Math.sin");
  s = s.replace(/\\cos\b/g, "Math.cos");
  s = s.replace(/\\tan\b/g, "Math.tan");
  s = s.replace(/\\arcsin\b/g, "Math.asin");
  s = s.replace(/\\arccos\b/g, "Math.acos");
  s = s.replace(/\\arctan\b/g, "Math.atan");
  s = s.replace(/\\ln\b/g, "Math.log");
  s = s.replace(/\\log\b/g, "Math.log10");
  s = s.replace(/\\exp\b/g, "Math.exp");
  s = s.replace(/\\abs\b/g, "Math.abs");

  // Exponenciales e^{...} o e^x
  while (/e\^\{([^{}]+)\}/.test(s)) {
    s = s.replace(/e\^\{([^{}]+)\}/g, "Math.exp($1)");
  }
  s = s.replace(/e\^([a-zA-Z0-9]+)/g, "Math.exp($1)");

  // Potencias con llaves a^{b}
  while (/\^\{([^{}]+)\}/.test(s)) {
    s = s.replace(/\^\{([^{}]+)\}/g, "**($1)");
  }
  // Potencias simples x^2, x^a
  s = s.replace(/\^([a-zA-Z0-9.]+)/g, "**($1)");

  // Multiplicación implícita: ej: 2x -> 2*x, 2(x) -> 2*(x), (x)(x) -> (x)*(x)
  s = s.replace(/(\d+)\s*([xX])/g, "$1*$2");
  s = s.replace(/(\d+)\s*(\()/g, "$1*$2");
  s = s.replace(/(\))\s*(\()/g, "$1*$2");
  s = s.replace(/(\))\s*([xX])/g, "$1*$2");
  s = s.replace(/([xX])\s*(\()/g, "$1*$2");

  // Limpiar llaves sobrantes si quedaron
  s = s.replace(/[{}]/g, "");

  try {
    const fn = new Function("x", "Math", "return (" + s + ");");
    return (x) => {
      const val = fn(x, Math);
      if (typeof val !== "number" || isNaN(val)) {
        throw new Error(`Undefined evaluation at x = ${x}`);
      }
      return val;
    };
  } catch (err) {
    throw new Error(`Error parsing LaTeX: "${latex}".`, { cause: err });
  }
}

export function getFunctionFromCalculator(
  calculator,
  preferredId = "function",
) {
  if (!calculator) {
    throw new Error("Calculator reference is not provided.");
  }

  const expressions = calculator.getExpressions() || [];
  const found =
    expressions.find((e) => e.id === preferredId && e.latex) ||
    expressions.find(
      (e) =>
        e.latex &&
        e.id !== "linea-identidad" &&
        !e.id.startsWith("punto-") &&
        !e.id.startsWith("linea-"),
    );

  if (!found || !found.latex) {
    throw new Error("Please ensure a function is defined.");
  }

  return {
    latex: found.latex,
    fn: createFunctionFromLatex(found.latex),
  };
}
