const { primesUpTo } = require("./math");
const { memoizedDerivative } = require("./memoizedDerivative");
const PRIME_BOUND = 1e5;
const MAX_INT_TO_CHECK = 1e8;
const LOG_EVERY = 1e6;

const primeMap = primesUpTo(PRIME_BOUND);

for (let n = 2; n < MAX_INT_TO_CHECK; n++) {
  let der = memoizedDerivative(n);
  if (primeMap.has(der)) {
    let oldVal = primeMap.get(der) || [];
    primeMap.set(der, [...oldVal, n]);
  }
  if (n % LOG_EVERY === 0) {
    console.log(`${n * 100 / MAX_INT_TO_CHECK}% complete.`)
  }
}

let primeDerivativeCount = 0;
let average = 0;
for (let val of primeMap.values()) {
  if (val) {
    primeDerivativeCount++;
    average += val.length / primeMap.size;
  }
}

console.log("PRIME MAP", primeMap);
console.log("NUMBER OF PRIMES:", primeMap.size);
console.log("NUMBER OF PRIMES IN THE DERIVATIVE", primeDerivativeCount);
console.log("AVERAGE", average);

// when searching up to 2e8, primes up to 1e6:
// NUMBER OF PRIMES: 78498
// NUMBER OF PRIMES IN THE DERIVATIVE 51583 (65.7%)
// AVERAGE 5.470419628526291

// when searching up to 1e8, primes up to 1e5:
// NUMBER OF PRIMES: 9592
// NUMBER OF PRIMES IN THE DERIVATIVE 6277 (65.4%)
// AVERAGE 3.2742910758968025