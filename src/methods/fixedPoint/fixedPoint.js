function fixedPoint(g, p0, tol, n) {
  const iterations = [];
  let i = 0;

  while (i <= n) {
    const p = g(p0);
    const err = Math.abs(p - p0);

    iterations.push({
      n: i,
      p,
      err,
    });

    if (err < tol) {
      return iterations;
    }

    p0 = p;
    i++;
  }

  return iterations;
}

export { fixedPoint };
