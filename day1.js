import { readInput } from "./helpers/fileReader.js";


console.log("JS")
const expense = readInput("./input/day1.txt");
//find which 2 items add up to 2020

for (let i = 0; i < expense.length; i++) {
  let num1 = parseInt(expense[i]);
  for (let j = i + 1; j < expense.length; j++) {
    let num2 = parseInt(expense[j]);
    if (num1 + num2 === 2020) {
      console.log("Part 1 :", num1 * num2);
    }
  }
}

for (let i = 0; i < expense.length; i++) {
  for (let j = i + 1; j < expense.length; j++) {
    for (let k = j + 1; k < expense.length; k++) {
      if (
        parseInt(expense[i]) + parseInt(expense[j]) + parseInt(expense[k]) ===
        2020
      ) {
        console.log(
          "Part 2 :",
          parseInt(expense[i]) * parseInt(expense[j]) * parseInt(expense[k])
        );
      }
    }
  }
}
