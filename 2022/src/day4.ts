import { readInput } from "./helpers/filereader";
const input = readInput("./input/day4.txt");

interface LineInfo {
  leftInfo: number[];
  rightInfo: number[];
  leftLarger: boolean;
  leftLength: number;
  rightLength: number;
  rangeArray: number[];
}

const getLineInfo = (line: string) : LineInfo => {
  const [left, right] = line.split(',');
  const [leftStart, leftEnd] = left.split('-').map(num => parseInt(num));
  const [rightStart, rightEnd] = right.split('-').map(num => parseInt(num));
  const leftLength = leftEnd- leftStart + 1;
  const rightLength = rightEnd - rightStart + 1;
  const leftLarger = leftLength >= rightLength;

  const rangeArray: number[] = [];
  for (let i = (leftLarger ? leftStart : rightStart); i <= (leftLarger ? leftEnd : rightEnd); i++) {
    rangeArray.push(i);
  }

  return {leftInfo: [leftStart, leftEnd], rightInfo: [rightStart, rightEnd], leftLarger, leftLength, rightLength, rangeArray }
}

let count = 0;
input.forEach((line: string) => {
  const {leftInfo, rightInfo, leftLarger, leftLength, rightLength, rangeArray} = getLineInfo(line);
  let contains = 0;
  for(let i = (leftLarger ? rightInfo[0] : leftInfo[0]); i <= (leftLarger ? rightInfo[1] : leftInfo[1]); i++) {
    if (rangeArray.includes(i)) {
      contains++;
    } else {
      break;
    }
  }
  if (contains === (leftLarger ? rightLength : leftLength)) {
    count++;
  }

});

console.log("Part 1", count);

count = 0;

input.forEach((line: string) => {
  const {leftInfo, rightInfo, leftLarger, rangeArray} = getLineInfo(line);

  for(let i = (leftLarger ? rightInfo[0] : leftInfo[0]); i <= (leftLarger ? rightInfo[1] : leftInfo[1]); i++) {
    if (rangeArray.includes(i)) {
      count++;
      break;
    }
  }
})

console.log("Part 2", count);
