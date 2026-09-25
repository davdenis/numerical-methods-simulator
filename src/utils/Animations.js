export function cleanPreviousPoints(calculator, q = 200) {
  if (!calculator) return;
  for (let i = 0; i < q; i++) {
    calculator.removeExpression({ id: `point-${i}` });
  }
}

export function cancelPendingAnimation(timeoutsRef) {
  if (!timeoutsRef?.current) return;
  timeoutsRef.current.forEach((id) => clearTimeout(id));
  timeoutsRef.current = [];
}

export function animateIterations(
  calculator,
  iterations,
  timeoutsRef,
  getCoords,
  delayMs = 900,
  onStep = null,
  onFinish = null,
) {
  if (!calculator || !iterations?.length) return;

  iterations.forEach((iter, index) => {
    const timeoutId = setTimeout(() => {
      const { x, y } = getCoords(iter);
      const isLast = index === iterations.length - 1;

      if (index > 0) {
        const { x: prevX, y: prevY } = getCoords(iterations[index - 1]);
        calculator.setExpression({
          id: `point-${index - 1}`,
          latex: `(${prevX}, ${prevY})`,
          color: "#1750a0",
          showLabel: false,
          pointSize: 5,
        });
      }

      calculator.setExpression({
        id: `point-${index}`,
        latex: `(${x}, ${y})`,
        color: "#ef4444",
        label: `p${iter.n} = ${typeof x === "number" ? x.toFixed(5) : x}`,
        showLabel: true,
      });

      if (onStep) {
        onStep(iter, index);
      }

      if (index === iterations.length - 1 && onFinish) {
        onFinish();
      }
    }, index * delayMs);

    timeoutsRef.current.push(timeoutId);
  });
}

export function executeMethod(
  calculator,
  timeoutsRef,
  { fn, getCoords, delayMs = 900, onStep = null, onFinish = null },
) {
  cancelPendingAnimation(timeoutsRef);
  cleanPreviousPoints(calculator);

  const iterations = fn();
  animateIterations(
    calculator,
    iterations,
    timeoutsRef,
    getCoords,
    delayMs,
    onStep,
    onFinish,
  );

  return iterations;
}
