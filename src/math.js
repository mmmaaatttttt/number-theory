/**
 * Returns true if num is prime, otherwise false.
 *
 * @param {Number} num
 */
function isPrime(num) {
  if (num <= 1) return false;
  if (num <= 3) return true;

  if (num % 2 === 0 || num % 3 === 0) return false;

  for (let int = 5; int <= Math.sqrt(num); int += 6) {
    if (num % int === 0 || num % (int + 2) === 0) return false;
  }

  return true;
}

/**
 * Generator for prime numbers.
 */
function* primes() {
  yield 2;
  yield 3;
  let testNum = 5;
  while (true) {
    if (isPrime(testNum)) yield testNum;
    testNum += testNum % 6 === 1 ? 4 : 2;
  }
}

/**
 * Returns a map of the prime factorization of a whole number.
 * Keys are prime divisors, values are the exponents.
 * @param {Number} num
 */
function factorization(num) {
  if (num <= 1 || num % 1 !== 0) {
    throw "num must be a whole number greater than 1.";
  }

  let factorizationMap = new Map();
  let primeGenerator = primes();
  while (num > 1) {
    let curPrime = primeGenerator.next().value;
    while (num % curPrime === 0) {
      let count = factorizationMap.get(curPrime) || 0;
      factorizationMap.set(curPrime, count + 1);
      num /= curPrime;
    }
  }
  return factorizationMap;
}

/**
 * Converts a factorization map into the original number.
 * @param {Map} factorization
 */
function expansion(factorization) {
  let num = 0;
  for (let [prime, exponent] of factorization) {
    num += prime ** exponent;
  }
  return num;
}

/**
 * Determines whether a number is square-free; that is,
 * whether all of its prime factors appear with exponent exactly 1.
 * @param {Number || Map} numOrFactorization
 */
function isSquareFree(numOrFactorization) {
  // case 1: number input
  if (typeof numOrFactorization === "number") {
    for (let i = 2; i <= Math.sqrt(numOrFactorization); i++) {
      if (numOrFactorization % (i * i) === 0) return false;
    }
    return true;
  }

  // case 2: already have factorization
  for (let exponent of numOrFactorization.values()) {
    if (exponent > 1) return false;
  }
  return true;
}

/**
 * Calculates the arithmetic derivative of a number.
 * See https://en.wikipedia.org/wiki/Arithmetic_derivative for details.
 * @param {Number || Map} num
 */
function arithmeticDerivative(num) {
  if (num === 1) return 0;
  let primeFactorization;

  // if we pass a factorization instead, swap variables
  if (typeof num === "object") {
    primeFactorization = num;
    num = expansion(num);
  } else {
    primeFactorization = factorization(num);
  }

  let derivative = 0;
  for (let [prime, exponent] of primeFactorization) {
    derivative += (num * exponent) / prime;
  }
  return derivative;
}

/**
 * Determines whether a number is super-square-free; that is,
 * whether all of its prime factors appear with exponent exactly 1,
 * and furthermore, whether the smallest prime is 2 if the number of primes is even.
 * @param {Number || Map} numOrFactorization
 */
function isSuperSquareFree(numOrFactorization) {
  if (typeof numOrFactorization === "number") {
    numOrFactorization = factorization(numOrFactorization);
  }

  const numPrimes = numOrFactorization.size;
  const hasTwo = numOrFactorization.has(2);

  return (
    isSquareFree(numOrFactorization) &&
    ((numPrimes % 2 === 0 && hasTwo) || numPrimes % 2 === 1)
  );
}

// TODO: number of solutions to n' = k for varying k
// let start = 2;
// let end = 1e6;
// let percent = 0;
// let map = new Map();
// while (start <= end) {
//   let der = arithmeticDerivative(start);
//   if (isPrime(der)) {
//     if (map.has(der)) {
//       map.get(der).push(start);
//     } else {
//       map.set(der, [start]);
//     }
//   }
//   start++;
//   let newPercent = Math.floor(start * 100/ end);
//   if (newPercent > percent) {
//     console.log(`${newPercent}% complete...`);
//     percent = newPercent;
//   }
// }
// console.log(map);

// TODO: use memoization to calculate derivatives faster!

// counting SSFs -> roughly 40.53% of all numbers
// let total = 1e7;
// let numSuperSquareFree = 0;
// let percent = 0;
// for (let num = 2; num <= total; num++) {
//   numSuperSquareFree += +isSuperSquareFree(num);
//   let newPercent = Math.floor(num * 100 / total);
//   if (newPercent > percent) {
//     console.log(num, numSuperSquareFree / num);
//     percent = newPercent;
//   }
// }

module.exports = { isSquareFree, isPrime };
