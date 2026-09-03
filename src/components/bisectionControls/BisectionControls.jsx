export function BisectionControls({ a, setA, b, setB, tol, setTol, n, setN }) {
  return (
    <div className="method-parameters">
      <h3 className="parameters-title">Parámetros del Intervalo</h3>

      <div className="input-row">
        <div className="input-group">
          <label htmlFor="input-a" className="input-label">
            Límite inferior (a)
          </label>
          <input
            id="input-a"
            type="number"
            step="any"
            className="styled-input"
            value={a}
            onChange={(e) => setA(parseFloat(e.target.value) || 0)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="input-b" className="input-label">
            Límite superior (b)
          </label>
          <input
            id="input-b"
            type="number"
            step="any"
            className="styled-input"
            value={b}
            onChange={(e) => setB(parseFloat(e.target.value) || 0)}
          />
        </div>
      </div>

      <div className="input-row">
        <div className="input-group">
          <label htmlFor="input-tol" className="input-label">
            Tolerancia (tol)
          </label>
          <input
            id="input-tol"
            type="number"
            step="any"
            className="styled-input"
            value={tol}
            onChange={(e) => setTol(parseFloat(e.target.value) || 1e-6)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="input-maxiter" className="input-label">
            Máx Iteraciones (N)
          </label>
          <input
            id="input-maxiter"
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
