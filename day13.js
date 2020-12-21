import { readInput } from "./helpers/fileReader.js";

const input = readInput("./input/day13.txt");

const earliestTimestamp = parseInt(input[0]);
const runningBusses = input[1].split(",").filter((id) => {
  return id !== "x";
});

let nextEarliest = 0;
let counter = earliestTimestamp;
let busId = 0;
while (!nextEarliest) {
  for (let i = 0; i < runningBusses.length; i++) {
    if (counter % runningBusses[i] === 0) {
      nextEarliest = counter;
      busId = runningBusses[i];
      break;
    }
  }
  counter++;
}

console.log("Part 1:", busId * (nextEarliest - earliestTimestamp));

//find first large timestamp that is divisible by the first bus
let timestamp = 0;
let found = false;

let allBusses = input[1].split(",");
allBusses = allBusses.map(val => {
  return val === 'x' ? 1 : parseInt(val);
});

console.log('Part 2:',
  allBusses.slice(1).reduce(
    ([last, multiplier], current, i) => {
      for (let found = +last; ; found += multiplier) {
        if ((found + i + 1)%current === 0) {
          return [found, multiplier*current];
        }
      }
    },
    [allBusses[0], allBusses[0]]
  )[0]
);

