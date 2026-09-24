import { useState, useEffect } from "react";
import {
  executeMethod,
  cancelPendingAnimation,
  cleanPreviousPoints,
} from "../utils/Animations";
import { getFunctionFromCalculator } from "../utils/mathParser";

export function useMethodRunner(calculatorRef, timeoutsRef, method) {
  const [prevMethod, setPrevMethod] = useState(null);
  const [params, setParams] = useState(method.defaultParams);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [currentLatex, setCurrentLatex] = useState(null);

  if (method !== prevMethod) {
    setPrevMethod(method);
    setParams(method.defaultParams);
    setError(null);
    setResults(null);
    setIsRunning(false);
    setCurrentLatex(null);
  }

  useEffect(() => {
    cancelPendingAnimation(timeoutsRef);
    cleanPreviousPoints(calculatorRef.current);
  }, [method]);

  function setParam(key, value) {
    setParams((prevParams) => ({
      ...prevParams,
      [key]: value,
    }));
  }

  function run() {
    setError(null);

    try {
      const { fn, latex } = getFunctionFromCalculator(
        calculatorRef.current,
        "function",
      );
      setCurrentLatex(latex);

      const methodParams = {
        ...params,
        [method.functionParam]: fn,
      };

      if (method.validateParams) {
        method.validateParams(methodParams);
      }

      setIsRunning(true);
      const iterations = executeMethod(calculatorRef.current, timeoutsRef, {
        fn: () => method.run(methodParams),
        getCoords: method.getCoords,
        delayMs: 450,
        onFinish: () => setIsRunning(false),
      });
      setResults(iterations);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "An error occurred during execution.",
      );
      setIsRunning(false);
    }
  }

  function reset() {
    cancelPendingAnimation(timeoutsRef);
    cleanPreviousPoints(calculatorRef.current);
    setError(null);
    setResults(null);
    setIsRunning(false);
    setCurrentLatex(null);
  }

  return {
    params,
    setParam,
    error,
    results,
    isRunning,
    currentLatex,
    run,
    reset,
  };
}
