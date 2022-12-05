
import { readInput } from "./helpers/filereader";
const steps = readInput("./input/day5.txt");

const origBoxes = [
  ['Q', 'H', 'C', 'T', 'N', 'S', 'V', 'B'],
  ['',  '',   '',  '', 'G', 'B', 'D', 'W'],
  ['', 'B',  'Q', 'S', 'T', 'R', 'W', 'F'],
  ['N', 'D', 'J', 'Z', 'S', 'W', 'G', 'L'],
  ['',  '',  '',  'F', 'V', 'D', 'P', 'M'],
  ['',  '',   '',  '',  '', 'J', 'W', 'F'],
  ['',  '',  'V', 'J', 'B', 'Q', 'N', 'L'],
  ['N', 'S', 'Q', 'J', 'C', 'R', 'T', 'G'],
  ['',  'M', 'D', 'W', 'C', 'Q', 'S', 'J']
];


const boxesPart1 = JSON.parse(JSON.stringify(origBoxes));
const boxesPart2 = JSON.parse(JSON.stringify(origBoxes));


steps.forEach((step: string) => {
  const [howMany, nextStep] = step.split(" from ");
  const [from, to] = nextStep.split(" to ").map(num => parseInt(num));

  const placeHolder1: string[] = [];
  const placeHolder2: string[] = [];
  let count1 = parseInt(howMany.split(' ')[1]);
  let count2 = count1;
  for(let i = 0; i < count1; i++) {
    const box: string | undefined = boxesPart1[from-1].shift();
    if (box && box !== '') {
      placeHolder1.push(box)
    } else {
      count1++;
    }
  }
  for(let i = 0; i < count2; i++) {
    const box: string | undefined = boxesPart2[from-1].shift();
    if (box && box !== '') {
      placeHolder2.unshift(box);
    } else {
      count2++;
    }
  }
  while (placeHolder1.length > 0) {
    const box: string | undefined = placeHolder1.shift();
    let i = 0;
    while (boxesPart1[to-1][i] === '') {
      i++;
    }
    if (box) {
      if (i === 0) {
        boxesPart1[to-1].unshift(box);
      } else {
        boxesPart1[to-1][i-1] = box;
      }
    }
  }
  while (placeHolder2.length > 0) {
    const box: string | undefined = placeHolder2.shift();
    let i = 0;
    while (boxesPart2[to-1][i] === '') {
      i++;
    }
    if (box) {
      if (i === 0) {
        boxesPart2[to-1].unshift(box);
      } else {
        boxesPart2[to-1][i-1] = box;
      }
    }
  }
});


let finalStringP1 = '';
boxesPart1.forEach((col: string[]) => {
  for(let i = 0; i < col.length; i++) {
    if(col[i] !== '') {
      finalStringP1 += col[i];
      break;
    }
  }
})

let finalStringP2 = '';
boxesPart2.forEach((col: string[]) => {
  for(let i = 0; i < col.length; i++) {
    if(col[i] !== '') {
      finalStringP2 += col[i];
      break;
    }
  }
})

console.log("Part 1", finalStringP1);
console.log("Part 2", finalStringP2);



