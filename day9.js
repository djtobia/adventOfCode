import { readInput } from "./helpers/fileReader.js";

const input = readInput("./input/day9.txt");
let num = 0;
let found = false;
for (let i = 25; i < input.length; i++) {
  num = parseInt(input[i]);
  found = false;
  for (let j = i - 25; j < i; j++) {
    for (let k = j + 1; k < i; k++) {
      if (parseInt(input[j]) + parseInt(input[k]) === num) {
        found = true;
      }
    }
  }
  if (!found) {
    console.log("Part 1:", num);
    break;
  }
}

//create array to store input values, add up input values until they are > num
//clear array, do so again starting from next input location.
//if added up values === num, find smallest and largest and add them together
const numArray = [];
found = false;
for (let i = 0; i < input.length; i++) {
  if (found) {
    break;
  }
  let total = parseInt(input[i]);
  numArray.push(total);
  for (let j = i + 1; j < input.length; j++) {
    let adder = parseInt(input[j]);
    if (total + adder < num) {
      numArray.push(adder);
      total += adder;
    } else if (total + adder > num) {
      numArray.length = 0;
      break;
    } else {
      numArray.push(adder);
      found = true;
      break;
    }
  }
}

numArray.sort();
console.log("Part 2 :", numArray[0] + numArray[numArray.length - 1]);
