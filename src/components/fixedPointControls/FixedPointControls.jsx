export function FixedPointControls({ p0, setP0, tol, setTol, n, setN }) {
  return (
    <div className="method-parameters">
      <h3 className="parameters-title">Parámetros de Punto Fijo</h3>

      <div className="input-group">
        <label htmlFor="input-p0" className="input-label">
          Aproximación inicial (p₀)
        </label>
        <input
          id="input-p0"
          type="number"
          step="any"
          className="styled-input"
          value={p0}
          onChange={(e) => setP0(parseFloat(e.target.value) || 0)}
        />
      </div>

      <div className="input-row">
        <div className="input-group">
          <label htmlFor="input-fp-tol" className="input-label">
            Tolerancia (tol)
          </label>
          <input
            id="input-fp-tol"
            type="number"
            step="any"
            className="styled-input"
            value={tol}
            onChange={(e) => setTol(parseFloat(e.target.value) || 1e-6)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="input-fp-maxiter" className="input-label">
            Máx Iteraciones (N)
          </label>
          <input
            id="input-fp-maxiter"
            type="number"
            min="1"
            max="500"
            className="styled-input"
            value={n}
            onChange={(e) => setN(parseInt(e.target.value, 10) || 50)}
          />
        </div>
      </div>
    </div>
  );
}
