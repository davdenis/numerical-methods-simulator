import { useRef, useEffect, useState } from "react";
import { useDesmosCalc } from "../../hooks/useDesmosCalc";
import { GraphCanvas } from "../graphCanvas/GraphCanvas";
import { MethodSelector } from "../controls/MethodSelector";
import { BisectionControls } from "../bisectionControls/BisectionControls";
import { FixedPointControls } from "../fixedPointControls/FixedPointControls";
import { ResultsSummary } from "../results/ResultsSummary";

import { useMethodRunner } from "../../hooks/useMethodRunner";
import { METHODS } from "../../constants/methods";

import {
  cancelPendingAnimation,
  cleanPreviousPoints,
} from "../../utils/Animations";

export function GraphPanel() {
  const containerRef = useRef(null);
  const { calculator, calculatorRef } = useDesmosCalc(containerRef);
  const timeoutsRef = useRef([]);

  const [activeMethodId, setActiveMethodId] = useState("bisection");
  const currentMethod = METHODS[activeMethodId];

  const methodRunner = useMethodRunner(
    calculatorRef,
    timeoutsRef,
    currentMethod,
  );

  // Actualizar las curvas bases en Desmos al inicializar o cambiar de método
  useEffect(() => {
    if (!calculator) return;

    // Limpiar puntos y animaciones anteriores
    cancelPendingAnimation(timeoutsRef);
    cleanPreviousPoints(calculator);

    if (activeMethodId === "bisection") {
      calculator.removeExpression({ id: "identity-line" });
      calculator.setExpression({
        id: "function",
        latex: "f(x) = x^2 - 2",
        color: "#2563eb",
      });
    } else if (activeMethodId === "fixedPoint") {
      // Línea y = x para visualizar la intersección de punto fijo
      calculator.setExpression({
        id: "identity-line",
        latex: "y = x",
        color: "#94a3b8",
        lineStyle: window.Desmos?.Styles?.DASHED || "DASHED",
      });
      calculator.setExpression({
        id: "function",
        latex: "g(x) = \\frac{x + \\frac{2}{x}}{2}",
        color: "#2563eb",
      });
    }
  }, [activeMethodId, calculator]);

  return (
    <div className="layout-container">
      <aside className="sidebar">
        <header className="sidebar-header">
          <div className="brand-badge">SIMAT</div>
        </header>

        <div className="sidebar-content">
          <MethodSelector
            activeMethod={activeMethodId}
            onSelectMethod={setActiveMethodId}
          />

          <div className="controls-card">
            {activeMethodId === "bisection" && (
              <BisectionControls
                params={methodRunner.params}
                setParam={methodRunner.setParam}
              />
            )}
            {activeMethodId === "fixedPoint" && (
              <FixedPointControls
                params={methodRunner.params}
                setParam={methodRunner.setParam}
              />
            )}

            <div className="actions-group">
              <button
                type="button"
                className="btn-primary"
                onClick={methodRunner.run}
                disabled={methodRunner.isRunning}
              >
                {methodRunner.isRunning
                  ? "Simulating..."
                  : "▶ Execute Simulation"}
              </button>

              <button
                type="button"
                className="btn-secondary"
                onClick={methodRunner.reset}
              >
                ↺ Restart
              </button>
            </div>
          </div>

          <ResultsSummary
            results={methodRunner.results}
            isRunning={methodRunner.isRunning}
            error={methodRunner.error}
            currentLatex={methodRunner.currentLatex}
          />
        </div>
      </aside>

      <main className="main-canvas">
        <GraphCanvas containerRef={containerRef} />
      </main>
    </div>
  );
}
