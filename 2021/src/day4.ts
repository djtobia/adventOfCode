import { readInput } from "./helpers/filereader";
import { Boards, Board, buildBoards, markAndCheckBoards, calculateBoardSum } from "./helpers/day4Helpers";
const numbers = readInput('./input/day4_numbers.txt')[0].split(',').map(e => parseInt(e));
const boardsInput = readInput('./input/day4_boards.txt');



let bingo = { boards: [] } as Boards;

buildBoards(bingo,boardsInput);
let callIndex = 0;
let boardNumber = -1;
let num = 0;
while(callIndex < numbers.length){
    num = numbers[callIndex];
    boardNumber = markAndCheckBoards(num, bingo);
    if(boardNumber !== -1) break;
    callIndex++;
}
let sum = calculateBoardSum(bingo.boards[boardNumber]) * num;
console.log('part 1');
console.log(sum);

bingo = { boards: [] };
buildBoards(bingo, boardsInput);
callIndex = 0;
boardNumber = 0;
num = 0;
while(callIndex < numbers.length){
    num = numbers[callIndex];
    boardNumber = markAndCheckBoards(num, bingo, true);
    if(boardNumber !== -1) break;
    callIndex++;
}
sum = calculateBoardSum(bingo.boards[boardNumber]) * num;
console.log('part 2');
console.log(sum);