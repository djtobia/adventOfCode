import { readInput } from "./helpers/filereader";
const input = readInput("./input/day4.txt");

interface LineInfo {
  leftInfo: number[];
  rightInfo: number[];
  leftLarger: boolean;
  lengths: number[];
  rangeArray: number[];
}

/**
 *
 * @param line: string
 * @returns LineInfo
 */
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

  return {
    leftInfo: [leftStart, leftEnd],
    rightInfo: [rightStart, rightEnd],
    leftLarger,
    lengths: [leftLength, rightLength],
    rangeArray
  };
}

let count = 0;
const partTwo: number[] = [];
for(let lineNum = 0; lineNum < input.length; lineNum++) {
  const {leftInfo, rightInfo, leftLarger, lengths, rangeArray} = getLineInfo(input[lineNum]);
  let contains = 0;
  for(let i = (leftLarger ? rightInfo[0] : leftInfo[0]); i <= (leftLarger ? rightInfo[1] : leftInfo[1]); i++) {
    if (rangeArray.includes(i)) {
      contains++;
      if (!partTwo.includes(lineNum)) {
        partTwo.push(lineNum);
      }
    }
  }
  if (contains === (leftLarger ? lengths[1] : lengths[0])) {
    count++;
  }

}

console.log("Part 1", count);
console.log("Part 2", partTwo.length);
