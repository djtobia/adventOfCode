import { readInput } from "./filereader";

export default function createTwoDArray (day: string) : number[][] {
  const twoD : number[][] = [] ;
  const input = readInput(`./input/${day}.txt`);
  for (let i = 0; i < input.length; i++) {
    const line = input[i].split('').map(x => parseInt(x));
    twoD.push(line);
  }
  return twoD;
}