const { memoizedDerivative } = require("./memoizedDerivative");
const { isSquareFree, isPrime } = require("./math");
const zeta = require("math-riemann-zeta");

function zetaAllNumbers(MAX, s) {
  let total = 0;
  for (let n = 2; n <= MAX; n++) {
    total += memoizedDerivative(n) / n ** s;
  }
  return total;
}

function zetaOnlySquareFree(MAX, s) {
  let total = 0;
  for (let n = 2; n <= MAX; n++) {
    if (isSquareFree(n)) {
      total += memoizedDerivative(n) / n ** s;
    }
  }
  return total;
}

function altZetaAllNumbers(primeMax, s) {
  let total = 0;
  for (let n = 2; n < primeMax; n++) {
    if (isPrime(n)) {
      total += 1 / (n ** s - n);
    }
  }
  return total * zeta(s - 1);
}

function altZetaOnlySquareFree(primeMax, s) {
  let total = 0;
  for (let n = 2; n < primeMax; n++) {
    if (isPrime(n)) {
      total += 1 / (n ** s + n);
    }
  }
  return (total * zeta(s - 1)) / zeta(2 * s - 2);
}

// console.log("zetaAllNumbers(1e7, 3)", zetaAllNumbers(1e7, 3));
// 0.3642925668464243

// console.log("altZetaAllNumbers(1e7, 3)", altZetaAllNumbers(1e7, 3));
// 0.36429264416278834

// console.log("zetaOnlySquareFree(1e7, 3)", zetaOnlySquareFree(1e7, 3));
// 0.2214111534038811

// console.log("altZetaOnlySquareFree(1e7, 3)", altZetaOnlySquareFree(1e7, 3));
// 0.22141117347942169 