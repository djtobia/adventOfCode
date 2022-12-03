import { readInput } from "./helpers/filereader";

const input = readInput("./input/day3.txt");

interface Priority {
  [key: string] : number
}
const lowerPriorities: Priority = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26
}

const upperPriorities: Priority = {
  A: 27,
  B: 28,
  C: 29,
  D: 30,
  E: 31,
  F: 32,
  G: 33,
  H: 34,
  I: 35,
  J: 36,
  K: 37,
  L: 38,
  M: 39,
  N: 40,
  O: 41,
  P: 42,
  Q: 43,
  R: 44,
  S: 45,
  T: 46,
  U: 47,
  V: 48,
  W: 49,
  X: 50,
  Y: 51,
  Z: 52
}

let total = 0;
input.forEach(line => {
  const half = line.length / 2;
  const firstHalf = line.slice(0,half);
  const secondHalf = line.slice(half);
  for (const letter of firstHalf) {
    if (secondHalf.includes(letter)) {
      if (Object.keys(lowerPriorities).includes(letter)) {
        total += lowerPriorities[letter];
      } else {
        total += upperPriorities[letter];
      }
      break;
    }
  }
});

console.log("Part 1", total);

total = 0;
for (let i = 0, j = 1, k = 2; k < input.length; i+=3, j+=3, k+=3) {
  for (const letter of input[i]) {
    if (input[j].includes(letter) && input[k].includes(letter)) {
      if (Object.keys(lowerPriorities).includes(letter)) {
        total += lowerPriorities[letter];
      } else {
        total += upperPriorities[letter];
      }
      break;
    }
  }
}

console.log("Part 2", total);

