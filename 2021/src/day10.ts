import { readInput } from "./helpers/filereader";
const input = readInput('./input/day10.txt');
let symbolStack: string[] = [];
const corruptLines : number[] = [];
const p1Scores: {[key: string] : number } = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
}
let score = 0;
const checkStack = (ending: string) : boolean => {
    const lastOpening = symbolStack[symbolStack.length-1];
    if((lastOpening === '(' && ending !== ')') ||
        (lastOpening === '{' && ending !== '}') ||
        (lastOpening === '[' && ending !== ']') ||
        (lastOpening === '<' && ending !== '>')) return false;
    return true;
}
for(let i = 0; i < input.length; i++){
    const chunks = input[i].split('');
    for(let j = 0; j < chunks.length; j++){
        switch(chunks[j]) {
            case '(':
            case '[':
            case '{':
            case '<':
                symbolStack.push(chunks[j]);
                break;
            default:
                if(!checkStack(chunks[j])) {
                    corruptLines.push(i);
                    score += p1Scores[chunks[j]];
                    j = chunks.length;
                } else {
                    symbolStack.pop();
                }
                break;
        }
    }
    symbolStack = [];
}
console.log('part 1', score);

const p2Scores : {[key: string] : number} = {
    '(': 1,
    '[': 2,
    '{': 3,
    '<': 4
}

let p2Score: number[] = [];
for (let i = 0; i < input.length; i++) {
    if(corruptLines.includes(i)) continue;
    score = 0;
    const chunks = input[i].split('');
    for (let j = 0; j < chunks.length; j++) {
        const symbol = chunks[j];
        switch(symbol){
        case '(':
        case '[':
        case '{':
        case '<':
            symbolStack.push(chunks[j]);
            break;
        default:
            symbolStack.pop();
            break;
        }
    }
    for (let j = symbolStack.length-1; j >=0; j--){
        const ending = symbolStack[j];
        score *= 5;
        score += p2Scores[ending];
    }
    p2Score.push(score);
    symbolStack = [];
}

p2Score = p2Score.sort((a,b) => (a < b) ? -1 : ((a > b) ? 1 : 0));
console.log('part 2', p2Score[Math.floor(p2Score.length / 2)]);