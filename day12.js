import { readInput } from "./helpers/fileReader.js";

function changeDirection(direction, degrees) {
  //if direction is R, clockwise, else counter clockwise
  const numberOfTurns = degrees / 90;
  const dirs = ["N", "E", "S", "W"];
  //find index of current directoin
  let index = dirs.indexOf(facing);
  for (let i = 0; i < numberOfTurns; i++) {
    if (direction === "R") {
      index++;
      if (index >= 4) {
        index = 0;
      }
    } else {
      index--;
      if (index < 0) {
        index = 3;
      }
    }
  }
  return dirs[index];
}

function changeWaypointDirection(direction, degrees) {
  let numberOfTurns = degrees / 90;
  const dirs = ["NE", "SE", "SW", "NW"];
  let currentDir = waypoint.NS > 0 ? "N" : "S";
  currentDir += waypoint.EW > 0 ? "E" : "W";
  let index = dirs.indexOf(currentDir);
  for (let i = 0; i < numberOfTurns; i++) {
    if (direction === "R") {
      index++;
      if (index >= 4) {
        index = 0;
      }
    } else {
      index--;
      if (index < 0) {
        index = 3;
      }
    }

    const temp = waypoint.EW;
    switch (dirs[index]) {
      case "NE":
        if (direction === "R") {
          waypoint.EW = waypoint.NS;
          waypoint.NS = temp * -1;
        } else {
          let temp = waypoint.EW;
          waypoint.EW = waypoint.NS * -1;
          waypoint.NS = temp;
        }
        break;
      case "SE":
        if (direction === "R") {
          waypoint.EW = waypoint.NS;
          waypoint.NS = temp * -1;
        } else {
          waypoint.EW = waypoint.NS * -1;
          waypoint.NS = temp;
        }

        break;
      case "SW":
        if (direction === "R") {
          waypoint.EW = waypoint.NS;
          waypoint.NS = temp * -1;
        } else {
          waypoint.EW = waypoint.NS * -1;
          waypoint.NS = temp;
        }
        break;
      case "NW":
        if (direction === "R") {
          waypoint.EW = waypoint.NS;
          waypoint.NS = temp * -1;
        } else {
          waypoint.EW = waypoint.NS * -1;
          waypoint.NS = temp;
        }
        break;
    }
    currentDir = dirs[index];
  }
}

const input = readInput("./input/day12.txt");
const directions = {
  NORTH: "N",
  EAST: "E",
  SOUTH: "S",
  WEST: "W",
  FORWARD: "F",
};

let facing = directions.EAST; //direction ship is facing
const waypoint = {
  EW: 10,
  NS: 1,
};

const totalsP1 = {
  N: 0,
  E: 0,
  S: 0,
  W: 0,
};

const totalsP2 = {
  N: 0,
  E: 0,
  S: 0,
  W: 0,
};
//part 1
input.forEach((instruction) => {
  const direction = instruction.charAt(0);
  const value = parseInt(instruction.substr(1));
  switch (direction) {
    case directions.FORWARD:
      totalsP1[facing] += value;
      break;
    case directions.EAST:
      totalsP1.E += value;
      break;
    case directions.SOUTH:
      totalsP1.S += value;
      break;
    case directions.WEST:
      totalsP1.W += value;
      break;
    case directions.NORTH:
      totalsP1.N += value;
      break;
    default:
      //have to change which direction we are facing
      facing = changeDirection(direction, value);
      break;
  }
});

console.log(
  "Part 1:",
  Math.abs(totalsP1.E - totalsP1.W) + Math.abs(totalsP1.N - totalsP1.S)
);

// part 2
input.forEach((instruction) => {
  const direction = instruction.charAt(0);
  const value = parseInt(instruction.substr(1));
  switch (direction) {
    case directions.FORWARD:
      if (waypoint.NS > 0) {
        totalsP2.N += waypoint.NS * value;
      } else if (waypoint.NS < 0) {
        totalsP2.S += Math.abs(waypoint.NS * value);
      }
      if (waypoint.EW > 0) {
        totalsP2.E += waypoint.EW * value;
      } else if (waypoint.EW < 0) {
        totalsP2.W += Math.abs(waypoint.EW * value);
      }
      break;
    case directions.EAST:
      waypoint.EW += value;

      break;
    case directions.SOUTH:
      waypoint.NS -= value;

      break;
    case directions.WEST:
      waypoint.EW -= value;
      break;
    case directions.NORTH:
      waypoint.NS += value;
      break;
    default:
      //have to change which direction the waypoint is
      changeWaypointDirection(direction, value);
      break;
  }
});
console.log(
  "Part 2:",
  Math.abs(totalsP2.E - totalsP2.W) + Math.abs(totalsP2.N - totalsP2.S)
);
