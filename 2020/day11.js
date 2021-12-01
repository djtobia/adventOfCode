import { readInput } from "./helpers/fileReader.js";
import {
  changePlacesPart1,
  changePlacesPart2,
  differentFloor,
  totalOccupied,
} from "./helpers/day11/helpers.js";
const fullInput = readInput("./input/day11.txt");
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
 PART 1 RULES
If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied.
If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty.
Otherwise, the seat's state does not change.

PART 2 RULES
Same as above, but five or more seats adjacent for rule 2
*/
while (true) {
  const tempFloor = changePlacesPart1(floor);
  if (!differentFloor(floor, tempFloor)) {
    break;
  } else {
    floor = tempFloor;
  }
}

console.log("Part 1:", totalOccupied(floor));

floor = [];
fullInput.forEach((line) => {
  let row = [];
  line.split("").forEach((space) => {
    row.push(space);
  });
  floor.push(row);
});

while (true) {
  const tempFloor = changePlacesPart2(floor);
  if (!differentFloor(floor, tempFloor)) {
    break;
  } else {
    floor = tempFloor;
  }
}
console.log("Part 2:", totalOccupied(floor));
