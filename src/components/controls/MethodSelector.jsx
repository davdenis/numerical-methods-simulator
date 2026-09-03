import { METHODS } from "../../constants/methods";

export function MethodSelector({ activeMethod, onSelectMethod }) {
  return (
    <div className="control-group">
      <label htmlFor="method-select" className="section-label">
        Método
      </label>
      <div className="select-wrapper">
        <select
          id="method-select"
          className="styled-select"
          value={activeMethod}
          onChange={(e) => onSelectMethod(e.target.value)}
        >
          {Object.values(METHODS).map((method) => (
            <option key={method.id} value={method.id}>
              {method.name} ({method.badge})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

