import { readInput } from "./helpers/fileReader.js";

const fullInput = readInput("./input/day11test.txt");
let floor = [];
fullInput.forEach((line) => {
  let row = [];
  line.split("").forEach((space) => {
    row.push(space);
  });
  floor.push(row);
});

//run through rules until there are no changes;

/*
RULES
If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied.
If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty.
Otherwise, the seat's state does not change.
*/
while (changePlaces()) {}
function changePlaces() {
  let tempFloor = [];
  for (let i = 0; i < floor.length; i++) {
    let tempRow = [];
    for (let j = 0; j < floor[i].length; j++) {
      if (floor[i][j] === ".") {
        tempRow.push(".");
      } else if (floor[i][j] === "L" && checkAdjacent(i, j) === 0) {
        tempRow.push("#");
      } else if (floor[i][j] === "#" && checkAdjacent(i, j) > 3) {
        tempRow.push("L");
      } else {
        tempRow.push(floor[i][j]);
      }
    }
    tempFloor.push(tempRow);
  }
  if (!differentFloor(floor, tempFloor)) {
    return false;
  }
  floor = tempFloor;
  return true;
}

/**
 * If there are ANY occupied seats adjacent to row, col, return false, otherwise true
 * @param {Number} row
 * @param {Number} col
 */
function checkAdjacent(row, col) {
  let occupied = 0;
  const rowAbove = row - 1;
  const rowBelow = row + 1;
  const leftCol = col - 1;
  const rightCol = col + 1;
  if (floor[rowAbove] !== undefined) {
    if (floor[rowAbove][col] === "#") {
      occupied++;
    }
    if (
      floor[rowAbove][leftCol] !== undefined &&
      floor[rowAbove][leftCol] === "#"
    ) {
      occupied++;
    }
    if (
      floor[rowAbove][rightCol] !== undefined &&
      floor[rowAbove][rightCol] === "#"
    ) {
      occupied++;
    }
  }
  if (floor[row][leftCol] !== undefined && floor[row][leftCol] === "#") {
    occupied++;
  }
  if (floor[row][rightCol] !== undefined && floor[row][rightCol] === "#") {
    occupied++;
  }
  if (floor[rowBelow] !== undefined) {
    if (
      floor[rowBelow][leftCol] !== undefined &&
      floor[rowBelow][leftCol] === "#"
    ) {
      occupied++;
    }
    if (floor[rowBelow][col] === "#") {
      occupied++;
    }
    if (
      floor[rowBelow][rightCol] !== undefined &&
      floor[rowBelow][leftCol] === "#"
    ) {
      occupied++;
    }
  }
  return occupied;
}

function differentFloor(floor, tempFloor) {
  for (let i = 0; i < floor.length; i++) {
    for (let j = 0; j < floor[i].length; j++) {
      if (floor[i][j].localeCompare(tempFloor[i][j]) !== 0) {
        return true;
      }
    }
  }
  return false;
}
