import { readInput } from "./helper.js";

const input = readInput("./input/day8.txt");

/**
 * Run part 1 of day 8 problem
 */
function part1() {
  let acc = 0;
  let visitedIndexes = new Array(input.length);
  let index = 0;
  while (true) {
    if (visitedIndexes[index] === 1) {
      break;
    } else {
      //visit that index, and do the operation at that index in the input
      visitedIndexes[index] = 1;
      //get input value
      const op = input[index].split(" ");

      switch (op[0]) {
        case "nop":
          index++;
          break;
        case "acc":
          acc += parseInt(op[1]);
          index++;
          break;
        case "jmp":
          index += parseInt(op[1]);
      }
    }
  }
  console.log("Part 1:", acc);
}

/**
 * Run part 2 of day 8 problem
 */
function part2() {
  let acc = 0;
  let visitedIndexes = new Array(input.length);
  let index = 0;
  let jmp = [];
  let iteration = 1;
  while (true) {
    if (index >= input.length) {
      break;
    }
    if (visitedIndexes[index] === 1) {
      //reset and change next jump to nop
      acc = 0;
      visitedIndexes = new Array(input.length);
      index = 0;
      iteration++;
    } else {
      //visit that index, and do the operation at that index in the input
      visitedIndexes[index] = 1;
      //get input value
      const op = input[index].split(" ");

      switch (op[0]) {
        case "nop":
          index++;
          break;
        case "acc":
          acc += parseInt(op[1]);
          index++;
          break;
        case "jmp":
          if (jmp.length !== iteration) {
            if (!jmp.includes(index)) {
              jmp.push(index);
              index++;
            } else {
              index += parseInt(op[1]);
            }
          } else {
            index += parseInt(op[1]);
          }
      }
    }
  }
  console.log("Part 2:", acc);
}
part1();
part2();
