import { createTwoDArrayOfSizeX } from "./helpers/TwoDArrayBuilder";
import Point from "./helpers/Point";
import { readInput } from "./helpers/filereader";
const input = readInput("./input/day9.txt");

enum Direction {
  Up = "U",
  Down = "D",
  Left = "L",
  Right = "R"
}
// scan the input and find the largest number, then find the
// next largest odd number, so we can set the head at the center easily
let largest = 0;
input.forEach(item => {
  const length = parseInt(item.split(' ')[1]);
  if (length > largest ) {
    largest = length
  }
});

if (largest % 2 === 0) {
  largest = 102 * (largest + 1);
} else {
  largest = 102 * (largest + 2);
}

const locationArray = createTwoDArrayOfSizeX(largest, "string")
  .map((x, row) => x.map((y,col) => new Point(row, col)));

// set start point at 10 10 (the center of a 21 x 21 array)
const start = (largest/2)-1;

let headRow = start, headCol = start, tailRow = start, tailCol = start;
// set 10 10 as visited already
locationArray[headRow][headCol].setVisited();
// when moving, if the head is ever 2 away, must move tail
// if head is 2 rows above or below, and 1 column away,
//    tail matches column, if above 1 more row, if below 1 less row

const moveUp = (length: number) => {
  // move "up" (subtract from head row)
  for (let i = 0; i < length; i++) {
    headRow--;
    if (Math.abs(tailRow - headRow) >= 2) {
      // have to move tail
      if (tailCol !== headCol) {
        tailCol = headCol;
      }
      tailRow--;
      locationArray[tailRow][tailCol].setVisited();
    }
  }
}


const moveDown = (length: number) => {
  for (let i = 0; i < length; i++) {
    headRow++;
    if (Math.abs(tailRow - headRow) >= 2) {
      if (tailCol !== headCol) {
        tailCol = headCol;
      }
      tailRow++;
      locationArray[tailRow][tailCol].setVisited();
    }
  }
}

// if head is 2 cols left or right, and 1 row away
//    tail matches row, if left 1 more col, if right 1 less row
const moveLeft = (length: number) => {
  for (let i = 0; i < length; i++) {
    headCol--;
    if(Math.abs(tailCol - headCol) >= 2) {
      if (headRow !== tailRow) {
        tailRow = headRow;
      }
      tailCol--;
      locationArray[tailRow][tailCol].setVisited();
    }
  }
}

const moveRight = (length: number) => {
  // move right, add to headCol
  for (let i = 0; i < length; i++) {
    headCol++;
    if(Math.abs(tailCol - headCol) >= 2) {
      if (headRow !== tailRow) {
        tailRow = headRow;
      }
      tailCol++;
      locationArray[tailRow][tailCol].setVisited();
    }
  }
}

input.forEach(line => {
  const direction = line.split(" ")[0];
  const length = parseInt(line.split(" ")[1]);

  switch (direction) {
    case Direction.Up:
      moveUp(length);
      break;
    case Direction.Down:
      moveDown(length);
      break;
    case Direction.Left:
      moveLeft(length);
      break;
    case Direction.Right:
      moveRight(length);
      break;
  }
});

let total = 0;
for (let i = 0; i < locationArray.length; i++) {
  for (let j = 0; j < locationArray[i].length; j++) {
    const point = locationArray[i][j];
    if (point.visited) {
      total++;
    }
  }
}

console.log("Part 1", total);
// reset array of points
for (let i = 0; i < locationArray.length; i++) {
  for (let j = 0; j < locationArray[i].length; j++) {
    locationArray[i][j].setVisited(false);
  }
}

// set the start as visited
locationArray[start][start].setVisited();
const pointers: Point[] = [];
for(let i = 0; i < 10; i++) {
  pointers.push(new Point(start, start));
}

const moveUpPartTwo = (length: number) => {
  // move "up" (subtract from head row)
  for (let i = 0; i < length; i++) {
    //move the head
    pointers[0].row--;
    // now loop
    for (let j = 1; j < pointers.length; j++) {
      const firstPoint = pointers[j-1];
      const secondPoint = pointers[j];
      if(Math.abs(secondPoint.row - firstPoint.row) === 2) {
        // if they are not on the same column move towards their column
        if (firstPoint.col !== secondPoint.col){
          if (firstPoint.col > secondPoint.col) {
            secondPoint.col++;
          } else {
            secondPoint.col--;
          }
        }
        if (firstPoint.row > secondPoint.row) {
          secondPoint.row++;
        } else if (firstPoint.row < secondPoint.row) {
          secondPoint.row--;
        }
      } else if (Math.abs(secondPoint.col - firstPoint.col) === 2) {
        // move towards their column
        if (firstPoint.col > secondPoint.col) {
          secondPoint.col++;
        } else {
          secondPoint.col--;
        }
        if (firstPoint.row > secondPoint.row) {
          secondPoint.row++;
        } else if (firstPoint.row < secondPoint.row) {
          secondPoint.row--;
        }
      }
      if(j === 9) {
        locationArray[pointers[9].row][pointers[9].col].setVisited();
      }
    }
  }
}


