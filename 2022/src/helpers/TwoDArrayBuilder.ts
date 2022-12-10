import { readInput } from "./filereader";

function createTwoDArrayFromInput (day: string) : number[][] {
  const twoD : number[][] = [] ;
  const input = readInput(`./input/${day}.txt`);
  for (let i = 0; i < input.length; i++) {
    const line = input[i].split('').map(x => parseInt(x));
    twoD.push(line);
  }
  return twoD;
}

function createTwoDArrayOfSizeX (size: number, type?: String, char?: string): any[][] {
  const twoD: any[][] = [];
  switch (type) {
    case "string":
      makeStringArray(twoD, size, char);
      break;
    case "number":
      makeNumberArray(twoD, size);
      break;
    default:
      createEmptyArray(twoD, size);
  }
  return twoD;
}

function makeStringArray (array: any[][], size: number, char?: string) {
  for (let i = 0; i < size; i++) {
    const newLine = new Array<string>(size).fill(char ? char : "");
    array.push(newLine);
  }
}

function makeNumberArray (array: any[][], size: number) {
  for (let i = 0; i < size; i++) {
    const newLine = new Array<number>(size).fill(0);
    array.push(newLine);
  }
}

function createEmptyArray (array: any[][], size: number) {
  for(let i = 0; i < size; i++) {
    const newLine = new Array<any>(size);
    array.push(newLine);
  }
}
export { createTwoDArrayFromInput, createTwoDArrayOfSizeX }