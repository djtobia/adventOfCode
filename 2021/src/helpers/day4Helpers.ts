export interface Board {
    entries: number[][]
}

export interface Boards {
    boards: Board[]
}


export function buildBoards(bingo: Boards, boardsInput: string[]){
    let board = {entries: []} as Board;
    for(const row of boardsInput){
        if(row === ''){
            bingo.boards.push(board);
            board = {entries: []} as Board;
        }
        else {
            const boardRow = row.trim().split(/\s+/).map(e => parseInt(e));
            board.entries.push(boardRow);
        }
    }
}

export function markAndCheckBoards(num: number, bingo: Boards, p2: boolean = false) : number {
    let boardNumber = -1;
    for(let i = 0; i < bingo.boards.length;i++){
        const board = bingo.boards[i];
        if(board){
            for(let j = 0; j < board.entries.length; j++){
                for(let k = 0; k < 5; k++){
                    if(board.entries[j][k] === num){
                        if(num !== 0){
                            board.entries[j][k] *= -1;
                        } else {
                            board.entries[j][k] = -1;
                        }
                        j = board.entries.length;
                        break;
                    }
                }
            }
            const winner = checkBoard(board);
            if(winner){
                if(p2){
                    if (bingo.boards.length === 1) {
                        boardNumber = i;
                        break;
                    }
                    else {
                        bingo.boards.splice(i,1);
                        i--;
                    }
                } else {
                    boardNumber = i;
                    break;
                }
            }
        }
    }
    return boardNumber;
}

function checkBoard(board: Board): boolean{
   return (checkRows(board) || checkCols(board) || checkDiags(board));
}

function checkRows(board: Board): boolean {
    let hits = 0;
    for(let i = 0; i < 5; i++){
        for(let j = 0; j < 5; j++){
            if(board.entries[i][j] < 0){
                hits++;
            }
        }
        if(hits === 5){
            return true;
        }
        hits = 0;
    }
    return false;
}

function checkCols(board: Board) : boolean {
    let hits = 0;
    for(let i = 0; i < 5; i++){
        for(let j = 0; j < 5; j++){
            if(board.entries[j][i] < 0){
                hits++;
            }
        }
        if(hits === 5){
            return true;
        }
        hits = 0;
    }
    return false;
}

function checkDiags(board: Board): boolean {
    let hits = 0;
    let j = 0;
    for(let i = 0; i < 5; i++){
        if(board.entries[i][j] < 0){
            hits++;
        }
        j++;
    }
    if(hits === 5){
        return true;
    }
    j = 0;
    hits = 0;
    for(let i = 4; i >= 0; i--){
        if(board.entries[i][j] < 0){
            hits++;
        }
        j++;
    }
    if(hits === 5){
        return true;
    }
    return false;
}
export function calculateBoardSum(board: Board) : number {
    let sum = 0;
    for(let i = 0; i < 5; i++){
        for(let j = 0; j < 5; j++){
            const val = board.entries[i][j]
            if(val > 0){
                sum += val;
            }
        }
    }
    return sum;
}