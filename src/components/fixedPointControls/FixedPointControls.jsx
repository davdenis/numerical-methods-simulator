export function FixedPointControls({ params, setParam }) {
  return (
    <div className="method-parameters">
      <h3 className="parameters-title">Fixed Point Parameters</h3>

      <div className="input-group">
        <label htmlFor="input-p0" className="input-label">
          Initial Approximation (p₀)
        </label>
        <input
          id="input-p0"
          type="number"
          step="any"
          className="styled-input"
          value={params.p0}
          onChange={(e) => setParam("p0", parseFloat(e.target.value) || 0)}
        />
      </div>

      <div className="input-row">
        <div className="input-group">
          <label htmlFor="input-fp-tol" className="input-label">
            Tolerance (tol)
          </label>
          <input
            id="input-fp-tol"
            type="number"
            step="any"
            className="styled-input"
            value={params.tol}
            onChange={(e) =>
              setParam("tol", parseFloat(e.target.value) || 1e-6)
            }
          />
        </div>

        <div className="input-group">
          <label htmlFor="input-fp-maxiter" className="input-label">
            Max Iterations (N)
          </label>
          <input
            id="input-fp-maxiter"
            type="number"
            min="1"
            max="500"
            className="styled-input"
            value={params.maxIterations}
            onChange={(e) =>
              setParam("maxIterations", parseInt(e.target.value, 10) || 50)
            }
          />
        </div>
      </div>
    </div>
  );
}
