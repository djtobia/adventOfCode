import { readInput } from "./helper.js";

const expense = readInput("./input/day1.txt");
//find which 2 items add up to 2020

for (let i = 0; i < expense.length; i++) {
  for (let j = i + 1; j < expense.length; j++) {
    for (let k = j + 1; k < expense.length; k++) {
      if (
        parseInt(expense[i]) + parseInt(expense[j]) + parseInt(expense[k]) ===
        2020
      ) {
        console.log(
          parseInt(expense[i]) * parseInt(expense[j]) * parseInt(expense[k])
        );
      }
    }
  }
}
