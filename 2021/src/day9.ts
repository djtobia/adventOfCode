import { readInput } from "./helpers/filereader";
const input = readInput('./input/day9.txt').map(x => x.split('').map(y => parseInt(y)));


const findLowPoints = (input: number[][]) : number[] => {
    const lowPoints: number[] = [];
    for(let i = 0; i < input.length; i++){
        for (let j = 0; j < input[i].length; j++) {
            const point = input[i][j];
            if(isLowPoint(point,i,j,input)){
                lowPoints.push(input[i][j]);
            }
        }
    }
    return lowPoints;
}

const isLowPoint = (point: number, row: number, col: number, input: number[][]) : boolean => {
    let checks = 0;
    //up
    if(row-1 > -1 && input[row-1][col] > point){
         checks++;
    } else if(row-1 < 0) {
        checks++;
    }
    //down
    if(row+1 < input.length && input[row+1][col] > point){
        checks++;
    } else if (row+1 === input.length){
        checks++;
    }
    //left
    if(col-1 > -1 && input[row][col-1] > point){
        checks++;
    } else if (col-1 < 0){
        checks++;
    }
    //right
    if(col+1 < input[row].length && input[row][col+1] > point ){
        checks++;
    } else if (col + 1 === input[row].length){
        checks++;
    }
    return checks === 4;
}

console.log('part 1', findLowPoints(input).reduce((acc, i) => {return acc + i + 1}, 0));

const multAreas = (areas:number[]) : number => areas.reduce((acc,i) => i*acc,1);
const findArea = (row: number, col: number, input: number[][]) : number => {
  if(row < 0 || row === input.length) return 0;
  if(col < 0 || col === input[row].length) return 0;
  if(input[row][col] === 9 || input[row][col] === -1) return 0;
  input[row][col] = -1;

  return 1 + findArea(row-1,col,input) + findArea(row+1,col,input) + findArea(row,col-1,input) + findArea(row,col+1,input);
}
const findThreeLargest = (map: number[][]): number[] => {
    const areas : number[] = [];
    //find an area, then map its area, overwrite the points with -1's, to mark the area as visited
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[i].length; j++) {
            const point = input[i][j];
            if(point !== -1 && point !== 9){
                const area = findArea(i,j,input);
                areas.push(area)
            }

        }

    }

    return areas.sort((a,b) => b-a).slice(0,3);
}
console.log('part 2', multAreas(findThreeLargest(input)))

