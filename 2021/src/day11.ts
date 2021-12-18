import { readInput } from "./helpers/filereader";
let input = readInput("./input/day11.txt").map(row => row.split('').map(x => parseInt(x)));

const numberOfOctopodes = input.length * input[0].length;
let flashes = 0;
// recursion
const stepAndIncrement = (input: number[][], row: number, col: number, stop: boolean = false) => {
    if(row < 0 || row >= input.length) return;
    if(col < 0 || col >= input[0].length) return;
    let num = input[row][col];
    let flashed = false;
    if(num === -1 && !stop) {
        if(col+1 === input[0].length){
            stepAndIncrement(input,row+1,0);
            return;
        } else {
            stepAndIncrement(input,row,col+1);
            return;
        }
    }
    if(num === -1) return;
    if(num === 9){
        input[row][col] = -1;
        flashes++;
        flashed = true;
    }else {
        input[row][col] = num+1;
    }

    if(flashed){
        stepAndIncrement(input,row-1,col-1, true);
        stepAndIncrement(input,row-1,col, true);
        stepAndIncrement(input,row-1,col+1, true);
        stepAndIncrement(input,row,col-1, true);
        stepAndIncrement(input,row,col+1, true);
        stepAndIncrement(input,row+1,col-1, true);
        stepAndIncrement(input,row+1,col, true);
        stepAndIncrement(input,row+1,col+1, true);
    }
    if(!stop){
        if(col+1 === input[0].length){
            stepAndIncrement(input,row+1,0);
        } else {
            stepAndIncrement(input,row,col+1);
        }
    }

}

const updateGrid = (input:number[][]) => {
    for(let i = 0; i < input.length; i++){
        for(let j = 0; j < input[i].length; j++){
            if(input[i][j] === -1){
                input[i][j] = 0;
            }
        }
    }
};

const checkGrid = (input:number[][]) => {
    let count = 0;
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[i].length; j++) {
            const element = input[i][j];
            if(element === 0){
                count++;
            }
        }
    }
    return count === numberOfOctopodes;
}
for(let i = 0; i < 100; i++){
    stepAndIncrement(input,0,0);
    updateGrid(input);
}
console.log('part 1', flashes)
//reset the input
input = readInput("./input/day11.txt").map(row => row.split('').map(x => parseInt(x)))
let step = 1;
while(true){
    stepAndIncrement(input,0,0);
    updateGrid(input);
    if(checkGrid(input)){
        break;
    }
    step++;
}
console.log('part 2', step)
