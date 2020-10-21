const SortedMap = require("collections/sorted-map");

/**
 * Returns smallest prime divisor of a number, or false if the number is prime
 *
 * @param {Number} num
 */
function findSmallestPrimeDivisor(num) {
  if (num < 1 || num % 1 !== 0)
    throw new Error(
      "Input must be a whole number larger than 1, received: " + num
    );
  if (num <= 3) return false;

  if (num % 2 === 0) return 2;
  if (num % 3 === 0) return 3;

  for (let int = 5; int <= Math.sqrt(num); int += 6) {
    if (num % int === 0) return int;
    if (num % (int + 2) === 0) return int + 2;
  }

  return false;
}

let memoizedDerivative = (function () {
  const derivatives = new Map([
    [2, 1],
    [3, 1],
    [5, 1],
    [6, 5]
  ]);

  return function calc(num, max = 1e6) {
    if (derivatives.has(num)) return derivatives.get(num);
    let firstPrime = findSmallestPrimeDivisor(num);
    let nextDerivative = 1;
    if (firstPrime) {
      nextDerivative = firstPrime * calc(num / firstPrime) + num / firstPrime;
    }
    if (num <= max) {
      derivatives.set(num, nextDerivative);
    }
    return nextDerivative;
  };
})();

// let start = 2;
// let end = 1e6;
// let percent = 0;
// let map = new SortedMap();
// while (start <= end) {
//   let der = memoizedDerivative(start);
//   if (memoizedDerivative(der) === 1 && der > 1) {
//     if (map.has(der)) {
//       map.get(der).push(start);
//     } else {
//       map.set(der, [start]);
//     }
//   }
//   start++;
//   let newPercent = Math.floor((start * 100) / end);
//   if (newPercent > percent) {
//     console.log(`${newPercent}% complete...`);
//     percent = newPercent;
//   }
// }
// map.forEach((coolNums, prime) => console.log(`${prime} => [${coolNums.join(", ")}]`))

// console.log("\n\n***********\n\n");
// console.log("Primes with no cool number:");
// console.log("\n\n***********\n\n");

// let numPrimes = 0;
// let uncoolPrimes = 0;
// for (let i = 2; i <= end / 10; i++) {
//   if (!findSmallestPrimeDivisor(i)) {
//     numPrimes++;
//     if (!map.has(i)) {
//       console.log(i);
//       uncoolPrimes++;
//     }
//   }
// }
// console.log(`${uncoolPrimes * 100 / numPrimes}% uncool primes.`);

module.exports = { memoizedDerivative };
