import { readInput } from "./helper.js";
const input = readInput("./input/day2.txt");
let countCorrectPart1 = 0;
//first split on space, then split first one on - and grab the first char of the second one
//part 1
for (let i = 0; i < input.length; i++) {
  const splitLine = input[i].split(" ");
  const minMax = splitLine[0].split("-");
  const char = splitLine[1].charAt(0);
  const regex = new RegExp(char, "g");
  const occurences = (splitLine[2].match(regex) || []).length;
  if (occurences <= minMax[1] && occurences >= minMax[0]) {
    countCorrectPart1++;
  }
}
console.log("part 1", countCorrectPart1);
//part 2
let countCorrectPart2 = 0;
for (let i = 0; i < input.length; i++) {
  const splitLine = input[i].split(" ");
  const locations = splitLine[0].split("-");
  const char = splitLine[1].charAt(0);
  if (
    (splitLine[2].charAt(locations[0] - 1) === char &&
      splitLine[2].charAt(locations[1] - 1) !== char) ||
    (splitLine[2].charAt(locations[0] - 1) !== char &&
      splitLine[2].charAt(locations[1] - 1) === char)
  ) {
    countCorrectPart2++;
  }
}
console.log("part 2", countCorrectPart2);
