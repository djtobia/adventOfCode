export function printGrid(grid: string[][]) {
    grid.forEach(row => {
        console.log(row.join(''));
    })
}

export function populateGrid(points: string[], grid: string[][]) {
    points.forEach(point => {
        const [col,row] = point.split(',');
        grid[parseInt(row)][parseInt(col)] = "\u2588";
    });
}

export function buildGrid(grid: string[][], maxX: number, maxY: number){
    for(let i = 0; i <= maxY; i++){
        const row: string[] = [];
        for(let j = 0; j <= maxX; j++){
            row.push('.');
        }
        grid.push(row);
    }
}

export function fold(grid:string[][], fold: string[], steps: number = 1){
    for(let i = 0; i < steps; i++){
        const [dir,num] = fold[i].split('=');
        if(dir === 'x'){
            foldOnX(grid, parseInt(num));
        } else {
            foldOnY(grid, parseInt(num));
        }
    }
}

function foldOnX(grid:string[][], num: number) {
    const length = grid[0].length-1;
    for(let i = 0; i < grid.length; i++){
        for(let j = length; j > num; j--){
            const colToMoveTo = Math.abs(length-j);
            if(grid[i][j] !== '.'){
                grid[i][colToMoveTo] = grid[i][j];
            }
            grid[i].pop();
        }
        //remove column that we are actually folding on
        grid[i].pop();
    }
}

function foldOnY(grid:string[][], num: number) {
    const length = grid.length-1;
    for(let i = length; i > num; i--){
        const rowToMoveTo = Math.abs(length-i);
        for(let j = 0; j < grid[i].length; j++){
            if(grid[i][j] !== '.'){
                grid[rowToMoveTo][j] = grid[i][j]
            }
        }
        //remove last row in array as it is no longer needed
        grid.pop();
    }
    // remove row that we had previously folded on
    grid.pop()
}

export function countMarks(grid: string[][]) : number {
    let count = 0;
    for(let i = 0; i < grid.length; i++){
        for(let j = 0; j < grid[i].length; j++){
            if(grid[i][j] !== '.'){
                count++;
            }
        }
    }

    return count;
}