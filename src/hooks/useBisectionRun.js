import { useState } from "react";
import {
  ejecutarMetodo,
  cancelarAnimacionPendiente,
  limpiarPuntosPrevios,
} from "../utils/Animations";
import { METHODS } from "../constants/methods";
import { getFunctionFromCalculator } from "../utils/mathParser";

export function useBisectionRun(calculatorRef, timeoutsRef) {
  const [a, setA] = useState(0);
  const [b, setB] = useState(2);
  const [tol, setTol] = useState(1e-6);
  const [maxIter, setMaxIter] = useState(50);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [currentLatex, setCurrentLatex] = useState(null);

  function reset() {
    cancelarAnimacionPendiente(timeoutsRef);
    limpiarPuntosPrevios(calculatorRef.current);
    setError(null);
    setResults(null);
    setIsRunning(false);
    setCurrentLatex(null);
  }

  function run() {
    if (a >= b) {
      setError("El límite 'a' debe ser estrictamente menor que 'b'.");
      return;
    }
    setError(null);

    try {
      // Extraer y parsear la función ingresada en Desmos
      const { fn, latex } = getFunctionFromCalculator(
        calculatorRef.current,
        "funcion",
      );
      setCurrentLatex(latex);

      const metodo = METHODS.bisection;
      const params = { f: fn, a, b, tol, maxIter };

      setIsRunning(true);
      const iteraciones = ejecutarMetodo(calculatorRef.current, timeoutsRef, {
        fn: () => metodo.run(params),
        getCoords: metodo.getCoords,
        delayMs: 450,
        onFinish: () => setIsRunning(false),
      });
      setResults(iteraciones);
    } catch (e) {
      setError(e.message || "Error al calcular el método");
      setIsRunning(false);
    }
  }

  return {
    a,
    setA,
    b,
    setB,
    tol,
    setTol,
    maxIter,
    setMaxIter,
    error,
    results,
    isRunning,
    currentLatex,
    run,
    reset,
  };
}
