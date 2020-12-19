function changePlacesPart1(floor) {
  let tempFloor = [];
  for (let i = 0; i < floor.length; i++) {
    let tempRow = [];
    for (let j = 0; j < floor[i].length; j++) {
      if (floor[i][j] === ".") {
        tempRow.push(".");
      } else if (floor[i][j] === "L" && checkAdjacent(i, j, floor) === 0) {
        tempRow.push("#");
      } else if (floor[i][j] === "#" && checkAdjacent(i, j, floor) > 3) {
        tempRow.push("L");
      } else {
        tempRow.push(floor[i][j]);
      }
    }
    tempFloor.push(tempRow);
  }
  return tempFloor;
}

function changePlacesPart2(floor) {
  let tempFloor = [];
  for (let i = 0; i < floor.length; i++) {
    let tempRow = [];
    for (let j = 0; j < floor[i].length; j++) {
      if (floor[i][j] === ".") {
        tempRow.push(".");
      } else if (floor[i][j] === "L" && checkForSeat(i, j, floor) === 0) {
        tempRow.push("#");
      } else if (floor[i][j] === "#" && checkForSeat(i, j, floor) > 4) {
        tempRow.push("L");
      } else {
        tempRow.push(floor[i][j]);
      }
    }
    tempFloor.push(tempRow);
  }
  return tempFloor;
}

function checkForSeat(row, col, floor) {
  let occupied = 0;
  //up
  for (let i = row - 1; i > -1; i--) {
    if (floor[i][col] === "#") {
      occupied++;
      break;
    } else if (floor[i][col] === "L") {
      break;
    }
  }
  //down
  for (let i = row + 1; i < floor.length; i++) {
    if (floor[i][col] === "#") {
      occupied++;
      break;
    } else if (floor[i][col] === "L") {
      break;
    }
  }
  //left
  for (let i = col - 1; i > -1; i--) {
    if (floor[row][i] === "#") {
      occupied++;
      break;
    } else if (floor[row][i] === "L") {
      break;
    }
  }
  //right
  for (let i = col + 1; i < floor[0].length; i++) {
    if (floor[row][i] === "#") {
      occupied++;
      break;
    } else if (floor[row][i] === "L") {
      break;
    }
  }
  // up left
  for (let i = row - 1, j = col - 1; i > -1 && j > -1; i--, j--) {
    if (floor[i][j] === "#") {
      occupied++;
      break;
    } else if (floor[i][j] === "L") {
      break;
    }
  }
  // up right
  for (let i = row - 1, j = col + 1; i > -1 && j < floor[0].length; i--, j++) {
    if (floor[i][j] === "#") {
      occupied++;
      break;
    } else if (floor[i][j] === "L") {
      break;
    }
  }

  // down left
  for (let i = row + 1, j = col - 1; i < floor.length && j > -1; i++, j--) {
    if (floor[i][j] === "#") {
      occupied++;
      break;
    } else if (floor[i][j] === "L") {
      break;
    }
  }
  // down right
  for (
    let i = row + 1, j = col + 1;
    i < floor.length && j < floor[0].length;
    i++, j++
  ) {
    if (floor[i][j] === "#") {
      occupied++;
      break;
    } else if (floor[i][j] === "L") {
      break;
    }
  }
  return occupied;
}

/**
 * If there are ANY occupied seats adjacent to row, col, return false, otherwise true
 * @param {Number} row
 * @param {Number} col
 * @param {Array[][]} floor
 */
function checkAdjacent(row, col, floor) {
  let occupied = 0;
  const rowAbove = row - 1;
  const rowBelow = row + 1;
  const leftCol = col - 1;
  const rightCol = col + 1;
  //count row above and row below
  if (rowAbove >= 0) {
    for (let i = leftCol; i <= rightCol; i++) {
      if (i < 0 || i >= floor[0].length) {
        continue;
      }
      if (floor[rowAbove][i] === "#") {
        occupied++;
      }
    }
  }
  if (rowBelow < floor.length) {
    for (let i = leftCol; i <= rightCol; i++) {
      if (i < 0 || i >= floor[0].length) {
        continue;
      }
      if (floor[rowBelow][i] === "#") {
        occupied++;
      }
    }
  }

  //left and right column on the original row
  if (leftCol >= 0 && floor[row][leftCol] === "#") {
    occupied++;
  }
  if (rightCol < floor[0].length && floor[row][rightCol] === "#") {
    occupied++;
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

function totalOccupied(floor) {
  let occupied = 0;
  for (let i = 0; i < floor.length; i++) {
    occupied += floor[i].reduce((count, char) => {
      return char === "#" ? count + 1 : count;
    }, 0);
  }
  return occupied;
}
export { changePlacesPart1, changePlacesPart2, differentFloor, totalOccupied };
