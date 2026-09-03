import { useRef, useEffect, useState } from "react";
import { useDesmosCalc } from "../../hooks/useDesmosCalc";
import { useBisectionRun } from "../../hooks/useBisectionRun";
import { useFixedPointRun } from "../../hooks/useFixedPointRun";
import { GraphCanvas } from "../graphCanvas/GraphCanvas";
import { MethodSelector } from "../controls/MethodSelector";
import { BisectionControls } from "../bisectionControls/BisectionControls";
import { FixedPointControls } from "../fixedPointControls/FixedPointControls";
import { ResultsSummary } from "../results/ResultsSummary";
import {
  cancelarAnimacionPendiente,
  limpiarPuntosPrevios,
} from "../../utils/Animations";

export function GraphPanel() {
  const containerRef = useRef(null);
  const { calculator, calculatorRef } = useDesmosCalc(containerRef);
  const timeoutsRef = useRef([]);

  const [activeMethod, setActiveMethod] = useState("bisection");

  const bisectionRunner = useBisectionRun(calculatorRef, timeoutsRef);
  const fixedPointRunner = useFixedPointRun(calculatorRef, timeoutsRef);

  const currentRunner =
    activeMethod === "bisection" ? bisectionRunner : fixedPointRunner;

  // Actualizar las curvas bases en Desmos al inicializar o cambiar de método
  useEffect(() => {
    if (!calculator) return;

    // Limpiar puntos y animaciones anteriores
    cancelarAnimacionPendiente(timeoutsRef);
    limpiarPuntosPrevios(calculator);

    if (activeMethod === "bisection") {
      calculator.removeExpression({ id: "linea-identidad" });
      calculator.setExpression({
        id: "funcion",
        latex: "f(x) = x^2 - 2",
        color: "#2563eb",
      });
    } else if (activeMethod === "fixedPoint") {
      calculator.setExpression({
        id: "funcion",
        latex: "g(x) = \\frac{x + \\frac{2}{x}}{2}",
        color: "#2563eb",
      });
      // Línea y = x para visualizar la intersección de punto fijo
      calculator.setExpression({
        id: "linea-identidad",
        latex: "y = x",
        color: "#94a3b8",
        lineStyle: window.Desmos?.Styles?.DASHED || "DASHED",
      });
    }
  }, [activeMethod, calculator]);

  const handleSelectMethod = (methodId) => {
    bisectionRunner.reset();
    fixedPointRunner.reset();
    setActiveMethod(methodId);
  };

  const handleRun = () => {
    currentRunner.run();
  };

  const handleReset = () => {
    currentRunner.reset();
  };

  return (
    <div className="layout-container">
      <aside className="sidebar">
        <header className="sidebar-header">
          <div className="brand-badge">SIMAT</div>
          <h1 className="sidebar-title">Búsqueda de Raíces</h1>
          <p className="sidebar-subtitle">
            Simulador visual interactivo de métodos numéricos
          </p>
        </header>

        <div className="sidebar-content">
          <MethodSelector
            activeMethod={activeMethod}
            onSelectMethod={handleSelectMethod}
          />

          <div className="controls-card">
            {activeMethod === "bisection" && (
              <BisectionControls {...bisectionRunner} />
            )}
            {activeMethod === "fixedPoint" && (
              <FixedPointControls {...fixedPointRunner} />
            )}

            <div className="actions-group">
              <button
                type="button"
                className="btn-primary"
                onClick={handleRun}
                disabled={currentRunner.isRunning}
              >
                {currentRunner.isRunning
                  ? "Simulando..."
                  : "▶ Ejecutar Simulación"}
              </button>

              <button
                type="button"
                className="btn-secondary"
                onClick={handleReset}
              >
                ↺ Reiniciar
              </button>
            </div>
          </div>

          <ResultsSummary
            results={currentRunner.results}
            isRunning={currentRunner.isRunning}
            error={currentRunner.error}
            currentLatex={currentRunner.currentLatex}
          />
        </div>
      </aside>

      <main className="main-canvas">
        <GraphCanvas containerRef={containerRef} />
      </main>
    </div>
  );
}
