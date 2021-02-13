import { readInput } from "./helpers/fileReader.js";
console.log('JS')
const input = readInput("./input/day5.txt");
const allSeatIds = [];
let highestSeatId = 0;
for (let i = 0; i < input.length; i++) {
  let lowRow = 0;
  let highRow = 127;
  let lowCol = 0;
  let highCol = 7;
  for (let char of input[i]) {
    switch (char) {
      case "F":
        if (highRow - lowRow === 1) {
          highRow = lowRow;
        } else {
          highRow -= Math.floor((highRow - lowRow) / 2) + 1;
        }
        break;
      case "B":
        if (highRow - lowRow === 1) {
          lowRow = highRow;
        } else {
          lowRow += Math.ceil((highRow - lowRow) / 2);
        }
        break;
      case "L":
        if (highCol - lowCol === 1) {
          highCol = lowCol;
        } else {
          highCol -= Math.floor((highCol - lowCol) / 2) + 1;
        }
        break;
      case "R":
        if (highCol - lowCol === 1) {
          lowCol = highCol;
        } else {
          lowCol += Math.ceil((highCol - lowCol) / 2);
        }
        break;
    }
  }

  //at this point lows and highs should be the same
  const seatId = highRow * 8 + highCol;
  allSeatIds.push(seatId);
  if (highestSeatId < seatId) {
    highestSeatId = seatId;
  }
}
console.log("Part 1 :", highestSeatId);
allSeatIds.sort((a, b) => a - b);
let mySeat = 0;
let prev = 0;
for (let i = 0; i < allSeatIds.length; i++) {
  let curr = allSeatIds[i];
  if (i == 0) {
    prev = curr;
  }
  if (curr - prev > 1) {
    mySeat = curr - 1;
  }
  prev = curr;
}
console.log("Part 2 :", mySeat);
