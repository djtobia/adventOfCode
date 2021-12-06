import { readInput } from "./helpers/filereader";
import * as helpers from "./helpers/day5Helpers";
const input = readInput('./input/day5.txt');

const points = helpers.buildPoints(input);

const [maxX, maxY] = helpers.findSize(points);

const grid = new Array(maxX+1).fill(null).map(() => Array(maxY+1).fill(0));


for( let i = 0; i < points.startPoints.length; i++){
    const start = points.startPoints[i];
    const end = points.endPoints[i]
    if(start.x === end.x || start.y === end.y){
        let j = 0;
        let dir = true;
        if(start.x !== end.x){
            if(start.x > end.x){
                j = end.x;
            } else {
                j = start.x;
                dir = false;
            }
            if(dir){
                helpers.horizontal(grid,j, start);
            } else {
                helpers.horizontal(grid,j,end)
            }
        } else {
            if(start.y > end.y){
                j = end.y;
            } else {
                j = start.y;
                dir = false;
            }
            if(dir){
                helpers.vertical(grid,j,start)
            } else {
                helpers.vertical(grid,j,end);
            }
        }
    }
}

console.log('part 1');
console.log(helpers.countPointsGreaterThanOne(grid));

// part 2, add diagonals
for( let i = 0; i < points.startPoints.length; i++){
    //now only do diagonals
    const start = points.startPoints[i];
    const end = points.endPoints[i]
    if(start.x !== end.x && start.y !== end.y){
        //find which x is the smallest
        let dir = '';
        if(start.x < end.x && start.y < end.y){
            dir = 'dr';
        } else if (start.x < end.x && start.y > end.y){
            dir = 'ur';
        } else if (start.x > end.x && start.y > end.y){

            dir = 'ul';
        } else {
            dir = 'dl';
        }

        switch(dir){
            case 'dr':
                helpers.downRight(grid,start,end.x);
                break;
            case 'ur':
                helpers.upRight(grid,start,end.x);
                break;
            case 'ul':
                helpers.upLeft(grid,start,end.x);
                break;
            case 'dl':
                helpers.downLeft(grid,start,end.x);
                break;
        }
    }
}
console.log('part 2');
console.log(helpers.countPointsGreaterThanOne(grid));