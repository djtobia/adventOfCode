import { readInput } from './helpers/filereader';
import { buildGrid, populateGrid, fold, countMarks, printGrid } from "./helpers/day13helpers";
const points = readInput('./input/day13points.txt');
const folds = readInput('./input/day13folds.txt');

let maxX = 0;
let maxY = 0;
points.forEach(point => {
    const [x,y] = point.split(',');
    if(parseInt(x) > maxX){
        maxX = parseInt(x);
    }
    if(parseInt(y) > maxY){
        maxY = parseInt(y);
    }
})
let grid: string[][] = [];
buildGrid(grid,maxX,maxY);
populateGrid(points,grid);
fold(grid, folds);
console.log('part 1', countMarks(grid));
//reset the grid
grid = [];
buildGrid(grid,maxX,maxY);
populateGrid(points,grid);
fold(grid, folds, folds.length);
console.log('part 2');
printGrid(grid);