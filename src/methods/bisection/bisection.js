function bisection(f, a, b, tol, n) {
  const iterations = [];
  let i = 0;
  let FA = f(a);

  if (FA * f(b) >= 0) {
    throw new Error("f(a) y f(b) deben tener signos opuestos.");
  }

  while (i <= n) {
    const err = (b - a) / 2;
    const p = a + err;
    const FP = f(p);

    iterations.push({
      n: i,
      p,
      FP,
      err,
    });

    if (FP === 0 || err <= tol) {
      return iterations;
    }

    i++;

    if (FA * FP > 0) {
      a = p;
      FA = FP;
    } else {
      b = p;
    }
  }

  return iterations;
}

export { bisection };