const moveDownPartTwo = (length: number) => {
  for (let i = 0; i < length; i++) {
    pointers[0].row++;
    for (let j = 1; j < pointers.length; j++) {
      const firstPoint = pointers[j-1];
      const secondPoint = pointers[j];
      if(Math.abs(secondPoint.row - firstPoint.row) == 2) {
        // if they are not on the same column
        if (firstPoint.col !== secondPoint.col) {
          if (firstPoint.col > secondPoint.col) {
            secondPoint.col++;
          } else {
            secondPoint.col--;
          }
        }
        if (firstPoint.row > secondPoint.row) {
          secondPoint.row++;
        } else if (firstPoint.row < secondPoint.row) {
          secondPoint.row--;
        }
      } else if (Math.abs(secondPoint.col - firstPoint.col) === 2) {
        // move towards their column
        if (firstPoint.col > secondPoint.col) {
          secondPoint.col++;
        } else {
          secondPoint.col--;
        }
        if (firstPoint.row > secondPoint.row) {
          secondPoint.row++;
        } else if (firstPoint.row < secondPoint.row) {
          secondPoint.row--;
        }
      }
      if(j === 9) {
        locationArray[pointers[9].row][pointers[9].col].setVisited();
      }
    }
  }
}

// if head is 2 cols left or right, and 1 row away
//    tail matches row, if left 1 more col, if right 1 less row
const moveLeftPartTwo = (length: number) => {
  for (let i = 0; i < length; i++) {
    pointers[0].col--;
    for (let j = 1; j < pointers.length; j++) {
      const firstPoint = pointers[j-1];
      const secondPoint = pointers[j];
      if(Math.abs(secondPoint.col - firstPoint.col) === 2) {
        // if they are not on the same row
        if (firstPoint.row !== secondPoint.row) {
          if (firstPoint.row > secondPoint.row) {
            secondPoint.row++;
          } else {
            secondPoint.row--;
          }
        }
        if(firstPoint.col > secondPoint.col) {
          secondPoint.col++;
        } else if (firstPoint.col < secondPoint.col) {
          secondPoint.col--;
        }
      } else if (Math.abs(secondPoint.row - firstPoint.row) === 2) {
        // move towards their row
        if (firstPoint.row > secondPoint.row) {
          secondPoint.row++;
        } else {
          secondPoint.row--;
        }

        if(firstPoint.col > secondPoint.col) {
          secondPoint.col++;
        } else if (firstPoint.col < secondPoint.col) {
          secondPoint.col--;
        }
      }
      if(j === 9) {
        locationArray[pointers[9].row][pointers[9].col].setVisited();
      }
    }
  }
}

const moveRightPartTwo = (length: number) => {
  // move right, add to headCol

  for (let i = 0; i < length; i++) {
    pointers[0].col++;
    for (let j = 1; j < pointers.length; j++) {
      const firstPoint = pointers[j-1];
      const secondPoint = pointers[j];

      if(Math.abs(secondPoint.col - firstPoint.col) === 2) {
        // if they are not on the same row
        if (firstPoint.row !== secondPoint.row) {
          if (firstPoint.row > secondPoint.row) {
            secondPoint.row++;
          } else {
            secondPoint.row--;
          }
        }
        if(firstPoint.col > secondPoint.col) {
          secondPoint.col++;
        } else if (firstPoint.col < secondPoint.col) {
          secondPoint.col--;
        }
      } else if (Math.abs(secondPoint.row - firstPoint.row) === 2) {
        // move towards their row
        if (firstPoint.row > secondPoint.row) {
          secondPoint.row++;
        } else {
          secondPoint.row--;
        }
        if(firstPoint.col > secondPoint.col) {
          secondPoint.col++;
        } else if (firstPoint.col < secondPoint.col) {
          secondPoint.col--;
        }
      }
      if(j === 9) {
        locationArray[pointers[9].row][pointers[9].col].setVisited();
      }
    }
  }
}


input.forEach(line => {
  const direction = line.split(" ")[0];
  const length = parseInt(line.split(" ")[1]);
  switch (direction) {
    case Direction.Up:
      moveUpPartTwo(length);
      break;
    case Direction.Down:
      moveDownPartTwo(length);
      break;
    case Direction.Left:
      moveLeftPartTwo(length);
      break;
    case Direction.Right:
      moveRightPartTwo(length);
      break;
  }
});

total = 0;
for (let i = 0; i < locationArray.length; i++) {
  for (let j = 0; j < locationArray[i].length; j++) {
    const point = locationArray[i][j];
    if (point.visited) {
      total++;
    }
  }
}
const singleLine: Point[] = [];
locationArray.forEach(points => {
  points.forEach(point => singleLine.push(point))
});
console.log("Part 2", total);

