import { readInput } from "./helper.js";

const input = readInput("./input/day3.txt");

const cols = input[0].length;

let totalTrees = 0;
let x = 0;
//part 1
for (let col = 1; col < input.length; col++) {
  for (let i = 0; i < 3; i++) {
    x++;
    if (x === cols) {
      x = 0;
    }
  }
  if (input[col].charAt(x) === "#") {
    totalTrees++;
  }
}

console.log("Part 1: ", totalTrees);
const totals = [totalTrees];

const slopes = [
  { x: 1, y: 1 },
  { x: 5, y: 1 },
  { x: 7, y: 1 },
  { x: 1, y: 2 },
];
slopes.forEach((slope) => {
  x = 0;
  totalTrees = 0;
  for (let col = slope.y; col < input.length; col += slope.y) {
    for (let i = 0; i < slope.x; i++) {
      x++;
      if (x === cols) {
        x = 0;
      }
    }

    if (input[col].charAt(x) === "#") {
      totalTrees++;
    }
  }
  totals.push(totalTrees);
});
const totalTreesAllSlopes = totals.reduce((x, y) => {
  return x * y;
});
console.log("Part 2: ", totalTreesAllSlopes);
//2783613000
