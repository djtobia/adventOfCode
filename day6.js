const fs = require("fs");

function countTotalsInMap(totalPeople, answerMap) {
  let count = 0;
  answerMap.forEach((value) => {
    if (value === totalPeople) {
      count++;
    }
  });
  return count;
}

const input = fs.readFileSync("./input/day6.txt", "utf8").split("\r\n");

let totalCount = 0;
let allInGroupCount = 0;
let lineCount = 0;

const groupCountMap = new Map();

input.forEach((line) => {
  if (line === "") {
    totalCount += groupCountMap.size;
    allInGroupCount += countTotalsInMap(lineCount, groupCountMap);
    groupCountMap.clear();
    lineCount = 0;
    return;
  }
  lineCount++;
  for (let char of line) {
    if (!groupCountMap.has(char)) {
      groupCountMap.set(char, 1);
    } else {
      groupCountMap.set(char, groupCountMap.get(char) + 1);
    }
  }
});
//last line is a character string, not an empty string, so add the counts again
totalCount += groupCountMap.size;
allInGroupCount += countTotalsInMap(lineCount, groupCountMap);
console.log("Part 1 :", totalCount);
console.log("Part 2 :", allInGroupCount);
