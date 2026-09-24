export function BisectionControls({ params, setParam }) {
  return (
    <div className="method-parameters">
      <h3 className="parameters-title">Interval</h3>

      <div className="input-row">
        <div className="input-group">
          <label htmlFor="input-a" className="input-label">
            Lower Bound (a)
          </label>
          <input
            id="input-a"
            type="number"
            step="any"
            className="styled-input"
            value={params.a}
            onChange={(e) => setParam("a", parseFloat(e.target.value) || 0)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="input-b" className="input-label">
            Upper Bound (b)
          </label>
          <input
            id="input-b"
            type="number"
            step="any"
            className="styled-input"
            value={params.b}
            onChange={(e) => setParam("b", parseFloat(e.target.value) || 0)}
          />
        </div>
      </div>

      <div className="input-row">
        <div className="input-group">
          <label htmlFor="input-tol" className="input-label">
            Tolerance (tol)
          </label>
          <input
            id="input-tol"
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
          <label htmlFor="input-maxiter" className="input-label">
            Max Iterations (N)
          </label>
          <input
            id="input-maxiter"
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
