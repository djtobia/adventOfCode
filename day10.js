import { readInput } from "./helpers/fileReader.js";

const input = readInput("./input/day10.txt")
  .map((val) => {
    return parseInt(val);
  })
  .sort((a, b) => {
    return a - b;
  });

let oneDiffs = 0;
//built in adaptor is largest + 3, so there already is one 3-diff
let threeDiffs = 1;
let prev = 0;
for (let i = 0; i < input.length; i++) {
  const num = input[i];
  if (num - prev === 1) {
    oneDiffs++;
  } else if (num - prev === 3) {
    threeDiffs++;
  }
  prev = num;
}

console.log("Part 1 :", oneDiffs * threeDiffs);
input.unshift(0);

input.push(input[input.length - 1] + 3);
let pow7 = 0;
let pow2 = 0;
for (let i = 1; i < input.length - 1; i++) {
  let numberThreeBehind = i >= 3 ? input[i - 3] : -1000;
  if (input[i + 1] - numberThreeBehind === 4) {
    pow7++;
    pow2 -= 2;
  } else if (input[i + 1] - input[i - 1] === 2) {
    pow2++;
  }
}

console.log("Part 2:", Math.pow(2, pow2) * Math.pow(7, pow7));
