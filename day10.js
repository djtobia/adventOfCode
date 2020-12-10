import { readInput } from "./helpers/fileReader.js";

const input = readInput("./input/day10test2.txt")
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

//find all possibly skippable numbers. skippable numbers are numbers within 3 of another number.
// (0) [1,2,3] 4, in this instance 1 2 and 3 are all skippable, because they are within 3 of 4.
//meaning we could do 0->1->4, or 0->2->4, or 0->3->4. we can also do 0->1->2->4, or 0->2->3->4
//i think we need to start at end of input, and go backwards, with counter that steps backwards,
//adding nums to a group until you have 3 in the group.
// looking at our input, starting at 138, go backwards, 137 is one away, 136 is 2 away, 135 is 3 away, that is a group.
// starting at 137, 136 is 1 away, 135 is 2 away, but 132 is too far away, our group is [136,137]. Then, count how many total numbers are grouped together, + 1 is total.

const skippableNumbers = [];
input.unshift(0);

input.push(input[input.length - 1] + 3);
console.log("input", input);
for (let i = 0; i < input.length; i++) {
  const num = input[i];
  for (let j = i + 3; j > i; j--) {
    if (j > input.length) {
      continue;
    }
    if (input[j] - num <= 3) {
      //all numbers inbetween i and j are 'skippable', push them into the array if they arent there already
      let q = j - 1;
      while (q > i) {
        if (!skippableNumbers.includes(input[q])) {
          skippableNumbers.push(input[q]);
        }
        q--;
      }
      j = i;
    }
  }
}
console.log(
  skippableNumbers
    .sort((a, b) => {
      return a - b;
    })
    .map((val) => {
      return val.toString();
    })
);

console.log("Part 2:", "HOW DO I FIGURE OUT THE COMBOS?!");
