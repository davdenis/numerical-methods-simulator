import { useEffect, useRef, useState } from "react";

export function useDesmosCalc(containerRef) {
  const calculatorRef = useRef(null);
  const [calculator, setCalculator] = useState(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (typeof window === "undefined" || !window.Desmos) {
      console.warn("Desmos API is not available.");
      return;
    }

    const calc = window.Desmos.GraphingCalculator(containerRef.current, {
      expressions: true,
      settingsMenu: true,
      zoomButtons: true,
      border: false,
      keypad: false,
    });

    calculatorRef.current = calc;
    setCalculator(calc);

    return () => {
      calc.destroy();
      calculatorRef.current = null;
      setCalculator(null);
    };
  }, [containerRef]);

  return { calculator, calculatorRef };
}
