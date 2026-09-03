import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

export function ResultsSummary({ results, isRunning, error, currentLatex }) {
  if (error) {
    return (
      <div className="card error-card">
        <div className="card-header">
          <span className="status-dot error"></span>
          <h4>Error en el cálculo</h4>
        </div>
        <p className="error-message">{error}</p>
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div className="card info-card">
        <p className="placeholder-text">
          Modifica la función en Desmos si lo deseas y haz clic en{" "}
          <strong>"Ejecutar Simulación"</strong>.
        </p>
      </div>
    );
  }

  const lastIteration = results[results.length - 1];
  const rootValue = lastIteration.p;
  const totalIterations = results.length;
  const lastErr = lastIteration.err;

  return (
    <div className="card results-card">
      <div className="card-header">
        <span
          className={`status-dot ${isRunning ? "running" : "success"}`}
        ></span>
        <h4>{isRunning ? "Calculando / Animando..." : "Resultado Final"}</h4>
      </div>

      {currentLatex && (
        <div className="equation-badge">
          <span className="eq-label">Función evaluada:</span>
          <span className="equation-math">
            <InlineMath math={currentLatex} />
          </span>
        </div>
      )}

      <div className="metrics-grid">
        <div className="metric-box">
          <span className="metric-label">Raíz Aproximada (p*)</span>
          <span className="metric-value highlight">
            {typeof rootValue === "number" ? rootValue.toFixed(6) : rootValue}
          </span>
        </div>

        <div className="metric-box">
          <span className="metric-label">Iteraciones</span>
          <span className="metric-value">{totalIterations}</span>
        </div>

        {lastErr !== undefined && (
          <div className="metric-box full-width">
            <span className="metric-label">Error estimado final</span>
            <span className="metric-value code">
              {typeof lastErr === "number" ? lastErr.toExponential(4) : lastErr}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
