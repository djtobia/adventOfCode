import { readInput } from "./helpers/filereader";
const input = readInput("./input/day1.txt").map((e: string) => parseInt(e));
const elfTotals: number[] = [];
let runningTotal = 0;
input.forEach((calories) => {
  if (calories > 0) {
    runningTotal += calories;
  } else {
    elfTotals.push(runningTotal);
    runningTotal = 0;
  }
});
elfTotals.sort((a, b) => b - a);
console.log("Part 1", elfTotals[0]);
console.log("Part 2", elfTotals[0] + elfTotals[1] + elfTotals[2]);
