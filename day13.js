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
let timestamp = 100000050000000;
let found = false;

let allBusses = input[1].split(",");
//adder is the largest number in the array
let adder = 0;
let indexOfLargest = 0;
for (let i = 0; i < allBusses.length; i++) {
  if (allBusses[i] === "x") {
    continue;
  }
  const val = parseInt(allBusses[i]);
  if (val > adder) {
    adder = val;
    indexOfLargest = i;
  }
}

while (true) {
  if (timestamp % adder === 0) {
    break;
  }
  timestamp++;
}
const countNeeded = allBusses.filter((id) => {
  return id !== "x";
}).length;

while (!found) {
  let count = 0;
  // console.log(timestamp);
  for (let i = 0; i < allBusses.length; i++) {
    if (allBusses[i] === "x") {
      continue;
    }
    if ((timestamp - indexOfLargest + i) % parseInt(allBusses[i]) === 0) {
      count++;
    } else {
      break;
    }
  }
  if (count === countNeeded) {
    found = true;
  } else {
    //find next best timestamp
    timestamp += adder;
    while (
      (timestamp - indexOfLargest) % allBusses[0] !== 0 &&
      (timestamp - indexOfLargest + allBusses[allBusses.length - 1]) %
        allBusses[allBusses.length - 1] !==
        0
    ) {
      timestamp += adder;
    }
  }
}

console.log("Part 2:", timestamp - indexOfLargest);
