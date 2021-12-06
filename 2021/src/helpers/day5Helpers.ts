interface Points{
    startPoints: Point[],
    endPoints: Point[]
}

interface Point {
    x: number,
    y: number;
}

function buildPoints(input: string[]): Points{
    const points = {startPoints: [], endPoints: []} as Points;
    input.forEach(line => {
        const [start, end] = line.split(' -> ');
        const [sX,sY] = start.split(',').map(x => parseInt(x));
        const [eX, eY] = end.split(',').map(x => parseInt(x));
        const startPoint = {x:sX, y:sY} as Point;
        points.startPoints.push(startPoint);
        const endPoint = {x:eX, y:eY} as Point;
        points.endPoints.push(endPoint);
    });
    return points;
}

function findSize(points: Points) : number[] {
    const maxs = [0,0];
    points.startPoints.forEach(point => {
        if(point.x > maxs[0]){
            maxs[0] = point.x;
        }

        if(point.y > maxs[1]){
            maxs[1] = point.y;
        }
    });
    points.endPoints.forEach(point => {
        if(point.x > maxs[0]){
            maxs[0] = point.x;
        }

        if(point.y > maxs[1]){
            maxs[1] = point.y;
        }
    })
    return maxs;
}

function countPointsGreaterThanOne(grid: number[][]) : number{
    let greaterThanOne = 0;
    for(let i = 0; i < grid.length; i++){
        for(let j = 0; j < grid[0].length; j++){
            if(grid[i][j] > 1) greaterThanOne++;
        }
    }
    return greaterThanOne
}

function horizontal(grid: number[][], start: number, end:Point){
    while(start <= end.x){
        grid[end.y][start]++;
        start++;
    }
}

function vertical(grid: number[][], start: number, end:Point){
    while(start <= end.y){
        grid[start][end.x]++;
        start++;
    }
}

function upLeft(grid: number[][], start:Point, end:number){
    for(let i = start.x, j = start.y ; i >= end; i--, j--){
        grid[j][i]++;
    }
}

function upRight(grid: number[][], start:Point, end:number){
    for(let i = start.x, j = start.y ; i <= end; i++, j--){
        grid[j][i]++;
    }
}

function downLeft(grid: number[][], start:Point, end:number){
    for(let i = start.x, j = start.y ; i >= end; i--, j++){
        grid[j][i]++;
    }
}

function downRight(grid: number[][], start:Point, end:number){
    for(let i = start.x, j = start.y ; i <= end; i++, j++){
        grid[j][i]++;
    }
}
export {buildPoints, findSize,horizontal, vertical, countPointsGreaterThanOne, upLeft, upRight, downLeft, downRight}