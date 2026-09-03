export function limpiarPuntosPrevios(calculator, cantidad = 200) {
  if (!calculator) return;
  for (let i = 0; i < cantidad; i++) {
    calculator.removeExpression({ id: `punto-${i}` });
    calculator.removeExpression({ id: `linea-${i}` });
    calculator.removeExpression({ id: `punto_${i}` });
  }
}

export function cancelarAnimacionPendiente(timeoutsRef) {
  if (!timeoutsRef?.current) return;
  timeoutsRef.current.forEach((id) => clearTimeout(id));
  timeoutsRef.current = [];
}

export function animarIteraciones(
  calculator,
  iteraciones,
  timeoutsRef,
  getCoords,
  delayMs = 900,
  onStep = null,
  onFinish = null,
) {
  if (!calculator || !iteraciones?.length) return;

  iteraciones.forEach((iter, index) => {
    const timeoutId = setTimeout(() => {
      const { x, y } = getCoords(iter);
      const isLast = index === iteraciones.length - 1;

      if (index > 0) {
        const { x: prevX, y: prevY } = getCoords(iteraciones[index - 1]);
        calculator.setExpression({
          id: `point-${index - 1}`,
          latex: `(${prevX}, ${prevY})`,
          color: "#1750a0",
          showLabel: false,
          pointSize: 9,
        });
      }

      calculator.setExpression({
        id: `point-${index}`,
        latex: `(${x}, ${y})`,
        color: "#ef4444",
        label: `p${iter.n} = ${typeof x === "number" ? x.toFixed(5) : x}`,
        showLabel: true,
      });

      if (!isLast) {
        calculator.setExpression({
          id: `point-${index}`,
          latex: `(${x}, ${y})`,
          color: "#1750a0",
          showLabel: false,
          pointSize: 9,
        });
      }

      if (onStep) {
        onStep(iter, index);
      }

      if (index === iteraciones.length - 1 && onFinish) {
        onFinish();
      }
    }, index * delayMs);

    timeoutsRef.current.push(timeoutId);
  });
}

export function ejecutarMetodo(
  calculator,
  timeoutsRef,
  { fn, getCoords, delayMs = 900, onStep = null, onFinish = null },
) {
  cancelarAnimacionPendiente(timeoutsRef);
  limpiarPuntosPrevios(calculator);

  const iteraciones = fn();
  animarIteraciones(
    calculator,
    iteraciones,
    timeoutsRef,
    getCoords,
    delayMs,
    onStep,
    onFinish,
  );

  return iteraciones;
}
