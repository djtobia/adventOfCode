import { readInput } from "./helpers/filereader";

const input = readInput('./input/day7.txt')[0].split(',').map(x => parseInt(x)).sort((a,b) => a-b);

const findTotal = (fpos: number, step: Function) => input.reduce((acc,c) => acc + step(Math.abs(fpos - c)), 0);
console.log('part 1', findTotal(findMedian(input),((n: number) => n)));
const largest = Math.max(...input);
const distances : number[] =[];
for(let i = 0; i <= largest; i++){
    const fuel = input.map(pos => {
       const diff = Math.abs(pos-i);
       return (diff * (diff+1))/2;
    }).reduce((a,b) => a+b,0);
    distances.push(fuel);
}

console.log("part 2", Math.min(...distances));



function findMedian(nums: number[]): number{
    return input[Math.floor((nums.length-1)/2)];
}