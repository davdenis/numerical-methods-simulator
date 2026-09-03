import { useState } from "react";
import {
  ejecutarMetodo,
  cancelarAnimacionPendiente,
  limpiarPuntosPrevios,
} from "../utils/Animations";
import { METHODS } from "../constants/methods";
import { getFunctionFromCalculator } from "../utils/mathParser";

export function useFixedPointRun(calculatorRef, timeoutsRef) {
  const [p0, setP0] = useState(1.5);
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
    setError(null);

    try {
      // Extraer y parsear la función g(x) ingresada en Desmos
      const { fn, latex } = getFunctionFromCalculator(
        calculatorRef.current,
        "funcion",
      );
      setCurrentLatex(latex);

      const metodo = METHODS.fixedPoint;
      const params = { g: fn, p0, tol, maxIter };

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
    p0,
    setP0,
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
